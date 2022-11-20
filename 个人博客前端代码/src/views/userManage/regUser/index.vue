<template>
  <el-form :model="form" ref="form" :rules="rules" label-width="80px" :inline="false" size="normal"
    style="margin: 10px;,padding: 10px;">
    <el-form-item label="用户名" prop="username">
      <el-input v-model="form.username"></el-input>
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="form.email" type="email"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="form.password" type="password"></el-input>
    </el-form-item>
    <el-form-item label="角色">
      <el-select v-model="form.role" placeholder="请选择角色">
        <el-option label="管理员" value="超级管理员"></el-option>
        <el-option label="普通用户" value="普通用户"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="状态">
      <el-select v-model="form.state" placeholder="请选择角色">
        <el-option label="启用" value="0"></el-option>
        <el-option label="禁用" value="1"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
      <el-button @click="clear">清空</el-button>
    </el-form-item>
  </el-form>

</template>

<script>
export default {
  name: 'reguser',
  data() {
    return {
      form: {
        username: '',
        email: '',
        password: '',
        role: '',
        state: null
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 12, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在 6 到 16位', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        role: [
          { required: true, message: '请选择角色', trigger: 'blur' },
        ],
        state: [
          { required: true, message: '请选择状态', trigger: 'blur' },
        ],
      }
    }
  },
  methods: {
    async onSubmit() {
      const {username,email,password,role,state}=this.form
      if(username&&email&&password&&role&&state){
        let result = await this.$API.user.register(this.form)
      if (result.code == 200) {
        this.$message({
          type: 'success',
          message: '添加成功'
        })
        this.$router.push({ path: '/userManage/userlist' })
      } else {
        this.$message({
          type: 'error',
          message: '添加失败'
        })
      }
      }else{
        alert('请全部填写')
      }
      
    },
    clear() {
      Object.assign(this._data, this.$options.data())
    }
  }
}
</script>

<style>

</style>