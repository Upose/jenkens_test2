/*
 * @Description:
 * @Author: HYH
 * @LastEditors: TJ
 * @LastEditTime: 2022-06-07 15:45:03
 */
import { defineRules } from '@/utils/formValid'
import { reactive, ref } from 'vue'
const { inputInfo, selectInfo, email, number, debounce } = defineRules
/**审核表单校验 */
const approvalRule = reactive({
  result_id: selectInfo,
  approval_comments: inputInfo,
  next_approver: selectInfo,
  refund_id: inputInfo,
  company: inputInfo,
  account: inputInfo,
  account_openning_address: inputInfo
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
      module_parameters: form.module_parameters,
      return_order_number: form.item.return_order_number, //退货单号   REFUND    is_return_money为1时传
      is_return_money: form.item.is_return_money, //确认退款  0 否  1 是   REFUND
      return_money: form.item.return_money, //退还金额  REFUND   is_return_money为1时传
      sale_order_number: form.item.order_number, //销售单号  REFUND is_return_money为1时传
      currency_unit: form.item.currency_unit, //币种  REFUND  is_return_money为1时传
      type: form.item.type,
      buy_user: form.item.buy_user, //客户ID  REFUND  is_return_money为1时传
      data: form.list
    }
  }
  return {}
}
export { approvalRule, detailsForm, approvalRef, debounce, handleRefreshModuleName }
