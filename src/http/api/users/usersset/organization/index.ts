/*
 * @Descripttion:
 * @version:
 * @Author: XJ
 * @Date: 2021-06-01 10:06:06
 * @LastEditors: HYH
 * @LastEditTime: 2021-09-01 10:12:45
 */

import request from '@/http/axios/request'
import { IParams } from '@/@types/httpInterface'

// 不需要传参
export const organizationApi = {
  // 组织机构页面接口：V1/Organization/index
  get_index: (params: IParams) =>
    request.post(`/V1/Organization/index`, params),
  // 组织机构列表接口：V1/Organization/list
  get_list: (params: IParams) => request.post(`/V1/Organization/list`, params),
  // 组织机构添加接口：V1/Organization/add
  get_add: (params: IParams) => request.post(`/V1/Organization/add`, params),
  // 组织机构修改查询数据接口：V1/Organization/view
  get_view: (params: IParams) => request.post(`/V1/Organization/view`, params),
  // 组织机构修改接口：V1/Organization/upd
  get_upd: (params: IParams) => request.post(`/V1/Organization/upd`, params),
  //组织机构删除接口：V1/Organization/del
  get_del: (params: IParams) => request.post(`/V1/Organization/del`, params),
  // 2.16 公司获取接口：V1/Company/list
  get_company_list: (params: IParams) =>
    request.post(`/V1/Company/list`, params),
}

