/*
 * @Description: 统计
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2022-05-24 18:30:12
 */
/**统计 */
export default {
  path: 'count',
  name: 'Count',
  component: () => import('@/views/WareHouse/stockset/summary/index.vue'),
  children: [
    {
      path: 'collect',
      name: 'collect',

      component: () => import('@/views/WareHouse/stockset/summary/collect/index.vue')
    },
    {
      path: 'date_collect',
      name: 'date_collect',

      component: () => import('@/views/WareHouse/stockset/summary/datecollect/index.vue')
    },
    {
      path: 'amount_collect',
      name: 'amount_collect',

      component: () => import('@/views/WareHouse/stockset/summary/amountcollect/index.vue')
    },
    {
      path: 'models_collect',
      name: 'models_collect',

      component: () => import('@/views/WareHouse/stockset/summary/modelscollect/index.vue')
    }
  ]
}
