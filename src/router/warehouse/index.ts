/*
 * @Description:仓库路由
 * @version:
 * @Author: XJ
 * @Date: 2021-06-08 18:22:37
 * @LastEditors: HYH
 * @LastEditTime: 2022-05-24 18:29:15
 */
import Config from './config'
import Count from './count'
/**仓库路由 */
const warehouse = [
  // 库存
  {
    path: 'stock',
    name: 'Stock',
    component: () => import('@/views/WareHouse/stock/index.vue')
  },
  // 出库单
  {
    path: 'deliveryOrder',
    name: 'DeliveryOrder',
    component: () => import('@/views/WareHouse/deliveryOrder/index.vue')
  },
  // 调整单
  {
    path: 'adjustOrder',
    name: 'AdjustOrder',
    component: () => import('@/views/WareHouse/adjustOrder/index.vue')
  },
  Count,
  Config
]
export default warehouse
