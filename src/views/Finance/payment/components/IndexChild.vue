<!--
 * @Descripttion: 
 * @version: 
 * @Author: XJ
 * @Date: 2021-06-18 11:24:37
 * @LastEditors: HYH
 * @LastEditTime: 2022-05-06 11:48:19
-->
<!--  -->
<template>
  <div class="content">
    <el-button-group class="btns" size="mini">
      <el-button
        @click="clickBtns('detail')"
        plain
        type="primary"
        :class="{ selected_btn: activeTable === 'detail' }"
        >{{ $t('common.detail') }}</el-button
      >
      <el-button
        @click="clickBtns('historical_documents')"
        plain
        type="primary"
        :class="{ selected_btn: activeTable === 'historical_documents' }"
        >{{ $t('common.historical_documents') }}</el-button
      >
    </el-button-group>
    <div class="tab2">
      <!-- 详情 -->
      <el-table
        v-if="activeTable === 'detail'"
        border
        :key="Math.random()"
        :data="tableData"
        :height="tableHeight"
        highlight-current-row
        @cell-click="cellClick"
        :cell-style="cellStyle"
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
        <el-table-column
          show-overflow-tooltip
          prop="picture"
          :label="$t(`common.payer_certificate`)"
        >
          <template #default="scope">
            <div style="height:22px;line-height:22px">
              <el-image
                v-for="(item, index) in scope.row.picture"
                :key="index"
                style="width:22px;height:22px;"
                :src="item.url"
                :preview-src-list="[item.url]"
                alt="#"
              />
            </div>
          </template>
        </el-table-column>
      </el-table>
      <!-- 修改记录 -->
      <el-table
        v-else-if="activeTable === 'historical_documents'"
        border
        :key="Math.random()"
        :data="tableData"
        :height="tableHeight"
        highlight-current-row
      >
        <el-table-column type="index"> </el-table-column>

        <el-table-column show-overflow-tooltip prop="status_name" :label="$t('common.handle')">
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="created_name" label="操作人">
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="updated_at" label="操作时间">
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="explain" label="操作原因"> </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue'
import { paymentApi } from '@/http/api/financecustom/payment/index'
import { IRequest } from '@/@types/httpInterface'
import dataStructure from '@/utils/dataStructure'
import { dateNormArray } from '@/utils/dateNorm'
import { useRoute, useRouter } from 'vue-router'
import { updateTabs } from '@/utils/updateTabs'
import { useI18n } from 'vue-i18n'
import { ElMessageBox, ElMessage } from 'element-plus'
interface IState {
  tableHeight: any
  activeTable: any
  tableData: any[]
  id: any
}
export default defineComponent({
  setup() {
    const { t } = useI18n()
    const router = useRouter()
    const state: IState = reactive({
      tableHeight: '100%',
      activeTable: 'detail',
      tableData: [],
      id: ''
    })

    const requests = {
      // 财务中心付款管理详情接口：V1/PaymentManagement/details_list
      getDetailsList(id: any) {
        // 先清空再赋值
        state.tableData = []
        const data = dataStructure({}, { id })
        paymentApi
          .get_details_list(data)
          .then(res => {
            let { status, custom_data, info } = res as IRequest
            if (status === 200) {
              let data = dateNormArray(custom_data.data)

              data.forEach((item: any, index: any) => {
                let newRow = {
                  stock_statistics_id: item?.stock_statistics_id,
                  stock_type_name: item?.stock_type_name,
                  created_at: item?.created_at,
                  payer_name: item?.payer,
                  account_number_name: item?.account_number,
                  number: item?.number,
                  payment_money: item?.payment_money,
                  wait_money: item?.wait_money,
                  real_payment_money: item?.real_payment_money,
                  currency_unit_name: item?.currency_unit_name,
                  picture: item?.picture
                }
                state.tableData.push(newRow)
              })
            }
          })
          .catch(err => err)
      },

      getHistorical(id: any) {
        // 先清空再赋值
        state.tableData = []
        const data = dataStructure({}, { id })
        paymentApi
          .get_historical(data)
          .then(res => {
            let { status, custom_data, info } = res as IRequest
            if (status === 200) {
              let data = dateNormArray(custom_data.data)

              data.forEach((item: any, index: any) => {
                let newRow = {
                  updated_at: item?.updated_at,
                  created_name: item?.created_name,
                  explain: item?.explain,
                  status_name: item?.status_name
                }
                state.tableData.push(newRow)
              })
            }
          })
          .catch(err => err)
      }
    }
    const methods = {
      // 详情时点击表格行跳转进货信息
      cellClick(row: any, column: any) {
        if (column.property === 'stock_statistics_id') {
          const { stock_statistics_id } = row
          let url = '/index/othcustom/stockset/purchase'
          // 路由跳转及传参
          router.push({
            path: url,
            query: { search_value: stock_statistics_id }
          })
          // 更新tabs
          updateTabs(url)
        }
        return
      },
      clickBtns(arg: any) {
        state.activeTable = arg
        methods.selectRequest()
      },
      selectRequest() {
        switch (state.activeTable) {
          case 'detail':
            requests.getDetailsList(state.id)
            break
          case 'historical_documents':
            requests.getHistorical(state.id)
            break
          default:
            break
        }
      },
      cellStyle(e: any) {
        const { row, column, rowIndex, columnIndex } = e
        if (column.property === 'stock_statistics_id') {
          return 'text-decoration:underline blue !important;cursor: pointer;'
        }
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
