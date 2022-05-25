/*
 * @Description:路由文件
 * @version:
 * @Author: HYH
 * @Date: 2022-05-25 10:11:02
 * @LastEditors: HYH
 * @LastEditTime: 2022-05-25 10:48:50
 */

import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { getUserId } from '@/utils/cookie'
import staff from '@/router/staff'
import product from '@/router/product'
import warehouse from '@/router/warehouse'
import purchase from '@/router/purchase'
import sale from '@/router/sale'
import finance from '@/router/finance'
import system from '@/router/system'
import i18n from '@/locales'
import { handlesChild } from '@/router/handles'
import { GetterConstants } from '@/store/modules/users/constants'
import { GetterConstants as getters, MutationConstants } from '@/store/modules/index/constants'
import { useStore } from '@/store'
import { getNewToken } from '@/utils/getNewToken'
import { approval } from './approval/index'
import { certifacation } from './certifacation/index'
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
      // 首页
      {
        path: 'service',
        name: 'Service',
        component: () => import('@/views/Service/index.vue')
      },
      // 审批 => 流程审批 => 审批中心
      {
        path: 'certifacation',
        name: 'Certifacation',
        component: () => import('@/views/Certifacation/index.vue'),
        children: certifacation
      },
      // 产品
      {
        path: 'product',
        name: 'Product',
        component: () => import('@/views/Product/index.vue'),
        children: product
      },
      // 员工
      {
        path: 'staff',
        name: 'Staff',
        component: () => import('@/views/Staff/index.vue'),
        children: staff
      },
      // 审批
      {
        path: 'approval',
        name: 'Approval',
        component: () => import('@/views/Approval/index.vue'),
        children: approval
      },
      // 仓库 相关
      {
        path: 'warehouse',
        name: 'Warehouse',
        component: () => import('@/views/WareHouse/index.vue'),
        children: warehouse
      },
      // 进货
      {
        path: 'purchase',
        name: 'Purchase',
        component: () => import('@/views/purchase/index.vue'),
        children: purchase
      },
      // 销售
      {
        path: 'sale',
        name: 'Sale',
        component: () => import('@/views/sale/index.vue'),
        children: sale
      },
      // 财务
      {
        path: 'finance',
        name: 'Finance',
        component: () => import('@/views/Finance/index.vue'),
        children: finance
      },
      // 系统
      {
        path: 'system',
        name: 'System',
        component: () => import('@/views/System/index.vue'),
        children: system
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
  },
  // 无权限页面
  {
    path: '/noaccess',
    name: 'Noaccess',
    component: () => import('@/views/NoAccess/index.vue')
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
  // 解决没有权限重复点击tabs进入无权限页面
  if (to.path === '/noaccess') {
    const tabs = store.getters[getters.GET_TABS]
    for (let i = 0; i < tabs.length; i++) {
      if (tabs[i].menu_url === from.fullPath) {
        tabs.splice(i, 1)
      }
    }
    store.commit(MutationConstants.SET_TABS, tabs)
  }
  // 登录权限验证
  if (to.path === '/login' || to.path === '/404' || to.path === '/getupd') {
    next()
  } else {
    if (token) {
      next()
    } else {
      next({
        path: '/login'
      })
    }
    // else if (userId) {
    // 	// 如果选择了免登录，则就刷新token
    // 	await getNewToken.apiRefreshToken()
    // 	next()
    // }
  }
})

export default router
