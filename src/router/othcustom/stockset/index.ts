/*
 * @Descripttion:
 * @version:
 * @Author: XJ
 * @Date: 2021-06-08 18:25:12
 * @LastEditors: HYH
 * @LastEditTime: 2022-04-21 17:17:38
 */
import { configChild } from './config/index'
import { summaryChild } from './summary/index'
export const stocksetChild = [
  {
    path: 'stocktaking',
    name: 'Stocktaking',

    component: () => import('@/views/Othcustom/stockset/stocktaking/index.vue')
  },
  {
    path: 'purchase',
    name: 'Purchase',

    component: () => import('@/views/Othcustom/stockset/purchase/index.vue')
  },
  {
    path: 'stock',
    name: 'stock',

    component: () => import('@/views/Othcustom/stockset/stock/index.vue')
  },
  {
    path: 'summary',
    name: 'summary',

    component: () => import('@/views/Othcustom/stockset/summary/index.vue'),
    children: summaryChild
  },
  {
    path: 'config',
    name: 'config',

    component: () => import('@/views/Othcustom/stockset/config/index.vue'),
    children: configChild
  },
  // 销售单
  {
    path: 'saleinventory',
    name: 'saleinventory',

    component: () => import('@/views/Othcustom/stockset/saleinventory/index.vue')
  },
  {
    path: 'deliveryinventory',
    name: 'deliveryinventory',

    component: () => import('@/views/Othcustom/stockset/deliveryinventory/index.vue')
  },
  {
    path: 'client',
    name: 'client',

    component: () => import('@/views/Othcustom/stockset/client/index.vue')
  }
]
