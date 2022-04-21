/*
 * @Descripttion: 系统管理模块api
 * @version:
 * @Author: TJ
 * @Date: 2021-04-30 14:17:56
 * @LastEditors: HYH
 * @LastEditTime: 2021-09-01 10:07:04
 */
import request from '@/http/axios/request'
import { IParams } from '@/@types/httpInterface'

// 不需要传参
export const invunitApi = {
  // 库存单位页面接口：V1/InventoryUnit/index
  get_index: (params: IParams) =>
    request.post(`/V1/InventoryUnit/index`, params),
  // 库存单位获取接口：V1/InventoryUnit/list
  get_list: (params: IParams) => request.post(`/V1/InventoryUnit/list`, params),
  //库存单位添加接口：V1/InventoryUnit/add
  get_add: (params: IParams) => request.post(`/V1/InventoryUnit/add`, params),
  //库存单位查询数据接口：V1/InventoryUnit/view

  get_view: (params: IParams) => request.post(`/V1/InventoryUnit/view`, params),
  // 库存单位修改接口：V1/InventoryUnit/upd

  get_upd: (params: IParams) => request.post(`/V1/InventoryUnit/upd`, params),
  // 库存单位删除接口：V1/InventoryUnit/del

  get_del: (params: IParams) => request.post(`/V1/InventoryUnit/del`, params),
  
}

