/*
 * @Descripttion: 系统管理模块api
 * @version:
 * @Author: TJ
 * @Date: 2021-04-30 14:17:56
 * @LastEditors: HYH
 * @LastEditTime: 2021-09-01 10:12:08
 */
import request from '@/http/axios/request'
import { IParams } from '@/@types/httpInterface'

// 不需要传参
export const cominfoApi = {
  // 公司页面权限接口：V1/Company/index
  get_index: (params: IParams) => request.post(`/V1/Company/index`, params),
  // 公司获取接口：V1/Company/list
  get_list: (params: IParams) => request.post(`/V1/Company/list`, params),
  // 公司添加接口：V1/Company/add
  get_add: (params: IParams) => request.post(`/V1/Company/add`, params),
  // V1/Company/view
  get_view: (params: IParams) => request.post(`/V1/Company/view`, params),
  // 公司修改接口：V1/Company/upd
  get_upd: (params: IParams) => request.post(`/V1/Company/upd`, params),
  // 公司删除接口：V1/Company/del
  get_del: (params: IParams) => request.post(`/V1/Company/del`, params),
}

