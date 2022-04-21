/*
 * @Descripttion:
 * @version:
 * @Author: XJ
 * @Date: 2021-07-08 17:15:12
 * @LastEditors: HYH
 * @LastEditTime: 2021-09-08 11:43:21
 */
import request from '@/http/axios/request'
import { IParams } from '@/@types/httpInterface'

// 不需要传参
export const alertApi = {
  // 库存预警页面接口：V1/InventoryAlert/index
  get_index: (params: IParams) => request.post(`/V1/InventoryAlert/index`, params),
  //  库存预警获取接口：V1/InventoryAlert/list
  get_list: (params: IParams) => request.post(`/V1/InventoryAlert/list`, params),
  // 库存预警添加接口：V1/InventoryAlert/add
  get_add: (params: IParams) => request.post(`/V1/InventoryAlert/add`, params),
  //库存预警查询数据接口：V1/InventoryAlert/view
  get_view: (params: IParams) => request.post(`/V1/InventoryAlert/view`, params),
  //  库存预警修改接口：V1/InventoryAlert/upd
  get_upd: (params: IParams) => request.post(`/V1/InventoryAlert/upd`, params),
  //  库存预警删除接口：V1/InventoryAlert/del
  get_del: (params: IParams) => request.post(`/V1/InventoryAlert/del`, params),
  // ++++
  // 库存类型接口：V1/InventoryType/all_list
  get_type_list: (params: IParams) => request.post(`/V1/InventoryType/all_list`, params),
  // 库存型号接口：V1/InventoryModel/all_list
  get_model_list: (params: IParams) => request.post(`/V1/InventoryModel/all_list`, params),
  // 库存仓库接口：V1/InventoryWarehouse/all_list
  get_warehouse_list: (params: IParams) => request.post(`/V1/InventoryWarehouse/all_list`, params)
}
