<template>
  <div class="content">
    <div class="left_cont">
      <div class="box">
        <div class="reset_top">
          <el-form inline>
            <el-form-item>
              <el-select
                style="margin-right:10px;margin-bottom:5px"
                filterable
                clearable
                v-model="pagination.supplier"
                @change="headerChange"
                :placeholder="$t('common.inventory_supplier_name')"
              >
                <el-option
                  v-for="(item, index) in commonLists.supplierList2"
                  :key="index"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
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
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select
                style="margin-right:10px;margin-bottom:5px"
                filterable
                clearable
                v-model="pagination.payment_status"
                @change="headerChange"
                :placeholder="$t('common.payment_status_name')"
              >
                <el-option
                  v-for="(item, index) in commonLists.paymentStatusList2"
                  :key="index"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-input
                style="margin-right:10px;margin-bottom:5px"
                type="text"
                placeholder="进货单号、批次号、创建人"
                v-model="pagination.search_value"
                @input="input"
                @change="onSearch"
              >
                <template #append>
                  <el-button icon="el-icon-search" @click="onSearch"></el-button>
                </template>
              </el-input>
            </el-form-item>
          </el-form>
          <BtnGroup
            :buttonData="buttonData"
            @handleClick="handleClick"
            :handleBtnDisabled="handleBtnDisabled"
          />
        </div>
        <div class="tab">
          <CommonTable
            ref="CommonTableRef"
            :tableData="tableData"
            :statistics="statistics"
            @rowClick="rowClick"
            v-bind="customArgs"
            @headerClick="headerClick"
            @sortChange="sortChange"
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
        <!------------------------------------------------------底部详情表格------------------------------------------------------->
        <div v-if="showBotContent">
          <el-radio-group @change="resetBotTableData" v-model="botTableActiveName" size="small">
            <el-radio-button label="detail">{{ $t('common.detail') }}</el-radio-button>
            <el-radio-button label="pay_log">{{ $t('common.payer_log') }}</el-radio-button>
          </el-radio-group>
          <div class="bot-detail-table">
            <div v-if="botTableActiveName === 'detail'">
              <el-table
                border
                :data="purchaseDetailsForm.data"
                :height="tableHeight"
                highlight-current-row
                row-key="id"
                :tree-props="{
                  children: 'children',
                  hasChildren: 'hasChildren'
                }"
                default-expand-all
              >
                <el-table-column type="index"> </el-table-column>
                <template v-for="(item, index) in purchaseDetailsForm.props" :key="index">
                  <el-table-column show-overflow-tooltip :prop="item" :label="$t(`common.${item}`)">
                  </el-table-column>
                </template>
              </el-table>
              <el-pagination
                @size-change="changeBotTableSize"
                @current-change="changeBotTablePage"
                :current-page="botTablePage.index"
                :page-size="botTablePage.size"
                :page-sizes="[13, 18, 23, 28]"
                layout="total,  prev, pager, sizes,next, jumper"
                :total="botTablePage.total"
                style="text-align:right;"
              >
              </el-pagination>
            </div>
            <div v-else>
              <el-table
                border
                :data="purchasePaymentForm.data"
                :height="tableHeight"
                highlight-current-row
                row-key="id"
                :tree-props="{
                  children: 'children',
                  hasChildren: 'hasChildren'
                }"
                default-expand-all
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
                <el-table-column
                  show-overflow-tooltip
                  prop="created_at"
                  :label="$t('common.created_at')"
                >
                </el-table-column>
                <el-table-column
                  show-overflow-tooltip
                  prop="account_number"
                  :label="$t('common.account_number')"
                >
                </el-table-column>
                <el-table-column
                  show-overflow-tooltip
                  prop="created_name"
                  :label="$t('common.payer')"
                >
                </el-table-column>
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
                <el-table-column
                  show-overflow-tooltip
                  prop="wait_money"
                  :label="$t('common.wait_money')"
                >
                </el-table-column>
                <el-table-column
                  show-overflow-tooltip
                  prop="real_payment_money"
                  :label="$t('common.this_payer')"
                >
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
        <!------------------------------------------------------底部详情表格end------------------------------------------------------->
        <!-- 分割线 -->
        <!-- <div class="part_line" v-if="!isEmeptyObj"></div> -->
        <!-- <div class="tab_cont tabStyle" v-if="!isEmeptyObj" ref="tabContRef">
          <StockInventory ref="childRef"></StockInventory>
        </div> -->
      </div>
    </div>
    <!-- 添加抽屉 -->
    <Add
      @reset="reset"
      @inventoryTypeChange="inventoryTypeChange"
      :commonLists="commonLists"
      v-model="showAdd"
    ></Add>

    <!-- 追加 -->
    <Append
      ref="appendChildRef"
      @reset="reset"
      @inventoryTypeChange="inventoryTypeChange"
      :commonLists="commonLists"
      v-model="showAppend"
    ></Append>
    <!--入库 -->
    <Storage
      ref="storageChildRef"
      @reset="reset"
      :commonLists="commonLists"
      v-model="showStorage"
    ></Storage>
    <!-- 修改 -->
    <Upd
      ref="updChildRef"
      @reset="reset"
      @inventoryTypeChange="inventoryTypeChange"
      :commonLists="commonLists"
      v-model="showUpd"
      :singleSelection="singleSelection"
    ></Upd>
    <!-- 财务 -->
    <Finance
      @reset="reset"
      :commonLists="commonLists"
      v-model="showFinancial"
      ref="financialChildRef"
    ></Finance>

    <!-- 详情 -->
    <Details :singleSelection="singleSelection" v-bind="customArgs" v-model="showDetail"></Details>
    <!-- 导出 -->
    <Export :commonLists="commonLists" v-model="showExport" @reset="reset"></Export>

    <!-- 自定义字段组件 -->
    <el-dialog title="列配置" v-model="showSortableCustom" :width="540">
      <Custom @cancelConfig="cancelConfig" v-bind="customArgs"></Custom>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  reactive,
  toRefs,
  ref,
  nextTick,
  computed,
  onActivated,
  onDeactivated
} from 'vue'
import { purchaseApi } from '@/http/api/othcustom/stockset/purchase'
import { commonApi } from '@/http/api/common'
import { IRequest } from '@/@types/httpInterface'
import dataStructure from '@/utils/dataStructure'
import { useStore } from '@/store'
import { useRoute, useRouter } from 'vue-router'
import { IState, ISelection, IValid } from './typings'
import { IPower } from '@/@types/iPower'
import { useI18n } from 'vue-i18n'
import { dateNormArray, dateNormDateRange } from '@/utils/dateNorm'
import { CUSTOM_TABLES } from '@/constant/bus/bus_custom_table'
import { ElMessageBox, ElMessage } from 'element-plus'

