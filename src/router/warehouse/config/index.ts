/*
 * @Description:
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2022-05-24 18:37:08
 */
/**配置 */
export default {
  path: 'config',
  name: 'config',
  component: () => import('@/views/WareHouse/config/index.vue'),
  children: [
    // 仓库列表
    {
      path: 'warehouseList',
      name: 'WarehouseList',
      component: () => import('@/views/WareHouse/config/warehouseList/index.vue')
    },
    // 库存预警
    {
      path: 'stockWarning',
      name: 'stockWarning',
      component: () => import('@/views/WareHouse/config/stockWarning/index.vue')
    }
    // {
    //   path: 'invtype',
    //   name: 'invtype',

    //   component: () => import('@/views/WareHouse/stockset/config/invtype/index.vue')
    // },
    // {
    //   path: 'invunit',
    //   name: 'invunit',

    //   component: () => import('@/views/WareHouse/stockset/config/invunit/index.vue')
    // },
    // {
    //   path: 'invmodel',
    //   name: 'invmodel',

    //   component: () => import('@/views/WareHouse/stockset/config/invmodel/index.vue')
    // },

    // {
    //   path: 'supplier',
    //   name: 'supplier',
    //   component: () => import('@/views/WareHouse/stockset/config/supplier/index.vue')
    // }
  ]
}
