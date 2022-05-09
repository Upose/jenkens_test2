/*
 * @Description:入库审核
 * @version:
 * @Author: XJ
 * @Date: 2021-06-17 14:17:22
 * @LastEditors: HYH
 * @LastEditTime: 2022-05-09 15:49:26
 */
import request from '@/http/axios/request'
import { IParams } from '@/@types/httpInterface'

const warehouseInApi = {
  /**查询部门 */
  get_department: (params: IParams) => request.post(`/V1/ApprovalInWarehouse/view`, params),

  /**查询待入库审核单 */
  get_list: (params: IParams) => request.post(`/V1/ApprovalInWarehouse/view_search`, params),

  /**(根据入库审核单号)查询进货详情 */
  get_details_by_id: (params: IParams) =>
    request.post(`/V1/ApprovalInWarehouse/stock_search`, params),

  /**获取流程审批人列表（创建） */
  get_flow_approver_list: (params: IParams) =>
    request.post(`/V1/FlowApps/getApproverCreated`, params),

  /**流程审批 */
  flow_apply: (params: IParams) => request.post(`/V1/ApprovalInWarehouse/flowApply`, params),

  /** 我发起的流程审批 */
  my_flow: (params: IParams) => request.post(`/V1/FlowApps/my_flow`, params),

  /**我的审批 */
  my_approve_flow: (params: IParams) => request.post(`/V1/FlowApps/approve_flow`, params)
}

export default warehouseInApi
