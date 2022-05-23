/*
 * @Description:
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2022-05-23 15:29:43
 */
import { defineRules } from '@/utils/formValid'
import { reactive, ref } from 'vue'
const { inputInfo, selectInfo, email, number, debounce } = defineRules

const formRef = ref()
const Form = reactive({
  search_value: '',
  /**出库状态 */
  type: null as any,
  /**原因*/
  explain: '',
  /**退票单号 */
  invoice_order_number: null as any,
  /**申请部门ID */
  applicant_dept_id: '',
  /**下级审批人 */
  next_approver: '',
  /**退货单号 */
  return_order_number: '',
  /**单号 */
  order_number: '',
  /**客户ID */
  buy_user: '',
  /**退货总数 */
  num: 0,
  /**币种 */
  currency_unit: '',
  /**是否退款  0 否  1 是 */
  is_return_money: null as any,
  /**退款单号 */
  refund_id: '',
  /**预计退款金额 */
  return_money: 0,
  /**实际退款金额 */
  real_return_money: 0
})
const Rule = reactive({
  type: selectInfo,
  explain: inputInfo,
  invoice_order_number: selectInfo,
  applicant_dept_id: selectInfo,
  next_approver: selectInfo,
  sale_or_store_out_list: selectInfo,
  buy_user: selectInfo,
  currency_unit: selectInfo,
  is_return_money: selectInfo
})
export { formRef, Form, Rule }
