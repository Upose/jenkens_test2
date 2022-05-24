/*
 * @Description:销售路由
 * @version:
 * @Author: XJ
 * @Date: 2021-07-01 17:54:20
 * @LastEditors: HYH
 * @LastEditTime: 2022-05-24 17:54:18
 */
/**销售 */
const sale = [
  // 销售单
  {
    path: 'saleOrder',
    name: 'SaleOrder',
    component: () => import('@/views/sale/saleOrder/index.vue')
  },
  // 客户
  {
    path: 'customer',
    name: 'Customer',
    component: () => import('@/views/sale/customer/index.vue')
  }
]
export default sale
