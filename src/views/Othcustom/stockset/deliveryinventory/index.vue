<template>
  <div class="content">
    <div class="left_cont">
      <div class="box">
        <!-- <div class="header">
					<span>{{ $t('common.delivery_header') }}</span>
				</div> -->
        <!-- <div class="part_line"></div> -->
        <div class="reset_top">
          <div class="headerFormStyle">
            <el-select
              style="margin-right:10px;margin-bottom:5px"
              filterable
              clearable
              v-model="pagination.collator"
              @change="headerChange"
              :placeholder="$t('common.collator')"
            >
              <el-option
                v-for="(item, index) in commonLists.staffList2"
                :key="index"
                :label="item.full_name"
                :value="item.id"
              >
              </el-option>
            </el-select>
            <el-select
              style="margin-right:10px;margin-bottom:5px"
              filterable
              clearable
              v-model="pagination.shipper"
              @change="headerChange"
              :placeholder="$t('common.shipper')"
            >
              <el-option
                v-for="(item, index) in commonLists.staffList2"
                :key="index"
                :label="item.full_name"
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
              :placeholder="
                $t('common.delivery_order_number') +
                  '、' +
                  $t('common.sale_order_number') +
                  '、' +
                  $t('common.explain')
              "
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
              <!-- =1且无子集时遍历出按钮 -->
              <el-button
                style="margin-bottom:5px"
                type="success"
                plain
                v-if="item.widget_type == 1 && !item.children"
                :disabled="item.widget_id == 'add' ? false : isEmeptyObj"
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
        <div ref="tabContRef" class="tab_cont tabStyle" v-if="!isEmeptyObj">
          <DeinfoChild ref="childRef"></DeinfoChild>
        </div>
      </div>
    </div>
    <!-- 添加 -->
    <Add v-model="showAdd" ref="addChildRef" @reset="reset" :commonLists="commonLists"></Add>
    <!-- 导出 -->
    <Export v-model="showExport" @reset="reset" :commonLists="commonLists"></Export>
    <!-- 详情 -->
    <Details :singleSelection="singleSelection" v-bind="customArgs" v-model="showDetail"></Details>

    <!-- ================= -->
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
import { MutationConstants, GetterConstants } from '@/store/modules/index/constants'
import { GetterConstants as usersGetterConstants } from '@/store/modules/users/constants'
import { commonApi } from '@/http/api/common'
import { deliveryinventoryApi } from '@/http/api/othcustom/stockset/deliveryinventory'
import { IRequest } from '@/@types/httpInterface'
import dataStructure from '@/utils/dataStructure'
import { useStore } from '@/store'
import { useRoute, useRouter } from 'vue-router'
import { ElMessageBox, ElMessage } from 'element-plus'
import { ISelection, IState, IValid } from './typings'
import { IPower } from '@/@types/iPower'
import { useI18n } from 'vue-i18n'
import { dateNormArray, datetimeNormOne, dateNormOne, dateNormDateRange } from '@/utils/dateNorm'
import { checkTwoDeci, checkSaleNumber2, checkAt } from '@/utils/regp'
import { CUSTOM_TABLES } from '@/constant/bus/bus_custom_table'
import DeinfoChild from './components/DeinfoChild.vue'
import DeinfoAdd from './components/DeinfoAdd.vue'
import Custom from '@/components/common/Custom/Custom.vue'
import Details from '@/components/common/Details/Details.vue'
import CommonTable from '@/components/common/Table/CommonTable.vue'
import Add from './components/Add.vue'
import Export from './components/Export.vue'
// const { t } = useI18n()
export default defineComponent({
  components: {
    DeinfoChild,
    DeinfoAdd,
    Custom,
    Details,
    CommonTable,
    Add,
    Export
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
      configUrl: process.env.VUE_APP_QIHONG_URL,
      tableHeight: '100%',
      pagination: {
        page: 1,
        perpage: 18,
        total: null,
        order_by: 1, //0升序   1降序(请默认传1)
        field: '',
        search_value: '',
        date: [],
        collator: null,
        shipper: null
      },
      itemName: 'add',
      customArgs: {
        common_array: ['created_id', 'created_name', 'created_at', 'updated_at', 'id', 'explain'],
        handle_array: ['created_id', 'created_name', 'created_at', 'updated_at'],
        table: CUSTOM_TABLES.INVENTORY_DELIVERY
      },
      commonLists: {
        staffList: [],
        orderByList: [
          { id: 0, name: '升序' },
          { id: 1, name: '降序' }
        ],
        buyTypeList: [
          { id: 1, name: '企业用户' },
          { id: 0, name: '个人用户' }
        ],
        paymentStatusList: [
          { id: 1, name: '已付款' },
          { id: 0, name: '未付款' }
        ],
        collectionTypeList: [],
        staffList2: []
      },
      showAdd: false,
      showExport: false,
      showDetail: false,
      showSortableCustom: false,
      buttonData: [],
      tableData: [],
      statistics: {}
    })
    const childRef = ref()
    const addRef = ref()
    const addChildRef = ref()
    const DeinfoAddRef = ref()
    const tabContRef = ref()
    const requests = {
      getStartAt() {
        return new Promise((reslove, reject) => {
          const data = dataStructure({}, {})
          deliveryinventoryApi
            .get_start_at(data)
            .then(res => {
              let { status, custom_data, info } = res as IRequest
              if (status === 200) {
                const { data } = custom_data
                state.pagination.date = [data, new Date()]
                reslove('拿到时间')
              }
            })
            .catch(err => err)
        })
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
              state.commonLists.staffList2 = [{ id: 'all', full_name: t('common.all') }].concat(
                custom_data
              )
            }
          })
          .catch(err => err)
      },
      getList() {
        const data = dataStructure(
          {},
          {
            page: state.pagination.page,
            perpage: state.pagination.perpage,
            search_value: state.pagination.search_value,
            order_by: state.pagination.order_by,
            field: state.pagination.field,
            collator: state.pagination.collator,
            shipper: state.pagination.shipper,
            date: dateNormDateRange(state.pagination.date)
          }
        )
        deliveryinventoryApi
          .get_list(data)
          .then(res => {
            let { status, custom_data } = res as IRequest
            if (status === 200) {
              let tableData: any = dateNormArray(custom_data.data)
              state.tableData = tableData
              state.statistics = custom_data.statistics
              state.pagination.total = custom_data.total
            }
          })
          .catch(err => err)
      },
      getIndex() {
        const data = dataStructure({ power_url: route.path }, {})
        deliveryinventoryApi
          .get_index(data)
          .then(res => {
            let { status, power } = res as IRequest
            if (status === 200) {
              let hasView
              power.forEach((item: IPower) => {
                if (item.widget_id === 'view') {
                  requests.getStartAt().then(() => {
                    if (!state.commonLists.staffList.length) {
                      requests.getStaffInfo()
                    }
                    requests.getList()
                  }) //拿到时间后在加载数据
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
          { power_url: 'V1/InventoryDelivery/del' },
          {
            id: id
          }
        )
        deliveryinventoryApi
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

      // 生成pdf接口
      getOutboundOrder(language_id: string, id: any) {
        const data = dataStructure(
          { power_url: 'V1/InventoryDelivery/outbound_order' },
          {
            language_id: language_id,
            id: id
          }
        )
        deliveryinventoryApi
          .get_outbound_order(data)
          .then(res => {
            let { status, custom_data, info, field_name } = res as IRequest
            if (status === 200) {
              let token = store.getters[usersGetterConstants.GET_TOKEN]
              let url = `${custom_data}&access_token=${token}`
              window.open(url)
            }
          })
          .catch(err => err)
      }
    }
    const methods = {
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
      // 关闭列配置弹出框
      cancelConfig() {
        state.showSortableCustom = false
      },

      handle(arg: any, name: string) {
        switch (arg) {
          case 'add':
            methods.doAdd()
            break
          case 'export':
            methods.doExport()
            break
          case 'outbound_order':
            methods.doOutboundOrder()
            break
          case 'detail':
            methods.doDetail()
            break
          case 'del':
            methods.doDel()
            break
          default:
            break
        }
      },
      reset(arg: any) {
        // 关闭抽屉
        switch (arg) {
          case 'add':
            state.showAdd = false

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
      // ----------------------------------------------详情
      doDetail() {
        state.showDetail = true
        state.itemName = 'detail'
      },
      dialogClick(language_id: string) {
        let id = ''
        if (selection.singleSelection) {
          id = selection.singleSelection.id
        }
        state.dialog.dialogVisible = false
        switch (state.itemName) {
          case 'outboundOrder':
            requests.getOutboundOrder(language_id, id)
            break
          default:
            break
        }
      },
      doOutboundOrder() {
        state.itemName = 'outboundOrder'
        state.dialog.dialogVisible = true
      },

      doExport() {
        state.itemName = 'export'
        state.showExport = true
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
      async doAdd() {
        state.itemName = 'add'
        state.showAdd = true
        await nextTick()
        const addchildref = addChildRef
        const sale_type = 2 //获取出库单号传数字：2
        addchildref.value.getSaleOrderNumber(sale_type)
        if (!state.commonLists.staffList.length) {
          requests.getStaffInfo()
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
          const CommonTableref = CommonTableRef.value
          CommonTableref.setCurrentRow()
          selection.singleSelection = {}
        } else {
          selection.singleSelection = row
          await nextTick()
          // 调用子组件中的方法
          const childref = childRef
          childref.value.getLogList(row.id)
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
      CommonTableRef,
      addRef,
      childRef,
      addChildRef,
      checkTwoDeci,
      checkSaleNumber2,
      DeinfoAddRef,
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