// 组件
import Custom from '@/components/common/Custom/Custom.vue'
import Details from '@/components/common/Details/Details.vue'
import CommonTable from '@/components/common/Table/CommonTable.vue'
import Add from './components/Add.vue'
import Append from './components/Append.vue'
import Switch from './components/Switch.vue'
import Finance from './components/Finance.vue'
import StockInventory from './components/StockInventory.vue'
import Export from './components/Export.vue'
import Upd from './components/Upd.vue'
import Storage from './components/Storage.vue'
import BtnGroup from '@/components/common/BtnGroup/index.vue'
import btnName from '@/constant/btnName'

export default defineComponent({
  components: {
    Custom,
    Details,
    CommonTable,
    Add,
    Append,
    Switch,
    Finance,
    StockInventory,
    Export,
    Upd,
    Storage,
    BtnGroup
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
      /**是否显示底部内容 */
      showBotContent: false,
      /**底部表格默认选中样式 */
      botTableActiveName: 'detail',
      tableCheck: {},
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
        order_by: 1, //0升序   1降序(请默认传1)
        total: 0,
        field: '',
        supplier: '',
        search_value: null,
        inventory_enter_type: null,
        payment_status: null
        // stock_type: null,
        // date: []
      },
      itemName: 'add',
      commonLists: {
        typeList: [],
        unitList: [],
        modelList: [],
        warehouseList: [],
        currencyUnitList: [],
        supplierList: [],
        supplierList2: [
          {
            id: 'all',
            name: t('common.all')
          }
        ],
        accountList: [],
        staffList: [],
        enterTypeList: [
          { id: 2, name: t('common.enterTypeList_part') },
          { id: 1, name: t('common.enterTypeList_has') },
          { id: 0, name: t('common.enterTypeList_no') }
        ],
        paymentStatusList: [
          { id: 2, name: t('common.pay_part') },
          { id: 1, name: t('common.pay_has') },
          { id: 0, name: t('common.pay_no') }
        ],
        productGradeList: [],
        // ++
        enterTypeList2: [
          { id: 'all', name: t('common.all') },
          { id: 2, name: t('common.enterTypeList_part') },
          { id: 1, name: t('common.enterTypeList_has') },
          { id: 0, name: t('common.enterTypeList_no') }
        ],

        paymentStatusList2: [
          { id: 1, name: t('common.pay_has') },
          { id: 0, name: t('common.pay_no') },
          { id: 2, name: t('common.pay_part') },
          { id: 'all', name: t('common.all') }
        ],
        orderByList: [
          { id: 0, name: '升序' },
          { id: 1, name: '降序' }
        ]
      },
      customArgs: {
        common_array: ['created_id', 'created_name', 'created_at', 'updated_at', 'id'],
        handle_array: ['created_id', 'created_name', 'created_at', 'updated_at'],
        table: CUSTOM_TABLES.STOCK_STATISTICS
      },
      showAdd: false,
      showDetail: false,
      showAppend: false,
      showFinancial: false,
      showSortableCustom: false,
      showExport: false,
      showUpd: false,
      showStorage: false,
      buttonData: [],
      switchButton: selection.singleSelection?.stock_type
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
    const appendChildRef = ref()
    const updChildRef = ref()
    const tabContRef = ref()
    const financialChildRef = ref()
    const storageChildRef = ref()
    /**进货详情列表 */
    const purchaseDetailsForm = reactive({
      props: [] as any,
      data: [] as any
    })
    /**进货付款详情列表 */
    const purchasePaymentForm = reactive({
      props: [] as any,
      data: [] as any
    })
    /**底部表格分页数据 */
    const botTablePage = reactive({
      index: 1,
      size: 18,
      total: 0
    })
    const requests = {
      /**查询进货单详情数据 */
      getPurchaseDetails() {
        const data = dataStructure(
          {},
          {
            page: state.pagination.page,
            perpage: state.pagination.perpage,
            id: state.tableCheck.id
          }
        )
        purchaseApi
          .get_inventory_list(data)
          .then(res => {
            let { status, custom_data } = res as IRequest
            if (status === 200) {
              purchaseDetailsForm.props = custom_data.all_array || []
              purchaseDetailsForm.data = custom_data.data || []
              botTablePage.total = custom_data.total || 0
            }
          })
          .catch(err => err)
      },
      /**查询进货单付款记录数据 */
      getPurchasePayment() {
        const data = dataStructure(
          {},
          {
            id: state.tableCheck.id,
            order_by: 1
          }
        )
        purchaseApi
          .get_certificate_of_payment_list(data)
          .then(res => {
            console.log(res)

            let { status, custom_data } = res as IRequest
            if (status === 200) {
              purchasePaymentForm.props = custom_data.all_array || []
              purchasePaymentForm.data = custom_data.data || []
              botTablePage.total = custom_data.total || 0
            }
          })
          .catch(err => err)
      },
      getSwitch() {
        const args = dataStructure(
          { power_url: 'V1/Stock/transfer_of_order' },
          {
            id: selection.singleSelection.id
          }
        )
        purchaseApi
          .get_switch(args)
          .then(res => {
            let { status, custom_data, info, field_name } = res as IRequest
            if (status === 200) {
              methods.reset('switch')
              ElMessage({
                type: 'success',
                message: info
              })
            }
          })
          .catch(err => err)
      },

      getStaffInfo() {
        const data = dataStructure(
          {},
          {
            order_by: 1
          }
        )
        commonApi
          .get_staff_info(data)
          .then(res => {
            let { status, custom_data, info } = res as IRequest
            if (status === 200) {
              state.commonLists.staffList = custom_data
            }
          })
          .catch(err => err)
      },
      getAccountList() {
        const data = dataStructure(
          {},
          {
            order_by: 1
          }
        )
        purchaseApi
          .get_account_list(data)
          .then(res => {
            let { status, custom_data, info } = res as IRequest
            if (status === 200) {
              state.commonLists.accountList = custom_data.data
            }
          })
          .catch(err => err)
      },
      getStockTypeList() {
        const data = dataStructure(
          {},
          {
            order_by: 1
          }
        )
        purchaseApi
          .get_stock_type_list(data)
          .then(res => {
            let { status, custom_data, info } = res as IRequest
            if (status === 200) {
              state.commonLists.productGradeList = custom_data.data
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
        purchaseApi
          .get_currency_unit_list(data)
          .then(res => {
            let { status, custom_data, info } = res as IRequest
            if (status === 200) {
              console.log(custom_data)

              state.commonLists.currencyUnitList = custom_data
            }
          })
          .catch(err => err)
      },
      // 库存仓库接口：V1/Stock/inventory_warehouse_list
      getWarehouseList() {
        const data = dataStructure(
          {},
          {
            order_by: 1
          }
        )
        purchaseApi
          .get_warehouse_list(data)
          .then(res => {
            let { status, custom_data, info } = res as IRequest
            if (status === 200) {
              state.commonLists.warehouseList = custom_data
            }
          })
          .catch(err => err)
      },

      // 库存型号接口：V1/Stock/inventory_model_list
      getModelList(inventory_type: number) {
        const data = dataStructure(
          {},
          {
            order_by: 1,
            inventory_type: inventory_type //库存类型ID
          }
        )
        purchaseApi
          .get_model_list(data)
          .then(res => {
            let { status, custom_data, info } = res as IRequest
            if (status === 200) {
              // 给了所有的型号
              state.commonLists.modelList = custom_data
            }
          })
          .catch(err => err)
      },
      // 库存单位接口：V1/Stock/inventory_unit_list
      getUnitList() {
        const data = dataStructure(
          {},
          {
            order_by: 1
          }
        )
        purchaseApi
          .get_unit_list(data)
          .then(res => {
            let { status, custom_data, info } = res as IRequest
            if (status === 200) {
              state.commonLists.unitList = custom_data
            }
          })
          .catch(err => err)
      },
      // 库存类型接口：V1/Stock/inventory_type_list
      getTypeList() {
        const data = dataStructure(
          {},
          {
            order_by: 1
          }
        )
        purchaseApi
          .get_type_list(data)
          .then(res => {
            let { status, custom_data, info } = res as IRequest
            if (status === 200) {
              state.commonLists.typeList = custom_data
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
        purchaseApi
          .get_supplier_list(data)
          .then(res => {
            let { status, custom_data, info } = res as IRequest
            if (status === 200) {
              state.commonLists.supplierList = custom_data
              state.commonLists.supplierList2 = state.commonLists.supplierList2.concat(custom_data)
            }
          })
          .catch(err => err)
      },
      //  库存管理列表获取接口：V1/Stock/list
      getList() {
        state.tableCheck = {}
        const data = dataStructure({}, state.pagination)
        purchaseApi
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
      // 库存管理页面接口：V1/Stock/index
      async getIndex(search_value: any = null) {
        const data = dataStructure({ power_url: route.path }, {})
        purchaseApi
          .get_index(data)
          .then(res => {
            let { status, power } = res as IRequest
            if (status === 200) {
              requests.getSupplierList()
              requests.getList()
              state.buttonData = power
            }
          })
          .catch(err => err)
      }
    }
    const methods = {
      /**处理按钮的不可点击状态 */
      handleBtnDisabled(name: string) {
        /**是否是空对象 */
        const emptyObj = Object.keys(state.tableCheck).length === 0
        const tableCheck = state.tableCheck
        switch (name) {
          case btnName.LOCK:
            return tableCheck.lock === 1 || emptyObj
          case btnName.DETAIL:
            return emptyObj
          case btnName.ADD:
            return
          case btnName.DELETE:
            return emptyObj
          case btnName.EDIT:
            return emptyObj
          case btnName.APPEND:
            return (
              tableCheck.lock === 1 ||
              tableCheck.payment_status === 1 ||
              tableCheck.inventory_enter_type === 1 ||
              emptyObj
            )
          default:
            break
        }
      },
      /**锁定 */
      lock() {
        ElMessageBox.confirm('确认锁定?', t('common.tip'), {
          confirmButtonText: t('common.confirm'),
          cancelButtonText: t('common.cancel'),
          type: 'warning'
        }).then(() => {
          const data = dataStructure(
            { power_url: 'V1/Stock/lock' },
            {
              id: state.tableCheck.id
            }
          )
          purchaseApi
            .lock(data)
            .then(res => {
              let { status, info } = res as IRequest
              if (status === 200) {
                ElMessage.success(info)
                requests.getList()
              }
            })
            .catch(err => err)
        })
      },
      /**改变底部表格每页显示多少条数据 并获取列表 */
      changeBotTableSize(size: number) {
        botTablePage.size = size
        switch (state.botTableActiveName) {
          case 'detail':
            requests.getPurchaseDetails()
            break
          case 'pay_log':
            requests.getPurchasePayment()
            break
          default:
            break
        }
      },
      /**改变底部表格分页数据 并获取列表 */
      changeBotTablePage(index: number) {
        botTablePage.index = index
        switch (state.botTableActiveName) {
          case 'detail':
            requests.getPurchaseDetails()
            break
          case 'pay_log':
            requests.getPurchasePayment()
            break
          default:
            break
        }
      },
      /**重新设置底部表格数据 */
      resetBotTableData(name: string) {
        switch (name) {
          case 'detail':
            requests.getPurchaseDetails()
            break
          case 'pay_log':
            requests.getPurchasePayment()
            break
          default:
            break
        }
        state.botTableActiveName = name
      },
      // 头部选择改变
      headerChange() {
        requests.getList()
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
      handleClick(arg: any, param?: any) {
        switch (arg) {
          case 'lock':
            methods.lock()
            break
          case 'upd':
            methods.doUpd()
            break
          case 'add':
            methods.doAdd()
            break
          case 'detail':
            methods.doDetail()
            break
          case 'append':
            methods.doAppend()
            break
          case 'switch':
            // methods.doSwitch()
            ElMessageBox.confirm(t('common.confirmPurchaseOrder'), t('common.tip'), {
              confirmButtonText: t('common.confirm'),
              cancelButtonText: t('common.cancel'),
              type: 'warning'
            })
              .then(() => {
                requests.getSwitch()
              })
              .catch(() => {
                ElMessage({
                  type: 'info',
                  message: t('common.cancelSwitch')
                })
              })
            break
          case 'financial':
            methods.doFinancial()
            break
          case 'export':
            methods.doExport()
            break
          case 'in_warehouse_status':
            methods.doStorage()
            break
          default:
            break
        }
      },
      async doStorage() {
        state.itemName = 'storage'
        state.showStorage = true
        await nextTick()
        const id = selection.singleSelection?.id
        const storagechildref = storageChildRef
        storagechildref.value.getAppendSearch(id)
        storagechildref.value.id = id
      },
      async doUpd() {
        state.itemName = 'upd'
        state.showUpd = true
        if (!state.commonLists.typeList.length) requests.getTypeList()
        if (!state.commonLists.unitList.length) requests.getUnitList()
        if (!state.commonLists.warehouseList.length) requests.getWarehouseList()
        if (!state.commonLists.currencyUnitList.length) requests.getCurrencyUnitList()
        if (!state.commonLists.supplierList.length) requests.getSupplierList()
        if (!state.commonLists.productGradeList.length) requests.getStockTypeList()
        await nextTick()
        const { order_number } = selection.singleSelection
        const updchildref = updChildRef
        updchildref.value.getAppendSearch(order_number)
      },
      doExport() {
        state.itemName = 'export'
        state.showExport = true
      },

      doFinancial() {
        state.itemName = 'financial'
        state.showFinancial = true
        if (!state.commonLists.staffList.length) {
          requests.getStaffInfo()
        }
        if (!state.commonLists.accountList.length) {
          requests.getAccountList()
        }
        const { wait_money, id } = selection.singleSelection
        const financialchildref = financialChildRef
        financialchildref.value.getCertificatePaymentList(id)
        financialchildref.value.addForm.wait_money = wait_money
        financialchildref.value.addForm.id = id
      },
      async doAppend() {
        state.itemName = 'append'
        state.showAppend = true
        if (!state.commonLists.typeList.length) requests.getTypeList()
        if (!state.commonLists.unitList.length) requests.getUnitList()
        if (!state.commonLists.warehouseList.length) requests.getWarehouseList()
        if (!state.commonLists.currencyUnitList.length) requests.getCurrencyUnitList()
        if (!state.commonLists.supplierList.length) requests.getSupplierList()
        if (!state.commonLists.productGradeList.length) requests.getStockTypeList()
        await nextTick()
        const id = selection.singleSelection?.id
        const appendchildref = appendChildRef
        appendchildref.value.getAppendSearch(id)
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
          case 'append':
            state.showAppend = false
            break
          case 'financial':
            state.showFinancial = false
            break
          case 'export':
            state.showExport = false
            break
          case 'in_warehouse_status':
            state.showStorage = false
            break
          default:
            break
        }
        if (arg !== 'export') {
          requests.getList()
          // requests.getModelList()
          // 父组件表格取消选中状态
          selection.singleSelection = {}
        }
      },

      // 添加时库存类型改变加载库存型号
      inventoryTypeChange(inventory_type: any) {
        state.commonLists.modelList = []
        requests.getModelList(inventory_type)
      },
      // -------------------------------------------------主页
      // 头部有无库存改变
      headerStockChange() {
        requests.getList()
      },
      headerEnterTypeChange() {
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
      rowClick(row: any) {
        state.showBotContent = true
        if (row.id === state.tableCheck.id) return
        state.tableCheck = row
        if (state.botTableActiveName === 'detail') {
          requests.getPurchaseDetails()
        } else {
          requests.getPurchasePayment()
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
        if (!state.commonLists.productGradeList.length) {
          requests.getStockTypeList()
        }
      }
    }
    onMounted(() => {
      const { search_value } = route.query
      requests.getIndex(search_value)
    })
    onActivated(() => {})
    // onDeactivated(() => {
    //
    // })
    return {
      ...toRefs(state),
      ...toRefs(selection),
      ...requests,
      ...methods,
      singleTable,
      childRef,
      CommonTableRef,
      StockUpdRef,
      appendChildRef,
      financialChildRef,
      isEmeptyObj,
      tabContRef,
      updChildRef,
      storageChildRef,
      /*******************************/
      purchaseDetailsForm,
      purchasePaymentForm,
      botTablePage
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/css/table.scss';
@import '@/assets/css/element-common-style.scss';
@import '@/assets/css/page-common.scss'; //页面基础布局样式一
</style>
