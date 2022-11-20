<template>

    <el-card shadow="always" :body-style="{ padding: '20px' } " style="margin: 20px;">
      <el-descriptions title="用户信息" >
      <el-descriptions-item label="用户名" name="666">{{info.username}}</el-descriptions-item>
      <el-descriptions-item label="Email">{{info.email}}</el-descriptions-item>
      <el-descriptions-item label="角色">{{info.role}}</el-descriptions-item>
    </el-descriptions>
    </el-card>
    

</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'userinfo',
  computed:{
    ...mapState('user',['info'])
  }
}
</script>

<style>

</style>