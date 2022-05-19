/*
 * @Description:
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2022-05-19 11:15:20
 */
import { defineRules } from '@/utils/formValid'
import { reactive, ref } from 'vue'
const { inputInfo, selectInfo, email, number, debounce } = defineRules

const formRef = ref()
const Form = reactive({
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
  type: 1,
  /**单号 */
  order_number: '',
  /**客户ID */
  buy_user: '',
  /**退货总数 */
  num: 5,
  /**币种 */
  currency_unit: '',
  /**确认退款  0 否  1 是 */
  is_return_money: 1,
  /**退款单号 */
  refund_id: '',
  /**预计退款金额 */
  return_money: '',
  /**实际退款金额 */
  real_return_money: ''
})
const Rule = reactive({
  explain: inputInfo,
  invoice_order_number: selectInfo,
  applicant_dept_id: selectInfo,
  next_approver: selectInfo
})
export { formRef, Form, Rule }
