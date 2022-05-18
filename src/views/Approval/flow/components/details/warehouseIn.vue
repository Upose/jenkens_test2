<!--
 * @Description: 
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2022-05-18 15:14:50
-->
<template>
  <div>
    <el-descriptions :column="1" border>
      <!-- 流程id -->
      <el-descriptions-item :label="$t('common.flow_id')" label-align="right">{{
        form.item.flow_id
      }}</el-descriptions-item>
      <!-- 进货单号 -->
      <el-descriptions-item :label="$t('common.purchase_order')" label-align="right">{{
        form.item.order_number
      }}</el-descriptions-item>
      <!-- 公司编码 -->
      <el-descriptions-item :label="$t('common.com_code')" label-align="right">{{
        form.item.com_code
      }}</el-descriptions-item>
      <!-- 部门 -->
      <el-descriptions-item label="部门" label-align="right">{{
        form.item.applicant_dept_name
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
    }
  },
  setup(props) {
    const methods = {}
    const state = reactive({
      form: props.form
    })
    return { ...methods, ...toRefs(state) }
  }
})
</script>
<style lang="scss"></style>
