/*
 * @Description:
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2022-05-18 18:01:41
 */
import { defineRules } from '@/utils/formValid'
import { reactive, ref } from 'vue'
const { inputInfo, selectInfo, email, number, debounce } = defineRules

const formRef = ref()
const multipleTableRef = ref()
const Form = reactive({
  /**原因*/
  explain: '',
  /**开票单号 */
  invoice_order_number: '',
  /**申请部门ID */
  applicant_dept_id: '',
  /**下级审批人 */
  next_approver: '',
  /**选择开票单号生成方式  0 手填  1 自动生成 */
  is_invoice: null as any,
  /**发票类型 1 纸质发票   2 电子发票 */
  is_paper: null as any,
  /**开票类型 */
  invoice_type: null as any,
  /**收款单号 */
  inventory_order_payment_record_id: '',
  /**公司 */
  company: '',
  /**地址 */
  address: '',
  /**电话 */
  buy_photo: '',
  /**邮箱 */
  buy_mail: '',
  /**税号 */
  ein: '',
  /**开票所在国家  */
  area: '',
  /**开票金额 */
  invoice_money: null as any,
  /**销售单号 */
  inventory_order_id: ''
})
const Rule = reactive({
  explain: inputInfo,
  invoice_order_number: selectInfo,
  applicant_dept_id: selectInfo,
  next_approver: selectInfo,
  is_invoice: selectInfo,
  is_paper: selectInfo,
  invoice_type: selectInfo,
  inventory_order_payment_record_id: selectInfo,
  company: inputInfo,
  address: inputInfo,
  buy_photo: inputInfo,
  buy_mail: email,
  ein: inputInfo,
  area: selectInfo,
  invoice_money: number,
  inventory_order_id: selectInfo
})
export { formRef, Form, Rule, multipleTableRef }
