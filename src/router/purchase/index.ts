/*
 * @Description:
 * @version:
 * @Author: XJ
 * @Date: 2021-07-01 17:54:20
 * @LastEditors: HYH
 * @LastEditTime: 2022-05-24 18:05:20
 */
/**进货路由 */
const purchase = [
  // 进货单
  {
    path: 'purchaseOrder',
    name: 'PurchaseOrder',
    component: () => import('@/views/purchase/purchaseOrder/index.vue')
  },
  // 供应商
  {
    path: 'supplier',
    name: 'Supplier',
    component: () => import('@/views/purchase/supplier/index.vue')
  },
  // 对账
  {
    path: 'checkAccount',
    name: 'CheckAccount',
    component: () => import('@/views/purchase/checkAccount/index.vue')
  }
]
export default purchase
