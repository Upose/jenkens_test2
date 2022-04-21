<!--
 * @Descripttion: 
 * @version: 
 * @Author: XJ
 * @Date: 2021-06-18 11:24:23
 * @LastEditors: XJ
 * @LastEditTime: 2022-03-30 17:07:53
-->
<!--  -->
<template>
  <div class="content">
    <el-button-group class="btns" size="mini">
      <!-- <el-button plain type="primary">{{ $t('common.detail') }}</el-button> -->
      <el-button
        @click="clickBtns('detail')"
        plain
        type="primary"
        :class="{ selected_btn: activeTable === 'detail' }"
        >{{ $t('common.detail') }}</el-button
      >
      <el-button
        @click="clickBtns('payer_log')"
        plain
        type="primary"
        :class="{ selected_btn: activeTable === 'payer_log' }"
        >{{ $t('common.payer_log') }}</el-button
      >
    </el-button-group>

    <div class="tab2">
      <el-table
        v-if="activeTable === 'detail'"
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
      <el-table
        v-else
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
        <el-table-column
          show-overflow-tooltip
          prop="stock_statistics_id"
          :label="$t('common.stock_statistics_id')"
        >
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="stock_type_name"
          :label="$t('common.stock_type_name')"
        >
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="created_at" :label="$t('common.created_at')">
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="account_number"
          :label="$t('common.account_number')"
        >
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="created_name" :label="$t('common.payer')">
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="number" :label="$t('common.number')">
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="currency_unit_name"
          :label="$t('common.settlement_currency')"
        >
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
      </el-table>
    </div>
    <div class="bot2" v-if="activeTable === 'detail'">
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
import { purchaseApi } from '@/http/api/othcustom/stockset/purchase'
import { dateNormArray } from '@/utils/dateNorm'
import { IRequest } from '@/@types/httpInterface'
import dataStructure from '@/utils/dataStructure'
import { defineComponent, ref, reactive, onMounted, toRefs } from 'vue'
export default defineComponent({
  setup() {
    const state = reactive({
      tableData: [],
      tableHeight: '100%',
      customArgs: {
        all_array: []
      },
      pagination: {
        page: 1,
        perpage: 18,
        total: 100
      },
      order_number: '',
      id: '',
      activeTable: 'detail'
    })
    const requests = {
      // 详情
      getInventoryList() {
        const args = dataStructure(
          {},
          {
            page: state.pagination.page,
            perpage: state.pagination.perpage,
            id: state.id
          }
        )
        purchaseApi
          .get_inventory_list(args)
          .then(res => {
            let { status, custom_data, info } = res as IRequest
            if (status === 200) {
              if (!custom_data || !custom_data.data) return

              // 展示字段若已经赋过值，则此次请求不赋值
              if (!state.customArgs.all_array.length) {
                state.customArgs.all_array = custom_data.all_array
              }
              state.pagination.total = custom_data.total
              // 如果拿到数据为空则不用赋值
              if (!(custom_data.data && custom_data.data.length)) return
              let data: any = dateNormArray(custom_data.data)
              state.tableData = data
            }
          })
          .catch(err => err)
      },
      // 付款记录
      getCertificatePaymentList() {
        const args = dataStructure(
          {},
          {
            id: state.id,
            order_by: 1
          }
        )
        purchaseApi
          .get_certificate_of_payment_list(args)
          .then(res => {
            let { status, custom_data, info } = res as IRequest
            if (status === 200) {
              let data: any = dateNormArray(custom_data.data)

              state.tableData = data
            }
          })
          .catch(err => err)
      }
    }
    const methods = {
      clickBtns(arg: any) {
        state.activeTable = arg

        methods.selectRequest()
      },
      selectRequest() {
        const id = state.id
        switch (state.activeTable) {
          case 'detail':
            requests.getInventoryList()
            break
          case 'payer_log':
            requests.getCertificatePaymentList()
            break
          default:
            break
        }
      },
      rowStyle(e: any) {
        const { row } = e
        // 表示符_：作用1：为了属性数据有唯一值
        // 作用二：表示此行数据已经红冲
        if (row.id.includes('_')) {
          return 'color:red !important'
        }
      },
      // 条数改变
      handleSizeChange(perpage: number) {
        state.pagination.perpage = perpage

        requests.getInventoryList() //传参顺序
      },
      // 当前页改变
      handleCurrentChange(page: number) {
        state.pagination.page = page

        requests.getInventoryList() //传参顺序
      }
    }
    return {
      ...toRefs(state),
      ...requests,
      ...methods
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
