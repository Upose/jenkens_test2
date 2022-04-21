/*
 * @Descripttion: 系统管理模块api
 * @version:
 * @Author: TJ
 * @Date: 2021-04-30 14:17:56
 * @LastEditors: HYH
 * @LastEditTime: 2021-09-16 14:22:53
 */
import request from '@/http/axios/request'
import { IParams } from '@/@types/httpInterface'

// 不需要传参

export const timetableApi = {
  get_index: (params: IParams) => request.post(`/V1/WorkTimeTable/index`, params),
  get_list: (params: IParams) => request.post(`/V1/WorkTimeTable/list`, params),
  get_add: (params: IParams) => request.post(`/V1/WorkTimeTable/add`, params),
  get_view: (params: IParams) => request.post(`/V1/WorkTimeTable/view`, params),
  get_upd: (params: IParams) => request.post(`/V1/WorkTimeTable/upd`, params),
  get_del: (params: IParams) => request.post(`/V1/WorkTimeTable/del`, params),
  // 2.16 公司获取接口：V1/Company/list
  get_company_list: (params: IParams) =>
    request.post(`/V1/Company/list`, params),
}

