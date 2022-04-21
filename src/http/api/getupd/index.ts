/*
 * @Descripttion:
 * @version:
 * @Author: XJ
 * @Date: 2021-06-17 14:17:22
 * @LastEditors: HYH
 * @LastEditTime: 2021-09-01 10:06:14
 */
import request from '../../axios/request'
import { IParams } from '@/@types/httpInterface'

export const getupdApi = {
  // 2.0020 发送验证码接口：V1/User/send

  send_code: (params: IParams) => request.post(`/V1/User/send`, params),
  // 2.0021 发送验证码下一步接口：V1/User/next
  setp_next: (params: IParams) => request.post(`/V1/User/next`, params),
  // 2.0022 修改密码接口：V1/User/change_password
  change_password: (params: IParams) =>
    request.post(`/V1/User/change_password`, params),
}

