import { login, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import  { resetRouter,constantRoutes,asyncRoutes } from '@/router'
import router from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    info:{},
    routers:[]
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INFO:(state,info) => {
    state.info=info
  },
  ALLROUTERS:(state) => {
    resetRouter()
    state.routers=constantRoutes.concat(asyncRoutes)
    router.addRoutes(state.routers)
  },
  ROUTERS:(state) => {
    resetRouter()
    state.routers=constantRoutes
  },
}

const actions = {
  // user login
  async login({ commit }, userInfo) {
      let result=await login(userInfo)
      if(result.code==200){
        commit('SET_TOKEN', result.token)
        setToken(result.token)
      }else{
        return Promise.reject(new Error('fail'))
      }
 
  },

  // get user info
  async getInfo({commit}){
    let result=await getInfo()
    if(result.code==200){
      commit('SET_INFO',result.data)
      if(result.data.role=='超级管理员'){
        commit('ALLROUTERS')
      }else{
        commit('ROUTERS')
      }
    }
  },

  // user logout
  logout({commit}){
    removeToken()
    resetRouter()
    commit('RESET_STATE')
  },
  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

