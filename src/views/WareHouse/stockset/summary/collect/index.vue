<!--
 * @Descripttion: 
 * @version: 
 * @Author: XJ
 * @Date: 2021-05-27 15:33:27
 * @LastEditors: TJ
 * @LastEditTime: 2022-02-18 14:18:22
-->
<!--  -->
<template>
  <div class="content">
    <div class="left_cont">
      <div class="box">
        <!-- <div class="header">
					<span>{{ $t('common.collect_header') }}</span>
				</div> -->
        <!-- <div class="part_line"></div> -->
        <div class="reset_top">
          <div class="headerFormStyle">
            <el-select
              @change="headerChange"
              style="margin-right:10px;margin-bottom:5px"
              v-model="searchs.warehouse"
              filterable
              clearable
              :placeholder="$t('common.inventory_warehouse_name')"
            >
              <el-option
                v-for="(item, index) in commonLists.warehouseList"
                :key="index"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
            <el-select
              style="margin-right:10px;margin-bottom:5px"
              v-model="searchs.inventory_type"
              filterable
              clearable
              @change="typeChange"
              :placeholder="$t('common.inventory_type_name')"
            >
              <el-option
                v-for="(item, index) in commonLists.typeList"
                :key="index"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
            <el-select
              @change="headerChange"
              style="margin-right:10px;margin-bottom:5px"
              v-model="searchs.model_number"
              filterable
              clearable
              :placeholder="$t('common.model_number_name')"
            >
              <el-option
                v-for="(item, index) in commonLists.modelList"
                :key="index"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
            <el-select
              @change="headerChange"
              style="margin-right:10px;margin-bottom:5px"
              v-model="searchs.quantity_warning"
              filterable
              clearable
              :placeholder="$t('common.quantity_warning')"
            >
              <el-option
                v-for="(item, index) in commonLists.warningList"
                :key="index"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
            <el-date-picker
              @change="headerChange"
              style="margin-right:10px;margin-bottom:5px"
              v-model="searchs.date"
              :unlink-panels="true"
              type="daterange"
              :start-placeholder="$t('common.start_at')"
              :end-placeholder="$t('common.end_at')"
            >
            </el-date-picker>
            <el-button
              style="margin-right:10px;margin-bottom:5px"
              type="primary"
              icon="el-icon-search"
              @click="onSearch"
            ></el-button>
            <div style="display:inline-block;margin-right:10px;margin-bottom:5px">
              <div
                style="display:inline-block;width:12px;height:12px;border-radius:6px;background-color:green"
              ></div>
              <span>{{ $t('common.low_order_number') }}</span>
            </div>
            <div style="display:inline-block;margin-right:10px;margin-bottom:5px">
              <div
                style="display:inline-block;width:12px;height:12px;border-radius:6px;background-color:red"
              ></div>
              <span>{{ $t('common.high_order_number') }}</span>
            </div>
          </div>
          <div>
            <template v-for="item in buttonData" :key="item.widget_id">
              <el-button
                style="margin-bottom:5px"
                type="success"
                plain
                v-if="item.widget_id !== 'view'"
                @click="handle(item.widget_id)"
                >{{ item.name }}</el-button
              >
            </template>
          </div>
        </div>
        <div class="tab">
          <el-table
            border
            :height="tableHeight"
            highlight-current-row
            :data="tableData"
            ref="singleTable"
            @row-click="rowClick"
            row-key="id"
            :tree-props="{
              children: 'children',
              hasChildren: 'hasChildren'
            }"
            @sort-change="sortChange"
            :row-style="rowStyle"
            :expand-row-keys="expand_row_keys"
            @row-contextmenu="rowContextmenu"
            show-summary
          >
            <el-table-column
              show-overflow-tooltip
              prop="name"
              :label="$t('common.inventory_warehouse_name')"
              width="300"
            ></el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="period"
              :label="$t('common.period')"
              sortable="custom"
            ></el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="stock_period"
              :label="$t('common.stock_period')"
              sortable="custom"
            ></el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="number"
              :label="$t('common.buy_number')"
              sortable="custom"
            ></el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="sold_out"
              :label="$t('common.sold_out')"
              sortable="custom"
            ></el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="unsold"
              :label="$t('common.unsold')"
              sortable="custom"
            ></el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="delivery"
              :label="$t('common.delivery')"
              sortable="custom"
            ></el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="stock"
              :label="$t('common.stock')"
              sortable="custom"
            ></el-table-column>
          </el-table>
        </div>
        <!-- <div class="bot"></div> -->
      </div>
    </div>
    <el-drawer :title="$t(`common.${itemName}`)" :size="576" v-model="drawer.showExport">
      <Export
        :commonLists="commonLists"
        @inventoryTypeChange="inventoryTypeChange"
        differ_page="collect"
        @reset="reset"
        :date="date"
      ></Export>
    </el-drawer>
    <el-dialog width="30%" title="预警信息" v-model="drawer.showWarning">
      <el-descriptions :column="1">
        <el-descriptions-item :label="$t('common.high_order_number') + ':'">{{
          warningDetails.high_order_number
        }}</el-descriptions-item>
        <el-descriptions-item :label="$t('common.low_order_number') + ':'">{{
          warningDetails.low_order_number
        }}</el-descriptions-item>
        <el-descriptions-item :label="$t('common.quantity_warning') + ':'">{{
          warningDetails.low_high == 1
            ? $t('common.low_order_warning')
            : $t('common.high_order_warning')
        }}</el-descriptions-item>
        <el-descriptions-item :label="$t('common.warning_chao_number') + ':'">{{
          warningDetails.chao_number
        }}</el-descriptions-item>
      </el-descriptions>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, ref } from 'vue'
