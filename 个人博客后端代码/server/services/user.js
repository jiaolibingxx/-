const User=require('../model/user')
//用户登录
exports.loginService=(username) => {
    return  User.findOne({username})
}
//注册用户
exports.regService=(info) => {
    return User.create(info)
}
//邮箱查重
exports.checkEmail=(email) => {
    return User.findOne({email})
}
//获取个人信息
exports.getUserInfo=(_id) => {
    return User.findOne({_id})
}
//获取用户列表
exports.getUserList=(page,limit) => {
    return User.find().skip((page-1)*limit).limit(limit)
}
//关键词查询用户
exports.selectUserService=(keyword) => {
    return User.find({username:keyword})
}
//查询所有用户个数
exports.getCount=() => {
    return User.find()
}
//删除用户
exports.deleteUser=(_id) => {
    return User.deleteOne({_id})
}
//更新用户信息
exports.updateUserInfo=(_id,username,role,state) => {
    return User.updateOne({_id},{username,role,state})
}