/*
 * @Descripttion: 系统管理模块api
 * @version:
 * @Author: TJ
 * @Date: 2021-04-30 14:17:56
 * @LastEditors: HYH
 * @LastEditTime: 2021-09-01 10:06:43
 */
import request from '@/http/axios/request'
import { IParams } from '@/@types/httpInterface'

// 不需要传参
export const invtypeApi = {
  // 库存类型页面接口：V1/InventoryType/index
  get_index: (params: IParams) =>
    request.post(`/V1/InventoryType/index`, params),
  // 库存类型获取接口：V1/InventoryType/list
  get_list: (params: IParams) =>
    request.post(`/V1/InventoryType/list`, params),
  // 库存类型添加接口：V1/InventoryType/add
  get_add: (params: IParams) =>
    request.post(`/V1/InventoryType/add`, params),
  // 库存类型查询数据接口：V1/InventoryType/view
  get_view: (params: IParams) =>
    request.post(`/V1/InventoryType/view`, params),
  // 库存类型修改接口：V1/InventoryType/upd
  get_upd: (params: IParams) =>
    request.post(`/V1/InventoryType/upd`, params),
  // 库存类型删除接口：V1/InventoryType/del
  get_del: (params: IParams) =>
    request.post(`/V1/InventoryType/del`, params),
}

