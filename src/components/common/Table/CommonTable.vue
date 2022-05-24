<!--
 * @Description: 
 * @version: 
 * @Author: HYH
 * @Date: 2021-08-05 18:26:53
 * @LastEditors: HYH
 * @LastEditTime: 2022-05-24 15:08:16
-->
<!--  -->
<template>
  <el-table
    v-if="showTable"
    border
    highlight-current-row
    :data="tableData"
    ref="singleTable"
    @row-click="rowClick"
    :height="tableHeight"
    @header-click="headerClick"
    :cell-class-name="cellClassName"
    :header-cell-class-name="headerCellClassName"
    @sort-change="sortChange"
    :summary-method="summaryMethod"
    :show-summary="Object.keys(statistics).length ? true : false"
    :row-style="rowStyle"
  >
    <el-table-column type="index" label="⚙" v-if="showConfig"> </el-table-column>

    <el-table-column type="index" v-else> </el-table-column>

    <template v-for="(item, index) in all_array" :key="index">
      <!-- 不需要特殊处理的 -->
      <el-table-column
        :sortable="item.isSort ? 'custom' : null"
        v-if="
          item.label !== 'is_enabled' &&
            !(item.label === 'photo' && table !== 'inventory_client') &&
            !(item.label === 'picture' && table === 'payment_management') &&
            !(item.label === 'picture' && table === 'receivables_management') &&
            item.label !== 'gender' &&
            item.label !== 'job_status'
        "
        show-overflow-tooltip
        :prop="item.label"
        :label="$t(`common.${item.translate_label}`)"
      >
      </el-table-column>
      <!-- 以下情况特殊处理字段 -->
      <!--is_enabled=====>渲染成el-switch -->
      <el-table-column
        :sortable="item.isSort ? 'custom' : null"
        v-else-if="item.label === 'is_enabled'"
        show-overflow-tooltip
        :prop="item.label"
        :label="$t(`common.is_enabled`)"
      >
        <template #default="scope">
          <el-switch
            :active-value="1"
            :inactive-value="0"
            v-model="scope.row.is_enabled"
            disabled
          ></el-switch>
        </template>
      </el-table-column>
      <!--photo ==>显示成图片 -->
      <el-table-column
        :sortable="item.isSort ? 'custom' : null"
        v-else-if="item.label === 'photo' && table !== 'inventory_client'"
        show-overflow-tooltip
        :prop="item.label"
        :label="$t(`common.photo`)"
      >
        <template #default="scope">
          <div style="height:22px;line-height:22px">
            <el-image
              style="width:22px;height:22px;"
              :src="scope.row.photo"
              :preview-src-list="[scope.row.photo]"
              :onerror="defaultImg"
              alt="#"
            />
          </div>
        </template>
      </el-table-column>
      <!--财务中心付款picture ==>显示成图片 -->
      <el-table-column
        :sortable="item.isSort ? 'custom' : null"
        v-else-if="item.label === 'picture' && table === 'payment_management'"
        show-overflow-tooltip
        :prop="item.label"
        :label="$t(`common.payer_certificate`)"
      >
        <template #default="scope">
          <div style="height:22px;line-height:22px">
            <el-image
              v-for="(item2, index2) in scope.row.picture"
              :key="index2"
              style="width:22px;height:22px;"
              :src="item2.url"
              :preview-src-list="[item2.url]"
              alt="#"
            />
          </div>
        </template>
      </el-table-column>
      <!--财务中心收款picture ==>显示成图片 -->
      <el-table-column
        :sortable="item.isSort ? 'custom' : null"
        v-else-if="item.label === 'picture' && table === 'receivables_management'"
        show-overflow-tooltip
        :prop="item.label"
        :label="$t(`common.payee_certificate`)"
      >
        <template #default="scope">
          <div style="height:22px;line-height:22px">
            <el-image
              v-for="(item2, index2) in scope.row.picture"
              :key="index2"
              style="width:22px;height:22px;"
              :src="item2.url"
              :preview-src-list="[item2.url]"
              alt="#"
            />
          </div>
        </template>
      </el-table-column>
      <!--gender ==>显示成男女 -->
      <el-table-column
        :sortable="item.isSort ? 'custom' : null"
        v-else-if="item.label === 'gender'"
        show-overflow-tooltip
        :prop="item.label"
        :label="$t(`common.gender`)"
      >
        <template #default="scope">
          <span>{{ scope.row.gender === 0 ? $t('common.women') : $t('common.man') }}</span>
        </template>
      </el-table-column>
      <!--job_status ==>显示成用文字表示具体工作状态 -->
      <el-table-column
        :sortable="item.isSort ? 'custom' : null"
        v-else-if="item.label === 'job_status'"
        show-overflow-tooltip
        :prop="item.label"
        :label="$t(`common.job_status`)"
      >
        <template #default="scope">
          <span>{{
            scope.row.job_status === 0
              ? $t('common.job_status_leave')
              : scope.row.job_status === 1
              ? $t('common.job_status_on')
              : $t('common.job_status_quit')
          }}</span>
        </template>
      </el-table-column>
    </template>
  </el-table>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
  toRefs,
  onMounted,
  onUnmounted,
  nextTick,
  computed,
  watch
} from 'vue'
import { MutationConstants } from '@/store/modules/index/constants'
import { useStore } from '@/store'
import dataStructure from '@/utils/dataStructure'
import { commonApi } from '@/http/api/common'
import { IRequest } from '@/@types/httpInterface'
import { bus } from '@/utils/bus'
interface IState {
  defaultImg: any
  all_array: any
  tableHeight: any
  showTable: boolean
  showConfig: boolean
}
export default defineComponent({
  props: {
    common_array: {
      type: Array,
      default: []
    },
    tableData: {
      type: Array,
      default: []
    },
    table: {
      type: String,
      default: ''
    },
    handle_array: {
      type: Array,
      default: []
    },
    statistics: {
      type: Object,
      default: {}
    }
  },
  emits: ['rowClick', 'headerClick', 'sortChange'],
  setup(props, ctx) {
    const store = useStore()
    const singleTable = ref()
    const state: IState = reactive({
      /**加载失败图片 */
      defaultImg: 'this.src="' + require('@/assets/img/common/avatar.jpg') + '"',
      all_array: [],
      tableHeight: '100%',
      showTable: true,
      showConfig: false //0：用户没有自定义列权限，1有
    })

    // bus总线监听
    bus.$on(props.table, (e: any) => {
      state.showTable = false
      let filter_arr = methods.handleAllArray(e)
      state.all_array = filter_arr
      /**
       * 解决异常：1 表头和内容对不上。通过v-if切换迫使table重新渲染
       *        2 再次点击表头浏览器默认右键又被触发-->未解决
       * */

      // el_hover.style.background = 'green'
      nextTick(() => {
        state.showTable = true
      })
      requests.getCustomUpd(e)
    })
    const requests = {
      getCustom() {
        const data = dataStructure(
          {},
          {
            table: props.table
          }
        )
        commonApi
          .get_custom(data)
          .then(res => {
            let { status, custom_data, info } = res as IRequest
            if (status === 200) {
              const { all_array } = custom_data.data
              let filter_arr = methods.handleAllArray(all_array)
              state.all_array = filter_arr
              state.showConfig = Boolean(custom_data.show)
            }
          })
          .catch(err => err)
      },
      getCustomUpd(all_array: any) {
        const data = dataStructure(
          { power_url: 'V1/Public/the_custom_column_upd' },
          {
            table: props.table,
            all_array
          }
        )
        commonApi
          .get_custom_upd(data)
          .then(res => {
            let { status, custom_data, info } = res as IRequest
            if (status === 200) {
            }
          })
          .catch(err => err)
      }
    }
    const methods = {
      // 处理all_array:后端不同页面都给ID，但每个页面id对应的翻译却不一样
      handleAllArray(arr: any[]) {
        // 筛选出isChecked==true需展示字段；增加一个真实翻译字段
        let filter_arr = arr
          .map((item: any) => {
            item.translate_label = item.label
            return item
          })
          .filter(item2 => item2.isChecked)
        switch (props.table) {
          // 进货信息
          case 'stock_statistics':
            filter_arr.forEach((item: any) => {
              if (item.translate_label === 'id') item.translate_label = 'purchase_order'
              if (item.translate_label === 'created_name') item.translate_label = 'created_order'
              if (item.translate_label === 'created_at') item.translate_label = 'created_order_time'
              if (item.translate_label === 'account_at') item.translate_label = 'pay_account_at'
            })
            break
          // 出库信息
          case 'inventory_delivery':
            filter_arr.forEach((item: any) => {
              if (item.translate_label === 'id') item.translate_label = 'delivery_order_number'
              if (item.translate_label === 'number') item.translate_label = 'delivery_number'
              if (item.translate_label === 'created_name') item.translate_label = 'created_order'
              if (item.translate_label === 'created_at') item.translate_label = 'created_order_time'
            })
            break
          // 销售信息
          case 'inventory_order':
            filter_arr.forEach((item: any) => {
              if (item.translate_label === 'id') {
                item.translate_label = 'sale_order_number'
              }
              if (item.translate_label === 'created_name') item.translate_label = 'created_order'
              if (item.translate_label === 'created_at') item.translate_label = 'created_order_time'
              if (item.translate_label === 'wait_money')
                item.translate_label = 'wait_collection_money'
              if (item.translate_label === 'payment_status')
                item.translate_label = 'collection_status'
              if (item.translate_label === 'payment_status_name')
                item.translate_label = 'collection_status_name'
              if (item.translate_label === 'account_at') item.translate_label = 'collect_account_at'
              if (item.translate_label === 'com_code_name')
                item.translate_label = 'sale_com_code_name'
            })
            break
          // 库存型号
          case 'inventory_model':
            filter_arr.forEach((item: any) => {
              if (item.translate_label === 'name') {
                item.translate_label = 'model_number_name'
              }
            })
            break
          // 财务中心/付款管理
          case 'payment_management':
            filter_arr.forEach((item: any) => {
              if (item.translate_label === 'id') {
                item.translate_label = 'config_number'
              }
              if (item.translate_label === 'currency_unit_name') {
                item.translate_label = 'settlement_currency'
              }
              if (item.translate_label === 'payment_money') {
                item.translate_label = 'payer_money'
              }
              if (item.translate_label === 'picture') {
                item.translate_label = 'payer_certificate'
              }
              if (item.translate_label === 'created_name') {
                item.translate_label = 'payer'
              }
              // "payment_money"
            })
            break
          //财务中心/收款管理
          case 'receivables_management':
            filter_arr.forEach((item: any) => {
              if (item.translate_label === 'id') {
                item.translate_label = 'collection_order_number'
              }
              if (item.translate_label === 'pay_at') {
                item.translate_label = 'collect_at'
              }
              if (item.translate_label === 'currency_unit_name') {
                item.translate_label = 'settlement_currency'
              }
              if (item.translate_label === 'paid_amount') {
                item.translate_label = 'payee_money'
              }
              if (item.translate_label === 'created_name') {
                item.translate_label = 'payee'
              }
            })
            break
          //客户信息
          case 'inventory_client':
            filter_arr.forEach((item: any) => {
              if (item.translate_label === 'photo') {
                item.translate_label = 'phone'
              }
            })
            break
          default:
            break
        }

        return filter_arr
      },
      // 排序方法
      // 个别字段重新排序
      sortChange(arg: any) {
        ctx.emit('sortChange', arg)
      },
      // 设置索引行表头字体大小
      // headerCellStyle(e: any) {
      //   const { row, column, rowIndex, columnIndex } = e
      //   if (columnIndex == 0) {
      //     return 'font-size:23px;line-height: 23px;'
      //   }
      // },
      // // 设置索引行背景
      // cellStyle(e: any) {
      //   const { row, column, rowIndex, columnIndex } = e
      //   if (columnIndex == 0) {
      //     return 'background-color:#F6FCFF;color:#5A5555'
      //   }
      // },
      // 设置索引行表头字体大小
      headerCellClassName(e: any) {
        const { row, column, rowIndex, columnIndex } = e
        if (columnIndex == 0) {
          return 'header_cell_calss_name1'
        }
      },
      // 设置索引行背景
      cellClassName(e: any) {
        const { row, column, rowIndex, columnIndex } = e
        if (columnIndex == 0) {
          return 'cell_calss_name1'
        }
      },

      setCurrentRow() {
        const singletable = singleTable
        singletable.value.setCurrentRow()
      },
      rowClick(val: any) {
        ctx.emit('rowClick', val)
      },
      headerClick(column: any, event: any) {
        const { type } = column
        if (type === 'index' && state.showConfig) {
          ctx.emit('headerClick', true)
        }
      },
      summaryMethod(param: any) {
        const sums: any = []
        if (!props.statistics) return sums
        const { columns, data } = param
        const keyArr = Object.keys(props.statistics)
        columns.forEach((column: any, index: any) => {
          // 第一列赋值为'Total Cost'
          if (index === 0) {
            sums[index] = '汇总'
            return
          }
          // 如果是后端规定的需要统计的字段，则进行赋值；否则为空
          if (keyArr.indexOf(column.property) != -1) {
            sums[index] = props.statistics[column.property]
          } else {
            sums[index] = ''
          }
        })

        return sums
      },
      rowStyle(e: any) {
        const { row } = e
        // 表示此行数据已经红冲
        if (row?.red_punch === 1) {
          return 'color:red !important'
        }
        if (row?.quantity_adjuster === 1) {
          return 'color:blue !important'
        }
      }
    }
    onMounted(() => {
      // methods.contextmenuStop()
      requests.getCustom()
    })
    onUnmounted(() => {
      bus.$off(props.table)
    })
    return {
      ...toRefs(state),
      ...methods,
      ...requests,
      singleTable
    }
  }
})
</script>
<style lang="scss">
// 设置索引行表头字体大小
.header_cell_calss_name1 {
  font-size: 23px;
  line-height: 23px;
  cursor: pointer;
}
// 设置索引行背景
.cell_calss_name1 {
  background-color: #f6fcff;
  color: #5a5555;
}
</style>
