/*
 * @Descripttion: 
 * @version: 
 * @Author: XJ
 * @Date: 2021-07-01 17:54:20
 * @LastEditors: XJ
 * @LastEditTime: 2021-07-01 18:00:33
 */
export const handlesChild=[
  {
    path: 'editupd',
    name: 'editupd',
    component: () => import('@/views/Handles/editupd/index.vue'),
  },
  {
    path: 'percenter',
    name: 'percenter',
    component: () => import('@/views/Handles/percenter/index.vue'),
  },
]