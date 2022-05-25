/*
 * @Description:
 * @version:
 * @Author: XJ
 * @Date: 2021-06-08 18:15:39
 * @LastEditors: HYH
 * @LastEditTime: 2022-05-25 10:17:49
 */
const staff = [
  // 员工列表
  {
    path: 'staffList',
    name: 'StaffList',
    component: () => import('@/views/Staff/staffList/index.vue')
  },
  // 组织
  {
    path: 'organization',
    name: 'organization',
    component: () => import('@/views/Staff/organization/index.vue')
  }
  // {
  //   path: 'timetable',
  //   name: 'timetable',
  //   component: () => import('@/views/Users/usersset/timetable/index.vue')
  // }
]

export default staff
