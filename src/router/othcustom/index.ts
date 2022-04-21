/*
 * @Descripttion:
 * @version:
 * @Author: XJ
 * @Date: 2021-06-08 18:22:37
 * @LastEditors: XJ
 * @LastEditTime: 2021-06-08 18:26:53
 */
import { stocksetChild } from './stockset/index'
export const othcustomChild = [
  {
    path: 'stockset',
    name: 'stockset',
    // redirect: '/index/othcustom/stockset/stock',
    component: () => import('@/views/Othcustom/stockset/index.vue'),
    children: stocksetChild,
  },
]
