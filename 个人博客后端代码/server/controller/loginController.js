const {loginService}=require('../services/user')
const {JWT}=require('../utils/JWT')
const bcryptjs=require('bcryptjs')
exports.loginController=async (req,res) => {
    const {username,password}=req.body
    console.log(req.body);
    if(username.trim().length==0||password.trim().length==0){
        return res.cc('用户名或密码错误!')
    }
    let result=await loginService(username)
    if(result){
        //存在该用户，判断用户密码和数据库中解密后的密码是否相等
        /* bcryptjs.compareSync(password,result.password )*/
        if(password==result.password){
            const token=JWT.generate({_id:result._id,username:result.username},'1d')
            res.send({
                code:200,
                message:'登陆成功',
                token
            })
        }else{
            res.cc('密码错误')
        }
    }else{
        res.cc('用户不存在')
    }


}