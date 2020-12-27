<template>
  <el-main>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card>
          <el-col :span="6" style="margin-bottom: 1rem">
            <el-input v-model="search" placeholder="Search" />
          </el-col>
          <el-table
            v-loading="listloading"
            stripe
            :data="clusterRolesList.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
            width="100%"
            :max-height="tableHeight"
          >
            <el-table-column prop="name" label="Name" width="260rem" />
            <el-table-column prop="labels" label="Labels" width="600rem">
              <template slot-scope="scope">
                <el-tag v-for="(val,key) in scope.row.labels" class="multi_tags">{{ key }}={{ val }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="creationTimestamp" label="Create Time" />
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </el-main>

</template>

<script>
import { getClusterRolesList } from '@/api/k8s'

export default {
  name: 'ClusterRoles',
  data() {
    return {
      namespace: this.$store.state.namespace.namespace,
      search: '',
      query: {},
      listloading: true,
      clusterRolesList: [],
      tableHeight: 500
    }
  },
  watch: {
    '$store.state.namespace.namespace': async function() {
      this.query = {
        namespace: this.$store.state.namespace.namespace
      }
      await this.fetchData(this.query)
    }
  },
  created() {
    if (sessionStorage.getItem('store')) {
      this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('store'))))
    }
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('store', JSON.stringify(this.$store.state))
    })

    this.namespace = this.$store.state.namespace.namespace
    this.query = {
      namespace: this.namespace
    }
    this.fetchData(this.query)
  },
  mounted() {
    this.$nextTick(() => {
      this.tableHeight = window.innerHeight - 200
    })
  },
  methods: {
    async fetchData(query) {
      this.listloading = true
      await getClusterRolesList(query).then(res => {
        this.clusterRolesList = res.data
      })
      this.listloading = false
    }
  }
}
</script>

<style scoped>

</style>
