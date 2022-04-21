/*
 * @Descripttion: 系统管理模块api
 * @version:
 * @Author: TJ
 * @Date: 2021-04-30 14:17:56
 * @LastEditors: TJ
 * @LastEditTime: 2021-12-13 14:17:35
 */
import request from '@/http/axios/request'
import { IParams } from '@/@types/httpInterface'

// 不需要传参
export const stockApi = {
  // 库存管理页面接口：V1/Inventory/index
  get_index: (params: IParams) => request.post(`/V1/Inventory/index`, params),
  //  库存管理列表获取接口：V1/Inventory/list
  get_list: (params: IParams) => request.post(`/V1/Inventory/list`, params),
  //  库存管理查询数据接口：V1/Inventory/view
  get_view: (params: IParams) => request.post(`/V1/Inventory/view`, params),
  // 库存管理添加接口：V1/Inventory/add
  get_add: (params: IParams) => request.post(`/V1/Inventory/add`, params),
  // 库存管理修改接口：V1/Inventory/upd
  get_upd: (params: IParams) => request.post(`/V1/Inventory/upd`, params),
  get_del: (params: IParams) => request.post(`/V1/Inventory/del`, params),
  // 库存批次展示接口：V1/Inventory/lot_number_list
  get_lot_number_list: (params: IParams) => request.post(`/V1/Inventory/lot_number_list`, params),

  // ==============================================

  // 库存单位接口：V1/InventoryUnit/all_list
  get_unit_list: (params: IParams) => request.post(`/V1/InventoryUnit/all_list`, params),
  // 库存类型接口：V1/InventoryType/all_list
  get_type_list: (params: IParams) => request.post(`/V1/InventoryType/all_list`, params),
  // 库存型号接口：V1/InventoryModel/all_list
  get_model_list: (params: IParams) => request.post(`/V1/InventoryModel/all_list`, params),
  // 库存仓库接口：V1/InventoryWarehouse/all_list
  get_warehouse_list: (params: IParams) => request.post(`/V1/InventoryWarehouse/all_list`, params),
  // 金额货币单位接口：V1/Unit/all_list
  get_currency_unit_list: (params: IParams) => request.post(`/V1/Unit/all_list`, params),
  // 供应商接口：V1/InventorySupplier/all_list
  get_supplier_list: (params: IParams) => request.post(`/V1/InventorySupplier/all_list`, params),
  //  产品等级列表接口：V1/Stock/stock_type_list
  get_stock_type_list: (params: IParams) => request.post(`/V1/Stock/stock_type_list`, params),
  // ===========================

  //  卖出列表接口：V1/Inventory/sale_list
  get_sale_list: (params: IParams) => request.post(`/V1/Inventory/sale_list`, params),
  // 库存管理操作记录接口：V1/Inventory/log_list
  get_log_list: (params: IParams) => request.post(`/V1/Inventory/log_list`, params),
  //  库存管理操作记录回退接口：V1/Inventory/log_rollback      (接口2.86 rollback字段为1才能执行)
  get_log_rollback: (params: IParams) => request.post(`/V1/Inventory/log_rollback`, params),
  // 库存回退管理操作记录接口：V1/Inventory/log_rollback_list
  get_log_rollback_list: (params: IParams) =>
    request.post(`/V1/Inventory/log_rollback_list`, params),
  // 库存导出接口：V1/Inventory/export
  get_export: (params: IParams) => request.post(`/V1/Inventory/export`, params),
  // ===================================
  // 销售信息生成卖出单号接口：V1/InventoryOrder/sale_order_number
  get_sale_order_number: (params: IParams) =>
    request.post(`/V1/InventoryOrder/sale_order_number`, params)
}
