/*
 * @Descripttion:
 * @version:
 * @Author: XJ
 * @Date: 2021-05-10 10:29:01
 * @LastEditors: XJ
 * @LastEditTime: 2021-06-08 18:34:27
 */
import { manageChild } from './manage/index'
import { setsChild } from './sets/index'
export const systemChild = [
  {
    path: 'manage',
    name: 'Manage',
    redirect: '/index/system/manage/roleinfo',
    component: () => import('@/views/System/manage/index.vue'),
    children: manageChild,
  },
  {
    path: 'sets',
    name: 'Sets',
    redirect: '/index/system/sets/cominfo',
    component: () => import('@/views/System/sets/index.vue'),
    children: setsChild,
  },
]
