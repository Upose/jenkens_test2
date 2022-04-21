/*
 * @Descripttion:
 * @version:
 * @Author: XJ
 * @Date: 2021-06-08 18:15:39
 * @LastEditors: XJ
 * @LastEditTime: 2022-03-31 13:29:03
 */
import { userssetChild } from './usersset/index'
export const usersChild = [
  {
    path: 'usersset',
    name: 'usersset',
    redirect: '/index/users/usersset/message',
    component: () => import('@/views/Users/usersset/index.vue'),
    children: userssetChild
  }
]
