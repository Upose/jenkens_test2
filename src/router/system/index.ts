/*
 * @Description:
 * @version:
 * @Author: XJ
 * @Date: 2021-05-10 10:29:01
 * @LastEditors: HYH
 * @LastEditTime: 2022-05-24 18:14:46
 */
import { manageChild } from './manage/index'
import { setsChild } from './sets/index'
const system = [
  {
    path: 'manage',
    name: 'Manage',
    redirect: '/index/system/manage/roleinfo',
    component: () => import('@/views/System/manage/index.vue'),
    children: manageChild
  },
  {
    path: 'sets',
    name: 'Sets',
    redirect: '/index/system/sets/cominfo',
    component: () => import('@/views/System/sets/index.vue'),
    children: setsChild
  }
]
export default system
