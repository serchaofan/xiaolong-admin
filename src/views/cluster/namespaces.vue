<template>
  <el-main>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card>
          <el-table stripe :data="namespacesList" width="100%" v-loading="listloading" fit>
            <el-table-column prop="name" label="Name">
              <template slot-scope="scope">
                <el-button type="text" @click="changeNamespace(scope.row.name)">{{ scope.row.name }}</el-button>
              </template>
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
      },
      changeNamespace(namespace) {
        this.$store.commit('namespace/changeNamespace', namespace)
        console.log("this.$store.state.namespace.namespace", this.$store.state.namespace.namespace)
      }
    }
  }
</script>

<style scoped>

</style>
