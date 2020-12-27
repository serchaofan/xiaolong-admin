<template>
  <el-main>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card>
          <el-table stripe :data="nodesList" width="100%" v-loading="listloading" fit>
            <el-table-column prop="name" label="Name" width="140rem">
              <template slot-scope="scope">
                <el-button type="text" @click="nodeDetailed(scope.row.name)">{{ scope.row.name }}</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="labels" label="Labels" width="600rem">
              <template slot-scope="scope">
                <el-tag v-for="(val,key) in scope.row.labels" class="multi_tags">{{key}}={{val}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="role" label="Roles" width="100rem"></el-table-column>
            <el-table-column prop="status" label="Status"></el-table-column>
            <el-table-column prop="kubelet_version" label="Version"></el-table-column>
            <el-table-column prop="creationTimestamp" label="Create Time"></el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </el-main>
</template>

<script>
  import { getNodesList } from '@/api/k8s'

  export default {
    name: "nodes",
    data() {
      return {
        listloading: true,
        nodesList: []
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      async fetchData() {
        this.listloading = true
        await getNodesList().then(res => {
          this.nodesList = res.data
        })
        this.listloading = false
      },
      nodeDetailed(hostname) {
        this.$router.push({
          path: '/cluster/node',
          query: {
            name: hostname
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