import { collectApi } from '@/http/api/othcustom/stockset/summary/collect'
import { IRequest } from '@/@types/httpInterface'
import dataStructure from '@/utils/dataStructure'
import { useRoute, useRouter } from 'vue-router'
import { IState } from './typings'
import { IPower } from '@/@types/iPower'
import { useI18n } from 'vue-i18n'
import { dateNormDateRange } from '@/utils/dateNorm'
import Export from '@/components/common/Stockset/Export.vue'
export default defineComponent({
  components: { Export },
  setup() {
    const { t } = useI18n()
    const singleTable = ref()
    const route = useRoute()
    const router = useRouter()
    const state: IState = reactive({
      tableData: [],
      buttonData: [],
      itemName: '',
      // 抽屉
      drawer: {
        showExport: false,
        showWarning: false
      },
      // 默认展开数组
      expand_row_keys: [],
      // 初始值为负1 默认全部
      searchs: {
        search_value: '', //搜索排序字段
        order_by: 1,
        warehouse: null,
        inventory_type: null,
        model_number: null,
        quantity_warning: null,
        date: []
      },
      date: [],
      tableHeight: '100%',
      commonLists: {
        allArr: [{ id: 0, name: t('common.all') }],
        typeList: [{ id: 0, name: t('common.all') }],
        modelList: [{ id: 0, name: t('common.all') }],
        warehouseList: [{ id: 0, name: t('common.all') }],
        orderByList: [
          { id: 0, name: t('common.ascend') },
          { id: 1, name: t('common.descend') }
        ],
        orderByFieldList: [
          { id: 'number', name: t('common.number') },
          { id: 'sold_out', name: t('common.sold_out') },
          { id: 'unsold', name: t('common.unsold') },
          { id: 'delivery', name: t('common.delivery') },
          { id: 'stock', name: t('common.stock') },
          { id: 0, name: t('common.other') }
        ],
        warningList: [
          { id: 0, name: t('common.all') },
          { id: 1, name: t('common.low_order_warning') },
          { id: 2, name: t('common.high_order_warning') }
        ]
      },
      warningDetails: {}
    })
    const requests = {
      getQuantityWarning(e: any) {
        const { unsold, low_high, id } = e
        const data = dataStructure({}, { unsold, low_high, id })
        collectApi
          .get_quantity_warning(data)
          .then(res => {
            let { status, custom_data, info } = res as IRequest
            if (status === 200) {
              state.warningDetails = custom_data.data
            }
          })
          .catch(err => err)
      },
      // 获取开始日期
      getStartAt() {
        const data = dataStructure({}, {})
        collectApi
          .get_start_at(data)
          .then(res => {
            let { status, custom_data, info } = res as IRequest
            if (status === 200) {
              const { data } = custom_data
              state.searchs.date = [data, new Date()]
              state.date = [data, new Date()]
            }
          })
          .catch(err => err)
      },
      // 库存仓库接口：V1/InventoryWarehouse/all_list
      getWarehouseList() {
        const data = dataStructure(
          {},
          {
            order_by: 1
          }
        )
        collectApi
          .get_warehouse_list(data)
          .then(res => {
            let { status, custom_data, info } = res as IRequest
            if (status === 200) {
              state.commonLists.warehouseList = state.commonLists.allArr.concat(custom_data)
            }
          })
          .catch(err => err)
      },

      // 库存型号接口：V1/InventoryModel/all_list
      getModelList(inventory_type: any) {
        const data = dataStructure(
          {},
          {
            order_by: 1,
            inventory_type //库存类型ID
          }
        )
        collectApi
          .get_model_list(data)
          .then(res => {
            let { status, custom_data, info } = res as IRequest
            if (status === 200) {
              // 库存类型为空时给了所有的型号
              state.commonLists.modelList = state.commonLists.allArr.concat(custom_data)
            }
          })
          .catch(err => err)
      },

      // 库存类型接口：V1/InventoryType/all_list
      getTypeList() {
        const data = dataStructure(
          {},
          {
            order_by: 1
          }
        )
        collectApi
          .get_type_list(data)
          .then(res => {
            let { status, custom_data, info } = res as IRequest
            if (status === 200) {
              state.commonLists.typeList = state.commonLists.allArr.concat(custom_data)
            }
          })
          .catch(err => err)
      },
      // 库存管理类别汇总接口：V1/Inventory/collect
      getList() {
        state.searchs.date = dateNormDateRange(state.searchs.date)
        const { warehouse, inventory_type, model_number } = state.searchs
        const data = dataStructure(
          {},
          {
            date: state.searchs.date,
            search_value: state.searchs.search_value,
            order_by: state.searchs.order_by,
            quantity_warning: state.searchs.quantity_warning,
            warehouse,
            inventory_type,
            model_number
          }
        )
        collectApi
          .get_list(data)
          .then(res => {
            let { status, custom_data, expand_row_keys } = res as IRequest
            if (status === 200) {
              state.tableData = custom_data
              state.expand_row_keys = expand_row_keys
            }
          })
          .catch(err => err)
      },
      // 库存类别汇总接口：V1/Inventory/collect_index
      getIndex() {
        const data = dataStructure({ power_url: route.path }, {})
        collectApi
          .get_index(data)
          .then(res => {
            let { status, power } = res as IRequest

            if (status === 200) {
              let hasView
              power.forEach((item: IPower) => {
                if (item.widget_id === 'view') {
                  requests.getWarehouseList()
                  requests.getModelList(state.searchs.inventory_type)
                  requests.getTypeList()
                  // requests.getList()
                  requests.getStartAt()
                  state.buttonData = power
                  hasView = true
                }
              })
              if (!hasView) {
                router.push('/index/noaccess')
              }
            } else if (status === 422) {
              router.push('/index/noaccess')
            }
          })
          .catch(err => err)
      }
    }
    const methods = {
      inventoryTypeChange(arg: string, inventory_type: any) {
        state.commonLists.modelList = []
        requests.getModelList(inventory_type)
      },
      handle(arg: any) {
        switch (arg) {
          case 'export':
            methods.doExport()
            break
          default:
            break
        }
      },
      reset(arg: any) {
        switch (arg) {
          case 'export':
            state.drawer.showExport = false
            break
          default:
            break
        }
      },
      doExport() {
        state.itemName = 'export'
        state.drawer.showExport = true
      },
      // 低位预警或高位预警时右键点击显示相关信息
      rowContextmenu(row: any, column: any, event: any) {
        if (row.low_high == 1 || row.low_high == 2) {
          const { unsold, low_high, id } = row
          state.drawer.showWarning = true
          requests.getQuantityWarning({ unsold, low_high, id })
        }
      },
      rowStyle(e: any) {
        const { row, rowIndex } = e
        if (row.low_high == 1) {
          return 'background-color:green !important;color:#fff !important'
        } else if (row.low_high == 2) {
          return 'background-color:red !important;color:#fff !important'
        }
      },
      // 个别字段重新排序
      sortChange(arg: any) {
        const { column, prop, order } = arg
        state.searchs.order_by = order === 'ascending' ? 0 : 1
        state.searchs.search_value = prop
        requests.getList()
        //
      },
      typeChange() {
        state.searchs.model_number = null
        requests.getModelList(state.searchs.inventory_type)
        requests.getList()
      },
      headerChange() {
        requests.getList()
      },
      // 搜索按钮
      onSearch() {
        requests.getList()
      },
      rowClick(row: any) {
        const singletable = singleTable.value
        singletable.toggleRowExpansion(row)
      }
    }
    onMounted(() => {
      requests.getIndex()
    })
    return {
      ...toRefs(state),
      ...requests,
      ...methods,
      singleTable
    }
  }
})
</script>
<style lang="scss" scoped></style
><style lang="scss" scoped>
@import '@/assets/css/table.scss';
@import '@/assets/css/element-common-style.scss';

@import '@/assets/css/page-common.scss'; //页面基础布局样式一
</style>
