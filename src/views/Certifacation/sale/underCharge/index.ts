/*
 * @Description:
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2022-05-18 14:57:06
 */
import { defineRules } from '@/utils/formValid'
import { reactive, ref } from 'vue'
const { inputInfo, selectInfo, email, number, debounce } = defineRules

const formRef = ref()
const Form = reactive({
  /**原因*/
  explain: '',
  /**待审批的销售单号 */
  sale_order_number: '',
  /**申请部门ID */
  applicant_dept_id: '',
  /**下级审批人 */
  next_approver: ''
})
const Rule = reactive({
  explain: inputInfo,
  sale_order_number: selectInfo,
  applicant_dept_id: selectInfo,
  next_approver: selectInfo
})
export { formRef, Form, Rule }
