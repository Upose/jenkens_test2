<!--
 * @Description: 
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2022-05-24 14:59:01
-->
<template>
  <div class="content ">
    <div class="left_cont">
      <div class="box">
        <!-- <div class="part_line"></div> -->
        <div class="reset_top">
          <div class="headerFormStyle">
            <!-- 销售公司 -->
            <el-select
              style="margin-right:10px;margin-bottom:5px"
              filterable
              clearable
              v-model="pagination.company"
              @change="headerChange"
              :placeholder="$t('common.sale_com_code_name')"
            >
              <el-option
                v-for="item in commonLists.companyList2"
                :key="item.com_code"
                :label="item.com_name"
                :value="item.com_code"
              >
                <span style="float: left">{{ item.com_name }}</span>
                <span style="float: right;color: #999999;">{{ item.com_code }}</span>
              </el-option>
            </el-select>
            <!-- 客户名称 -->
            <el-select
              style="margin-right:10px;margin-bottom:5px"
              filterable
              clearable
              v-model="pagination.buy_user"
              @change="headerChange"
              :placeholder="$t('common.buy_user')"
            >
              <el-option
                v-for="(item, index) in commonLists.customerList2"
                :key="index"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
            <!-- 付款状态 -->
            <el-select
              style="margin-right:10px;margin-bottom:5px"
              filterable
              clearable
              v-model="pagination.payment_status"
              @change="headerChange"
              :placeholder="$t('common.payment_status_name')"
            >
              <el-option
                v-for="item in commonLists.payStatusList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
            <el-date-picker
              @change="headerChange"
              style="margin-right:10px;margin-bottom:5px"
              v-model="pagination.date"
              type="daterange"
              :start-placeholder="$t('common.start_at')"
              :end-placeholder="$t('common.end_at')"
              :unlink-panels="true"
            >
            </el-date-picker>
            <!-- 搜索区 -->
            <el-input
              type="text"
              style="margin-right:10px;margin-bottom:5px"
              :placeholder="
                `${$t('common.sale_order_number')}、${$t('common.sell_user')}、${$t(
                  'common.explain'
                )}`
              "
              v-model="pagination.search_value"
              @input="input"
              @change="onSearch"
            >
              <template #append>
                <el-button icon="el-icon-search" @click="onSearch"></el-button>
              </template>
            </el-input>
            <!-- </div> -->
          </div>
          <div>
            <template v-for="item in buttonData" :key="item.widget_id">
              <!-- =1且无子集时遍历出按钮 -->
              <el-button
                style="margin-bottom:5px"
                type="success"
                plain
                v-if="item.widget_type == 1 && !item.children"
                :disabled="
                  item.widget_id == 'add'
                    ? false
                    : item.widget_id == 'return'
                    ? !(!isEmeptyObj && singleSelection.sale_type)
                    : item.widget_id == 'append' || item.widget_id == 'switch'
                    ? !(!isEmeptyObj && !singleSelection.sale_type)
                    : isEmeptyObj
                "
                @click="handle(item.widget_id, item.name)"
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
                    <el-dropdown-item
                      @click="handle(item2.widget_id, item2.name)"
                      :disabled="item2.widget_id == 'export' ? false : isEmeptyObj"
                      >{{ item2.name }}</el-dropdown-item
                    >
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
        <!--  -->
        <div class="tab">
          <CommonTable
            @sortChange="sortChange"
            ref="CommonTableRef"
            :tableData="tableData"
            @rowClick="rowClick"
            v-bind="customArgs"
            @headerClick="headerClick"
            :statistics="statistics"
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
        <!-- 详情模块  （底部） -->
        <div class="tab_cont tabStyle" v-if="!isEmeptyObj" ref="tabContRef">
          <SaleinfoChild ref="childRef"></SaleinfoChild>
        </div>
      </div>
    </div>
    <!-- 弹出抽屉 -->
    <!-- 添加 -->
    <Add v-model="showAdd" @reset="reset" :commonLists="commonLists"></Add>
    <!-- 修改 -->
    <Upd v-model="showUpd" ref="updChildRef" @reset="reset" :commonLists="commonLists"></Upd>
    <!-- 追加 -->
    <Append
      ref="appendChildRef"
      @reset="reset"
      :commonLists="commonLists"
      v-model="showAppend"
    ></Append>
    <!-- 转单 -->
    <Switch
      ref="switchChildRef"
      @reset="reset"
      :commonLists="commonLists"
      v-model="showSwitch"
    ></Switch>
    <!-- 财务 -->
    <Financial
      ref="financialChildRef"
      @reset="reset"
      :commonLists="commonLists"
      v-model="showFinancial"
    ></Financial>
    <!-- 金额调整 -->
    <Adjust ref="adjustChildRef" @reset="reset" v-model="showAdjust"></Adjust>
    <!-- 导出 -->
    <Export v-model="showExport" @reset="reset" :commonLists="commonLists"></Export>
    <!-- 详情 -->
    <Details v-bind="customArgs" :singleSelection="singleSelection" v-model="showDetail"></Details>
    <!-- 退货 -->
    <Return
      ref="returnChildRef"
      @reset="reset"
      :commonLists="commonLists"
      v-model="showReturn"
    ></Return>

    <!-- 特殊页面 -->
    <el-dialog title="列配置" v-model="showSortableCustom" :width="540">
      <Custom @cancelConfig="cancelConfig" v-bind="customArgs"></Custom>
    </el-dialog>
    <el-dialog :title="$t('common.select_language')" v-model="dialog.dialogVisible" :width="500">
      <el-radio-group v-model="dialog.language_id">
        <el-radio label="cn">简体中文</el-radio>
        <el-radio label="en">English</el-radio>
        <el-radio label="fr">Français</el-radio>
      </el-radio-group>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialog.dialogVisible = false">{{ $t('common.cancel') }}</el-button>
          <el-button type="success" plain @click="dialogClick(dialog.language_id)">{{
            $t('common.confirm')
          }}</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, toRefs, watch, ref, nextTick } from 'vue'
