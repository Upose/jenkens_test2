/*
 * @Descripttion: 系统管理模块api
 * @version:
 * @Author: TJ
 * @Date: 2021-04-30 14:17:56
 * @LastEditors: RD
 * @LastEditTime: 2021-10-29 13:57:37
 */
import request from '@/http/axios/request'
import { IParams } from '@/@types/httpInterface'
export const modelscollectApi = {
  //实时库存页面统计接口：V1/Inventory/models_collect_index
  get_index: (params: IParams) => request.post(`/V1/Inventory/models_collect_index`, params),
  // 实时库存页面获取接口：V1/Inventory/models_collect
  get_list: (params: IParams) => request.post(`/V1/Inventory/models_collect`, params),
  // ==============
  // 库存类型接口：V1/InventoryType/all_list
  get_type_list: (params: IParams) => request.post(`/V1/InventoryType/all_list`, params),
  // 供应商接口：V1/InventorySupplier/all_list
  get_supplier_list: (params: IParams) => request.post(`/V1/InventorySupplier/all_list`, params)
}
