const {selectUserController,regController,getUserInfoController,getUserListController,deleteUserController,updateUserInfoController}=require('../controller/userManageController')
const express=require('express')
const router=express.Router()
//注册路由
router.post('/register',regController)
//获取个人信息
router.get('/getUserInfo',getUserInfoController)
//获取用户列表
router.get('/getUserList/:page/:limit',getUserListController)
//删除用户
router.post('/deleteUser/:id',deleteUserController)
//更新用户信息
router.post('/updateUserInfo',updateUserInfoController)
router.post('/selectUser',selectUserController)
module.exports=router