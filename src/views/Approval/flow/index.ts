/*
 * @Description:
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2022-05-25 11:14:45
 */
import { defineRules } from '@/utils/formValid'
import { reactive, ref } from 'vue'
const { inputInfo, selectInfo, email, number, debounce } = defineRules
/**审核表单校验 */
const approvalRule = reactive({
  result_id: selectInfo,
  approval_comments: inputInfo,
  next_approver: selectInfo
})
/**详情内容 */
let detailsForm: any = reactive({})
const approvalRef = ref()
/**更新模块名（到哪一个步骤了） */
enum refreshModuleName {
  /**仓管确认退货是否已入库 */
  CANCELLING_STOCKS = 'CANCELLING_STOCKS',
  /**处理销售单 */
  PROCESS_SALES_ORDERS = 'PROCESS_SALES_ORDERS',
  /**处理退款 */
  REFUND = 'REFUND'
}
/**出库状态 */
enum warehouseStatus {
  /**已出库 */
  HAS_OUT = 2,
  /**未出库 */
  NOT_OUT = 1
}

/**
 * @description 根据更新模块名称来传递不同数据
 * @param form 需要传入的表单
 * @returns
 */
const handleRefreshModuleName = (form: any) => {
  const status = form.item.type,
    name = form.module_parameters
  if (name == refreshModuleName.CANCELLING_STOCKS && status === warehouseStatus.HAS_OUT) {
    // 已出库的时候
    return {
      module_parameters: form.module_parameters,
      type: status,
      data: form.list
    }
  }
  // 处理销售单
  if (name == refreshModuleName.PROCESS_SALES_ORDERS) {
    return {
      module_parameters: form.module_parameters,
      type: status,
      data: form.list
    }
  }
  // 退款
  if (name == refreshModuleName.REFUND && form.item.is_return_money === 1) {
    return {
      ...form,
      data: form.list
      // module_parameters: form.module_parameters,
      // is_return_money: 1, //确认退款  0 否  1 是   REFUND
      // ...form,
      // return_order_number: form.return_order_number, //退货单号   REFUND    is_return_money为1时传
      // refund_id: form.refund_id, //退款单号  REFUND     is_return_money为1时传
      // sale_order_number: form.sale_order_number, //销售单号  REFUND is_return_money为1时传
      // buy_user: form.buy_user, //客户ID  REFUND  is_return_money为1时传
      // currency_unit: form.currency_unit, //币种  REFUND  is_return_money为1时传
      // return_money: form.return_money, //退还金额  REFUND   is_return_money为1时传
      // explain: form.explain, //备注  REFUND   is_return_money为1时传
    }
  }
  return {}
}
export { approvalRule, detailsForm, approvalRef, debounce, handleRefreshModuleName }
