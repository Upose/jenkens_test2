/*
 * @Description:
 * @Author: HYH
 * @LastEditors: TJ
 * @LastEditTime: 2022-06-06 18:50:32
 */
import { defineRules } from '@/utils/formValid'
import { reactive, ref } from 'vue'
const { inputInfo, selectInfo, email, number, debounce } = defineRules

const formRef = ref()
const Form = reactive({
  /**原因*/
  explain: '',
  /**待审批的出库单号 */
  delivery_order_number: '',
  /**申请部门ID */
  applicant_dept_id: '',
  /**下级审批人 */
  next_approver: '',
  /**收款状态 */
  order_collection: ''
})
const Rule = reactive({
  explain: inputInfo,
  sale_order_number: selectInfo,
  applicant_dept_id: selectInfo,
  delivery_order_number: selectInfo,
  order_collection: selectInfo,
  next_approver: selectInfo
})
export { formRef, Form, Rule }
