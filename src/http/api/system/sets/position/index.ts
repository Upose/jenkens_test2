/*
 * @Descripttion:
 * @version:
 * @Author: HYH
 * @Date: 2021-08-11 15:01:03
 * @LastEditors: HYH
 * @LastEditTime: 2021-09-01 10:21:34
 */
import request from '@/http/axios/request'
import { IParams } from '@/@types/httpInterface'
export const positionApi = {
  get_index: (params: IParams) => request.post(`/V1/Position/index`, params),
  get_list: (params: IParams) => request.post(`/V1/Position/list`, params),
  get_add: (params: IParams) => request.post(`/V1/Position/add`, params),
  get_view: (params: IParams) => request.post(`/V1/Position/view`, params),
  get_upd: (params: IParams) => request.post(`/V1/Position/upd`, params),
  get_del: (params: IParams) => request.post(`/V1/Position/del`, params),
  get_selected_position: (params: IParams) =>
    request.post(`/V1/Position/selected_position`, params),
  get_staff_position: (params: IParams) =>
    request.post(`/V1/Position/staff_position`, params),
}
