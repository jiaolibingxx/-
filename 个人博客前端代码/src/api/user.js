import request from '@/utils/request'
//登录
export function login(data) {
  return request({
    url: '/api/login',
    method: 'post',
    data
  })
}
//添加用户
export const register=(data) => {
  return request({
    url:'/user/register',
    method:'post',
    data
  })
}

//获取个人信息
export function getInfo() {
  return request({
    url: '/user/getUserInfo',
    method: 'get',
    /* params: { token } */
  })
}
//获取用户列表
export const getUserList=(page,limit) => {
  return request({
    url:`/user/getUserList/${page}/${limit}`,
    method:'get'
  })
}
//更新用户信息
export const updateUser=(data) => {
  return request({
    url:`/user/updateUserInfo`,
    method:'post',
    data
  })
}
//删除用户
export const deleteUsers=(_id) => {
  return request({
    url:`/user/deleteUser/${_id}`,
    method:'post',
  })
}
//查询用户
export const selectUser=(data) => {
  return request({
    url:'/user/selectUser',
    method:'post',
    data
  })
}

