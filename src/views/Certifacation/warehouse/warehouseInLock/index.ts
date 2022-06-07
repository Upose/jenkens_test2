/*
 * @Description:
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2022-05-18 14:11:22
 */
import { defineRules } from '@/utils/formValid'
import { reactive, ref } from 'vue'
const { inputInfo, selectInfo, email, number, debounce } = defineRules

const formRef = ref()
const Form = reactive({
  /**原因*/
  explain: '',
  /**待审批的进货单号 */
  order_number: '',
  /**申请部门ID */
  applicant_dept_id: '',
  /**下级审批人 */
  next_approver: ''
})
const Rule = reactive({
  explain: inputInfo,
  order_number: selectInfo,
  applicant_dept_id: selectInfo,
  next_approver: selectInfo
})

export { formRef, Form, Rule }
