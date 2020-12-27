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
            :data="eventsList.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()) || data.message.toLowerCase().includes(search.toLowerCase()))"
            width="100%"
            :max-height="tableHeight"
          >
            <el-table-column prop="name" label="Name" />
            <el-table-column prop="namespace" label="Namespace" width="100rem" />
            <el-table-column prop="message" label="Message" :show-overflow-tooltip="true" />
            <el-table-column prop="reason" label="Reason" width="100rem" />
            <el-table-column prop="type" label="Type" width="100rem">
              <template slot-scope="scope">
                <el-tag v-if="scope.row.type == 'Normal'">{{ scope.row.type }}</el-tag>
                <el-tag v-if="scope.row.type == 'Warning'" type="warning">{{ scope.row.type }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="lastTimestamp" label="Last Time" />
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </el-main>
</template>

<script>
import { getEventsList } from '@/api/k8s'

export default {
  name: 'Events',
  data() {
    return {
      namespace: this.$store.state.namespace.namespace,
      search: '',
      query: {},
      listloading: true,
      eventsList: [],
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
      await getEventsList(query).then(res => {
        this.eventsList = res.data
      })
      this.listloading = false
    }
  }
}
</script>

<style scoped>

</style>
