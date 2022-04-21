/*
 * @Descripttion:
 * @version:
 * @Author: XJ
 * @Date: 2021-06-01 10:09:23
 * @LastEditors: HYH
 * @LastEditTime: 2021-09-01 10:12:02
 */

import request from '@/http/axios/request'
import { IParams } from '@/@types/httpInterface'

// 不需要传参
export const areaApi = {
  // 国家信息页面接口：V1/Area/index
  get_area_index: (params: IParams) => request.post(`/V1/Area/index`, params),
  //国家信息获取接口：V1/Area/list
  get_area_list: (params: IParams) => request.post(`/V1/Area/list`, params),
  // 国家信息添加接口：V1/Area/add
  get_area_add: (params: IParams) => request.post(`/V1/Area/add`, params),
  // 国家信息查询数据接口：V1/Area/view
  get_area_view: (params: IParams) => request.post(`/V1/Area/view`, params),
  // 国家信息修改接口：V1/Area/upd
  get_area_upd: (params: IParams) => request.post(`/V1/Area/upd`, params),
  //国家信息删除接口：V1/Area/del
  get_area_del: (params: IParams) => request.post(`/V1/Area/del`, params),
}

