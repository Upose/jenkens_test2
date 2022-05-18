/*
 * @Description:
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2022-05-18 10:34:17
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
export { approvalRule, detailsForm, approvalRef, debounce }
