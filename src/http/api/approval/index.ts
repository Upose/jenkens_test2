/*
 * @Descripttion:审核 相关api
 * @version:
 * @Author: XJ
 * @Date: 2021-06-17 14:17:22
 * @LastEditors: HYH
 * @LastEditTime: 2022-05-07 13:55:59
 */
import request from '../../axios/request'
import { IParams } from '@/@types/httpInterface'

const approvalApi = {
  /**检查权限 */
  check_permission: (params: IParams) => request.post(`/V1/FlowApps/index`, params),

  /**审批流程中心 */
  flow_center: (params: IParams) => request.post(`/V1/FlowApps/flow_center`, params),

  /** 我发起的流程审批 */
  my_flow: (params: IParams) => request.post(`/V1/FlowApps/my_flow`, params),

  /**我的审批 */
  my_approve_flow: (params: IParams) => request.post(`/V1/FlowApps/approve_flow`, params)
}

export default approvalApi
