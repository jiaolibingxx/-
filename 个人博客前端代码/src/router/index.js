import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
//常量路由
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      /* name: 'Dashboard', */
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },
  {
    path: '/article',
    component: Layout,
    meta: { title: '文章管理', icon: 'el-icon-s-data' },
    children: [{
      path: 'regArticle',
     /*  name: 'regArticle', */
      component: () => import('@/views/article/regArticle'),
      meta: { title: '添加文章', icon: '' }
    },
    {
      path: 'articleList',
      /* name: 'articleList', */
      component: () => import('@/views/article/articleList'),
      meta: { title: '文章列表', icon: '' }
    },
  ]
  },
  
  {
    path: '/userinfo',
    component: Layout,
    children: [{
      path: 'userinfo',
    /*   name: 'userinfo', */
      component: () => import('@/views/userinfo'),
      meta: { title: '个人中心', icon: 'el-icon-user-solid' }
    }]
  },
 


  // 404 page must be placed at the end !!!
  
]
//异步路由
export const asyncRoutes=[
  {
    path:'/userManage',
    component:Layout,
    meta: { title: '用户管理', icon: 'el-icon-user' },
    children:[{
      path:'regUser',
/*       name:'reguser', */
      component:()=>import('@/views/userManage/regUser'),
      meta: { title: '注册用户', icon: 'el-icon-circle-plus-outline' }
    },
    {
      path:'userList',
  /*     name:'userlist', */
      component:()=>import('@/views/userManage/userList'),
      meta: { title: '用户列表', icon: 'el-icon-s-custom' }
    },
  ]
  },
]
//任意路由
export const anyRouters={ path: '*', redirect: '/404', hidden: true }

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
