/*
 * @Descripttion: 系统管理模块api
 * @version:
 * @Author: TJ
 * @Date: 2021-04-30 14:17:56
 * @LastEditors: HYH
 * @LastEditTime: 2021-09-01 10:07:54
 */
import request from '@/http/axios/request'
import { IParams } from '@/@types/httpInterface'

// 不需要传参
export const warehouseApi = {
  // 库存仓库页面接口：V1/InventoryWarehouse/index 
  get_index: (params: IParams) =>
    request.post(`/V1/InventoryWarehouse/index`, params),
  // 库存仓库获取接口：V1/InventoryWarehouse/list
  get_list: (params: IParams) =>
    request.post(`/V1/InventoryWarehouse/list`, params),
  // 库存仓库添加接口：V1/InventoryWarehouse/add
  get_add: (params: IParams) =>
    request.post(`/V1/InventoryWarehouse/add`, params),
  // 库存仓库查询数据接口：V1/InventoryWarehouse/view
  get_view: (params: IParams) =>
    request.post(`/V1/InventoryWarehouse/view`, params),
  // 库存仓库修改接口：V1/InventoryWarehouse/upd
  get_upd: (params: IParams) =>
    request.post(`/V1/InventoryWarehouse/upd`, params),
  // 库存仓库删除接口：V1/InventoryWarehouse/del
  get_del: (params: IParams) =>
    request.post(`/V1/InventoryWarehouse/del`, params),
}

