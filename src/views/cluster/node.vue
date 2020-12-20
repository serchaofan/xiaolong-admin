<template>
  <el-main>
    <el-row :gutter="20">
      <h2 style="font-family: 'Roboto Light'; font-weight: lighter; margin-left: 1rem">{{ node.name }}</h2>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-tabs v-model="currentTab" style="margin-left: 1rem">
          <el-tab-pane label="System" name="system">
            <el-col :span="14">
              <el-card>
                <table style="border-spacing: 5px 10px;">
                  <tbody>
                    <tr>
                      <td class="info_column">Architecture</td>
                      <td class="info_value">{{ node['nodeInfo']['architecture'] }}</td>
                    </tr>
                    <tr>
                      <td class="info_column">Boot ID</td>
                      <td class="info_value">{{ node['nodeInfo']['boot_id'] }}</td>
                    </tr>
                    <tr>
                      <td class="info_column">Container Runtime Version</td>
                      <td class="info_value">{{ node['nodeInfo']['container_runtime_version'] }}</td>
                    </tr>
                    <tr>
                      <td class="info_column">Kernel Version</td>
                      <td class="info_value">{{ node['nodeInfo']['kernel_version'] }}</td>
                    </tr>
      <!--              <tr>-->
      <!--                <td style="width: 20rem">KubeProxy Version</td>-->
      <!--                <td style="width: 20rem">{{ node['nodeInfo']['architecture'] }}</td>-->
      <!--              </tr>-->
                    <tr>
                      <td class="info_column">Kubelet Version</td>
                      <td class="info_value">{{ node['nodeInfo']['kubelet_version'] }}</td>
                    </tr>
                    <tr>
                      <td class="info_column">Machine ID</td>
                      <td class="info_value">{{ node['nodeInfo']['machine_id'] }}</td>
                    </tr>
                    <tr>
                      <td class="info_column">Operating System</td>
                      <td class="info_value">{{ node['nodeInfo']['operating_system'] }}</td>
                    </tr>
                    <tr>
                      <td class="info_column">OS Image</td>
                      <td class="info_value">{{ node['nodeInfo']['os_image'] }}</td>
                    </tr>
                    <tr>
                      <td class="info_column">Pod CIDR</td>
                      <td class="info_value">{{ node['podCidr'] }}</td>
                    </tr>
                    <tr>
                      <td class="info_column">System UUID</td>
                      <td class="info_value">{{ node['nodeInfo']['system_uuid'] }}</td>
                    </tr>
                  </tbody>
                </table>
              </el-card>
            </el-col>
            <el-col :span="10">
              <el-card>
                <el-table :data="node['addresses']">
                  <el-table-column prop="type" label="Type"></el-table-column>
                  <el-table-column prop="address" label="Address"></el-table-column>
                </el-table>
              </el-card>
            </el-col>
          </el-tab-pane>
          <el-tab-pane label="Metadata" name="metadata">
            <el-col :span="24">
              <el-card class="card_header">
                <table style="border-spacing: 5px 10px;">
                  <tbody>
                    <tr>
                      <td class="info_column">Age</td>
                      <td class="info_value"></td>
                    </tr>
                    <tr>
                      <td class="info_column">Labels</td>
                      <td class="info_value">
                        <el-tag v-for="(val, key) in node['labels']" style="margin-bottom: 3px; margin-right: 3px">{{ key }}={{ val }}</el-tag>
                      </td>
                    </tr>
                    <tr>
                      <td class="info_column">Annotations</td>
                      <td class="info_value">
                    <el-tag v-for="(val, key) in node['annotations']" style="margin-bottom: 3px; margin-right: 3px">{{ key }}={{ val }}</el-tag>
                    </td>
                    </tr>
                  </tbody>
                </table>
              </el-card>
            </el-col>
          </el-tab-pane>
          <el-tab-pane label="Images" name="images">
            <el-col :span="24">
              <el-card class="card_header">
                <el-table :data="node['images']" stripe :max-height="imageTableHeight">
                  <el-table-column prop="names" label="Name" />
                  <el-table-column prop="size_bytes" label="Size (MB)" />
                </el-table>
              </el-card>
            </el-col>
          </el-tab-pane>
<!--          <el-tab-pane label="定时任务补偿" name="fourth"></el-tab-pane>-->
        </el-tabs>
      </el-col>

    </el-row>
  </el-main>
</template>

<script>
    import {getNodeInfo} from "@/api/k8s";

    export default {
      name: "node",
      data() {
        return {
          node: {},
          currentTab: 'system',
          imageTableHeight: 500,
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
          await getNodeInfo({name: this.$route.query.name}).then(res => {
            this.node = res.data
          })
          this.listloading = false
        }
      }
    }
</script>

<style scoped>
  .info_column {
    width: 15rem;
    font-weight: lighter;
    color: #1f2d3d;
    vertical-align: top;
    font-family: "Roboto Light";
  }
  .info_value {
    width: 20rem;
    font-weight: lighter;
    color: #5a5e66;
  }
  .card_header {
    font-family: "Roboto Light";
    font-weight: lighter;
    font-size: medium;
  }
</style>
