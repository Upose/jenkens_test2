<template>
  <div class="content">
    <div class="left_cont">
      <div class="box">
        <!-- <div class="header">
					<span>{{ $t('common.stock_header') }}</span>
				</div> -->
        <!-- <div class="part_line"></div> -->
        <div class="reset_top">
          <el-form inline>
            <el-form-item
              ><el-select
                style="margin-right:10px;margin-bottom:5px"
                filterable
                clearable
                v-model="pagination.stockId"
                @change="headerChange"
                :placeholder="$t('common.stock_state')"
              >
                <el-option
                  v-for="(item, index) in commonLists.stockList"
                  :key="index"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
              <el-select
                style="margin-right:10px;margin-bottom:5px"
                filterable
                clearable
                v-model="pagination.inventory_enter_type"
                @change="headerChange"
                :placeholder="$t('common.inventory_enter_type_name')"
              >
                <el-option
                  v-for="(item, index) in commonLists.enterTypeList2"
                  :key="index"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option> </el-select
            ></el-form-item>
            <el-form-item
              ><el-select
                style="margin-right:10px;margin-bottom:5px"
                v-model="pagination.supplier"
                filterable
                clearable
                @change="headerChange"
                :placeholder="$t('common.inventory_supplier_name')"
              >
                <el-option
                  v-for="(item, index) in commonLists.supplierList2"
                  :key="index"
                  :label="item.name"
                  :value="item.id"
                >
                  <span style="float: left">{{ item.name }}</span>
                  <span style="float: right;color: #999999;">{{ item.id }}</span>
                </el-option>
              </el-select>
              <el-select
                style="margin-right:10px;margin-bottom:5px"
                v-model="pagination.inventory_type"
                filterable
                clearable
                @change="headerChange"
                :placeholder="$t('common.inventory_type_name')"
              >
                <el-option
                  v-for="(item, index) in commonLists.typeList2"
                  :key="index"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option> </el-select
            ></el-form-item>
            <el-form-item
              ><el-select
                style="margin-right:10px;margin-bottom:5px"
                filterable
                clearable
                v-model="pagination.product_grade"
                @change="headerChange"
                :placeholder="$t('common.product_grade')"
              >
                <el-option
                  v-for="item in commonLists.productGradeList2"
                  :key="item.id"
                  :label="item.name"
                  :value="item.product_grade"
                >
                </el-option> </el-select
            ></el-form-item>
            <el-form-item
              ><el-input
                style="margin-right:10px;margin-bottom:5px"
                type="text"
                :placeholder="$t('common.searchValue')"
                v-model="pagination.search_value"
                @input="input"
                @change="onSearch"
              >
                <template #append>
                  <el-button icon="el-icon-search" @click="onSearch"></el-button>
                </template> </el-input
            ></el-form-item>
          </el-form>
          <div class="headerFormStyle"></div>
          <div>
            <template v-for="item in buttonData" :key="item.widget_id">
              <!-- =1且无子集时遍历出按钮 -->
              <el-button
                style="margin-bottom:5px"
                type="success"
                plain
                v-if="item.widget_type == 1 && !item.children"
                :disabled="item.widget_id == 'add' ? true : isEmeptyObj"
                @click="handle(item.widget_id)"
                >{{ item.name }}</el-button
              >
              <el-dropdown
                v-else-if="item.widget_type == 1 && item.children"
                style="margin:0 10px 5px"
              >
                <el-button type="success" plain>
                  {{ item.name }}<i class="el-icon-arrow-down"></i>
                </el-button>
                <template #dropdown>
                  <el-dropdown-menu v-for="(item2, index2) in item.children" :key="index2">
                    <el-dropdown-item @click="handle(item2.widget_id)">{{
                      item2.name
                    }}</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </template>

            <el-button
              style="margin-bottom:5px"
              type="success"
              plain
              :disabled="isEmeptyObj"
              @click="handle('detail')"
              >{{ $t('common.detail') }}</el-button
            >
          </div>
        </div>
        <div class="tab">
          <CommonTable
            @sortChange="sortChange"
            ref="CommonTableRef"
            :tableData="tableData"
            :statistics="statistics"
            @rowClick="rowClick"
            v-bind="customArgs"
            @headerClick="headerClick"
          >
          </CommonTable>
        </div>
        <div class="bot">
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
        <!-- 分割线 -->
        <div class="part_line" v-if="!isEmeptyObj"></div>
        <div ref="tabContRef" class="tab_cont tabStyle" v-if="!isEmeptyObj">
          <!-- 卖出记录 -->
          <StockSale
            style="width: 400px;height: 100%;	margin-right: 50px;"
            ref="childRef"
          ></StockSale>
          <!-- 卖出出库记录 -->
          <StockAll style="width: 0px;flex:1;height: 100%;" ref="child2Ref"></StockAll>
        </div>
      </div>
    </div>
    <!-- 添加抽屉 -->
    <StockAdd
      @reset="reset"
      @inventoryTypeChange="inventoryTypeChange"
      :commonLists="commonLists"
      v-model="showAdd"
    ></StockAdd>

    <!-- 修改抽屉 -->
    <StockUpd
      ref="StockUpdRef"
      @reset="reset"
      @inventoryTypeChange="inventoryTypeChange"
      :commonLists="commonLists"
      :singleSelection="singleSelection"
      v-model="showUpd"
    ></StockUpd>

    <!-- 导出抽屉 -->
    <StockExport
      @reset="reset"
      @inventoryTypeChange="inventoryTypeChange"
      :commonLists="commonLists"
      v-model="showExport"
    ></StockExport>

    <!-- 详情 -->
    <Details :singleSelection="singleSelection" v-bind="customArgs" v-model="showDetail"></Details>

    <!-- 批次详情 -->
    <LotDetails
      v-if="itemName === 'lot_details'"
      :order_number="singleSelection.order_number"
      v-model="showLotDetails"
    ></LotDetails>

    <!-- 自定义字段组件 -->
    <el-dialog title="列配置" v-model="showSortableCustom" :width="540">
      <Custom @cancelConfig="cancelConfig" v-bind="customArgs"></Custom>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, ref, nextTick, computed } from 'vue'
