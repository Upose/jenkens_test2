<!-- 调整单 -->
<template>
  <div class="content ">
    <div class="left_cont">
      <div class="box">
        <!-- <div class="header">
					<span>{{ $t('common.stocktaking_header') }}</span>
				</div> -->
        <!-- <div class="part_line"></div> -->
        <div class="top">
          <div></div>
          <div>
            <template v-for="item in buttonData" :key="item.widget_id">
              <el-button
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
          <CommonTable
            @sortChange="sortChange"
            :tableData="tableData"
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
      </div>
    </div>
    <!-- 添加 -->
    <Add v-model="showAdd" @reset="reset" :commonLists="commonLists" @typeChange="typeChange"></Add>
    <AjustPosition
      v-model="showEdit"
      @reset="reset"
      :commonLists="commonLists"
      @typeChange="typeChange"
    />
    <ReversePurchase
      v-model="showPurchase"
      @reset="reset"
      :commonLists="commonLists"
    ></ReversePurchase>
    <ReverseSales v-model="showSales" @reset="reset" :commonLists="commonLists"></ReverseSales>
    <ReverseOutbound
      v-model="showOutbound"
      @reset="reset"
      :commonLists="commonLists"
    ></ReverseOutbound>
    <QuantityAdjuster
      v-model="showQuantity"
      @reset="reset"
      :commonLists="commonLists"
    ></QuantityAdjuster>
    <el-dialog title="列配置" v-model="showSortableCustom" :width="540">
      <Custom @cancelConfig="cancelConfig" v-bind="customArgs"></Custom>
    </el-dialog>
  </div>

  <!-- <div v-show="!isView">
    当前页面没有访问权限
  </div> -->
</template>

