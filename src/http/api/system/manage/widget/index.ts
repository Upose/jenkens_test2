/*
 * @Descripttion:
 * @version:
 * @Author: XJ
 * @Date: 2021-05-18 15:37:53
 * @LastEditors: HYH
 * @LastEditTime: 2021-09-01 10:11:49
 */
import request from '@/http/axios/request'
import { IParams } from '@/@types/httpInterface'

// 不需要传参
export const widgetApi = {
  // 页面控件页面接口：V1/Widget/index  V1/widget/index
  get_index: (params: IParams) =>
    request.post(`/V1/Widget/index`, params),
  // 页面控件获取接口：V1/Widget/list
  get_list: (params: IParams) => request.post(`/V1/Widget/list`, params),
  //  页面控件添加接口：V1/Widget/add
  get_add: (params: IParams) => request.post(`/V1/Widget/add`, params),
  // 页面控件修改接口：V1/Widget/upd
  get_upd: (params: IParams) => request.post(`/V1/Widget/upd`, params),
  // 页面控件删除接口：V1/Widget/del
  get_del: (params: IParams) => request.post(`/V1/Widget/del`, params),
  // 页面控件修改查询数据接口：V1/Widget/view
  get_view: (params: IParams) => request.post(`/V1/Widget/view`, params),
  // ---------------------------------
  get_menu_list: (params: IParams) => request.post(`/V1/Menu/list`, params),
}

