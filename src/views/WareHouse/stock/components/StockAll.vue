<!--
 * @Descripttion: 
 * @version: 
 * @Author: XJ
 * @Date: 2021-06-18 11:24:37
 * @LastEditors: XJ
 * @LastEditTime: 2022-03-29 13:39:15
-->
<!--  -->
<template>
  <div class="content">
    <el-button-group class="btns" size="mini">
      <el-button plain type="primary">{{ $t('common.sale_de_log') }}</el-button>
    </el-button-group>
    <div class="tab2 tableButtonStyle">
      <el-table
        border
        :key="Math.random()"
        :data="tableData"
        :height="tableHeight"
        highlight-current-row
      >
        <el-table-column type="index"> </el-table-column>
        <template v-for="(item, index) in customArgs.all_array" :key="index">
          <el-table-column
            v-if="item === 'enter_at'"
            show-overflow-tooltip
            :prop="item"
            :label="$t(`common.sale_at`) + '/' + $t(`common.delivery_at`)"
          >
          </el-table-column>
          <el-table-column v-else show-overflow-tooltip :prop="item" :label="$t(`common.${item}`)">
          </el-table-column>
        </template>
      </el-table>
    </div>
    <div class="bot2">
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
import { defineComponent, ref, reactive, toRefs, inject, computed } from 'vue'
import { stockApi } from '@/http/api/othcustom/stockset/stock'
import { IRequest } from '@/@types/httpInterface'
import dataStructure from '@/utils/dataStructure'
import { dateNormArray } from '@/utils/dateNorm'
import { bus } from '@/utils/bus'
import { bus_siblings } from '@/constant/bus/bus_siblings'
export default defineComponent({
  setup() {
    const state = reactive({
      tableHeight: '100%',
      pagination: {
        page: 1,
        perpage: 18,
        total: 100,
        id: '',
        sale_order_number: ''
      },
      customArgs: {
        all_array: [],
        common_array: ['created_id', 'created_name', 'created_at', 'updated_at', 'id']
      },
      tableData: []
    })
    bus.$on(bus_siblings.SALE_ORDER_NUMBER, (e: any) => {
      const { id } = state.pagination
      requests.getLogList(id, e)
    })

    const requests = {
      // 库存管理操作记录接口：V1/Inventory/log_list
      getLogList(id: string, sale_order_number: string) {
        // 父组件更新数据需要存起来
        state.pagination.id = id
        state.pagination.sale_order_number = sale_order_number
        const data = dataStructure({}, state.pagination)
        stockApi
          .get_log_list(data)
          .then(res => {
            let { status, custom_data, info } = res as IRequest
            if (status === 200) {
              // 展示字段若已经赋过值，则此次请求不赋值
              if (!state.customArgs.all_array.length) {
                state.customArgs.all_array = custom_data.all_array
              }
              state.pagination.total = custom_data.total
              if (!(custom_data.data && custom_data.data.length)) return
              let array: any = dateNormArray(custom_data.data)
              state.tableData = array
            }
          })
          .catch(err => err)
      }
    }
    const methods = {
      // 操作日志表格条数改变
      handleSizeChange(perpage: number) {
        state.pagination.perpage = perpage
        const { id, sale_order_number } = state.pagination
        requests.getLogList(id, sale_order_number) //传参顺序
      },
      // 操作日志表格当前页改变
      handleCurrentChange(page: number) {
        state.pagination.page = page
        const { id, sale_order_number } = state.pagination
        requests.getLogList(id, sale_order_number)
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
  .bot2 {
    margin-top: 5px;
    height: 33px;
    width: 100%;
  }
}
</style>
