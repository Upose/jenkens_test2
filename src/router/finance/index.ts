/*
 * @Description:财务路由
 * @version:
 * @Author: XJ
 * @Date: 2021-06-08 18:27:41
 * @LastEditors: HYH
 * @LastEditTime: 2022-05-24 18:13:12
 */
/**财务路由 */
const finance = [
  // 结算账号
  {
    path: 'payment_account',
    name: 'payment_account',
    component: () => import('@/views/Finance/payment_account/index.vue')
  },
  // 付款
  {
    path: 'payment',
    name: 'payment',
    component: () => import('@/views/Finance/payment/index.vue')
  },
  // 收款
  {
    path: 'receivables',
    name: 'Receivables',
    component: () => import('@/views/Finance/receivables/index.vue')
  }
]
export default finance
