<!--
 * @Description: 开票
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2022-05-20 17:28:45
-->
<template>
  <div>
    <el-descriptions :column="1" border>
      <!-- 流程id -->
      <el-descriptions-item :label="$t('common.flow_id')" label-align="right">{{
        form.item.flow_id
      }}</el-descriptions-item>
      <!-- 开票单号 -->
      <el-descriptions-item label="开票单号" label-align="right">{{
        form.item.invoice_order_number
      }}</el-descriptions-item>
      <!-- 公司编码 -->
      <el-descriptions-item :label="$t('common.com_code')" label-align="right">{{
        form.item.com_code
      }}</el-descriptions-item>
      <!-- 部门 -->
      <el-descriptions-item label="部门" label-align="right">{{
        form.item.applicant_dept_name
      }}</el-descriptions-item>
      <!-- 图片 收款证明 -->
      <el-descriptions-item :label="$t('common.upload_payee_certificate')" label-align="right">
        <el-image v-for="item in imgList" :src="item.url" />
      </el-descriptions-item>
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
      operationName: props.operationName,
      imgList: props.form.item?.picture
    })
    return { ...methods, ...toRefs(state) }
  }
})
</script>
<style lang="scss"></style>
