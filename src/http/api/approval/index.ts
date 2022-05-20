/*
 * @Description:审核 相关api
 * @version:
 * @Author: XJ
 * @Date: 2021-06-17 14:17:22
 * @LastEditors: HYH
 * @LastEditTime: 2022-05-20 16:45:10
 */
import request from '../../axios/request'
import { IParams } from '@/@types/httpInterface'
import { flowTypeId } from '@/constant/flowType'

const approvalApi = {
  /**检查权限 */
  check_permission: (params: IParams) => request.post(`/V1/FlowApps/index`, params),

  /**审批流程中心 */
  flow_center: (params: IParams) => request.post(`/V1/FlowApps/flow_center`, params),

  /** 我发起的流程审批 */
  my_flow: (params: IParams) => request.post(`/V1/FlowApps/my_flow`, params),

  /**撤销流程 */
  revoke_flow: (params: IParams) => request.post(`/V1/FlowApps/flowRevoke`, params),

  /**流程查看 */
  view_flow: (params: IParams) => request.post(`/V1/FlowApps/flowView`, params),

  /**我的审批 */
  my_approve_flow: (params: IParams) => request.post(`/V1/FlowApps/approve_flow`, params),

  /**审批(某一条数据)获取详情 */
  get_approval_details: (params: IParams, flow_type: number) => {
    let url = ''
    switch (flow_type) {
      case flowTypeId.WAREHOUSE_IN:
        url = 'ApprovalInWarehouse'
        break
      case flowTypeId.SALE_ORDER:
        url = 'ApprovalSales'
        break
      case flowTypeId.WAREHOUSE_OUT:
        url = 'ApprovalDelivery'
        break
      case flowTypeId.OVER_CHARGE:
        url = 'ApprovalMorecharge'
        break
      case flowTypeId.UNDER_CHARGE:
        url = 'ApprovalLittlecharge'
        break
      case flowTypeId.BILL_OPEN:
        url = 'ApprovalInvoice'
        break
      case flowTypeId.BILL_RETURN:
        url = 'ApprovalInvoiceReturn'
        break
      default:
        break
    }
    return request.post(`/V1/${url}/flowExamine_view`, params)
  },

  /**获取流程(下级)审批人-审批 */
  get_next_approver_list: (params: IParams) =>
    request.post(`/V1/FlowApps/getApproverHandle`, params),

  /**（确认）提交审批 */
  sure_approval: (params: IParams, flow_type: number) => {
    let url = ''
    switch (flow_type) {
      case flowTypeId.WAREHOUSE_IN:
        url = 'ApprovalInWarehouse'
        break
      case flowTypeId.SALE_ORDER:
        url = 'ApprovalSales'
        break
      case flowTypeId.WAREHOUSE_OUT:
        url = 'ApprovalDelivery'
        break
      case flowTypeId.OVER_CHARGE:
        url = 'ApprovalMorecharge'
        break
      case flowTypeId.UNDER_CHARGE:
        url = 'ApprovalLittlecharge'
        break
      case flowTypeId.BILL_OPEN:
        url = 'ApprovalInvoice'
      case flowTypeId.BILL_RETURN:
        url = 'ApprovalInvoiceReturn'
        break
      default:
        break
    }
    return request.post(`/V1/${url}/flowExamine`, params)
  }
}

export default approvalApi
