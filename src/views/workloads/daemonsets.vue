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
            :data="daemonsetsList.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
            width="100%"
            v-loading="listloading"
            fit
            max-height="500">
            <el-table-column prop="name" label="Name"></el-table-column>
            <el-table-column prop="namespace" label="Namespace"></el-table-column>
            <el-table-column prop="labels" label="Labels">
              <template slot-scope="scope">
                <el-tag v-for="(val,key) in scope.row.labels" class="multi_tags">{{key}}={{val}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="status.desired_number_scheduled" label="Desired"></el-table-column>
            <el-table-column prop="status.current_number_scheduled" label="Current"></el-table-column>
            <el-table-column prop="status.number_ready" label="Ready"></el-table-column>
            <el-table-column prop="status.updated_number_scheduled" label="Up-To-Date"></el-table-column>
            <el-table-column prop="creation_timestamp" label="Create Time"></el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </el-main>
</template>

<script>
    import {getDaemonsetsList} from "@/api/k8s";

    export default {
      name: "daemonsets",
      data() {
        return {
          namespace: this.$store.state.namespace.namespace,
          listloading: true,
          daemonsetsList: [],
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
          await getDaemonsetsList(query).then(res => {
            this.daemonsetsList = res.data
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
