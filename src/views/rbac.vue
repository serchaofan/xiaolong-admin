<template>
  <el-main>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-tabs v-model="currentTab" style="margin-left: 1rem">
          <el-tab-pane label="Role" name="role"></el-tab-pane>
          <el-tab-pane label="RoleBinding" name="role_binding"></el-tab-pane>
          <el-tab-pane label="ClusterRole" name="cluster_role"></el-tab-pane>
          <el-tab-pane label="ClusterRoleBinding" name="cluster_role_binding"></el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </el-main>
</template>

<script>
export default {
  name: "rbac",
  data() {
    return {
      currentTab: ''
    }
  }
}
</script>

<style scoped>

</style>
