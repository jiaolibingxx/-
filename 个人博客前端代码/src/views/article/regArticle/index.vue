<template>
    <div>
        <el-form :model="form" ref="form" :rules="rules" label-width="80px" :inline="false" size="normal"
            style="margin: 10px;padding: 10px;">
            <el-form-item label="标题" prop="title">
                <el-input v-model="form.title" placeholder="请输入标题" size="normal" clearable></el-input>
            </el-form-item>
            <el-form-item label="作者" prop="author">
                <el-input v-model="form.author" placeholder="" size="normal" clearable readonly=""></el-input>
            </el-form-item>
            <el-form-item label="上传日期" prop="publishiDate">
                <el-col :span="11">
                    <el-date-picker value-format="yyyy-MM-dd" type="date" placeholder="选择日期" v-model="form.publishiDate"
                        style="width: 100%;">
                    </el-date-picker>
                </el-col>
            </el-form-item>
            <el-form-item label="上传封面">
                <el-upload action="http://127.0.0.1:888/article/upload" list-type="picture-card" :headers="headersObj"
                    :on-success="getFile" :on-preview="handlePictureCardPreview" :on-remove="handleRemove"
                    :on-change="getFile">
                    <i class="el-icon-plus"></i>
                </el-upload>
                <!-- <el-upload action="http://127.0.0.1:888/article/upload" list-type="picture-card" :headers="headersObj"
                    :on-preview="handlePictureCardPreview" :on-remove="handleRemove" name="cover" >
                    <i class="el-icon-plus"></i>
                </el-upload> -->
                <!-- 'data:image/jpeg;base64,'+ -->
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="this.form.cover" alt="">
                </el-dialog>
            </el-form-item>
            <el-form-item label="文章内容" size="normal" prop="content">
                <el-input v-model="form.content" type="textarea" placeholder="请输入内容" size="normal" clearable>
                </el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="onSubmit">立即创建</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>

    </div>
</template>
  
<script>
export default {
    name: 'regArticles',
    data() {
        return {
            headersObj: {
                Authorization: 'Bearer ' + window.localStorage.getItem('token')
            },
            dialogVisible: false,
            dialogImageUrl: '',
            form: {
                title: '',
                author: this.$store.state.user.info._id,
                publishiDate: '',
                cover: null,
                content: ''
            },
            rules: {
                title: [
                    { required: true, message: '请输入标题', trigger: 'blur' },
                    { min: 4, max: 20, message: '长度在 4 到 20 个字符', trigger: 'blur' }
                ],
                author: [
                    { required: true, trigger: 'change' }
                ],
                publishiDate: [
                    { required: true, message: '请选择日期', trigger: 'blur' }
                ],
                cover: [
                    { required: true, message: '请选择封面', trigger: 'blur' }
                ],
                content: [
                    { required: true, message: '请填写内容', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
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
                     this.form.cover = res
                 }
             })
         },
       /*  show(res, file) {
            console.log(res,file);
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        }, */

        async onSubmit() {
            const { title, author, publishiDate, cover, content } = this.form
            if (title != '' && author != '' && publishiDate != '' && cover != null && content != '') {
                let result = await this.$API.article.addArticle(this.form)
                if (result.code == 200) {
                    this.$router.push({ path: '/article/articleList' })
                }
            } else {
                alert('请全部填写')
            }


        }
    },

}
</script>
  
<style>

</style>