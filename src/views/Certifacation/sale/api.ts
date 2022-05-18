/*
 * @Description:销售相关api
 * @version:
 * @Author: HYH
 * @Date: 2022-05-09 15:49:26
 * @LastEditors: HYH
 * @LastEditTime: 2022-05-18 14:52:19
 */
import request from '@/http/axios/request'
import { IParams } from '@/@types/httpInterface'
/**销售相关api */
const saleApi = {
  /*******************************************销售单审核*************************************************/
  /**查询部门 */
  get_department: (params: IParams) => request.post(`/V1/ApprovalSales/view`, params),

  /**查询待审核列表 */
  get_list: (params: IParams) => request.post(`/V1/ApprovalSales/view_search`, params),

  /**获取流程审批人列表（创建） */
  get_flow_approver_list: (params: IParams) =>
    request.post(`/V1/FlowApps/getApproverCreated`, params),

  /**提交审核 */
  submit_approval: (params: IParams) => request.post(`/V1/ApprovalSales/flowApply`, params)

  /*******************************************销售单审核end*************************************************/
}

/**多收 */
const overChargeApi = {
  /**查询部门 */
  get_department: (params: IParams) => request.post(`/V1/ApprovalMorecharge/view`, params),

  /**查询待审核列表 */
  get_list: (params: IParams) => request.post(`/V1/ApprovalMorecharge/view_search`, params),

  /**获取流程审批人列表（创建） */
  get_flow_approver_list: (params: IParams) =>
    request.post(`/V1/FlowApps/getApproverCreated`, params),

  /**提交审核 */
  submit_approval: (params: IParams) => request.post(`/V1/ApprovalMorecharge/flowApply`, params)
}

/**少收 */
const underChargeApi = {
  /**查询部门 */
  get_department: (params: IParams) => request.post(`/V1/ApprovalLittlecharge/view`, params),

  /**查询待审核列表 */
  get_list: (params: IParams) => request.post(`/V1/ApprovalLittlecharge/view_search`, params),

  /**获取流程审批人列表（创建） */
  get_flow_approver_list: (params: IParams) =>
    request.post(`/V1/FlowApps/getApproverCreated`, params),

  /**提交审核 */
  submit_approval: (params: IParams) => request.post(`/V1/ApprovalLittlecharge/flowApply`, params)
}

export { saleApi, overChargeApi, underChargeApi }
