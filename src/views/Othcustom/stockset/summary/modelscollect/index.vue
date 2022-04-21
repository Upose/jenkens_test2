<!--
 * @Descripttion: 
 * @version: 
 * @Author: XJ
 * @Date: 2021-05-27 15:33:27
 * @LastEditors: TJ
 * @LastEditTime: 2022-02-18 14:21:20
-->
<!--  -->
<template>
  <div class="content">
    <div class="left_cont">
      <div class="box">
        <!-- <div class="header">
					<span>{{ $t('common.modelscollect_header') }}</span>
				</div> -->
        <!-- <div class="part_line"></div> -->
        <div class="top">
          <div class="headerFormStyle">
            <el-select
              @change="headerChange"
              style="margin-right:10px;"
              v-model="searchs.supplier"
              filterable
              clearable
              :placeholder="$t('common.inventory_supplier_name')"
            >
              <el-option
                v-for="(item, index) in commonLists.supplierList"
                :key="index"
                :label="item.name"
                :value="item.id"
              >
                <span style="float: left">{{ item.name }}</span>
                <span style="float: right;color: #999999;">{{ item.id }}</span>
              </el-option>
            </el-select>
            <el-select
              @change="headerChange"
              style="margin-right:10px;"
              v-model="searchs.inventory_type"
              filterable
              clearable
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
            <el-input
              style="margin-right:10px;"
              type="text"
              :placeholder="$t('common.searchValue')"
              v-model="searchs.search"
              @input="input"
              @change="onSearch"
            >
              <template #append>
                <el-button icon="el-icon-search" @click="onSearch"></el-button>
              </template>
            </el-input>
          </div>
        </div>
        <div class="tab">
          <el-table
            border
            :height="tableHeight"
            highlight-current-row
            :data="tableData"
            ref="singleTable"
            @sort-change="sortChange"
            show-summary
          >
            <el-table-column
              show-overflow-tooltip
              prop="name"
              :label="$t('common.name')"
            ></el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="sum"
              :label="$t('common.sum')"
              sortable="custom"
            ></el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, toRefs, watch, ref } from 'vue'
import { modelscollectApi } from '@/http/api/othcustom/stockset/summary/modelscollect'
import { IRequest } from '@/@types/httpInterface'
import dataStructure from '@/utils/dataStructure'
import { useStore } from '@/store'
import { useRoute, useRouter } from 'vue-router'
import { IState } from './typings'
import { IPower } from '@/@types/iPower'
import { dateNormDateRange } from '@/utils/dateNorm'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  setup() {
    const { t } = useI18n()
    const singleTable = ref()
    const route = useRoute()
    const router = useRouter()
    const store = useStore()

    const state: IState = reactive({
      searchs: {
        search_value: '',
        order_by: 1,
        search: '',
        supplier: null,
        inventory_type: null
      },
      date: [],
      tableHeight: '100%',
      commonLists: {
        allArr: [{ id: 0, name: t('common.all') }],
        typeList: [],
        supplierList: []
      },
      tableData: [],
      buttonData: [],
      itemName: ''
    })
    const requests = {
      // 供应商接口
      getSupplierList() {
        const data = dataStructure(
          {},
          {
            order_by: 1,
            search_value: null
          }
        )
        modelscollectApi
          .get_supplier_list(data)
          .then(res => {
            let { status, custom_data, info } = res as IRequest
            if (status === 200) {
              state.commonLists.supplierList = state.commonLists.allArr.concat(custom_data)
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
        modelscollectApi
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
        const data = dataStructure({}, state.searchs)
        modelscollectApi
          .get_list(data)
          .then(res => {
            let { status, custom_data } = res as IRequest
            if (status === 200) {
              state.tableData = custom_data.data
            }
          })
          .catch(err => err)
      },
      //库存类别汇总日期筛选接口：V1/Inventory/date_collect_index
      getIndex() {
        const data = dataStructure({ power_url: route.path }, {})
        modelscollectApi
          .get_index(data)
          .then(res => {
            let { status, power } = res as IRequest
            if (status === 200) {
              let hasView
              power.forEach((item: IPower) => {
                if (item.widget_id === 'view') {
                  requests.getList()
                  requests.getTypeList()
                  requests.getSupplierList()
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
      // 搜索按钮
      onSearch() {
        requests.getList()
      },
      headerChange() {
        requests.getList()
      },
      input() {
        if (!state.searchs.search) {
          requests.getList()
        }
      },
      // 个别字段重新排序
      sortChange(arg: any) {
        const { column, prop, order } = arg
        state.searchs.order_by = order === 'ascending' ? 0 : 1
        state.searchs.search_value = prop
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
