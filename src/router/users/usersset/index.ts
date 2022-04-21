/*
 * @Descripttion:
 * @version:
 * @Author: XJ
 * @Date: 2021-06-08 18:20:36
 * @LastEditors: HYH
 * @LastEditTime: 2021-08-24 14:05:51
 */
export const userssetChild = [
  {
    path: 'staff',
    name: 'staff',
    component: () => import('@/views/Users/usersset/staff/index.vue'),
  },
  {
    path: 'organization',
    name: 'organization',
    component: () => import('@/views/Users/usersset/organization/index.vue'),
  },
  {
    path: 'timetable',
    name: 'timetable',
    component: () => import('@/views/Users/usersset/timetable/index.vue'),
  },
]
