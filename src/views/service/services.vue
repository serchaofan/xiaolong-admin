<template>
  <el-main>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card>
          <el-table stripe :data="servicesList" width="100%" v-loading="listloading">
            <el-table-column prop="name" label="Name"></el-table-column>
            <el-table-column prop="namespace" label="Namespace"></el-table-column>
            <el-table-column prop="labels" label="Labels" width="300rem">
              <template slot-scope="scope">
                <el-tag v-for="(val,key) in scope.row.labels">{{key}}={{val}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="type" label="Type" width="100rem"></el-table-column>
            <el-table-column prop="clusterIP" label="ClusterIP" width="120rem"></el-table-column>
            <el-table-column prop="ports" label="Ports">
              <template slot-scope="scope">
                <el-tag v-for="item in scope.row.ports">{{item.port}}:{{item.node_port}}/{{item.protocol}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="selector" label="Selector" width="200rem">
              <template slot-scope="scope">
                <el-tag v-for="(val,key) in scope.row.selector">{{key}}={{val}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="creationTimestamp" label="Create Time"></el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </el-main>
</template>

<script>
    import {getServicesList} from "@/api/k8s";

    export default {
      name: "services",
      data() {
        return {
          namespace: this.$store.state.namespace.namespace,
          listloading: true,
          servicesList: [],
          query: {}
        }
      },
      created() {
        if (sessionStorage.getItem("store") ) {
          this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(sessionStorage.getItem("store"))))
        }
        window.addEventListener("beforeunload",()=>{
          sessionStorage.setItem("store",JSON.stringify(this.$store.state))
        })

        this.namespace = this.$store.state.namespace.namespace
        this.query = {
          namespace: this.namespace
        }
        this.fetchData(this.query)
      },
      methods: {
        async fetchData(query) {
          this.listloading = true
          await getServicesList(query).then(res => {
            this.servicesList = res.data
          })
          this.listloading = false
        }
      },
      watch: {
        '$store.state.namespace.namespace': async function () {
          this.query = {
            namespace: this.$store.state.namespace.namespace
          }
          console.log(this.query)
          await this.fetchData(this.query)
        }
      }
    }
</script>

<style scoped>

</style>
