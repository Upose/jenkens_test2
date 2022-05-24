<template>
  <div class="content">
    <div class="left_cont">
      <div class="box">
        <!-- <div class="header">
					<span>{{ $t('common.account') }}</span>
				</div> -->
        <!-- <div class="part_line"></div> -->
        <div class="reset_top">
          <div class="headerFormStyle">
            <el-select
              style="margin-right:10px;margin-bottom:5px"
              filterable
              clearable
              v-model="pagination.currency_unit"
              @change="headerChange"
              :placeholder="$t('common.currency_unit_name')"
            >
              <el-option
                v-for="item in commonLists.currencyUnitList2"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
                <span style="float: left">{{ item.name }}</span>
                <span style="float: right;color: #999999;">{{ item.id }}</span>
              </el-option>
            </el-select>
            <el-select
              style="margin-right:10px;margin-bottom:5px"
              filterable
              clearable
              v-model="pagination.status_type"
              @change="headerChange"
              :placeholder="$t('common.status_type')"
            >
              <el-option
                v-for="(item, index) in commonLists.statusTypeList"
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
              v-model="pagination.buy_user"
              @change="headerChange"
            >
              <el-option
                v-for="item in commonLists.customerList2"
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
              :unlink-panels="true"
              type="daterange"
              :start-placeholder="$t('common.start_at')"
              :end-placeholder="$t('common.end_at')"
            >
            </el-date-picker>
            <el-input
              style="margin-right:10px;margin-bottom:5px"
              type="text"
              placeholder="收款单号、收款人、创建人、备注"
              v-model="pagination.search_value"
              @input="input"
              @change="onSearch"
            >
              <template #append>
                <el-button icon="el-icon-search" @click="onSearch"></el-button>
              </template>
            </el-input>
          </div>
          <div>
            <template v-for="item in buttonData" :key="item.widget_id">
              <!-- =1且无子集时遍历出按钮 status_type-->
              <el-button
                style="margin-bottom:5px"
                type="success"
                plain
                v-if="item.widget_type == 1 && !item.children"
                :disabled="
                  item.widget_id == 'add' || item.widget_id == 'export'
                    ? false
                    : item.widget_id == 'upd' || item.widget_id == 'post'
                    ? !(!isEmeptyObj && singleSelection.status == 1)
                    : item.widget_id == 'modify_anyway' || item.widget_id == 'reverse'
                    ? !(!isEmeptyObj && singleSelection.status == 2)
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
          </div>
        </div>
        <div class="tab">
          <CommonTable
            @sortChange="sortChange"
            :tableData="tableData"
            @rowClick="rowClick"
            v-bind="customArgs"
            @headerClick="headerClick"
            ref="CommonTableRef"
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
        <div ref="tabContRef" class="tab_cont tabStyle" v-if="!isEmeptyObj">
          <IndexChild ref="childRef"></IndexChild>
        </div>
      </div>
    </div>
    <!-- 添加 -->
    <Add v-model="showAdd" ref="addChildRef" @reset="reset" :commonLists="commonLists"></Add>
    <!-- 修改-->
    <Upd v-model="showUpd" ref="updChildRef" @reset="reset" :commonLists="commonLists"></Upd>

    <!-- 导出-->
    <Export v-model="showExport" @reset="reset" :commonLists="commonLists"></Export>
    <el-dialog title="列配置" v-model="showSortableCustom" :width="540">
      <Custom @cancelConfig="cancelConfig" v-bind="customArgs"></Custom>
    </el-dialog>
  </div>
  <!-- <div v-show="!isView">
    当前页面没有访问权限
  </div> -->
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, toRefs, watch, ref, nextTick } from 'vue'
import { commonApi } from '@/http/api/common'
import { receivablesApi } from '@/http/api/financecustom/receivables'
import { IRequest } from '@/@types/httpInterface'
import dataStructure from '@/utils/dataStructure'
import { getUserId } from '@/utils/cookie'
import { useStore } from '@/store'
import { useRoute, useRouter } from 'vue-router'
import { ElMessageBox, ElMessage } from 'element-plus'
import { IState, ISelection, IValid } from './typings'
import { IPower } from '@/@types/iPower'
import { useI18n } from 'vue-i18n'
import { dateNormDateRange, dateNormArray } from '@/utils/dateNorm'
import { CUSTOM_TABLES } from '@/constant/bus/bus_custom_table'
import Custom from '@/components/common/Custom/Custom.vue'
import CommonTable from '@/components/common/Table/CommonTable.vue'
import IndexChild from './components/IndexChild.vue'
import Add from './components/Add.vue'
import Upd from './components/Upd.vue'
import Export from './components/Export.vue'
// const { t } = useI18n()
export default defineComponent({
  name: 'invtype',
  components: {
    CommonTable,
    Custom,
    IndexChild,
    Add,
    Upd,
    Export
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
      commonLists: {
        staffList: [],
        supplierList: [],
        supplierList2: [],
        currencyUnitList: [],
        currencyUnitList2: [{ id: 'all', name: '全部' }],
        accountList: [],
        statusTypeList: [
          { id: 'all', name: '全部' },
          { id: 1, name: '未过账' },
          { id: 2, name: '已过账' },
          { id: 3, name: '已红冲' }
        ],
        stockTypeList: [
          { id: 0, name: t('common.stockType_order') },
          { id: 1, name: t('common.stockType_official') }
        ],
        orderByList: [
          { id: 0, name: '升序' },
          { id: 1, name: '降序' }
        ],
        customerList: [],
        customerList2: [],
        collectionTypeList: []
      },
      tableHeight: '100%',
      pagination: {
        page: 1,
        perpage: 18,
        total: null,
        order_by: 1,
        search_value: '',
        field: '',
        status_type: null,
        buy_user: null,
        date: [],
        currency_unit: null
      },
      customArgs: {
        common_array: ['id', 'created_id', 'created_name', 'created_at', 'updated_at', 'explain'],
        table: CUSTOM_TABLES.RECEIVABLES_MANAGEMENT
      },
      itemName: 'add', //页面唯一判定字段
      showAdd: false,
      showUpd: false,
      showSortableCustom: false,
      showExport: false,
      tableData: [],
      statistics: {},
      buttonData: []
    })
    const addChildRef = ref()
    const updChildRef = ref()
    const CommonTableRef = ref()
    const childRef = ref()
    const requests = {
      // 销售信息收款类型接口：V1/InventoryOrder/collection_type
      getCollectionType() {
        const data = dataStructure({}, {})
        receivablesApi
          .get_collection_type(data)
          .then(res => {
            let { status, custom_data, info } = res as IRequest
            if (status === 200) {
              state.commonLists.collectionTypeList = custom_data
            }
          })
          .catch(err => err)
      },
      // 获取客户名称接口：V1/InventoryClient/customer_name
      getCustomerName() {
        return new Promise(resolve => {
          const data = dataStructure(
            {},
            {
              order_by: 1
            }
          )
          receivablesApi
            .get_customer_name(data)
            .then(res => {
              let { status, custom_data, info } = res as IRequest
              if (status === 200) {
                state.commonLists.customerList = custom_data
                state.commonLists.customerList2 = [{ id: 'all', name: t('common.all') }].concat(
                  custom_data
                )
                resolve(custom_data)
              }
            })
            .catch(err => err)
        })
      },
      // 库存结算账号所有获取接口：V1/InventoryPaymentAccount/all_list
      getAccountList() {
        return new Promise(resolve => {
          const data = dataStructure(
            {},
            {
              order_by: 1
            }
          )
          receivablesApi
            .get_account_list(data)
            .then(res => {
              let { status, custom_data, info } = res as IRequest
              if (status === 200) {
                state.commonLists.accountList = custom_data.data
                resolve(custom_data.data)
              }
            })
            .catch(err => err)
        })
      },

      getCurrencyUnitList() {
        return new Promise(resolve => {
          const data = dataStructure(
            {},
            {
              order_by: 1
            }
          )
          receivablesApi
            .get_currency_unit_list(data)
            .then(res => {
              let { status, custom_data, info } = res as IRequest
              if (status === 200) {
                state.commonLists.currencyUnitList = custom_data
                state.commonLists.currencyUnitList2 = state.commonLists.currencyUnitList2.concat(
                  custom_data
                )
                resolve(custom_data)
              }
            })
            .catch(err => err)
        })
      },
      // 获取所有人员接口
      // getStaffInfo() {
      // 	const data = dataStructure(
      // 		{},
      // 		{
      // 			order_by: 1,
      // 		}
      // 	)
      // 	commonApi
      // 		.get_staff_info(data)
      // 		.then(res => {
      // 			let { status, custom_data, info } = res as IRequest
      // 			if (status === 200) {
      // 				state.commonLists.staffList = custom_data
      // 			}
      // 		})
      // 		.catch(err => err)
      // },
      //  财务中心付款管理获取接口：V1/PaymentManagement/list
      getList() {
        const data = dataStructure(
          {},
          {
            page: state.pagination.page,
            perpage: state.pagination.perpage,
            search_value: state.pagination.search_value,
            order_by: state.pagination.order_by,
            status_type: state.pagination.status_type,
            date: dateNormDateRange(state.pagination.date),
            buy_user: state.pagination.buy_user,
            currency_unit: state.pagination.currency_unit
          }
        )
        receivablesApi
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
      // 库存类型页面接口：V1/InventoryType/index
      getIndex() {
        const data = dataStructure({ power_url: route.path }, {})
        receivablesApi
          .get_index(data)
          .then(res => {
            let { status, power } = res as IRequest
            if (status === 200) {
              let hasView

              power.forEach((item: IPower) => {
                if (item.widget_id === 'view') {
                  requests.getList()
                  if (!state.commonLists.customerList.length) {
                    requests.getCustomerName()
                  }
                  if (!state.commonLists.collectionTypeList.length) {
                    requests.getCollectionType()
                  }
                  if (!state.commonLists.currencyUnitList.length) {
                    requests.getCurrencyUnitList()
                  }
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
      getPost() {
        return new Promise(resolve => {
          const data = dataStructure(
            { power_url: 'V1/PaymentManagement/post' },
            { id: selection.singleSelection.id }
          )
          receivablesApi
            .get_post(data)
            .then(res => {
              let { status, custom_data, info } = res as IRequest
              if (status === 200) {
                methods.reset('post')
                ElMessage({
                  type: 'success',
                  message: info
                })
              }
            })
            .catch(err => err)
        })
      },
      // 财务中心付款管理红冲接口：V1/PaymentManagement/reverse
      getReverse() {
        return new Promise(resolve => {
          const data = dataStructure(
            { power_url: 'V1/PaymentManagement/reverse' },
            { id: selection.singleSelection.id }
          )
          receivablesApi
            .get_reverse(data)
            .then(res => {
              let { status, custom_data, info } = res as IRequest
              if (status === 200) {
                methods.reset('reverse')
                ElMessage({
                  type: 'success',
                  message: info
                })
              }
            })
            .catch(err => err)
        })
      }
    }
    const methods = {
      // 关闭列配置弹出框
      cancelConfig() {
        state.showSortableCustom = false
      },
      // 头部选择改变
      headerChange() {
        requests.getList()
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
      handle(arg: any) {
        switch (arg) {
          case 'add':
            methods.doAdd()
            break
          case 'upd':
            methods.doUpd()
            break
          case 'post':
            methods.doPost()
            break
          case 'reverse':
            methods.doReverse()
            break
          case 'export':
            state.showExport = true
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
      handleSizeChange(perpage: number) {
        state.pagination.perpage = perpage
        requests.getList() //传参顺序
      },

      handleCurrentChange(page: number) {
        state.pagination.page = page

        requests.getList()
      },
      // 搜索按钮
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
        if (!state.commonLists.currencyUnitList.length) {
          requests.getCurrencyUnitList()
        }
        if (!state.commonLists.accountList.length) {
          requests.getAccountList()
        }
        if (!state.commonLists.customerList.length) {
          requests.getCustomerName()
        }
        state.itemName = 'add'
        state.showAdd = true
        const addchildref = addChildRef
        addchildref.value.getConfigNumber()
      },

      // 修改按钮
      async doUpd() {
        let p1: any, p2: any, p3: any
        if (!state.commonLists.customerList.length) {
          p1 = requests.getCustomerName()
        }
        if (!state.commonLists.currencyUnitList.length) {
          p2 = requests.getCurrencyUnitList()
        }
        if (!state.commonLists.accountList.length) {
          p3 = requests.getAccountList()
        }
        const { id } = selection.singleSelection
        state.itemName = 'upd'
        state.showUpd = true
        // 等下拉框数据拿到后在进行子组件数据请求
        Promise.all([p1, p2, p3]).then(res => {
          const updchildref = updChildRef
          updchildref.value.getView(id)
          updchildref.value.getDetailsList(id)
        })
      },

      doPost() {
        ElMessageBox.confirm(t('common.confirmPost'), t('common.tip'), {
          confirmButtonText: t('common.confirm'),
          cancelButtonText: t('common.cancel'),
          type: 'warning'
        })
          .then(() => {
            requests.getPost()
          })
          .catch(() => {
            ElMessage({
              type: 'info',
              message: t('common.cancelPost')
            })
          })
      },
      doReverse() {
        ElMessageBox.confirm(t('common.confirmReverse'), t('common.tip'), {
          confirmButtonText: t('common.confirm'),
          cancelButtonText: t('common.cancel'),
          type: 'warning'
        })
          .then(() => {
            requests.getReverse()
          })
          .catch(() => {
            ElMessage({
              type: 'info',
              message: t('common.cancelReverse')
            })
          })
      },
      //切换选择
      // 单击事件
      async rowClick(row: any) {
        let id = selection.singleSelection?.id
        if (id === row.id) {
          const CommonTableref = CommonTableRef
          CommonTableref.value.setCurrentRow()
          selection.singleSelection = {}
        } else {
          selection.singleSelection = row
          await nextTick() //数据更改后等待dom更新后执行后续的代码
          let id = row.id
          const childref = childRef
          childref.value.getDetailsList(id)
          childref.value.id = id
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
      isEmeptyObj,
      addChildRef,
      updChildRef,
      CommonTableRef,
      childRef
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/css/table.scss';
@import '@/assets/css/element-common-style.scss';

@import '@/assets/css/page-common.scss';
</style>
