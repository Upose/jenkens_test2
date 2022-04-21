/*
 * @Descripttion: 系统管理模块api
 * @version:
 * @Author: TJ
 * @Date: 2021-04-30 14:17:56
 * @LastEditors: HYH
 * @LastEditTime: 2021-09-23 13:56:09
 */
import request from '@/http/axios/request'
import { IParams } from '@/@types/httpInterface'
export const collectApi = {
  // 库存类别汇总接口：V1/Inventory/collect_index
  get_index: (params: IParams) => request.post(`/V1/Inventory/collect_index`, params),
  // 库存管理类别汇总接口：V1/Inventory/collect
  get_list: (params: IParams) => request.post(`/V1/Inventory/collect`, params),
  // 库存类型接口：V1/InventoryType/all_list
  get_type_list: (params: IParams) => request.post(`/V1/InventoryType/all_list`, params),
  // 库存型号接口：V1/InventoryModel/all_list
  get_model_list: (params: IParams) => request.post(`/V1/InventoryModel/all_list`, params),
  // 库存仓库接口：V1/InventoryWarehouse/all_list
  get_warehouse_list: (params: IParams) => request.post(`/V1/InventoryWarehouse/all_list`, params),
  // 库存管理类别汇总导出接口：V1/Inventory/collect_index_export
  get_export: (params: IParams) => request.post(`/V1/Inventory/collect_index_export`, params),
  // 预警接口：V1/Inventory/quantity_warning
  get_quantity_warning: (params: IParams) => request.post(`/V1/Inventory/quantity_warning`, params),
  // 开始日期接口：V1/Inventory/start_at
  get_start_at: (params: IParams) => request.post(`/V1/Inventory/start_at`, params)
}
