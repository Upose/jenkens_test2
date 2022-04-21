/*
 * @Descripttion: 系统管理模块api
 * @version:
 * @Author: TJ
 * @Date: 2021-04-30 14:17:56
 * @LastEditors: HYH
 * @LastEditTime: 2021-09-01 10:11:08
 */
import request from '@/http/axios/request'
import { IParams } from '@/@types/httpInterface'
export const customcolApi = {
  get_index: (params: IParams) => request.post(`/V1/TheCustomColumn/index`, params),
  get_list: (params: IParams) => request.post(`/V1/TheCustomColumn/list`, params),
  get_add: (params: IParams) => request.post(`/V1/TheCustomColumn/add`, params),
  get_view: (params: IParams) => request.post(`/V1/TheCustomColumn/view`, params),
  get_upd: (params: IParams) => request.post(`/V1/TheCustomColumn/upd`, params),
  get_del: (params: IParams) => request.post(`/V1/TheCustomColumn/del`, params),
}

