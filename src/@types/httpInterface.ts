/*
 * @Descripttion: 数据接口定义
 * @version:
 * @Author: TJ
 * @Date: 2021-03-31 14:23:38
 * @LastEditors: HYH
 * @LastEditTime: 2022-05-07 15:08:39
 */
// 参数对象
export interface IParams {
  meta_data: IMetadata
  custom_data: ICustomdata
}

// 公共参数
export interface IMetadata {
  power_url?: string | null
  language_id?: string
  user_id?: null | string
  // 接入时间
  request_time?: string
  // 接入平台表示
  access_sys_code?: string
  [propName: string]: any
}
// 可选参数
export interface ICustomdata {
  [propName: string]: any
}

export interface ImobileINfo {
  system?: string
  device?: string
  producer?: string
}

// 接口返回值类型
export interface IRequest {
  status: number
  custom_data: any
  info: string
  power?: any
  field_name: string
  [propName: string]: any
}
