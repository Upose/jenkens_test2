<!--
 * @Description: 多收
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2022-05-23 14:32:43
-->
<template>
  <div>
    <el-descriptions :column="1" border>
      <!-- 流程id -->
      <el-descriptions-item :label="$t('common.flow_id')" label-align="right">{{
        form.item.flow_id
      }}</el-descriptions-item>
      <!-- 销售单号 -->
      <el-descriptions-item :label="$t('common.sale_order_number')" label-align="right">{{
        form.item.sale_order_number
      }}</el-descriptions-item>
      <!-- 公司编码 -->
      <el-descriptions-item :label="$t('common.com_code')" label-align="right">{{
        form.item.com_code
      }}</el-descriptions-item>
      <!-- 部门 -->
      <el-descriptions-item label="部门" label-align="right">{{
        form.item.applicant_dept_name
      }}</el-descriptions-item>

      <!-- 应收金额 -->
      <el-descriptions-item label="应收金额" label-align="right">{{
        form.item.sale_money + `(${form.item.currency_unit})`
      }}</el-descriptions-item>
      <!-- 实收金额 -->
      <el-descriptions-item label="实收金额" label-align="right">{{
        form.item.paid_amount + `(${form.item.currency_unit})`
      }}</el-descriptions-item>
      <!-- 多收金额 -->
      <el-descriptions-item label="多收金额" label-align="right">{{
        form.item.differences_money + `(${form.item.currency_unit})`
      }}</el-descriptions-item>
      <!-- 原因 -->
      <el-descriptions-item :label="$t('common.reason')" label-align="right">{{
        form.item.explain
      }}</el-descriptions-item>
    </el-descriptions>
    <!-- 步骤显示插槽 -->
    <div>
      <slot name="step"></slot>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
export default defineComponent({
  name: '',
  props: {
    form: {
      type: Object,
      default: {}
    },
    operationName: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const methods = {}
    const state = reactive({
      form: props.form,
      operationName: props.operationName
    })
    return { ...methods, ...toRefs(state) }
  }
})
</script>
<style lang="scss"></style>