import { commonApi } from '@/http/api/common'
import { saleinventoryApi } from '@/http/api/othcustom/stockset/saleinventory'
import { IRequest } from '@/@types/httpInterface'
import dataStructure from '@/utils/dataStructure'
import { useStore } from '@/store'
import { useRoute, useRouter } from 'vue-router'
import { ElMessageBox, ElMessage } from 'element-plus'
import { ISelection, IState, IValid } from './typings'
import { IPower } from '@/@types/iPower'
import { useI18n } from 'vue-i18n'
import { dateNormArray, getCurMonthFirstDayAndLastDay, dateNormDateRange } from '@/utils/dateNorm'
import { checkTwoDeci, checkSaleNumber1 } from '@/utils/regp'
import { changeMoney, changeNumber } from '@/utils/moneyToMicrometer'
import { CUSTOM_TABLES } from '@/constant/bus/bus_custom_table'
import SaleinfoChild from './components/SaleinfoChild.vue'
import SaleAppend from './components/SaleAppend.vue'
import SaleSwitch from './components/SaleSwitch.vue'
import Custom from '@/components/common/Custom/Custom.vue'
import Details from '@/components/common/Details/Details.vue'
import CommonTable from '@/components/common/Table/CommonTable.vue'
import Add from './components/Add.vue'
import Upd from './components/Upd.vue'
import Append from './components/Append.vue'
import Switch from './components/Switch.vue'
import Export from './components/Export.vue'
import Return from './components/Return.vue'
import Financial from './components/Financial.vue'
import Adjust from './components/Adjust.vue'
// const { t } = useI18n()
export default defineComponent({
  components: {
    Switch,
    Add,
    Upd,
    Export,
    Append,
    SaleinfoChild,
    SaleAppend,
    SaleSwitch,
    Custom,
    Details,
    CommonTable,
    Return,
    Financial,
    Adjust
  },
  setup() {
    const { t } = useI18n()
    const CommonTableRef = ref()
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
      dialog: {
        dialogVisible: false,
        language_id: store.state.users.language
      },
      tableHeight: '100%',
      pagination: {
        date: [],
        page: 1,
        perpage: 18,
        total: null,
        search_value: '',
        order_by: 1, //0升序   1降序(请默认传1)
        field: '',
        company: null,
        buy_user: null,
        payment_status: null
      },
      itemName: 'add',
      customArgs: {
        // 定义此数组里的字段放在操作信息里
        handle_array: ['created_id', 'created_name', 'created_at', 'updated_at'],
        // 定义自定义列和表格那些取公共翻译
        common_array: ['created_id', 'created_name', 'created_at', 'updated_at', 'explain', 'id'],
        table: CUSTOM_TABLES.INVENTORY_ORDER
      },
      commonLists: {
        customerList: [],
        currencyUnitList: [],
        staffList: [],
        companyList: [],
        companyLoading: false,
        buyTypeList: [
          { id: 1, name: t('common.buyType_com') },
          { id: 0, name: t('common.buyType_per') }
        ],
        paymentStatusList: [
          { id: 1, name: t('common.collect_has') },
          { id: 2, name: t('common.collect_part') },
          { id: 0, name: t('common.collect_no') }
        ],
        collectionTypeList: [],

        buyTypeList2: [
          { id: 1, name: t('common.buyType_per') },
          { id: 2, name: t('common.buyType_com') },
          { id: 3, name: t('common.all') }
        ],
        saleTypeList3: [
          { id: 1, name: t('common.saleType_has') },
          { id: 2, name: t('common.saleType_no') },
          { id: 'all', name: t('common.all') }
        ],
        paymentStatusList2: [
          { id: 3, name: t('common.all') },
          { id: 1, name: t('common.collect_has') },
          { id: 2, name: t('common.collect_no') },
          { id: 4, name: t('common.collect_part') }
        ],
        /**付款状态 */
        payStatusList: [
          { id: 'all', name: t('common.all') },
          { id: 0, name: t('common.collect_no') },
          { id: 1, name: t('common.collect_has') },
          { id: 2, name: t('common.collect_part') }
        ],
        orderByList: [
          { id: 0, name: t('common.ascend') },
          { id: 1, name: t('common.descend') }
        ],
        returnList: [
          { id: 0, name: '是' },
          { id: 1, name: '否' }
        ],

        companyList2: [],
        customerList2: [],
        productGradeList: [],
        accountList: []
      },
      showAdd: false,
      showUpd: false,
      showDetail: false,
      showExport: false,
      showSwitch: false,
      showAppend: false,
      showSortableCustom: false,
      showReturn: false,
      showFinancial: false,
      showAdjust: false,
      buttonData: [],
      tableData: [],
      statistics: {}
    })
    //form表单提交后，后端返回的错误校验
    const valid: IValid = reactive({
      checkOthers: {
        fun: (
          rule: object,
          value: string,
          callback: Function,
          info: any = '',
          num: boolean = false
        ) => {
          if (num) {
            callback(new Error(info))
            valid.checkOthers.num = false
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
            valid.checkOthers.num
          )
        },
        info: '',
        num: false
      }
    })
    const childRef = ref()
    const appendChildRef = ref()
    const updChildRef = ref()
    const switchRef = ref()
    const switchChildRef = ref()
    const financialChildRef = ref()
    const appendRef = ref()
    const exportRef = ref()
    const SaleAppendRef = ref()
    const SaleSwitchRef = ref()
    const returnChildRef = ref()
    const adjustChildRef = ref()
    const tabContRef = ref()
    const requests = {
      getAccountList() {
        const data = dataStructure(
          {},
          {
            order_by: 1
          }
        )
        saleinventoryApi
          .get_account_list(data)
          .then(res => {
            let { status, custom_data, info } = res as IRequest
            if (status === 200) {
              state.commonLists.accountList = custom_data.data
            }
          })
          .catch(err => err)
      },
      // 获取产品等级列表
      getStockTypeList() {
        const data = dataStructure(
          {},
          {
            order_by: 1
          }
        )
        saleinventoryApi
          .get_stock_type_list(data)
          .then(res => {
            let { status, custom_data, info } = res as IRequest
            if (status === 200) {
              state.commonLists.productGradeList = custom_data.data
            }
          })
          .catch(err => err)
      },
      getCustomerName() {
        const data = dataStructure(
          {},
          {
            order_by: 1
          }
        )
        saleinventoryApi
          .get_customer_name(data)
          .then(res => {
            let { status, custom_data, info } = res as IRequest
            if (status === 200) {
              state.commonLists.customerList = custom_data
              state.commonLists.customerList2 = [{ id: 'all', name: t('common.all') }].concat(
                custom_data
              )
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
      // 公司获取接口：V1/Company/list
      getCompanyList() {
        const data = dataStructure(
          {},
          {
            search_value: null,
            order_by: 1
          }
        )
        saleinventoryApi
          .get_company_list(data)
          .then((res: any) => {
            let { status, custom_data } = res as IRequest
            if (status === 200) {
              state.commonLists.companyList = custom_data.role_value
              state.commonLists.companyList2 = [
                { com_code: 'all', com_name: t('common.all') }
              ].concat(custom_data.role_value)
            }
          })
          .catch((err: any) => err)
      },
      getCurrencyUnitList() {
        const data = dataStructure(
          {},
          {
            order_by: 1
          }
        )
        saleinventoryApi
          .get_currency_unit_list(data)
          .then(res => {
            let { status, custom_data, info } = res as IRequest
            if (status === 200) {
              state.commonLists.currencyUnitList = custom_data
            }
          })
          .catch(err => err)
      },

      getList() {
        state.pagination.date = dateNormDateRange(state.pagination.date)
        const data = dataStructure({}, state.pagination)
        saleinventoryApi
          .get_list(data)
          .then(res => {
            let { status, custom_data } = res as IRequest
            if (status === 200) {
              let tableData: any = dateNormArray(custom_data.data)
              state.tableData = tableData
              state.pagination.total = custom_data.total
              state.statistics = custom_data.statistics
            }
          })
          .catch(err => err)
      },
      getIndex(search_value: any = null) {
        const data = dataStructure({ power_url: route.path }, {})
        saleinventoryApi
          .get_index(data)
          .then(res => {
            let { status, power } = res as IRequest
            if (status === 200) {
              let hasView
              power.forEach((item: IPower) => {
                if (item.widget_id === 'view') {
                  // 初始化搜索栏日期
                  state.pagination.date = getCurMonthFirstDayAndLastDay()
                  if (!state.commonLists.customerList.length) {
                    requests.getCustomerName()
                  }
                  if (!state.commonLists.companyList.length) {
                    requests.getCompanyList()
                  }
                  if (search_value) {
                    state.pagination.search_value = search_value
                  }
                  requests.getList()
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
      },

      getDel(id: string) {
        const data = dataStructure(
          { power_url: 'V1/InventoryOrder/del' },
          {
            id: id
          }
        )
        saleinventoryApi
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
      },

      getCollectionType() {
        const data = dataStructure({}, {})
        saleinventoryApi
          .get_collection_type(data)
          .then(res => {
            let { status, custom_data, info } = res as IRequest
            if (status === 200) {
              state.commonLists.collectionTypeList = custom_data
            }
          })
          .catch(err => err)
      },

      // 生成销售联接口
      getSalesOfAl(language_id: any, id: any) {
        const data = dataStructure(
          { power_url: 'V1/InventoryOrder/sales_of_al' },
          { language_id: language_id, id: id }
        )
        saleinventoryApi
          .get_sales_of_al(data)
          .then(res => {
            let { status, custom_data, info, field_name } = res as IRequest
            if (status === 200) {
              window.open(custom_data, '_blank')
            }
          })
          .catch(err => err)
      },
      // 生成客户联接口
      getCustomersAl(language_id: string, id: any) {
        const data = dataStructure(
          { power_url: 'V1/InventoryOrder/customers_al' },
          { language_id: language_id, id: id }
        )
        saleinventoryApi
          .get_customers_al(data)
          .then(res => {
            let { status, custom_data, info, field_name } = res as IRequest
            if (status === 200) {
              window.open(custom_data, '_blank')
              // window.location.href = custom_data
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
      headerChange() {
        requests.getList()
      },

      // 生成pdf方法
      doSalesOfAl() {
        state.itemName = 'soldsNote'
        state.dialog.dialogVisible = true
      },
      dialogClick(language_id: string) {
        const { id } = selection.singleSelection
        state.dialog.dialogVisible = false
        switch (state.itemName) {
          case 'soldsNote':
            requests.getSalesOfAl(language_id, id)

            break
          case 'customersNote':
            requests.getCustomersAl(language_id, id)
            break
          default:
            break
        }
      },
      handle(arg: any, name: any) {
        switch (arg) {
          case 'add':
            methods.doAdd()
            break
          case 'upd':
            methods.doUpd()
            break
          case 'del':
            methods.doDel()
            break
          case 'append':
            methods.doAppend()
            break
          case 'switch':
            methods.doSwitch()
            break
          case 'export':
            methods.doExport()
            break
          case 'sales_of_al':
            methods.doSalesOfAl()
            break
          case 'customers_al':
            methods.doCustomersAl()
            break
          case 'detail':
            methods.doDetail()
            break
          case 'return':
            methods.doReturn()
            break
          case 'financial':
            methods.doFinancial()
            break
          case 'adjust':
            methods.doAdjust()
            break
          default:
            break
        }
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
          case 'switch':
            state.showSwitch = false
            break
          case 'del':
            break
          case 'export':
            state.showExport = false
            break
          case 'return':
            state.showReturn = false
            break
          case 'financial':
            state.showFinancial = false
            break
          case 'adjust':
            state.showAdjust = false
            break
          default:
            break
        }
        if (arg !== 'export') {
          requests.getList()
          // 取消选中状态
          selection.singleSelection = {}
        }
      },
      doAdjust() {
        state.itemName = 'adjust'
        state.showAdjust = true
        const { id, sale_money } = selection.singleSelection
        const adjustchildref = adjustChildRef
        adjustchildref.value.addForm.sale_order_number = id
        adjustchildref.value.addForm.sale_money = changeNumber(sale_money)
        adjustchildref.value.addForm.adjust_money = changeNumber(sale_money)
        adjustchildref.value.getSaleLogList(id)
      },
      // 打开财务抽屉
      async doFinancial() {
        if (!state.commonLists.currencyUnitList.length) {
          requests.getCurrencyUnitList()
        }
        if (!state.commonLists.collectionTypeList.length) {
          requests.getCollectionType()
        }
        if (!state.commonLists.staffList.length) {
          requests.getStaffInfo()
        }
        if (!state.commonLists.accountList.length) {
          requests.getAccountList()
        }
        state.itemName = 'financial'
        state.showFinancial = true
        await nextTick()
        const {
          id,
          sale_money,
          paid_amount,
          payment_status,
          currency_unit,
          wait_money
        } = selection.singleSelection
        const financialchildref = financialChildRef
        financialchildref.value.addForm.sale_order_number = id
        financialchildref.value.addForm.sale_money = sale_money
        financialchildref.value.addForm.paid_amount = paid_amount
        financialchildref.value.addForm.payment_status = payment_status
        financialchildref.value.addForm.currency_unit = currency_unit
        financialchildref.value.addForm.wait_money = wait_money
        // 非洲同事要求（备注）初始为空
        financialchildref.value.addForm.pay_explain = ''
        financialchildref.value.getCertificatePaymentList(id)
      },
      async doReturn() {
        if (!state.commonLists.productGradeList.length) {
          requests.getStockTypeList()
        }
        if (!state.commonLists.currencyUnitList.length) {
          requests.getCurrencyUnitList()
        }
        if (!state.commonLists.companyList.length) {
          requests.getCompanyList()
        }
        if (!state.commonLists.customerList.length) {
          requests.getCustomerName()
        }
        state.itemName = 'return'
        state.showReturn = true
        await nextTick()
        let id = selection.singleSelection.id
        const returnchildref = returnChildRef
        returnchildref.value.getView(id)
        returnchildref.value.getSalesReturnSearch(id)
      },
      // ----------------------------------------------详情
      doDetail() {
        state.itemName = 'detail'
        state.showDetail = true
      },
      doCustomersAl() {
        state.itemName = 'customersNote'
        state.dialog.dialogVisible = true
      },
      // 调出导出页面
      doExport() {
        state.itemName = 'export'
        state.showExport = true
      },
      async doAppend() {
        state.itemName = 'append'
        state.showAppend = true
        await nextTick()
        let id = selection.singleSelection.id
        const appendchildref = appendChildRef
        appendchildref.value.getAppendSearch(id)
        if (!state.commonLists.collectionTypeList.length) {
          requests.getCollectionType()
        }
        if (!state.commonLists.currencyUnitList.length) {
          requests.getCurrencyUnitList()
        }
        if (!state.commonLists.customerList.length) {
          requests.getCustomerName()
        }
        if (!state.commonLists.staffList.length) {
          requests.getStaffInfo()
        }
        if (!state.commonLists.companyList.length) {
          requests.getCompanyList()
        }
        if (!state.commonLists.productGradeList.length) {
          requests.getStockTypeList()
        }
      },
      async doSwitch() {
        state.itemName = 'switch'
        state.showSwitch = true
        await nextTick()
        const switchchildref = switchChildRef
        // 获取卖出单号
        const sale_type = 1 //获取已售单号传1
        switchchildref.value.getSaleOrderNumber(sale_type)
        // 若用户选中table行，直接执行搜索
        if (selection.singleSelection) {
          let id = selection.singleSelection.id
          switchchildref.value.getSwitchSearch(id)
        }
        if (!state.commonLists.collectionTypeList.length) {
          requests.getCollectionType()
        }
        if (!state.commonLists.currencyUnitList.length) {
          requests.getCurrencyUnitList()
        }
        if (!state.commonLists.customerList.length) {
          requests.getCustomerName()
        }
        if (!state.commonLists.staffList.length) {
          requests.getStaffInfo()
        }
        if (!state.commonLists.companyList.length) {
          requests.getCompanyList()
        }
        if (!state.commonLists.productGradeList.length) {
          requests.getStockTypeList()
        }
      },
      async doUpd() {
        if (!state.commonLists.collectionTypeList.length) {
          requests.getCollectionType()
        }
        if (!state.commonLists.staffList.length) {
          requests.getStaffInfo()
        }
        if (!state.commonLists.accountList.length) {
          requests.getAccountList()
        }
        if (!state.commonLists.currencyUnitList.length) {
          requests.getCurrencyUnitList()
        }
        if (!state.commonLists.customerList.length) {
          requests.getCustomerName()
        }

        if (!state.commonLists.companyList.length) {
          requests.getCompanyList()
        }
        state.itemName = 'upd'
        state.showUpd = true
        await nextTick()
        let id = selection.singleSelection.id
        const updchildref = updChildRef
        updchildref.value.getView(id)
      },
      handleSizeChange(perpage: number) {
        state.pagination.perpage = perpage
        requests.getList() //传参顺序
      },
      handleCurrentChange(page: number) {
        state.pagination.page = page
        requests.getList()
      },
      onSearch() {
        requests.getList()
      },
      input() {
        if (!state.pagination.search_value) {
          requests.getList()
        }
      },

      // 添加按钮
      doAdd() {
        state.itemName = 'add'
        state.showAdd = true
        if (!state.commonLists.collectionTypeList.length) {
          requests.getCollectionType()
        }
        if (!state.commonLists.currencyUnitList.length) {
          requests.getCurrencyUnitList()
        }
        if (!state.commonLists.customerList.length) {
          requests.getCustomerName()
        }
        if (!state.commonLists.staffList.length) {
          requests.getStaffInfo()
        }
        if (!state.commonLists.companyList.length) {
          requests.getCompanyList()
        }
        if (!state.commonLists.productGradeList.length) {
          requests.getStockTypeList()
        }
      },
      doDel() {
        state.itemName = 'del'
        ElMessageBox.confirm(t('common.confirmDel'), t('common.tip'), {
          confirmButtonText: t('common.confirm'),
          cancelButtonText: t('common.cancel'),
          type: 'warning'
        })
          .then(() => {
            let id = selection.singleSelection.id
            requests.getDel(id)
          })
          .catch(() => {
            ElMessage({
              type: 'info',
              message: t('common.cancelDel')
            })
          })
      },

      // 单击事件
      async rowClick(row: any, column: any, event: any) {
        let id = selection.singleSelection?.id
        if (id === row.id) {
          // const singletable = singleTable.value
          // singletable.setCurrentRow()
          const CommonTableref = CommonTableRef
          CommonTableref.value.setCurrentRow()
          selection.singleSelection = {}
        } else {
          selection.singleSelection = row
          // 调用子组件中的方法
          await nextTick()
          const childref = childRef
          childref.value.sale_order_number = row.id
          childref.value.selectRequest()
        }
      }
    }
    onMounted(() => {
      const { search_value } = route.query
      requests.getIndex(search_value)
    })
    return {
      ...toRefs(state),
      ...toRefs(selection),
      ...requests,
      ...methods,
      CommonTableRef,
      appendChildRef,
      updChildRef,
      childRef,
      appendRef,
      switchRef,
      exportRef,
      checkTwoDeci,
      checkSaleNumber1,
      SaleAppendRef,
      SaleSwitchRef,
      switchChildRef,
      financialChildRef,
      returnChildRef,
      adjustChildRef,
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
