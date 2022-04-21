/*
 * @Descripttion:
 * @version:
 * @Author: XJ
 * @Date: 2021-07-30 13:42:07
 * @LastEditors: HYH
 * @LastEditTime: 2021-09-08 10:14:30
 */
/*
 * @Descripttion:
 * @version:
 * @Author: XJ
 * @Date: 2021-06-18 16:50:23
 * @LastEditors: XJ
 * @LastEditTime: 2021-07-12 10:44:30
 */
import request from '@/http/axios/request'
import { IParams } from '@/@types/httpInterface'

// 不需要传参
export const clientApi = {
  get_index: (params: IParams) => request.post(`/V1/InventoryClient/index`, params),
  get_list: (params: IParams) => request.post(`/V1/InventoryClient/list`, params),
  get_view: (params: IParams) => request.post(`/V1/InventoryClient/view`, params),
  get_add: (params: IParams) => request.post(`/V1/InventoryClient/add`, params),
  get_upd: (params: IParams) => request.post(`/V1/InventoryClient/upd`, params),
  get_del: (params: IParams) => request.post(`/V1/InventoryClient/del`, params),
  // ++
  // 库存用户信息业务员接口：V1/InventoryClient/executor
  get_executor: (params: IParams) => request.post(`/V1/InventoryClient/executor`, params),
}
