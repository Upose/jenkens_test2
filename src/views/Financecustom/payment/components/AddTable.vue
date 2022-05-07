<!--
 * @Descripttion: 
 * @version: 
 * @Author: HYH
 * @Date: 2021-08-25 14:16:36
 * @LastEditors: HYH
 * @LastEditTime: 2022-05-06 11:49:46
-->
<!--  -->
<template>
  <div class="tableFormStyle">
    <el-table
      border
      :key="Math.random()"
      :data="tableData"
      height="500"
      highlight-current-row
      show-summary
    >
      <el-table-column
        show-overflow-tooltip
        prop="stock_statistics_id"
        :label="$t('common.stock_statistics_id')"
      >
      </el-table-column>
      <!-- 创建时间 -->
      <el-table-column show-overflow-tooltip prop="created_at" :label="$t('common.created_at')">
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="account_number_name"
        :label="$t('common.account_number')"
      >
      </el-table-column>
      <!-- 数量 -->
      <el-table-column show-overflow-tooltip prop="number" :label="$t('common.number')">
      </el-table-column>

      <el-table-column
        show-overflow-tooltip
        prop="payment_money"
        :label="$t('common.surplus_real_payment_money')"
      >
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="wait_money" :label="$t('common.wait_money')">
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="real_payment_money"
        :label="$t('common.this_payer')"
      >
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="file" :label="$t(`common.payer_certificate`)">
        <template #default="scope">
          <div style="height:22px;line-height:22px">
            <el-image
              v-for="(item2, index2) in scope.row.file"
              :key="index2"
              style="width:22px;height:22px;"
              :src="item2"
              :preview-src-list="[item2]"
              alt="#"
            />
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('common.handle')">
        <template #default="scope">
          <el-button type="text" @click="deleteRow(scope)">{{ $t('common.clear') }}</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
interface IState {
  tableData: any
}
import { defineComponent, ref, reactive, toRefs, onMounted, computed } from 'vue'
export default defineComponent({
  props: {
    // tableData: {
    // 	type: Array,
    // 	default: [],
    // },
  },
  emits: ['updateTableData'],
  setup(props, ctx) {
    const state: IState = reactive({
      // tableData:  props.tableData, //这样赋值不会响应
      tableData: []
    })
    const methods = {
      deleteRow(scope: any) {
        let index = scope.$index
        let data = state.tableData
        let deleted_row = data.splice(index, 1)[0]
        ctx.emit('updateTableData', index, deleted_row)
      },
      pushTableData(newRow: any) {
        state.tableData.push(newRow)
      }
    }
    onMounted(() => {})
    return {
      ...toRefs(state),
      ...methods
    }
  }
})
</script>
<style lang="scss" scoped></style>
