/*
 * @Descripttion: 系统管理模块api
 * @version:
 * @Author: TJ
 * @Date: 2021-04-30 14:17:56
 * @LastEditors: RD
 * @LastEditTime: 2021-10-26 17:13:11
 */
import request from '@/http/axios/request'
import { IParams } from '@/@types/httpInterface'
export const amountcollectApi = {
  get_index: (params: IParams) => request.post(`/V1/Inventory/amount_collect_index`, params),
  get_list: (params: IParams) => request.post(`/V1/Inventory/amount_collect`, params),
  // ============
  // 供应商接口：V1/InventorySupplier/all_list
  get_supplier_list: (params: IParams) => request.post(`/V1/InventorySupplier/all_list`, params),
  // 金额货币单位接口：V1/Unit/all_list
  get_currency_unit_list: (params: IParams) => request.post(`/V1/Unit/all_list`, params),
  // 库存类型接口：V1/InventoryType/all_list
  get_type_list: (params: IParams) => request.post(`/V1/InventoryType/all_list`, params),
  // 库存型号接口：V1/InventoryModel/all_list
  get_model_list: (params: IParams) => request.post(`/V1/InventoryModel/all_list`, params),
  // 库存仓库接口：V1/InventoryWarehouse/all_list
  get_warehouse_list: (params: IParams) => request.post(`/V1/InventoryWarehouse/all_list`, params),
  // 库存管理金额汇总导出接口：V1/Inventory/amount_collect_index_export
  get_export: (params: IParams) =>
    request.post(`/V1/Inventory/amount_collect_index_export`, params),
  // 开始日期接口：V1/Inventory/start_at
  get_start_at: (params: IParams) => request.post(`/V1/Inventory/start_at`, params)
}
