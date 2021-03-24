<template>
  <el-main>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card>
          <el-col :span="6" style="margin-bottom: 1rem">
            <el-input v-model="search" placeholder="Search"></el-input>
          </el-col>
          <el-table
            stripe
            :data="podsList.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
            width="100%"
            v-loading="listloading"
            fit
            max-height="500">
            <el-table-column prop="name" label="Name">
              <template slot-scope="scope">
                <el-button type="text" @click="podDetailed(scope.row.name, scope.row.namespace)">{{ scope.row.name }}</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="namespace" label="Namespace"></el-table-column>
            <el-table-column prop="labels" label="Labels">
              <template slot-scope="scope">
                <el-tag v-for="(val,key) in scope.row.labels" class="multi_tags">{{key}}={{val}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="node_name" label="Node"></el-table-column>
            <el-table-column prop="host_ip" label="HostIP"></el-table-column>
            <el-table-column label="container_statuses">
              <template slot-scope="scope">
                {{ scope.row.container_statuses.length }}
              </template>
            </el-table-column>
            <el-table-column prop="start_time" label="StartTime"></el-table-column>
            <el-table-column prop="pod_ip" label="PodIP"></el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </el-main>
</template>

<script>
  import {getPodsList} from "@/api/k8s";

    export default {
      name: "pods",
      data() {
        return {
          namespace: this.$store.state.namespace.namespace,
          listloading: true,
          podsList: [],
          query: {},
          search: ''
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
          await getPodsList(query).then(res => {
            this.podsList = res.data
          })
          this.listloading = false
        },
        podDetailed(name, namespace) {
          this.$router.push({
            path: '/workloads/pod',
            query: {
              name: name,
              namespace: namespace
            }
          })
        }
      },
      watch: {
        '$store.state.namespace.namespace': async function () {
          this.query = {
            namespace: this.$store.state.namespace.namespace
          }
          await this.fetchData(this.query)
        }
      }
    }
</script>

<style scoped>

</style>
