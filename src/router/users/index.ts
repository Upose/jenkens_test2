/*
 * @Description:
 * @version:
 * @Author: XJ
 * @Date: 2021-06-08 18:15:39
 * @LastEditors: HYH
 * @LastEditTime: 2022-05-24 16:31:07
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
