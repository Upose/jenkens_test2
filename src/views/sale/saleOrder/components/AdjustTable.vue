<!--
 * @Descripttion: 
 * @version: 
 * @Author: HYH
 * @Date: 2021-08-25 14:16:36
 * @LastEditors: XJ
 * @LastEditTime: 2022-03-29 13:38:42
-->
<!--  -->
<template>
  <div class="tableFormStyle">
    <el-table border :key="Math.random()" :data="tableData" height="500" highlight-current-row>
      <el-table-column type="index"> </el-table-column>
      <el-table-column show-overflow-tooltip prop="adjust_money" :label="$t('common.adjust_money')">
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="created_id" :label="$t('common.created_id')">
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="created_at" :label="$t('common.created_at')">
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="updated_at" :label="$t('common.updated_at')">
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagination.page"
      :page-size="pagination.perpage"
      :page-sizes="[13, 18, 23, 28]"
      layout="total,  prev, pager, sizes,next, jumper"
      :total="pagination.total"
      style="text-align:right;"
    >
    </el-pagination>
  </div>
</template>

<script lang="ts">
interface IState {
  tableData: any[]
}
import { defineComponent, ref, reactive, toRefs, onMounted, computed } from 'vue'
export default defineComponent({
  props: {
    tableData: {
      type: Array,
      default: []
    }
  },
  setup(props, ctx) {
    const state: IState = reactive({
      tableData: computed(() => props.tableData)
    })
    const requests = {}
    const methods = {}
    return {
      ...toRefs(state),
      ...requests,
      ...methods
    }
  }
})
</script>
<style lang="scss" scoped></style>
