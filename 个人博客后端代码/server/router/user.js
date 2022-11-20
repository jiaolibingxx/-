const express=require('express')
const router=express.Router()
//引入处理函数
const {loginController}=require('../controller/loginController')
router.post('/login',loginController)
module.exports=router