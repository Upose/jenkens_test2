/*
 * @Description:仓库路由
 * @version:
 * @Author: HYH
 * @Date:2022-05-25 10:33:48
 * @LastEditors: HYH
 * @LastEditTime: 2022-05-25 10:35:57
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
  // Count,
  Config
]
export default warehouse
