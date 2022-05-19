/*
 * @Description:退货
 * @version:
 * @Author: HYH
 * @Date: 2022-05-09 15:49:26
 * @LastEditors: HYH
 * @LastEditTime: 2022-05-19 10:51:31
 */
import request from '@/http/axios/request'
import { IParams } from '@/@types/httpInterface'
/**退货单 */
const returnOrderApi = {
  /*******************************************销售单审核*************************************************/
  /**查询部门 */
  get_department: (params: IParams) => request.post(`/V1/ApprovalReturn/view`, params),

  /**查询待审核列表 */
  get_list: (params: IParams) => request.post(`/V1/ApprovalReturn/view_search`, params),

  /**查询明细 */
  get_details: (params: IParams) => request.post(`/V1/ApprovalReturn/view_detail_search`, params),

  /**生成退货单号 */
  generate_return_order_no: (params: IParams) =>
    request.post(`/V1/ApprovalReturn/return_count_number`, params),

  /**生成退款单号 */
  generate_return_money_no: (params: IParams) =>
    request.post(`/V1/ApprovalReturn/refund_count_number`, params),

  /**获取流程审批人列表（创建） */
  get_flow_approver_list: (params: IParams) =>
    request.post(`/V1/FlowApps/getApproverCreated`, params),

  /**提交审核 */
  submit_approval: (params: IParams) => request.post(`/V1/ApprovalReturn/flowApply`, params)

  /*******************************************销售单审核end*************************************************/
}

export { returnOrderApi }
