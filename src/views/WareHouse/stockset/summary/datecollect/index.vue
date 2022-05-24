<!--
 * @Descripttion: 
 * @version: 
 * @Author: XJ
 * @Date: 2021-05-27 15:33:27
 * @LastEditors: TJ
 * @LastEditTime: 2022-02-18 14:19:05
-->
<!--  -->
<template>
  <div class="content">
    <div class="left_cont">
      <div class="box">
        <!-- <div class="header">
					<span>{{ $t('common.datecollect_header') }}</span>
				</div> -->
        <!-- <div class="part_line"></div> -->
        <div class="top">
          <div class="headerFormStyle">
            <el-select
              style="margin-right:10px;"
              v-model="searchs.warehouse"
              filterable
              clearable
              @change="headerChange"
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
              style="margin-right:10px;"
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
              style="margin-right:10px;"
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

            <!--   :placeholder="$t('common.date')" -->
            <el-date-picker
              @change="headerChange"
              style="margin-right:10px;"
              v-model="searchs.date"
              :unlink-panels="true"
              type="daterange"
              :start-placeholder="$t('common.start_at')"
              :end-placeholder="$t('common.end_at')"
            >
            </el-date-picker>
            <el-button
              style="margin-right:10px;"
              type="primary"
              icon="el-icon-search"
              @click="onSearch"
            ></el-button>
          </div>
          <div>
            <template v-for="item in buttonData" :key="item.widget_id">
              <el-button
                style="margin-right:10px;"
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
            show-summary
          >
            <el-table-column
              show-overflow-tooltip
              prop="name"
              :label="$t('common.inventory_warehouse_name')"
              width="400"
            ></el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="sale"
              :label="$t('common.saled_number')"
              sortable="custom"
            ></el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="delivery"
              :label="$t('common.delivery')"
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
        differ_page="datecollect"
        @reset="reset"
        :date="date"
      ></Export>
    </el-drawer>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, toRefs, watch, ref } from 'vue'
import { datecollectApi } from '@/http/api/othcustom/stockset/summary/datecollect'
import { IRequest } from '@/@types/httpInterface'
import dataStructure from '@/utils/dataStructure'
import { useStore } from '@/store'
import { useRoute, useRouter } from 'vue-router'
import { IState } from './typings'
import { IPower } from '@/@types/iPower'
import { dateNormDateRange } from '@/utils/dateNorm'
import { useI18n } from 'vue-i18n'
import Export from '@/components/common/Stockset/Export.vue'
export default defineComponent({
  components: {
    Export
  },
  setup() {
    const { t } = useI18n()
    const singleTable = ref()
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const state: IState = reactive({
      searchs: {
        search_value: '',
        order_by: 1, //默认
        date: [],
        warehouse: null,
        inventory_type: null,
        model_number: null
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
          { id: 0, name: t('common.other') },
          { id: 'sale', name: t('common.saled_number') },
          { id: 'delivery', name: t('common.delivery') }
        ]
      },
      tableData: [],
      buttonData: [],
      itemName: '',
      // 抽屉
      drawer: {
        showExport: false
      }
    })
    const requests = {
      // 获取开始日期
      getStartAt() {
        const data = dataStructure({}, {})
        datecollectApi
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
        datecollectApi
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
        datecollectApi
          .get_model_list(data)
          .then(res => {
            let { status, custom_data, info } = res as IRequest
            if (status === 200) {
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
        datecollectApi
          .get_type_list(data)
          .then(res => {
            let { status, custom_data, info } = res as IRequest
            if (status === 200) {
              state.commonLists.typeList = state.commonLists.allArr.concat(custom_data)
            }
          })
          .catch(err => err)
      },
      // 库存类别汇总日期筛选接口：V1/Inventory/date_collect
      getList() {
        state.searchs.date = dateNormDateRange(state.searchs.date)
        const { warehouse, inventory_type, model_number } = state.searchs
        const data = dataStructure(
          {},
          {
            date: state.searchs.date,
            search_value: state.searchs.search_value,
            order_by: state.searchs.order_by,
            warehouse,
            inventory_type,
            model_number
          }
        )
        datecollectApi
          .get_list(data)
          .then(res => {
            let { status, custom_data } = res as IRequest
            if (status === 200) {
              state.tableData = custom_data
            }
          })
          .catch(err => err)
      },
      //库存类别汇总日期筛选接口：V1/Inventory/date_collect_index
      getIndex() {
        const data = dataStructure({ power_url: route.path }, {})
        datecollectApi
          .get_index(data)
          .then(res => {
            let { status, power } = res as IRequest
            if (status === 200) {
              let hasView
              power.forEach((item: IPower) => {
                if (item.widget_id === 'view') {
                  // requests.getList()
                  requests.getWarehouseList()
                  requests.getModelList(state.searchs.inventory_type)
                  requests.getTypeList()
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
      // 个别字段重新排序
      sortChange(arg: any) {
        const { column, prop, order } = arg
        state.searchs.order_by = order === 'ascending' ? 0 : 1
        state.searchs.search_value = prop
        requests.getList()
      },
      typeChange() {
        state.searchs.model_number = null
        requests.getModelList(state.searchs.inventory_type)
      },
      // 搜索按钮
      headerChange() {
        requests.getList()
      },
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
<style lang="scss" scoped>
@import '@/assets/css/table.scss';
@import '@/assets/css/element-common-style.scss';

@import '@/assets/css/page-common.scss'; //页面基础布局样式一
</style>
