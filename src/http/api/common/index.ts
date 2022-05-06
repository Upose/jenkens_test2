/*
 * @Descripttion: 公共请求模块
 * @version:
 * @Author: TJ
 * @Date: 2021-03-29 17:27:15
 * @LastEditors: HYH
 * @LastEditTime: 2022-04-25 10:10:10
 */
import request from '../../axios/request'
import { IParams } from '@/@types/httpInterface'

export const commonApi = {
  //# 登录V1/Login/index
  log_in: (params: IParams) => request.post(`/V1/Login/index`, params),
  //# 获取语言接口
  get_language: (params: IParams) => request.post(`/V1/Reshare/language_list`, params),
  //30天免登录接口：V1/Login/auto_login
  auto_login: (params: IParams) => request.post(`/V1/Login/auto_login`, params),
  // 用户信息接口：V1/User/user_info
  get_user_info: (params: IParams) => request.post(`/V1/User/user_info`, params),
  // 一级菜单接口：V1/Menu/first_class
  get_menu_first_class: (params: IParams) => request.post(`/V1/Menu/first_class`, params),
  // 多级菜单接口：：V1/Menu/multistage
  get_menu_multistage: (params: IParams) => request.post(`/V1/Menu/multistage`, params),
  //菜单权限接口：V1/Power/index
  get_power_index: (params: IParams) => request.post(`/V1/Power/index`, params),
  //用户退出接口：V1/Login/logout
  login_logout: (params: IParams) => request.post(`/V1/Login/logout`, params),
  // 后台直接修改密码接口：V1/User/password
  back_change_password: (params: IParams) => request.post(`/V1/User/password`, params),
  // =============================================================公共
  // #自定义列
  // 自定义列展示接口：V1/Public/the_custom_column
  get_custom: (params: IParams) => request.post(`/V1/Public/the_custom_column`, params),
  // 自定义列更新接口：V1/Public/the_custom_column_upd
  get_custom_upd: (params: IParams) => request.post(`/V1/Public/the_custom_column_upd`, params),
  // #公共参数接口

  // 获取所有人员接口
  get_staff_info: (params: IParams) => request.post(`V1/InventoryDelivery/staff_info`, params),
  // 公司获取接口：V1/Company/list
  get_company_list: (params: IParams) => request.post(`/V1/Company/list`, params),
  // 小窗口获取接口：V1/Public/buttery_hatch
  get_buttery_hatch: (params: IParams) => request.post(`/V1/Public/buttery_hatch`, params),
  // 小窗口更新接口：V1/Public/buttery_hatch_upd
  get_buttery_hatch_upd: (params: IParams) => request.post(`/V1/Public/buttery_hatch_upd`, params)
}