<script lang="ts">
import { IRequest } from '@/@types/httpInterface'
import { IPower } from '@/@types/iPower'
import Custom from '@/components/common/Custom/Custom.vue'
import CommonTable from '@/components/common/Table/CommonTable.vue'
import { CUSTOM_TABLES } from '@/constant/bus/bus_custom_table'
import { stocktakingApi } from '@/http/api/othcustom/stockset/stocktaking'
import { useStore } from '@/store'
import dataStructure from '@/utils/dataStructure'
import { dateNormArray } from '@/utils/dateNorm'
import { computed, defineComponent, onMounted, reactive, ref, toRefs } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import Add from './components/Add.vue'
/**调整货位 */
import AjustPosition from './components/AjustPosition.vue'
import QuantityAdjuster from './components/QuantityAdjuster.vue'
import ReverseOutbound from './components/ReverseOutbound.vue'
import ReversePurchase from './components/ReversePurchase.vue'
import ReverseSales from './components/ReverseSales.vue'
import { ISelection, IState } from './typings'
// const { t } = useI18n()
export default defineComponent({
  components: {
    Custom,
    CommonTable,
    Add,
    ReversePurchase,
    ReverseSales,
    ReverseOutbound,
    QuantityAdjuster,
    AjustPosition
  },
  setup() {
    const { t } = useI18n()
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
        /**调减原因 */
        minusAdjustTypeList: [
          // 物品丢失
          { id: 0, name: t('common.produce_lose') },
          // 等级调整
          { id: 1, name: t('common.adjust_grade') }
        ],
        productGradeList: [],
        modelList: [],
        typeList: [],
        allPurchaseList: [],
        allSalesList: [],
        allOutboundList: [],
        /**所有仓库 */
        wareHouseList: []
      },
      tableHeight: '100%',
      pagination: {
        page: 1,
        perpage: 18,
        total: 0,
        order_by: 1, //0升序   1降序(请默认传1)
        field: ''
      },
      addForm: {
        inventory_type: '',
        model_number: '',
        number: null,
        sale_number: null,
        inventory_number: null,
        adjust_type: null,
        reason: '',
        product_grade: 0, //初始值必须为零
        adjust_product_grade: null,
        inventory_id: '',
        // 其他不必传后端辅助字段
        minus_adjust_type: null,
        stock: null
      },
      customArgs: {
        common_array: ['id', 'created_id', 'created_name', 'created_at', 'updated_at', 'reason'],
        handle_array: ['created_id', 'created_name', 'created_at', 'updated_at'],
        table: CUSTOM_TABLES.INVENTORY_INFORMATION
        // showCustom: store.state.index.showCustom,
      },
      showAdd: false,
      showEdit: false,
      showPurchase: false,
      showSales: false,
      showOutbound: false,
      showSortableCustom: false,
      showQuantity: false,
      tableData: [],
      buttonData: []
    })
    const addRef = ref()
    const requests = {
      /**查询所有仓库 */
      getWareHouseList() {
        const data = dataStructure(
          {},
          {
            order_by: 1
          }
        )
        stocktakingApi
          .get_all_ware_house(data)
          .then(res => {
            let { status, custom_data, info } = res as IRequest
            if (status === 200) {
              state.commonLists.wareHouseList = custom_data
            }
          })
          .catch(err => err)
      },
      getPurchasePreSearch() {
        const data = dataStructure({}, {})
        stocktakingApi
          .get_purchase_pre_search(data)
          .then(res => {
            let { status, custom_data, info } = res as IRequest
            if (status === 200) {
              state.commonLists.allPurchaseList = custom_data.data
            }
          })
          .catch(err => err)
      },
      getOutboundPreSearch() {
        const data = dataStructure({}, {})
        stocktakingApi
          .get_outbound_pre_search(data)
          .then(res => {
            let { status, custom_data, info } = res as IRequest
            if (status === 200) {
              state.commonLists.allOutboundList = custom_data.data
            }
          })
          .catch(err => err)
      },
      getSalesPreSearch() {
        const data = dataStructure({}, {})
        stocktakingApi
          .get_sales_pre_search(data)
          .then(res => {
            let { status, custom_data, info } = res as IRequest
            if (status === 200) {
              state.commonLists.allSalesList = custom_data.data
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
        stocktakingApi
          .get_stock_type_list(data)
          .then(res => {
            let { status, custom_data, info } = res as IRequest
            if (status === 200) {
              state.commonLists.productGradeList = custom_data.data
            }
          })
          .catch(err => err)
      },
      getList() {
        const data = dataStructure({}, state.pagination)
        stocktakingApi
          .get_list(data)
          .then(res => {
            let { status, custom_data } = res as IRequest
            if (status === 200) {
              let tableData: any = dateNormArray(custom_data.data)
              if (!tableData.length) return
              state.tableData = tableData
              // //undefined
              state.pagination.total = custom_data.total
            }
          })
          .catch(err => err)
      },
      getIndex() {
        const data = dataStructure({ power_url: route.path }, {})
        stocktakingApi
          .get_index(data)
          .then(res => {
            let { status, power } = res as IRequest
            if (status === 200) {
              let hasView
              power.forEach((item: IPower) => {
                if (item.widget_id === 'view') {
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

      // 库存型号接口：V1/InventoryModel/all_list
      getModelList(inventory_type: any) {
        const data = dataStructure(
          {},
          {
            order_by: 1,
            inventory_type //库存类型ID
          }
        )
        stocktakingApi
          .get_model_list(data)
          .then(res => {
            let { status, custom_data, info } = res as IRequest
            if (status === 200) {
              state.commonLists.modelList = custom_data
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
        stocktakingApi
          .get_type_list(data)
          .then(res => {
            let { status, custom_data, info } = res as IRequest
            if (status === 200) {
              state.commonLists.typeList = custom_data
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

      typeChange(arg: any) {
        requests.getModelList(arg)
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
          // 货位调整
          case 'adjust_product_position':
            methods.doEdit()

            break
          // 进货单红冲
          case 'order':
            methods.doOrder()
            break
          // 销售单红冲
          case 'sales':
            methods.doSales()
            break
          // 出库单红冲
          case 'outbound':
            methods.doOutbound()
            break
          // 库存数量调整
          case 'quantity_adjuster':
            methods.doQuantity()
            break
          default:
            break
        }
      },
      doQuantity() {
        state.showQuantity = true
      },
      doOrder() {
        state.showPurchase = true
        if (!state.commonLists.allPurchaseList.length) {
          requests.getPurchasePreSearch()
        }
      },
      doSales() {
        state.showSales = true
        if (!state.commonLists.allOutboundList.length) {
          requests.getSalesPreSearch()
        }
      },
      doOutbound() {
        state.showOutbound = true
        if (!state.commonLists.allOutboundList.length) {
          requests.getOutboundPreSearch()
        }
      },
      reset(arg: any) {
        switch (arg) {
          case 'add':
            state.showAdd = false
            requests.getList()
            // 取消选中状态
            selection.singleSelection = {}
            break
          case 'edit':
            state.showEdit = false
            requests.getList()
            // 取消选中状态
            selection.singleSelection = {}
            break
          // 进货单红冲
          case 'order':
            state.showPurchase = false
            break
          // 销售单红冲
          case 'sales':
            state.showSales = false
            break
          // 出库单红冲
          case 'outbound':
            state.showOutbound = false
            break
          // 库存数量调整
          case 'quantity_adjuster':
            state.showOutbound = false
            break
          default:
            break
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
      // 添加按钮
      doAdd() {
        state.showAdd = true
        if (!state.commonLists.productGradeList.length) {
          requests.getStockTypeList()
        }
        if (!state.commonLists.wareHouseList.length) {
          requests.getWareHouseList()
        }
        if (!state.commonLists.typeList.length) {
          requests.getTypeList()
        }
      },
      doEdit() {
        state.showEdit = true
        if (!state.commonLists.productGradeList.length) {
          requests.getStockTypeList()
        }
        if (!state.commonLists.wareHouseList.length) {
          requests.getWareHouseList()
        }
        if (!state.commonLists.typeList.length) {
          requests.getTypeList()
        }
      },
      rowClick(val: any) {
        selection.singleSelection = val
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
      addRef,
      isEmeptyObj
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/css/table.scss';
@import '@/assets/css/element-common-style.scss';

@import '@/assets/css/page-common.scss'; //页面基础布局样式一
</style>
