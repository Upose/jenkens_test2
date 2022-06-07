/*
 * @Description:仓库相关审核
 * @version:
 * @Author: XJ
 * @Date: 2021-06-17 14:17:22
 * @LastEditors: TJ
 * @LastEditTime: 2022-06-07 16:20:52
 */
import request from '@/http/axios/request'
import { IParams } from '@/@types/httpInterface'
/**入库 */
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

  /**提交审核 */
  flow_apply: (params: IParams) => request.post(`/V1/ApprovalInWarehouse/flowApply`, params)
}
/**出库 */
const warehouseOutApi = {
  /**查询部门 */
  get_department: (params: IParams) => request.post(`/V1/ApprovalDelivery/view`, params),

  /**查询待入库审核单 */
  get_list: (params: IParams) => request.post(`/V1/ApprovalDelivery/view_search`, params),

  /**(根据入库审核单号)查询进货详情 */
  get_details_by_id: (params: IParams) =>
    request.post(`/V1/ApprovalInWarehouse/stock_search`, params),

  /**获取流程审批人列表（创建） */
  get_flow_approver_list: (params: IParams) =>
    request.post(`/V1/FlowApps/getApproverCreated`, params),

  /**提交审核 */
  submit_approval: (params: IParams) => request.post(`/V1/ApprovalDelivery/flowApply`, params),

  /**出库单对应销售单列表 */
  outbound_order_salelist: (params: IParams) =>
    request.post(`/V1/ApprovalDelivery/order_view_search`, params)
}
/**出库 */
const warehouseLockApi = {
  /**查询部门 */
  get_department: (params: IParams) => request.post(`V1/ApprovalInWarehouseLock/view`, params),
  /**查询出货单 */
  get_list: (params: IParams) => request.post(`V1/ApprovalInWarehouseLock/view_search`, params),
  /**(根据入库审核单号)查询进货详情 */
  get_details_by_id: (params: IParams) =>
    request.post(`V1/ApprovalInWarehouseLock/stock_search`, params),
  /**获取流程审批人列表（创建） */
  get_flow_approver_list: (params: IParams) =>
    request.post(`/V1/FlowApps/getApproverCreated`, params),
  /**提交审核 */
  submit_approval: (params: IParams) =>
    request.post(`/V1/ApprovalInWarehouseLock/flowApply`, params)
}

export { warehouseInApi, warehouseOutApi, warehouseLockApi }
