/*
 * @Description:
 * @version:
 * @Author: HYH
 * @Date: 2021-06-08 18:15:39
 * @LastEditors: HYH
 * @LastEditTime: 2022-05-26 13:54:54
 */
/**用户中心路由 */
const userCenter = [
  // 用户信息
  {
    path: 'userInfo',
    name: 'userInfo',
    component: () => import('@/views/UserCenter/userInfo/index.vue')
  },
  // 修改密码
  {
    path: 'changePassword',
    name: 'ChangePassword',
    component: () => import('@/views/UserCenter/changePassword/index.vue')
  }
]

export default userCenter
