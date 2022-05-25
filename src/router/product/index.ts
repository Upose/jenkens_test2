/*
 * @Description:产品路由
 * @version:
 * @Author: XJ
 * @Date: 2021-06-08 18:27:41
 * @LastEditors: HYH
 * @LastEditTime: 2022-05-25 09:47:46
 */
/**产品路由 */
const product = [
  // 产品列表
  {
    path: 'productList',
    name: 'ProductList',
    component: () => import('@/views/Product/productList/index.vue')
  },
  // 产品类型（名称）
  {
    path: 'productName',
    name: 'ProductName',
    component: () => import('@/views/Product/productName/index.vue')
  },
  // 产品（数量）单位
  {
    path: 'productUnit',
    name: 'ProductUnit',
    component: () => import('@/views/Product/productUnit/index.vue')
  }
]
export default product
