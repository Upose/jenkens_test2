/*
 * @Descripttion:
 * @version:
 * @Author: XJ
 * @Date: 2021-05-10 10:28:03
 * @LastEditors: HYH
 * @LastEditTime: 2021-08-11 14:55:33
 */
export const setsChild = [
  {
    path: 'cominfo',
    name: 'Cominfo',
    component: () => import('@/views/System/sets/cominfo/index.vue'),
  },
  {
    path: 'langset',
    name: 'Langset',
    component: () => import('@/views/System/sets/langset/index.vue'),
  },
  {
    path: 'curinfo',
    name: 'Curinfo',
    component: () => import('@/views/System/sets/curinfo/index.vue'),
  },
  {
    path: 'state',
    name: 'State',
    component: () => import('@/views/System/sets/state/index.vue'),
  },
  {
    path: 'position',
    name: 'position',
    component: () => import('@/views/System/sets/position/index.vue'),
  },
]
