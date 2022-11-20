<template>
    <div>
        <el-input v-model="keywords" placeholder="请输入关键字" size="normal" style="width: 200px;margin: 10px;"
            @keyup.enter.native="inquiry">
        </el-input>
        <el-button type="primary" size="default" @click="inquiry">查询文章</el-button>
        <el-button type="" size="default" @click="clear">清空</el-button>
        <el-table :data="form" border stripe>
            <el-table-column prop="" label="序号" type="index" width="80" align="center">
            </el-table-column>
            <el-table-column prop="title" label="主题" width="width" align="center">
            </el-table-column>
            <el-table-column prop="author" label="作者" width="width" align="center">
            </el-table-column>
            <el-table-column prop="publishiDate" label="发布日期" width="width" align="center">
            </el-table-column>
            <el-table-column prop="cover" label="封面" width="width" align="center">
                <template slot-scope="{row}">
                    <img :src="row.cover" alt="" style="width: 100px;height: 100px;">
                </template>
            </el-table-column>
            <el-table-column prop="content" label="简介" width="width" align="center">
            </el-table-column>
            <el-table-column prop="" label="操作" width="width" align="center">
                <template slot-scope="{row}">
                    <el-button type="primary" size="mini" @click="edit(row)">编辑</el-button>
                    <el-button type="danger" size="mini" @click="deleteArticle(row)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination style="text-align: center;" @size-change="handleSizeChange" @current-change="handleCurrentChange"
            :current-page="page" :page-sizes="[4, 8, 12]" :page-size="limit"
            layout=" prev, pager, next, jumper,->,total, sizes" :total="totle">
        </el-pagination>

        <el-dialog title="修改文章" :visible.sync="isShow">
            <el-form :model="info">
                <el-form-item label="主题">
                    <el-input v-model="info.title" autocomplete="off" style="width:350px"></el-input>
                </el-form-item>
                <el-form-item label="发布日期">
                    <el-col :span="11">
                        <el-date-picker value-format="yyyy-MM-dd" type="date" placeholder="选择日期"
                            v-model="info.publishiDate" style="width: 100%;">
                        </el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="封面">
                    <el-upload action="http://127.0.0.1:888/article/upload" list-type="picture-card"
                        :headers="headersObj" :on-success="getFile" :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemove" :on-change="getFile" :show-file-list="true">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="this.info.cover" alt="">
                    </el-dialog>
                </el-form-item>
                <el-form-item label="文章内容" size="normal" prop="content">
                    <el-input v-model="info.content" type="textarea" placeholder="请输入内容" size="normal" clearable>
                    </el-input>
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
    name: 'articleList',
    data() {
        return {
            form: [],
            page: 1,
            limit: 4,
            totle: 0,
            isShow: false,
            keywords: '',
            headersObj: {
                Authorization: 'Bearer ' + window.localStorage.getItem('token')
            },
            info: {
                title: '',
                publishiDate: '',
                cover: null,
                content: ''
            },
            dialogVisible:false
        }
    },
    mounted() {
        this.getArticleList()
    },
    methods: {
        async getArticleList() {
            let result = await this.$API.article.getArticleList(this.page, this.limit)
            if (result.code == 200) {
                /* result.data.forEach(element => {
                    element.cover = 'data:image/jpeg;base64,' + element.cover

                }); */
                this.form = result.data
                this.totle = result.totle


            }
        },
        //改变当前页数范围
        handleSizeChange(limit) {
            this.limit = limit
            this.getArticleList()
        },
        //改变当前页数
        handleCurrentChange(page) {
            this.page = page
            this.getArticleList()
        },
        //查询文章
        async inquiry() {
            if (this.keywords.trim() == '') {
                this.getArticleList()
            } else {
                let result = await this.$API.article.selectArticle({ keywords: this.keywords })
                if (result.code == 200) {
                    this.form = result.data
                    this.totle = result.data.length
                }
            }

        },
        //清空
        clear() {
            Object.assign(this._data, this.$options.data())
            this.getArticleList()
        },
        //删除文章
        async deleteArticle(row) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                let result = await this.$API.article.deleteArticle({ _id: row._id })
                if (result.code == 200) {
                    this.getArticleList()
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
        },
        //编辑文章
        edit(row){
            this.isShow=true
            this.info={...row}
        },
        async sendReq(){
            let result=await this.$API.article.updateArticle(this.info)
            if(result.code==200){
                this.isShow=false
                this.getArticleList()
                this.$message({
                    type:'success',
                    message:'更新成功'
                })
            }else{
                this.$message.error('更新失败')
            }
        },
        handleRemove(file, fileList) {
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = this.form.cover;
            this.dialogVisible = true;
        },
        getBase64(file) {
            return new Promise(function (resolve, reject) {
                const reader = new FileReader()
                let imgResult = ''
                reader.readAsDataURL(file)
                reader.onload = function () {
                    imgResult = reader.result
                }
                reader.onerror = function (error) {
                    reject(error)
                }
                reader.onloadend = function () {
                    resolve(imgResult)
                }
            })
        },

        //保存图片路径
        getFile(file, fileList) {
            this.getBase64(file.raw).then(res => {
                if (res.length > 0) {
                    this.info.cover = res
                }
            })
        },
    }

}
</script>

<style>

</style>