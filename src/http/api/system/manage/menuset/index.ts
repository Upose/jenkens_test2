/*
 * @Descripttion: 系统管理模块api
 * @version:
 * @Author: TJ
 * @Date: 2021-04-30 14:17:56
 * @LastEditors: HYH
 * @LastEditTime: 2021-09-01 10:11:23
 */
import request from '@/http/axios/request'
import { IParams } from '@/@types/httpInterface'
export const menusetApi = {
  get_index: (params: IParams) => request.post(`/V1/Menu/index`, params),
  get_list: (params: IParams) => request.post(`/V1/Menu/list`, params),
  get_add: (params: IParams) => request.post(`/V1/Menu/add`, params),
  get_view: (params: IParams) => request.post(`/V1/Menu/view`, params),
  get_upd: (params: IParams) => request.post(`/V1/Menu/upd`, params),
  get_del: (params: IParams) => request.post(`/V1/Menu/del`, params),
}

