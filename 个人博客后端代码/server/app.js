const express=require('express')
const app=express()
//解决跨域
const cors=require('cors')
app.use(cors())
//解析参数
app.use(express.json({limit:'100mb'}))
app.use(express.urlencoded({extended:false}))
//连接数据库
require('../db/index')
//封装res.cc中间件
app.use((req,res,next) => {
    res.cc=(err,code=300) => {
        res.send({
            code,
            message:err instanceof Error?err.message:err
        })
    }
    next()
})
//引入封装好的jwt
const {JWT}=require('./utils/JWT')
//校验touken中间件
app.use((req,res,next) => {
    if(req.url.includes('login')){
        next()
        return
    }
    const token=req.headers['authorization']?.split(' ')[1]
    if(token){
        const payload=JWT.verify(token)
        if(payload){
            next()
        }else{
            res.cc('token认证失败!')
        }
    }else{
        next()
    }
})
const {secret}=require('./utils/JWT')
const expressJwt= require('express-jwt')
app.use(expressJwt({secret:secret}).unless({path:[/^\/api\//]}))
//注册路由
const loginRouter=require('./router/user')
app.use('/api',loginRouter)
const userManageRouter=require('./router/userManage')
app.use('/user',userManageRouter)
//文章管理路由
const articleRouter=require('./router/article')
app.use('/article',articleRouter)
app.listen(888,() => {
    console.log("服务器已启动,http://127.0.0.1:888");
})