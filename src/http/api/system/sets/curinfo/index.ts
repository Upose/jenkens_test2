/*
 * @Descripttion: 系统管理模块api
 * @version:
 * @Author: TJ
 * @Date: 2021-04-30 14:17:56
 * @LastEditors: HYH
 * @LastEditTime: 2021-09-01 10:12:16
 */
import request from '@/http/axios/request'
import { IParams } from '@/@types/httpInterface'

// 不需要传参
export const curinfoApi = {
  //  货币单位页面接口：V1/Unit/index
  get_index: (params: IParams) => request.post(`/V1/Unit/index`, params),
  // 货币单位获取接口：V1/Unit/list
  get_list: (params: IParams) => request.post(`/V1/Unit/list`, params),
  //货币单位添加接口：V1/Unit/add
  get_add: (params: IParams) => request.post(`/V1/Unit/add`, params),
  // 货币单位查询数据接口：V1/Unit/view
  get_view: (params: IParams) => request.post(`/V1/Unit/view`, params),
  // 货币单位修改接口：V1/Unit/upd
  get_upd: (params: IParams) => request.post(`/V1/Unit/upd`, params),
  // 货币单位删除接口：V1/Unit/del
  get_del: (params: IParams) => request.post(`/V1/Unit/del`, params),
}

