<template>
  <el-main>
    <el-row :gutter="20">
      <h2 class="main_header">{{ pod.name }}</h2>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-tabs v-model="currentTab" style="margin-left: 1rem">
          <el-tab-pane label="Summary" name="summary">
            <el-col :span="14">
              <el-card>
                <table class="detail_table">
                  <tbody>
                    <tr>
                      <td class="info_column"></td>
                      <td class="info_value"></td>
                    </tr>
                  </tbody>
                </table>
              </el-card>
            </el-col>
          </el-tab-pane>
          <el-tab-pane label="Metadata" name="metadata">
            <el-col :span="14">
              <el-card>
                <table class="detail_table">
                  <tbody>
                  </tbody>
                </table>
              </el-card>
            </el-col>
          </el-tab-pane>
          <el-tab-pane label="Status" name="status">
            <el-col :span="14">
              <el-card>
                <table class="detail_table">
                  <tbody>
                  </tbody>
                </table>
              </el-card>
            </el-col>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </el-main>
</template>

<script>
import {getPodInfo} from '@/api/k8s'

export default {
  name: "pod",
  data() {
    return {
      pod: {},
      listLoading: true,
      currentTab: 'summary'
    }
  },
  created() {
    this.fetchData()
  },
  mounted() {
    this.$nextTick(() => {
      this.imageTableHeight = window.innerHeight - 250
    })
  },
  methods: {
    async fetchData() {
      this.listloading = true
      await getPodInfo({name: this.$route.query.name, namespace: this.$route.query.namespace}).then(res => {
        this.pod = res.data
      })
      this.listloading = false
    }
  }
}
</script>

<style scoped>

</style>
