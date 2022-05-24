<!--
 * @Descripttion: 
 * @version: 
 * @Author: XJ
 * @Date: 2021-06-18 11:24:37
 * @LastEditors: HYH
 * @LastEditTime: 2022-05-20 10:46:00
-->
<!--  -->
<template>
  <div class="content">
    <el-button-group class="btns" size="mini">
      <el-button
        @click="clickBtns('sale_log')"
        plain
        type="primary"
        :class="{ selected_btn: activeTable === 'sale_log' }"
        >{{ $t('common.sale_log') }}</el-button
      >
      <el-button
        @click="clickBtns('delivery_log')"
        plain
        type="primary"
        :class="{ selected_btn: activeTable === 'delivery_log' }"
        >{{ $t('common.delivery_log') }}</el-button
      >
      <el-button
        @click="clickBtns('return_log')"
        plain
        type="primary"
        :class="{ selected_btn: activeTable === 'return_log' }"
        >{{ $t('common.return_log') }}</el-button
      >
      <el-button
        @click="clickBtns('adjust_log')"
        plain
        type="primary"
        :class="{ selected_btn: activeTable === 'adjust_log' }"
        >{{ $t('common.adjust_log') }}</el-button
      >
      <el-button
        @click="clickBtns('payee_log')"
        plain
        type="primary"
        :class="{ selected_btn: activeTable === 'payee_log' }"
        >{{ $t('common.payee_log') }}</el-button
      >
    </el-button-group>
    <div class="tab2">
      <!-- 销售记录 -->
      <el-table
        v-if="activeTable === 'sale_log'"
        border
        :key="Math.random()"
        :data="tableData"
        :height="tableHeight"
        highlight-current-row
        :row-style="rowStyle"
        row-key="id"
        :tree-props="{
          children: 'children',
          hasChildren: 'hasChildren'
        }"
        default-expand-all
      >
        <el-table-column type="index"> </el-table-column>
        <template v-for="(item, index) in customArgs.all_array" :key="index">
          <el-table-column
            v-if="item === 'inventory_warehouse_name'"
            show-overflow-tooltip
            :prop="item"
            :label="$t(`common.delivery_inventory_warehouse_name`)"
          >
          </el-table-column>
          <el-table-column
            v-else-if="item === 'handle_number'"
            show-overflow-tooltip
            :prop="item"
            :label="$t(`common.number`)"
          >
          </el-table-column>
          <el-table-column
            v-else-if="item === 'created_name'"
            show-overflow-tooltip
            :prop="item"
            :label="$t(`common.created_order`)"
          >
          </el-table-column>
          <el-table-column
            v-else-if="item === 'created_at'"
            show-overflow-tooltip
            :prop="item"
            :label="$t(`common.created_order_time`)"
          >
          </el-table-column>
          <el-table-column
            v-else-if="item === 'sale_money'"
            show-overflow-tooltip
            :prop="item"
            :label="$t(`common.money`)"
          >
          </el-table-column>
          <el-table-column
            v-else-if="item === 'sale_unit_money'"
            show-overflow-tooltip
            :prop="item"
            :label="$t(`common.unit_selling_price`)"
          >
          </el-table-column>
          <el-table-column v-else show-overflow-tooltip :prop="item" :label="$t(`common.${item}`)">
          </el-table-column>
        </template>
      </el-table>
      <!-- 出库记录 -->
      <el-table
        v-else-if="activeTable === 'delivery_log'"
        border
        :key="Math.random()"
        :data="tableData"
        :height="tableHeight"
        highlight-current-row
        :row-style="rowStyle"
        row-key="id"
        :tree-props="{
          children: 'children',
          hasChildren: 'hasChildren'
        }"
        default-expand-all
      >
        <el-table-column type="index"> </el-table-column>
        <template v-for="(item, index) in customArgs.all_array" :key="index">
          <el-table-column
            v-if="item === 'id'"
            show-overflow-tooltip
            :prop="item"
            :label="$t(`common.delivery_order_number`)"
          >
          </el-table-column>
          <el-table-column v-else show-overflow-tooltip :prop="item" :label="$t(`common.${item}`)">
          </el-table-column>
        </template>
      </el-table>
      <!-- 调整记录 -->
      <el-table
        v-else-if="activeTable === 'adjust_log'"
        border
        :key="Math.random()"
        :data="tableData"
        :height="tableHeight"
        highlight-current-row
        :row-style="rowStyle"
        row-key="key"
        :tree-props="{
          children: 'children',
          hasChildren: 'hasChildren'
        }"
        default-expand-all
      >
        <el-table-column type="index"> </el-table-column>
        <template v-for="(item, index) in customArgs.all_array" :key="index">
          <el-table-column
            v-if="item === 'created_at'"
            show-overflow-tooltip
            :prop="item"
            :label="$t(`common.adjust_time`)"
          >
          </el-table-column>
          <el-table-column
            v-else-if="item === 'created_name'"
            show-overflow-tooltip
            :prop="item"
            :label="$t(`common.adjust_person`)"
          >
          </el-table-column>
          <el-table-column
            v-else-if="item === 'model_number'"
            show-overflow-tooltip
            :prop="item"
            :label="$t(`common.model_number_name`)"
          >
          </el-table-column>
          <el-table-column
            v-else-if="item === 'inventory_type'"
            show-overflow-tooltip
            :prop="item"
            :label="$t(`common.inventory_type_name`)"
          >
          </el-table-column>
          <el-table-column
            v-else-if="item === 'sale_money'"
            show-overflow-tooltip
            :prop="item"
            :label="$t(`common.before_adjust_money`)"
          >
          </el-table-column>
          <el-table-column
            v-else-if="item === 'reason'"
            show-overflow-tooltip
            :prop="item"
            :label="$t(`common.adjust_reason`)"
          >
          </el-table-column>

          <el-table-column v-else show-overflow-tooltip :prop="item" :label="$t(`common.${item}`)">
          </el-table-column>
        </template>
      </el-table>
      <!-- 收款记录 -->
      <el-table
        v-else-if="activeTable === 'payee_log'"
        border
        :key="Math.random()"
        :data="tableData"
        :height="tableHeight"
        highlight-current-row
        row-key="id"
        :tree-props="{
          children: 'children',
          hasChildren: 'hasChildren'
        }"
        default-expand-all
      >
        <el-table-column type="index"> </el-table-column>
        <template v-for="(item, index) in customArgs.all_array" :key="index">
          <el-table-column show-overflow-tooltip :prop="item" :label="$t(`common.${item}`)">
          </el-table-column>
        </template>
      </el-table>
      <!-- 退货记录 -->
      <el-table
        v-else
        border
        :key="Math.random()"
        :data="tableData"
        :height="tableHeight"
        highlight-current-row
        :row-style="rowStyle"
        row-key="id"
        :tree-props="{
          children: 'children',
          hasChildren: 'hasChildren'
        }"
        default-expand-all
      >
        <el-table-column type="index"> </el-table-column>
        <template v-for="(item, index) in customArgs.all_array" :key="index">
          <el-table-column show-overflow-tooltip :prop="item" :label="$t(`common.${item}`)">
          </el-table-column>
        </template>
      </el-table>
    </div>
    <div class="bot2" v-if="activeTable === 'sale_log'">
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
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue'
import { saleinventoryApi } from '@/http/api/othcustom/stockset/saleinventory'
import { IRequest } from '@/@types/httpInterface'
import dataStructure from '@/utils/dataStructure'
import { dateNormArray } from '@/utils/dateNorm'
export default defineComponent({
  setup() {
    const state = reactive({
      tableHeight: '100%',
      activeTable: 'sale_log',
      pagination: {
        page: 1,
        perpage: 18,
        total: 100
      },
      tableData: [],
      sale_order_number: '',
      customArgs: {
        all_array: [],
        common_array: ['created_id', 'created_name', 'created_at', 'updated_at', 'id', 'explain']
      }
    })

    const requests = {
      // 调整记录
      getAdjustSaleMoneyList() {
        // 先清空再赋值
        state.tableData = []
        state.customArgs.all_array = []
        const data = dataStructure(
          {},
          {
            sale_order_number: state.sale_order_number
          }
        )
        saleinventoryApi
          .get_adjust_sale_money_list(data)
          .then(res => {
            let { status, custom_data, info } = res as IRequest
            if (status === 200) {
              state.pagination.total = custom_data.total
              state.customArgs.all_array = custom_data.all_array
              let tableData: any = dateNormArray(custom_data.data)
              state.tableData = tableData
            }
          })
          .catch(err => err)
      },
      // 销售记录
      getSaleLogList() {
        // 先清空再赋值
        state.tableData = []
        state.customArgs.all_array = []
        const data = dataStructure(
          {},
          {
            page: state.pagination.page,
            perpage: state.pagination.perpage,
            order_by: 1,
            sale_order_number: state.sale_order_number
          }
        )
        saleinventoryApi
          .get_sale_log_list(data)
          .then(res => {
            let { status, custom_data, info } = res as IRequest
            if (status === 200) {
              state.pagination.total = custom_data.total
              state.customArgs.all_array = custom_data.all_array
              let tableData: any = dateNormArray(custom_data.data)
              state.tableData = tableData
            }
          })
          .catch(err => err)
      },
      // 出库记录
      getDeliveryLogList() {
        // 先清空再赋值
        state.tableData = []
        state.customArgs.all_array = []
        const data = dataStructure(
          {},
          {
            sale_order_number: state.sale_order_number
          }
        )
        saleinventoryApi
          .get_delivery_log_list(data)
          .then(res => {
            let { status, custom_data, info } = res as IRequest
            if (status === 200) {
              state.customArgs.all_array = custom_data.all_array
              let tableData: any = dateNormArray(custom_data.data)
              state.tableData = tableData
            }
          })
          .catch(err => err)
      },
      // 退货记录
      getSalesReturnList() {
        // 先清空再赋值
        state.tableData = []
        state.customArgs.all_array = []
        const data = dataStructure(
          {},
          {
            id: state.sale_order_number
          }
        )
        saleinventoryApi
          .get_sales_return_list(data)
          .then(res => {
            let { status, custom_data, info } = res as IRequest
            if (status === 200) {
              state.customArgs.all_array = custom_data.all_array
              let tableData: any = dateNormArray(custom_data.data)
              state.tableData = tableData
            }
          })
          .catch(err => err)
      },
      // 收款记录
      getCertificatePaymentList() {
        // 先清空再赋值
        state.tableData = []
        state.customArgs.all_array = []
        const args = dataStructure(
          {},
          {
            id: state.sale_order_number,
            order_by: 1
          }
        )
        saleinventoryApi
          .get_certificate_payment_list(args)
          .then(res => {
            let { status, custom_data, info } = res as IRequest
            if (status === 200) {
              state.customArgs.all_array = custom_data.all_array

              let tableData: any = dateNormArray(custom_data.data)
              state.tableData = tableData
            }
          })
          .catch(err => err)
      }
    }
    const methods = {
      rowStyle(e: any) {
        const { row } = e
        // 当前为销售记录，且含有表示符_表示此行数据已经红冲
        if (state.activeTable === 'sale_log' && String(row?.id).includes('_')) {
          return 'color:red !important'
        }
      },
      clickBtns(arg: any) {
        state.activeTable = arg
        methods.selectRequest()
      },
      selectRequest() {
        switch (state.activeTable) {
          case 'sale_log':
            requests.getSaleLogList()
            break
          case 'delivery_log':
            requests.getDeliveryLogList()
            break
          case 'return_log':
            requests.getSalesReturnList()
            break
          case 'adjust_log':
            requests.getAdjustSaleMoneyList()
            break
          case 'payee_log':
            requests.getCertificatePaymentList()
            break
          default:
            break
        }
      },
      handleSizeChange(perpage: number) {
        state.pagination.perpage = perpage
        methods.selectRequest()
      },
      handleCurrentChange(page: number) {
        state.pagination.page = page
        methods.selectRequest()
      }
    }
    onMounted(() => {
      // #父组件已经加载
      // requests.getSaleLogList()
    })
    return {
      ...toRefs(state),
      ...methods,
      ...requests
    }
  }
})
</script>
<style lang="scss" scoped>
@import '@/assets/css/element-common-style.scss';

.content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .btns {
    height: 30px;
    width: 100%;
  }
  .tab2 {
    height: 0;
    flex: 1;
    width: 100%;
  }
  .bot2 {
    margin-top: 5px;
    height: 33px;
    width: 100%;
  }
}
</style>
