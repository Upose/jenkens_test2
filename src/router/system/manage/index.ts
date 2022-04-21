/*
 * @Descripttion:系统设置页面路由表
 * @version:
 * @Author: TJ
 * @Date: 2021-05-06 13:25:47
 * @LastEditors: HYH
 * @LastEditTime: 2021-08-09 09:19:12
 */
export const manageChild = [
  {
    path: 'roleinfo',
    name: 'Roleinfo',
    component: () => import('@/views/System/manage/roleinfo/index.vue'),
  },
  {
    path: 'menuset',
    name: 'Menuset',
    component: () => import('@/views/System/manage/menuset/index.vue'),
  },
  {
    path: 'powerset',
    name: 'Powerset',
    component: () => import('@/views/System/manage/powerset/index.vue'),
  },
  {
    path: 'widget',
    name: 'widget',
    component: () => import('@/views/System/manage/widget/index.vue'),
  },
  {
    path: 'custom_column',
    name: 'custom_column',
    component: () => import('@/views/System/manage/customcol/index.vue'),
  },
]