import { MutationConstants } from '@/store/modules/index/constants'
import { stockApi } from '@/http/api/othcustom/stockset/stock'
import { IRequest } from '@/@types/httpInterface'
import dataStructure from '@/utils/dataStructure'
import { useStore } from '@/store'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { IState, ISelection, IValid } from './typings'
import { IPower } from '@/@types/iPower'
import { useI18n } from 'vue-i18n'
import { dateNormArray, dateNormDateRange } from '@/utils/dateNorm'
import { CUSTOM_TABLES } from '@/constant/bus/bus_custom_table'
// 组件
import StockSale from './components/StockSale.vue'
import StockAll from './components/StockAll.vue'
import LotDetails from './components/LotDetails.vue'
import Custom from '@/components/common/Custom/Custom.vue'
import Details from '@/components/common/Details/Details.vue'
import CommonTable from '@/components/common/Table/CommonTable.vue'
import StockAdd from './components/StockAdd.vue'
import StockUpd from './components/StockUpd.vue'
import StockExport from './components/StockExport.vue'
export default defineComponent({
  components: {
    StockSale,
    StockAll,
    Custom,
    Details,
    CommonTable,
    LotDetails,
    StockAdd,
    StockUpd,
    StockExport
  },
  setup() {
    const { t } = useI18n()
    const singleTable = ref()
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const selection: ISelection = reactive({
      singleSelection: {}
    })
    const isEmeptyObj = computed(() => {
      return Object.keys(selection.singleSelection).length === 0 ? true : false
    })
    const state: IState = reactive({
      tableData: [],
      statistics: {},
      scrollbarMaxHeight: '100%',
      tabs: {
        activeName: 'first'
      },
      tableHeight: '100%',
      pagination: {
        page: 1,
        perpage: 18,
        total: 0,
        order_by: 1, //0升序   1降序(请默认传1)
        field: '',
        search_value: '',
        stockId: null,
        inventory_type: null,
        supplier: null,
        inventory_enter_type: null,
        type: null,

        product_grade: null
      },
      itemName: 'add',
      commonLists: {
        typeList: [],
        typeList2: [],
        unitList: [],
        modelList: [],
        warehouseList: [],
        currencyUnitList: [],
        supplierList: [],
        supplierList2: [],
        supplierLoading: false,
        searchFieldList: [
          { id: 0, name: t('common.all') },
          { id: 1, name: t('common.inventory_type_name') },
          { id: 2, name: t('common.model_number_name') },
          { id: 3, name: t('common.order_number') }
        ],
        enterTypeList: [
          { id: 1, name: t('common.enterTypeList_has') },
          { id: 0, name: t('common.enterTypeList_no') }
        ],
        stockList: [
          { id: 1, name: t('common.stockList_has') },
          { id: 2, name: t('common.stockList_no') },
          { id: 3, name: t('common.all') }
        ],
        orderByList: [
          { id: 0, name: t('common.ascend') },
          { id: 1, name: t('common.descend') }
        ],
        enterTypeList2: [
          { id: 1, name: t('common.enterTypeList_has') },
          { id: 2, name: t('common.enterTypeList_no') },
          { id: 3, name: t('common.all') }
        ],
        // +++
        minusAdjustTypeList: [
          { id: 0, name: t('common.produce_lose') },
          { id: 1, name: t('common.adjust_grade') }
        ],
        productGradeList: [],
        productGradeList2: []
      },
      customArgs: {
        handle_array: ['created_id', 'created_name', 'created_at', 'updated_at'],
        common_array: ['created_id', 'created_name', 'created_at', 'updated_at', 'id'],
        table: CUSTOM_TABLES.INVENTORY
      },

      showAdd: false,
      showUpd: false,
      showDetail: false,
      showExport: false,
      showLotDetails: false,
      showSortableCustom: false,
      buttonData: []
    })
    const valid: IValid = reactive({
      checkOthers: {
        fun: (rule: object, value: string, callback: Function, info: any, bool: boolean) => {
          if (bool) {
            callback(new Error(info))
            valid.checkOthers.bool = false
          } else {
            callback()
          }
        },
        validatorFun: (rule: object, value: string, callback: Function) => {
          valid.checkOthers.fun(
            rule,
            value,
            callback,
            valid.checkOthers.info,
            valid.checkOthers.bool
          )
        },
        info: '',
        bool: false
      }
    })

    const StockUpdRef = ref()
    const childRef = ref()
    const child2Ref = ref()
    const CommonTableRef = ref()
    const tabContRef = ref()
    const requests = {
      // 产品等级接口
      getStockTypeList() {
        const data = dataStructure(
          {},
          {
            order_by: 1
          }
        )
        stockApi
          .get_stock_type_list(data)
          .then(res => {
            let { status, custom_data, info } = res as IRequest
            if (status === 200) {
              state.commonLists.productGradeList = custom_data.data
              let arr = [{ product_grade: 'all', name: t('common.all') }] // 类型列表接受参数
              state.commonLists.productGradeList2 = arr.concat(custom_data.data)
            }
          })
          .catch(err => err)
      },
      getCurrencyUnitList() {
        const data = dataStructure(
          {},
          {
            order_by: 1
          }
        )
        stockApi
          .get_currency_unit_list(data)
          .then(res => {
            let { status, custom_data, info } = res as IRequest
            if (status === 200) {
              state.commonLists.currencyUnitList = custom_data
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
        stockApi
          .get_warehouse_list(data)
          .then(res => {
            let { status, custom_data, info } = res as IRequest
            if (status === 200) {
              state.commonLists.warehouseList = custom_data
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
            inventory_type: inventory_type //库存类型ID
          }
        )
        stockApi
          .get_model_list(data)
          .then(res => {
            let { status, custom_data, info } = res as IRequest
            if (status === 200) {
              state.commonLists.modelList = custom_data
            }
          })
          .catch(err => err)
      },
      // 库存单位接口：V1/InventoryUnit/all_list
      getUnitList() {
        const data = dataStructure(
          {},
          {
            order_by: 1
          }
        )
        stockApi
          .get_unit_list(data)
          .then(res => {
            let { status, custom_data, info } = res as IRequest
            if (status === 200) {
              state.commonLists.unitList = custom_data
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
        stockApi
          .get_type_list(data)
          .then(res => {
            let { status, custom_data, info } = res as IRequest
            if (status === 200) {
              state.commonLists.typeList = custom_data
              let arr = [{ id: 0, name: t('common.all') }] // 类型列表接受参数
              state.commonLists.typeList2 = arr.concat(custom_data)
            }
          })
          .catch(err => err)
      },
      // 供应商接口
      getSupplierList() {
        const data = dataStructure(
          {},
          {
            order_by: 1,
            search_value: null
          }
        )
        stockApi
          .get_supplier_list(data)
          .then(res => {
            let { status, custom_data, info } = res as IRequest
            if (status === 200) {
              let data = custom_data
              state.commonLists.supplierList = data
              let arr = [{ id: 0, name: t('common.all') }] // 类型列表接受参数
              state.commonLists.supplierList2 = arr.concat(custom_data)
            }
          })
          .catch(err => err)
      },
      //  库存管理列表获取接口：V1/Inventory/list
      getList() {
        const data = dataStructure({}, state.pagination)
        stockApi
          .get_list(data)
          .then(res => {
            let { status, custom_data } = res as IRequest
            if (status === 200) {
              state.pagination.total = custom_data.total
              state.statistics = custom_data.statistics
              let array: any = dateNormArray(custom_data.data)
              state.tableData = array
            }
          })
          .catch(err => err)
      },
      // 库存管理页面接口：V1/Inventory/index
      getIndex() {
        const data = dataStructure({ power_url: route.path }, {})
        stockApi
          .get_index(data)
          .then(res => {
            let { status, power } = res as IRequest
            if (status === 200) {
              if (!state.commonLists.productGradeList.length) {
                requests.getStockTypeList()
              }
              if (!state.commonLists.typeList.length) {
                requests.getTypeList()
              }
              if (!state.commonLists.supplierList.length) {
                requests.getSupplierList()
              }
              requests.getList()
              state.buttonData = power
            }
          })
          .catch(err => err)
      },

      getDel(id: any) {
        const data = dataStructure(
          { power_url: 'V1/Inventory/del' },
          {
            id: id
          }
        )
        stockApi
          .get_del(data)
          .then(res => {
            let { status, custom_data, info } = res as IRequest
            if (status === 200) {
              ElMessage({
                type: 'success',
                message: info
              })
              methods.reset('del')
            }
          })
          .catch(err => err)
      }
    }
    const methods = {
      // 个别字段重新排序
      sortChange(arg: any) {
        const { column, prop, order } = arg
        state.pagination.order_by = order === 'ascending' ? 0 : 1
        state.pagination.field = prop
        requests.getList()
      },
      // 打开列配置弹出框
      headerClick(arg: boolean) {
        state.showSortableCustom = arg
      },
      // 关闭列配置弹出框
      cancelConfig() {
        state.showSortableCustom = false
      },

      handle(arg: any) {
        switch (arg) {
          case 'add':
            methods.doAdd()
            break
          case 'upd':
            methods.doUpd()
            break

          case 'export':
            methods.doExport()
            break
          case 'detail':
            methods.doDetail()
            break
          case 'del':
            methods.doDel()
            break
          case 'lot_details':
            methods.doLotDetails()
          // case 'custom':
          //   methods.doCustom()
          //   break
          default:
            break
        }
      },
      doLotDetails() {
        state.itemName = 'lot_details'
        state.showLotDetails = true
      },
      reset(arg: any) {
        // 重置表单
        switch (arg) {
          case 'add':
            state.showAdd = false
            break
          case 'upd':
            state.showUpd = false
            break
          case 'del':
            break
          case 'export':
            state.showExport = false
            break
          default:
            break
        }
        if (arg !== 'export') {
          requests.getList()
          // 父组件表格取消选中状态
          selection.singleSelection = {}
        }
      },
      doDel() {
        const { id } = selection.singleSelection
        ElMessageBox.confirm(t('common.confirmDel'), t('common.tip'), {
          confirmButtonText: t('common.confirm'),
          cancelButtonText: t('common.cancel'),
          type: 'warning'
        })
          .then(() => {
            requests.getDel(id)
          })
          .catch(() => {
            ElMessage({
              type: 'info',
              message: t('common.cancelDel')
            })
          })
      },
      // -------------------------------------------------------导出

      // 调出导出页面
      doExport() {
        state.itemName = 'export'
        state.showExport = true
        if (!state.commonLists.typeList.length) {
          requests.getTypeList()
        }
        if (!state.commonLists.unitList.length) {
          requests.getUnitList()
        }
        if (!state.commonLists.warehouseList.length) {
          requests.getWarehouseList()
        }
      },
      // --------------------------------------------------修改

      // 添加时库存类型改变加载库存型号
      inventoryTypeChange(arg: string, inventory_type: any) {
        state.commonLists.modelList = []
        requests.getModelList(inventory_type)
      },
      // -------------------------------------------------主页
      // 头部选择改变
      headerChange() {
        requests.getList()
      },

      handleSizeChange(perpage: number) {
        state.pagination.perpage = perpage
        requests.getList() //传参顺序
      },
      handleCurrentChange(page: number) {
        state.pagination.page = page

        requests.getList()
      },
      // 单击事件
      async rowClick(row: any) {
        let id = selection.singleSelection?.id
        if (id === row.id) {
          const CommonTableref = CommonTableRef
          CommonTableref.value.setCurrentRow()
          selection.singleSelection = {}
        } else {
          selection.singleSelection = row
          // 调用卖出/出库记录组件中的方法
          await nextTick() //数据更改后等待dom更新后执行后续的代码
          let stockAllId = row.id
          const child2ref = child2Ref
          child2ref.value.getLogList(stockAllId, '')
          // 调用卖出记录组件中的方法
          const childref = childRef
          childref.value.getSaleList1(stockAllId)
        }
      },

      // 点击搜索按钮搜索
      onSearch() {
        requests.getList()
      },

      input() {
        if (!state.pagination.search_value) {
          requests.getList()
        }
      },
      // ----------------------------------------------详情
      doDetail() {
        state.showDetail = true
        state.itemName = 'detail'
      },
      // ---------------------------------------------添加
      // 添加按钮
      doAdd() {
        state.itemName = 'add'
        state.showAdd = true
        // 生成库存单号
        // requests.getSaleOrderNumber(3)
        if (!state.commonLists.typeList.length) {
          requests.getTypeList()
        }
        if (!state.commonLists.unitList.length) {
          requests.getUnitList()
        }
        if (!state.commonLists.warehouseList.length) {
          requests.getWarehouseList()
        }
        if (!state.commonLists.currencyUnitList.length) {
          requests.getCurrencyUnitList()
        }
        if (!state.commonLists.supplierList.length) {
          requests.getSupplierList()
        }
      },

      // ----------------------------------------------------修改
      // 修改按钮
      async doUpd() {
        const stockupdref = StockUpdRef
        state.itemName = 'upd'
        state.showUpd = true
        await nextTick()
        const { id } = selection.singleSelection
        stockupdref.value.getView(id)
        if (!state.commonLists.typeList.length) {
          requests.getTypeList()
        }
        if (!state.commonLists.unitList.length) {
          requests.getUnitList()
        }
        if (!state.commonLists.warehouseList.length) {
          requests.getWarehouseList()
        }
        if (!state.commonLists.currencyUnitList.length) {
          requests.getCurrencyUnitList()
        }
        if (!state.commonLists.supplierList.length) {
          requests.getSupplierList()
        }
        if (!state.commonLists.productGradeList.length) {
          requests.getStockTypeList()
        }
        if (!state.commonLists.modelList.length) {
          requests.getModelList('')
        }
      }
    }
    onMounted(() => {
      requests.getIndex()
    })
    return {
      ...toRefs(state),
      ...toRefs(selection),
      ...requests,
      ...methods,
      singleTable,
      childRef,
      child2Ref,
      CommonTableRef,
      StockUpdRef,
      isEmeptyObj,
      tabContRef
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/css/table.scss';
@import '@/assets/css/element-common-style.scss';

@import '@/assets/css/page-common.scss'; //页面基础布局样式一
</style>
