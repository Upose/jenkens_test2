<template>
  <div class="content ">
    <div class="left_cont">
      <div class="box">
        <!-- <div class="header">
					<span>{{ $t('common.alert_header') }}</span>
				</div> -->
        <!-- <div class="part_line"></div> -->
        <div class="top">
          <div>
            <el-input
              type="text"
              :placeholder="$t('common.searchValue')"
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
              <el-button
                type="success"
                plain
                v-if="item.widget_id !== 'view'"
                :disabled="item.widget_id == 'add' ? false : isEmeptyObj"
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
            @headerClick="headerClick"
            v-bind="customArgs"
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

    <Add
      :commonLists="commonLists"
      @reset="reset"
      @inventoryTypeChange="inventoryTypeChange"
      v-model="showAdd"
    ></Add>
    <Upd
      :commonLists="commonLists"
      @reset="reset"
      @inventoryTypeChange="inventoryTypeChange"
      v-model="showUpd"
      ref="updChildRef"
    ></Upd>
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
import { MutationConstants, GetterConstants } from '@/store/modules/index/constants'
import { alertApi } from '@/http/api/othcustom/stockset/config/alert'
import { IRequest } from '@/@types/httpInterface'
import dataStructure from '@/utils/dataStructure'
import { ElMessageBox, ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
import { IPower } from '@/@types/iPower'
import { useStore } from '@/store'
import { useRoute, useRouter } from 'vue-router'
import { IState, ISelection, IValid } from './typings'
import { dateNormArray } from '@/utils/dateNorm'
import { CUSTOM_TABLES } from '@/constant/bus/bus_custom_table'
import Custom from '@/components/common/Custom/Custom.vue'
import CommonTable from '@/components/common/Table/CommonTable.vue'
import Add from './components/Add.vue'
import Upd from './components/Upd.vue'
// const { t } = useI18n()
export default defineComponent({
  components: {
    Custom,
    CommonTable,
    Add,
    Upd
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
      Add: 'Add',
      tableHeight: '100%',
      commonLists: {
        warehouseList: [],
        typeList: [],
        modelList: []
      },
      pagination: {
        page: 1,
        perpage: 18,
        total: null,
        order_by: 1,
        search_value: '',
        field: ''
      },
      customArgs: {
        common_array: ['id', 'created_id', 'created_name', 'created_at', 'updated_at'],
        table: CUSTOM_TABLES.INVENTORY_ALERT
      },
      showAdd: false,
      showUpd: false,
      showSortableCustom: false,
      tableData: [],
      buttonData: []
    })
    const updChildRef = ref()

    const requests = {
      // 库存仓库接口：V1/InventoryWarehouse/all_list
      getWarehouseList() {
        const data = dataStructure(
          {},
          {
            order_by: 1
          }
        )
        alertApi
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
      getModelList(inventory_type: any = '') {
        const data = dataStructure(
          {},
          {
            order_by: 1,
            inventory_type: inventory_type //库存类型ID
          }
        )
        alertApi
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

      // 库存类型接口：V1/InventoryType/all_list
      getTypeList() {
        const data = dataStructure(
          {},
          {
            order_by: 1
          }
        )
        alertApi
          .get_type_list(data)
          .then(res => {
            let { status, custom_data, info } = res as IRequest
            if (status === 200) {
              state.commonLists.typeList = custom_data
            }
          })
          .catch(err => err)
      },
      getList() {
        const data = dataStructure({}, state.pagination)
        alertApi
          .get_list(data)
          .then(res => {
            let { status, custom_data } = res as IRequest
            if (status === 200) {
              if (!!custom_data.data) {
                let tableData: any = dateNormArray(custom_data.data)
                state.tableData = tableData
                state.pagination.total = custom_data.total
              }
            }
          })
          .catch(err => err)
      },
      getIndex() {
        const data = dataStructure({ power_url: route.path }, {})
        alertApi
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

      getDel(id: number) {
        const data = dataStructure(
          { power_url: 'V1/InventoryUnit/del' },
          {
            id: id
          }
        )
        alertApi
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
      closeAdd(arg: any) {
        state.showAdd = arg
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
      inventoryTypeChange(arg: any) {
        state.commonLists.modelList = []
        requests.getModelList(arg)
      },
      handle(arg: any) {
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
          default:
            break
        }
      },
      reset(arg: any) {
        requests.getList()
        // 重置表单
        switch (arg) {
          case 'add':
            state.showAdd = false
            break
          case 'upd':
            state.showUpd = false
            break
          default:
            break
        }
        // 取消选中状态
        selection.singleSelection = {}
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
      handleChange(value: any) {},

      doDel() {
        let singleSelection = selection.singleSelection
        let id = singleSelection.id
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
      // 添加按钮
      doAdd() {
        state.showAdd = true
        if (!state.commonLists.warehouseList.length) {
          requests.getWarehouseList()
        }
        if (!state.commonLists.typeList.length) {
          requests.getTypeList()
        }
      },

      // 修改按钮
      async doUpd() {
        if (!state.commonLists.warehouseList.length) {
          requests.getWarehouseList()
        }
        if (!state.commonLists.typeList.length) {
          requests.getTypeList()
        }
        state.showUpd = true
        await nextTick()
        const { id } = selection.singleSelection
        const updchildref = updChildRef
        updchildref.value.getView(id)
      },
      //切换选择
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
      updChildRef,
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
