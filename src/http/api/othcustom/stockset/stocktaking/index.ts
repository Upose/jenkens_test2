/*
 * @Descripttion: 系统管理模块api
 * @version:
 * @Author: TJ
 * @Date: 2021-04-30 14:17:56
 * @LastEditors: TJ
 * @LastEditTime: 2021-12-04 17:58:40
 */
import request from '@/http/axios/request'
import { IParams } from '@/@types/httpInterface'
export const stocktakingApi = {
  // 库存盘点页面接口：V1/InventoryInformation/index
  get_index: (params: IParams) => request.post(`/V1/InventoryInformation/index`, params),
  // 库存盘点获取接口：V1/InventoryInformation/list
  get_list: (params: IParams) => request.post(`/V1/InventoryInformation/list`, params),
  // 库存盘点查询数据接口：V1/InventoryInformation/view
  get_view: (params: IParams) => request.post(`/V1/InventoryInformation/view`, params),
  // 查出这个型号这种等级对应的最近的库存接口：V1/InventoryInformation/add_view
  get_add_view: (params: IParams) => request.post(`/V1/InventoryInformation/add_view`, params),
  // 盘点添加接口：V1/InventoryInformation/add
  get_add: (params: IParams) => request.post(`/V1/InventoryInformation/add`, params),
  //  产品等级列表接口：V1/Stock/stock_type_list
  get_stock_type_list: (params: IParams) => request.post(`/V1/Stock/stock_type_list`, params),
  // 库存类型接口：V1/InventoryType/all_list
  get_type_list: (params: IParams) => request.post(`/V1/InventoryType/all_list`, params),
  // 库存型号接口：V1/InventoryModel/all_list
  get_model_list: (params: IParams) => request.post(`/V1/InventoryModel/all_list`, params),
  // #进货
  //  显示所有满足条件的红冲进货信息接口：V1/InventoryInformation/stock_red_punch_search
  get_purchase_pre_search: (params: IParams) =>
    request.post(`/V1/InventoryInformation/stock_red_punch_search`, params),
  //  进货信息红冲搜索接口：V1/InventoryInformation/all_stock_red_punch_search
  get_purchase_next_search: (params: IParams) =>
    request.post(`/V1/InventoryInformation/all_stock_red_punch_search`, params),
  // 进货信息红冲接口：V1/InventoryInformation/stock_red_punch
  get_purchase: (params: IParams) =>
    request.post(`/V1/InventoryInformation/stock_red_punch`, params),
  // #销售
  //  显示所有满足条件的红冲销售信息接口：V1/InventoryInformation/order_red_punch_search
  get_sales_pre_search: (params: IParams) =>
    request.post(`/V1/InventoryInformation/order_red_punch_search`, params),
  //  销售信息红冲搜索接口：V1/InventoryInformation/all_order_red_punch_search
  get_sales_next_search: (params: IParams) =>
    request.post(`/V1/InventoryInformation/all_order_red_punch_search`, params),
  // 销售信息红冲接口：V1/InventoryInformation/order_red_punch
  get_sales: (params: IParams) => request.post(`/V1/InventoryInformation/order_red_punch`, params),
  // #出库
  //  显示所有满足条件的红冲出库信息接口：V1/InventoryInformation/delivery_red_punch_search
  get_outbound_pre_search: (params: IParams) =>
    request.post(`/V1/InventoryInformation/delivery_red_punch_search`, params),
  // 出库信息红冲搜索接口：V1/InventoryInformation/all_delivery_red_punch_search
  get_outbound_next_search: (params: IParams) =>
    request.post(`/V1/InventoryInformation/all_delivery_red_punch_search`, params),
  // 出库信息红冲接口：V1/InventoryInformation/delivery_red_punch
  get_outbound: (params: IParams) =>
    request.post(`/V1/InventoryInformation/delivery_red_punch`, params),
  // #库存数量调整
  // 可满足条件的库存信息调整搜索接口：V1/InventoryInformation/quantity_adjuster_search
  get_quantity_search: (params: IParams) =>
    request.post(`/V1/InventoryInformation/quantity_adjuster_search`, params),
  // 可满足条件的库存信息调整操作接口：V1/InventoryInformation/quantity_adjuster
  get_quantity: (params: IParams) =>
    request.post(`/V1/InventoryInformation/quantity_adjuster`, params),
  // 可满足条件的库存信息调整列表接口：V1/InventoryInformation/quantity_adjuster_list
  get_quantity_list: (params: IParams) =>
    request.post(`/V1/InventoryInformation/quantity_adjuster_list`, params)
}
