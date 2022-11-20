const {regService,checkEmail,getUserInfo,getUserList,deleteUser,getCount,updateUserInfo,selectUserService}=require('../services/user')
const bcryptjs=require('bcryptjs')
//注册用户
exports.regController=async (req,res) => {
    const userInfo=req.body
    //加密密码
    /* userInfo.password=bcryptjs.hashSync(userInfo.password,10) */
    let result=await checkEmail(userInfo.email)
    if(result){
        res.cc('邮箱已被注册')
    }else{
        let data=await regService(userInfo)
        console.log(data);
        if(data){
            res.cc('注册成功',200)
        }else{
            res.cc('注册失败')
        }
    }
}
//获取个人信息
exports.getUserInfoController=async (req,res) => {
    const _id=req.user._id
    await getUserInfo(_id).then((result) => {
        res.send({
            code:200,
            message:'获取个人信息成功',
            data:result
        })
    }).catch((err) => {
        console.log('获取个人信息失败');
    });
    
}
//获取用户列表
exports.getUserListController=async (req,res) => {
    const {page,limit}=req.params
    let result1=await getCount()
    let result=await getUserList(page,limit)
    
    if(result.length!=0){
        res.send({
            code:200,
            message:'查询成功',
            data:result,
            total:result1.length
        })
    }
}
//删除用户
exports.deleteUserController= async(req,res) => {
    let result=await deleteUser(req.params.id)
    console.log(result);
    if(result){
        res.cc('删除成功',200)
    }else{
        res.cc('删除失败')
    }

}
//更新用户
exports.updateUserInfoController=async (req,res) => {
    const {_id,username,role,state}=req.body
    let result=await updateUserInfo(_id,username,role,state)
    if(result){
       res.cc('更新成功',200)
    }else{
        res.cc('更新失败')
    }
}
//查询用户
exports.selectUserController=async (req,res) => {
    console.log(req.body);
    await selectUserService(req.body.keywords).then((result) => {
        res.send({
            code:200,
            data:result
        })
    }).catch((err) => {
        res.cc(err)
    });
}