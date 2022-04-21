/*
 * @Descripttion:
 * @version:
 * @Author: XJ
 * @Date: 2021-07-08 17:15:12
 * @LastEditors: HYH
 * @LastEditTime: 2021-09-01 10:07:30
 */
import request from '@/http/axios/request'
import { IParams } from '@/@types/httpInterface'

// 不需要传参
export const supplierApi = {
  // 库存供应商页面接口：V1/InventorySupplier/index
  get_index: (params: IParams) =>
    request.post(`/V1/InventorySupplier/index`, params),
  // 库存供应商获取接口：V1/InventorySupplier/list
  get_list: (params: IParams) =>
    request.post(`/V1/InventorySupplier/list`, params),
  //库存供应商添加接口：V1/InventorySupplier/add
  get_add: (params: IParams) =>
    request.post(`/V1/InventorySupplier/add`, params),
  //库存供应商查询数据接口：V1/InventorySupplier/view
  get_view: (params: IParams) =>
    request.post(`/V1/InventorySupplier/view`, params),
  // 库存供应商修改接口：V1/InventorySupplier/upd
  get_upd: (params: IParams) =>
    request.post(`/V1/InventorySupplier/upd`, params),
  //  库存供应商删除接口：V1/InventorySupplier/del
  get_del: (params: IParams) =>
    request.post(`/V1/InventorySupplier/del`, params),
}

