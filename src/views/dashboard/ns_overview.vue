<template>
  <el-main>
    <el-card>
      <el-row :gutter="20">
        <h2 class="main_header">Namespace: <b>{{ namespace }}</b></h2>
      </el-row>
      <el-row>
        <el-col :span="5" style="margin-left: 3rem">
          <el-card shadow="hover">
            <h3 class="main_header">Pods</h3>
            <el-row>{{ pods_count }}</el-row>
          </el-card>
        </el-col>
        <el-col :span="5" style="margin-left: 2rem">
          <el-card shadow="hover">
            <h3 class="main_header">Deployments</h3>
          </el-card>
        </el-col>
        <el-col :span="5" style="margin-left: 2rem">
          <el-card shadow="hover">
            <h3 class="main_header">Daemonsets</h3>
          </el-card>
        </el-col>
        <el-col :span="5" style="margin-left: 2rem">
          <el-card shadow="hover">
            <h3 class="main_header">Services</h3>
          </el-card>
        </el-col>
      </el-row>
    </el-card>

<!--    <el-row :gutter="20">-->
<!--      <el-col :span="24"></el-col>-->
<!--    </el-row>-->
  </el-main>
</template>

<script>
  import {getPodsList, getDaemonsetsList, getServicesList, getStatefulsList, getReplicasetsList, getDeploymentsList} from "@/api/k8s";

  export default {
    name: "ns_overview",
    data() {
      return {
        namespace: this.$store.state.namespace.namespace,
        listloading: true,
        pods_count: 0,
        deployments_count: 0,
        services_count: 0,
        statefulsets_count: 0,
        replicasets_count: 0,
        daemonsets_count: 0
      }
    },
    created() {
      if (sessionStorage.getItem("store")) {
        this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem("store"))))
      }
      window.addEventListener("beforeunload", () => {
        sessionStorage.setItem("store", JSON.stringify(this.$store.state))
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
        this.namespace = query.namespace
        await getPodsList(query).then(res => {
          this.pods_count = res.data.length
        })
        await getServicesList(query).then(res => {
          this.services_count = res.data.length
        })
        await getDeploymentsList(query).then(res => {
          this.deployments_count = res.data.length
        })
        await getReplicasetsList(query).then(res => {
          this.replicasets_count = res.data.length
        })
        await getStatefulsList(query).then(res => {
          this.statefulsets_count = res.data.length
        })
        await getDaemonsetsList(query).then(res => {
          this.daemonsets_count = res.data.length
        })
        this.listloading = false
      },
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
