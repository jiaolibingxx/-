<template>
    <div>
        <el-input v-model="keywords" placeholder="请输入关键字" size="normal" style="width: 200px;margin: 10px;" @keyup.enter.native="inquiry">
        </el-input>
        <el-button type="primary" size="default" @click="inquiry" >查询用户</el-button>
        <el-button type="" size="default" @click="clear">清空</el-button>
        <el-table :data="form" border stripe style="padding: 10px;margin: 10px;text-align: center;">
            <el-table-column prop="" label="序号" type="index" width="80" align="center">
            </el-table-column>
            <el-table-column prop="username" label="用户名" width="col.width" align="center">
            </el-table-column>
            <el-table-column prop="email" label="电子邮箱" width="col.width" align="center">
            </el-table-column>
            <el-table-column prop="role" label="角色" width="col.width" align="center">
            </el-table-column>
            <el-table-column prop="state" label="状态(0:启用 1:禁用)" width="col.width" align="center">
            </el-table-column>
            <el-table-column prop="" label="操作" width="col.width" align="center">
                <template slot-scope="{row}">
                    <el-button type="primary" size="mini" @click="editUser(row)" icon="el-icon-edit">编辑</el-button>
                    <el-button type="danger" size="mini" @click="deleteUser(row)" icon="el-icon-delete">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination style="text-align: center;" @size-change="handleSizeChange" @current-change="handleCurrentChange"
            :current-page="page" :page-sizes="[4, 8, 12]" :page-size="limit"
            layout=" prev, pager, next, jumper,->,total, sizes" :total="total">
        </el-pagination>
        <el-dialog title="修改信息" :visible.sync="isShow">
            <el-form :model="info">
                <el-form-item label="用户名">
                    <el-input v-model="info.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="角色">
                    <el-select v-model="info.role" placeholder="请选择角色">
                        <el-option label="管理员" value="超级管理员"></el-option>
                        <el-option label="普通用户" value="普通用户"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="状态">
                    <el-tooltip :content="'Switch value: ' + info.state">
                        <el-switch v-model="info.state" active-color="#13ce66" inactive-color="#ff4949" :active-value="0"
                            :inactive-value="1">
                        </el-switch>
                    </el-tooltip>
                </el-form-item>


            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="isShow = false">取 消</el-button>
                <el-button type="primary" @click="sendReq">确 定</el-button>
            </div>
        </el-dialog>


    </div>
</template>

<script>

export default {
    name: 'userlist',
    data() {
        return {
            form: [],
            info: {
                username: '',
                role: '',
                state: 0
            },
            page: 1,
            limit: 4,
            total: 0,
            isShow: false,
            keywords: ''
        }
    },
    mounted() {
        this.getUserList()
    },
    methods: {
        //获取用户列表
        async getUserList() {
            let result = await this.$API.user.getUserList(this.page, this.limit)
            if (result.code == 200) {
                /*  result.data.forEach(element => {
                     element.role = element.role == 'admin' ? '超级管理员' : '普通用户'
                 }); */
                /* result.data.forEach(element => {
                    element.state = element.state == 1 ? '禁用' : '启用'
                }); */
                this.form = result.data
                this.total = result.total
            }
        },
        //改变当前页数范围
        handleSizeChange(limit) {
            this.limit = limit
            this.getUserList()
        },
        //改变当前页数
        handleCurrentChange(page) {
            this.page = page
            this.getUserList()
        },
        //查询用户
         async inquiry() {
             if (this.keywords.trim() == '') {
                 this.getUserList()
             } else {
                 let result=await this.$API.user.selectUser({keywords:this.keywords})
                 if(result.code==200){
                    this.form=result.data
                    this.total = result.data.length
                 }
             }
             
         },
         clear(){
            Object.assign(this._data,this.$options.data())
            this.getUserList()
         },
        //编辑用户
        editUser(row) {
            /* row.state = row.state == '启用' ? 0 : 1 */
            this.isShow = true
            this.info = { ...row }
            /* row.role = row.role == '超级管理员' ? 'admin' : 'normal'*/

        },
        async sendReq() {
            let result = await this.$API.user.updateUser(this.info)
            if (result.code == 200) {
                this.isShow = false
                this.$message({
                    type: 'success',
                    message: '更新成功!'
                })
                this.getUserList()
            } else {
                this.$message({
                    type: 'warning',
                    message: '更新失败!'
                })
            }
        },
        //删除用户
        deleteUser(row) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                let result = await this.$API.user.deleteUsers(row._id)
                console.log(result);
                if (result.code == 200) {
                    this.getUserList()
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        }
    },

}
</script>

<style>

</style>