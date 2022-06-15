<!--
 * @Descripttion: 
 * @version: 
 * @Author: XJ
 * @Date: 2021-06-18 11:24:37
 * @LastEditors: TJ
 * @LastEditTime: 2022-06-15 17:26:33
-->
<!--  -->
<template>
  <div class="content">
    <el-button-group class="btns" size="mini">
      <el-button
        @click="clickBtns('sale_log')"
        :class="{ selected_btn: activeTable === 'sale_log' }"
        plain
        type="primary"
        >{{ $t('common.delivery_record') }}</el-button
      >
      <el-button
        @click="clickBtns('return_log')"
        :class="{ selected_btn: activeTable === 'return_log' }"
        plain
        type="primary"
        >{{ $t('common.return_log') }}</el-button
      >
    </el-button-group>
    <div class="tab2">
      <!-- 出库记录表格 -->
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
            v-if="item === 'handle_number'"
            show-overflow-tooltip
            :prop="item"
            :label="$t(`common.delivery_number`)"
          >
          </el-table-column>
          <el-table-column v-else show-overflow-tooltip :prop="item" :label="$t(`common.${item}`)">
          </el-table-column>
        </template>
      </el-table>
      <!-- 退货记录表格 -->
      <el-table
        v-else-if="activeTable === 'return_log'"
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
            v-if="item === 'handle_number'"
            show-overflow-tooltip
            :prop="item"
            :label="$t(`common.delivery_number`)"
          >
          </el-table-column>
          <el-table-column v-else show-overflow-tooltip :prop="item" :label="$t(`common.${item}`)">
          </el-table-column>
        </template>
      </el-table>
    </div>
    <div class="bot2">
      <el-pagination
        v-if="activeTable === 'sale_log'"
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
import { useI18n } from 'vue-i18n'
import { deliveryinventoryApi } from '@/http/api/othcustom/stockset/deliveryinventory'
import { IRequest } from '@/@types/httpInterface'
import dataStructure from '@/utils/dataStructure'
import { dateNormArray } from '@/utils/dateNorm'
export default defineComponent({
  setup() {
    const { t } = useI18n()
    const state = reactive({
      tableHeight: '100%',
      pagination: {
        page: 1,
        perpage: 18,
        total: 100
      },
      tableData: [],
      customArgs: {
        all_array: [],
        common_array: ['created_id', 'created_name', 'created_at', 'updated_at', 'id']
      },
      id: '',
      activeTable: 'sale_log'
    })
    const requests = {
      // 出库记录
      getLogList() {
        state.tableData = []
        state.customArgs.all_array = []
        const data = dataStructure(
          {},
          {
            page: state.pagination.page,
            perpage: state.pagination.perpage,
            order_by: 1,
            delivery_order_number: state.id
          }
        )
        deliveryinventoryApi
          .get_log_list(data)
          .then(res => {
            let { status, custom_data, info } = res as IRequest
            if (status === 200) {
              // 把custom中all_array去除公用部分
              if (!state.customArgs.all_array.length) {
                state.customArgs.all_array = custom_data.all_array
              }
              state.pagination.total = custom_data.total
              // 如果拿到数据为空则不用赋值
              if (!(custom_data.data && custom_data.data.length)) return
              let tableData: any = dateNormArray(custom_data.data)
              state.tableData = tableData
            }
          })
          .catch(err => err)
      },
      getReturnList() {
        state.tableData = []
        state.customArgs.all_array = []
        const data = dataStructure({}, { id: state.id })
        deliveryinventoryApi.get_return_list(data).then(res => {
          const { status, custom_data, info } = res as IRequest
          if (status === 200) {
            if (!state.customArgs.all_array.length) {
              state.customArgs.all_array = custom_data.all_array
            }
            // 如果拿到数据为空则不用赋值
            if (!(custom_data.data && custom_data.data.length)) return
            state.tableData = custom_data.data
          }
        })
      },
      selectRequest() {
        switch (state.activeTable) {
          case 'sale_log':
            requests.getLogList()
            break
          case 'return_log':
            requests.getReturnList()
            break
          default:
            break
        }
      }
    }
    const methods = {
      rowStyle(e: any) {
        const { row } = e
        // 表示符_：作用1：为了属性数据有唯一值
        // 作用二：表示此行数据已经红冲
        if (String(row.id).includes('_')) {
          return 'color:red !important'
        }
      },
      clickBtns(arg: string) {
        state.activeTable = arg
        requests.selectRequest()
      },
      handleSizeChange(perpage: number) {
        state.pagination.perpage = perpage
        requests.selectRequest() //传参顺序
      },
      handleCurrentChange(page: number) {
        state.pagination.page = page

        requests.selectRequest()
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
