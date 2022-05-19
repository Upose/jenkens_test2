/*
 * @Description:销售相关api
 * @version:
 * @Author: HYH
 * @Date: 2022-05-09 15:49:26
 * @LastEditors: HYH
 * @LastEditTime: 2022-05-19 09:47:52
 */
import request from '@/http/axios/request'
import { IParams } from '@/@types/httpInterface'
/**开票 */
const billOpenApi = {
  /**查询部门 */
  get_department: (params: IParams) => request.post(`/V1/ApprovalInvoice/view`, params),

  /**查询收款单号列表 */
  get_list: (params: IParams) => request.post(`/V1/ApprovalInvoice/view_search`, params),

  /**查询销售单号列表 */
  get_sale_order_list: (params: IParams) =>
    request.post(`/V1/ApprovalInvoice/inventory_order_view_search`, params),

  /**查询销售单号详情  */
  get_sale_order_details: (params: IParams) =>
    request.post(`/V1/ApprovalInvoice/inventory_log_view_search`, params),

  /**判断销售单是否可选 */
  checkSaleOrderStatus: (params: IParams) => request.post(`/V1/ApprovalInvoice/is_invoice`, params),

  /**获取开票类型 */
  get_bill_type: (params: IParams) => request.post(`/V1/ApprovalInvoice/invoice_type`, params),

  /**自动生成开票单号 */
  auto_generate_order_num: (params: IParams) =>
    request.post(`/V1/ApprovalInvoice/invoice_order_number`, params),

  /**获取流程审批人列表（创建） */
  get_flow_approver_list: (params: IParams) =>
    request.post(`/V1/FlowApps/getApproverCreated`, params),

  /**提交审核 */
  submit_approval: (params: IParams) => request.post(`/V1/ApprovalInvoice/flowApply`, params)
}

/**退票 */
const billReturnApi = {
  /**查询部门 */
  get_department: (params: IParams) => request.post(`/V1/ApprovalInvoiceReturn/view`, params),

  /**查询列表 */
  get_list: (params: IParams) => request.post(`/V1/ApprovalInvoiceReturn/view_search`, params),

  /**生成退票单号 */
  generate_no: (params: IParams) =>
    request.post(`/V1/ApprovalInvoiceReturn/invoice_return_order_number`, params),

  /**获取流程审批人列表（创建） */
  get_flow_approver_list: (params: IParams) =>
    request.post(`/V1/FlowApps/getApproverCreated`, params),

  /**提交审核 */
  submit_approval: (params: IParams) => request.post(`/V1/ApprovalInvoiceReturn/flowApply`, params)
}

export { billReturnApi, billOpenApi }
