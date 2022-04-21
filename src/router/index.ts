/*
 * @Descripttion:
 * @version:
 * @Author: XJ
 * @Date: 2021-05-06 11:17:19
 * @LastEditors: XJ
 * @LastEditTime: 2022-03-31 13:29:20
 */

import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { getUserId } from '@/utils/cookie'
import { usersChild } from '@/router/users'
import { othcustomChild } from '@/router/othcustom'
import { systemChild } from '@/router/system'
import i18n from '@/locales'
import { handlesChild } from '@/router/handles'
import { financecustomChild } from '@/router/financecustom'
import { GetterConstants } from '@/store/modules/users/constants'
import { useStore } from '@/store'
import { getNewToken } from '@/utils/getNewToken'
export const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/index/service' //tabs标签决定初始页
  },
  {
    path: '/index',
    name: 'layout',
    redirect: '/index/service', //tabs标签决定初始页
    component: () => import('@/views/Layout/index.vue'),
    children: [
      {
        path: 'service',
        name: 'Service',
        component: () => import('@/views/Service/index.vue')
      },
      {
        path: 'users',
        name: 'Users',
        component: () => import('@/views/Users/index.vue'),
        children: usersChild
      },
      {
        path: 'othcustom',
        name: 'othcustom',
        component: () => import('@/views/Othcustom/index.vue'),
        children: othcustomChild
      },
      {
        path: 'financecustom',
        name: 'Financecustom',
        component: () => import('@/views/Financecustom/index.vue'),
        children: financecustomChild
      },
      {
        path: 'system',
        name: 'System',
        component: () => import('@/views/System/index.vue'),
        children: systemChild
      },
      // ========以下非后端配置路由
      {
        path: 'handles',
        name: 'handles',
        // redirect: '/index/handles/percenter',
        component: () => import('@/views/Handles/index.vue'),
        children: handlesChild
      },
      // 无权限页面
      {
        path: 'noaccess',
        name: 'noaccess',
        component: () => import('@/views/NoAccess/index.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login/index.vue')
  },
  {
    path: '/getupd',
    name: 'getupd',
    component: () => import('@/views/GetUpd/index.vue')
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404/404.vue') //懒加载，需要时在引入
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes
})

router.afterEach((to, from) => {
  window.document.title = i18n.global.t('common.IBS')
})
/*
需求：1 、登陆后30天自动登录
用户没有关闭页面，直接判断存在session中的值，若token失效，选择自动登录刷新token即可。
用户关闭后，30天内再次直接进页面，在路由这里都已经拦截去登陆了，若是没有token根
据状态码会让用户登录，而不会去刷新token
30天后，直接让用户登录


2 、登陆后同浏览器跨页面可登录
跨页面决定了不管有没有存30天必须存到local中

**/
router.beforeEach(async (to, from, next) => {
  const store = useStore()
  let token = store.getters[GetterConstants.GET_TOKEN]
  let userId = getUserId()
  // 登录权限验证
  if (to.path === '/login' || to.path === '/404' || to.path === '/getupd') {
    next()
  } else {
    if (token) {
      next()
    }
    // else if (userId) {
    // 	// 如果选择了免登录，则就刷新token
    // 	await getNewToken.apiRefreshToken()
    // 	next()
    // }
    else {
      next({
        path: '/login'
      })
    }
  }
})

export default router
