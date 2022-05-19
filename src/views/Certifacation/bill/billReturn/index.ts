/*
 * @Description:
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2022-05-19 10:03:54
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
  next_approver: ''
})
const Rule = reactive({
  explain: inputInfo,
  invoice_order_number: selectInfo,
  applicant_dept_id: selectInfo,
  next_approver: selectInfo
})
export { formRef, Form, Rule }
