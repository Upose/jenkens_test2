<!--
 * @Descripttion: 
 * @version: 
 * @Author: XJ
 * @Date: 2021-06-18 11:24:37
 * @LastEditors: XJ
 * @LastEditTime: 2022-03-29 12:01:20
-->
<!--  -->
<template>
  <div class="content">
    <el-button-group class="btns" size="mini">
      <el-button plain type="primary">{{ $t('common.delivery_record') }}</el-button>
    </el-button-group>
    <div class="tab2">
      <el-table
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
      }
    })
    const requests = {
      getLogList(childId: string = '') {
        const data = dataStructure(
          {},
          {
            page: state.pagination.page,
            perpage: state.pagination.perpage,
            order_by: 1,
            delivery_order_number: childId
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

      handleSizeChange(perpage: number) {
        state.pagination.perpage = perpage
        requests.getLogList() //传参顺序
      },
      handleCurrentChange(page: number) {
        state.pagination.page = page

        requests.getLogList()
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
