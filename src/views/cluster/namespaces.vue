<template>
  <el-main>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card>
          <el-table stripe :data="namespacesList" width="100%" v-loading="listloading" fit>
            <el-table-column prop="name" label="Name">
<!--              <template slot-scope="scope">-->
<!--                <a style="color: #1300D6" @click="nodeDetailed(scope.row.name)">{{ scope.row.name }}</a>-->
<!--              </template>-->
            </el-table-column>
            <el-table-column prop="status" label="Status"></el-table-column>
            <el-table-column prop="creationTimestamp" label="Create Time"></el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </el-main>

</template>

<script>
  import {getNamespacesList} from "@/api/k8s";

  export default {
    name: "namespaces",
    data() {
      return {
        listloading: true,
        namespacesList: []
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      async fetchData() {
        this.listloading = true
        await getNamespacesList().then(res => {
          this.namespacesList = res.data
        })
        this.listloading = false
      }
    }
  }
</script>

<style scoped>

</style>
