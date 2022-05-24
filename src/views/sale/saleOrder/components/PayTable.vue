<!--
 * @Descripttion: 
 * @version: 
 * @Author: HYH
 * @Date: 2021-08-25 14:16:36
 * @LastEditors: XJ
 * @LastEditTime: 2022-03-29 13:38:47
-->
<!--  -->
<template>
  <div class="tableFormStyle">
    <el-table border :key="Math.random()" :data="tableData" height="500" highlight-current-row>
      <el-table-column type="index"> </el-table-column>
      <el-table-column show-overflow-tooltip prop="inventory_order_id" :label="$t('common.id')">
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="account_number" :label="$t('common.account')">
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="payer" :label="$t('common.payee')">
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="currency_unit"
        :label="$t('common.currency_unit')"
      >
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="paid_amount" :label="$t('common.paid_amount')">
      </el-table-column>

      <el-table-column show-overflow-tooltip prop="explain" :label="$t('common.explain')">
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="picture" :label="$t('common.picture')">
        <template #default="scope">
          <div style="line-height:100%">
            <el-image
              v-for="(item, index) of scope.row.picture"
              :key="index"
              :src="configUrl + item.url"
              style="width: 22px;height: 22px;"
              :preview-src-list="[configUrl + item.url]"
            >
            </el-image>
          </div>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="created_id" :label="$t('common.created_id')">
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="created_at" :label="$t('common.created_at')">
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="updated_at" :label="$t('common.updated_at')">
      </el-table-column>
    </el-table>
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
      configUrl: process.env.VUE_APP_QIHONG_URL,
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
