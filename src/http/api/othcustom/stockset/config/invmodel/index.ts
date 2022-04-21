/*
 * @Descripttion: 系统管理模块api
 * @version:
 * @Author: TJ
 * @Date: 2021-04-30 14:17:56
 * @LastEditors: HYH
 * @LastEditTime: 2021-09-01 10:06:29
 */
import request from '@/http/axios/request'
import { IParams } from '@/@types/httpInterface'

// 不需要传参
export const invmodelApi = {
  // 库存类型接口：V1/InventoryType/all_list
  get_type_list: (params: IParams) => request.post(`/V1/InventoryType/all_list`, params),
  // 库存型号页面接口：V1/InventoryModel/index
  get_index: (params: IParams) => request.post(`/V1/InventoryModel/index`, params),
  // 库存型号获取接口：V1/InventoryModel/list
  get_list: (params: IParams) => request.post(`/V1/InventoryModel/list`, params),
  // 库存型号添加接口：V1/InventoryModel/add
  get_add: (params: IParams) => request.post(`/V1/InventoryModel/add`, params),
  // 库存型号查询数据接口：V1/InventoryModel/view

  get_view: (params: IParams) => request.post(`/V1/InventoryModel/view`, params),
  // 库存型号修改接口：V1/InventoryModel/upd

  get_upd: (params: IParams) => request.post(`/V1/InventoryModel/upd`, params),
  // 库存型号删除接口：V1/InventoryModel/del

  get_del: (params: IParams) => request.post(`/V1/InventoryModel/del`, params)
}
