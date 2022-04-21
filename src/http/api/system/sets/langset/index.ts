/*
 * @Descripttion:
 * @version:
 * @Author: XJ
 * @Date: 2021-06-01 10:11:28
 * @LastEditors: HYH
 * @LastEditTime: 2021-09-01 10:12:25
 */
import request from '@/http/axios/request'
import { IParams } from '@/@types/httpInterface'

// 不需要传参
export const langsetApi = {
  // 多语言页面接口：V1/Language/index
  get_index: (params: IParams) =>
    request.post(`/V1/Language/index`, params),
  //多语言获取接口：V1/Language/list
  get_list: (params: IParams) =>
    request.post(`/V1/Language/list`, params),
  // 多语言添加接口：V1/Language/add
  get_add: (params: IParams) =>
    request.post(`/V1/Language/add`, params),
  // 多语言查询数据接口：V1/Language/view
  get_view: (params: IParams) =>
    request.post(`/V1/Language/view`, params),
  // 多语言修改接口：V1/Language/upd
  get_upd: (params: IParams) =>
    request.post(`/V1/Language/upd`, params),
  //多语言删除接口：V1/Language/del
  get_del: (params: IParams) =>
    request.post(`/V1/Language/del`, params),
}
