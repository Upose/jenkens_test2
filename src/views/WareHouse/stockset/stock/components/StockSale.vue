<!--
 * @Descripttion: 
 * @version: 
 * @Author: XJ
 * @Date: 2021-06-18 11:24:23
 * @LastEditors: XJ
 * @LastEditTime: 2022-03-29 13:39:20
-->
<!--  -->
<template>
  <div class="content">
    <el-button-group class="btns" size="mini">
      <el-button plain type="primary">{{ $t('common.sale_log') }}</el-button>
    </el-button-group>

    <div class="tab2 tableButtonStyle">
      <el-table
        border
        :key="Math.random()"
        :data="tableData"
        :height="tableHeight"
        @row-click="rowClick"
        highlight-current-row
      >
        <el-table-column type="index"> </el-table-column>
        <template v-for="(item, index) in customArgs.all_array" :key="index">
          <el-table-column
            v-if="item === 'enter_at'"
            show-overflow-tooltip
            :prop="item"
            :label="$t(`common.sale_at`)"
          >
          </el-table-column>
          <el-table-column v-else show-overflow-tooltip :prop="item" :label="$t(`common.${item}`)">
          </el-table-column>
        </template>
      </el-table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs } from 'vue'
import { useI18n } from 'vue-i18n'
import { stockApi } from '@/http/api/othcustom/stockset/stock'
import { IRequest } from '@/@types/httpInterface'
import dataStructure from '@/utils/dataStructure'
import { dateNormArray } from '@/utils/dateNorm'
import { bus } from '@/utils/bus'
import { bus_siblings } from '@/constant/bus/bus_siblings'
export default defineComponent({
  setup() {
    const { t } = useI18n()
    const state = reactive({
      tableHeight: '100%',
      tableData: [],
      customArgs: {
        all_array: [],
        common_array: ['created_id', 'created_name', 'created_at', 'updated_at', 'id']
      }
    })
    const requests = {
      //  卖出列表接口：V1/Inventory/sale_list========用于下方表格
      getSaleList1(id: string) {
        const data = dataStructure(
          {},
          {
            inventory_id: id
          }
        )
        stockApi
          .get_sale_list(data)
          .then(res => {
            let { status, custom_data, info } = res as IRequest
            if (status === 200) {
              // 展示字段若已经赋过值，则此次请求不赋值
              if (!state.customArgs.all_array.length) {
                state.customArgs.all_array = custom_data.all_array
              }
              // 如果拿到数据为空则不用赋值
              if (!(custom_data.data && custom_data.data.length)) return
              let array: any = dateNormArray(custom_data.data)
              state.tableData = array
            }
          })
          .catch(err => err)
      }
    }
    const methods = {
      rowClick(arg: any) {
        let sale_order_number = arg.sale_order_number
        bus.$emit(bus_siblings.SALE_ORDER_NUMBER, sale_order_number)
      }
    }
    return {
      ...toRefs(state),
      ...methods,
      ...requests
    }
  }
})
</script>
<style lang="scss" scoped>
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
}
</style>
