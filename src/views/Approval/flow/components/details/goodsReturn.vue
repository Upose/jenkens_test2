<!--
 * @Description: 开票
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2022-05-23 17:13:34
-->
<template>
  <div>
    <el-descriptions :column="1" border>
      <!-- 流程id -->
      <el-descriptions-item :label="$t('common.flow_id')" label-align="right">{{
        form.item.flow_id
      }}</el-descriptions-item>
      <!-- 公司编码 -->
      <el-descriptions-item :label="$t('common.com_code')" label-align="right">{{
        form.item.com_code
      }}</el-descriptions-item>
      <!-- 部门 -->
      <el-descriptions-item label="部门" label-align="right">{{
        form.item.applicant_dept_name
      }}</el-descriptions-item>
      <!-- 是否退款 -->
      <el-descriptions-item label="是否退款" label-align="right">{{
        form.item.is_return_money === 1 ? '是' : '否'
      }}</el-descriptions-item>
      <!-- 是否已出库 -->
      <el-descriptions-item label="是否已出库" label-align="right">{{
        form.item.type === 1 ? '未出库  ' : '已出库'
      }}</el-descriptions-item>

      <div v-if="form.item.is_return_money === 1">
        <!-- 预计退款金额 -->
        <el-descriptions-item label="预计退款金额" label-align="right">{{
          form.item.return_money
        }}</el-descriptions-item>
        <!-- 实际退款金额 -->
        <el-descriptions-item label="实际退款金额" label-align="right">{{
          form.item.real_return_money
        }}</el-descriptions-item>
      </div>
      <!-- 数量 -->
      <el-descriptions-item :label="$t('common.number')" label-align="right">{{
        form.item.num
      }}</el-descriptions-item>
      <!-- 货币单位 -->
      <el-descriptions-item :label="$t('common.currency_unit_name')" label-align="right">{{
        form.item.currency_unit
      }}</el-descriptions-item>

      <!-- 原因 -->
      <el-descriptions-item :label="$t('common.reason')" label-align="right">{{
        form.item.explain
      }}</el-descriptions-item>
    </el-descriptions>
    <el-table
      style="margin:15px 0;width: 100%"
      v-if="
        form.list &&
          form.list.length &&
          form.item.type === 2 &&
          form.module_parameters === 'CANCELLING_STOCKS'
      "
      :data="form.list"
      stripe
    >
      <el-table-column type="selection" />
      <el-table-column prop="id" label="ID" />
      <!--数量  -->
      <el-table-column prop="handle_number" :label="$t('common.number')" />
      <!-- 单价 -->
      <el-table-column prop="sale_unit_money" :label="$t('common.sale_unit_money')" />
      <!-- 预计金额 -->
      <el-table-column prop="sale_money" label="预计金额" />
    </el-table>
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
