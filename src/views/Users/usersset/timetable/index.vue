<template>
  <div class="content">
    <div class="left_cont">
      <div class="box">
        <div class="header">
          <span>{{ $t('common.timetable_header') }}</span>
        </div>
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
              <!-- =1且无子集时遍历出按钮 -->
              <el-button
                type="success"
                plain
                v-if="item.widget_type == 1 && !item.children"
                :disabled="item.widget_id == 'add' ? false : isEmeptyObj"
                @click="handle(item.widget_id)"
                >{{ item.name }}</el-button
              >
            </template>

            <el-button type="success" plain :disabled="isEmeptyObj" @click="handle('detail')">{{
              $t('common.detail')
            }}</el-button>
          </div>
        </div>
        <div class="tab">
          <CommonTable
            @sortChange="sortChange"
            :tableData="tableData"
            @headerClick="headerClick"
            @row-click="rowClick"
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
    <!-- 添加抽屉 -->
    <el-drawer :title="$t(`common.${itemName}`)" :size="576" v-model="drawer.showAdd">
      <Add @reset="reset" :commonLists="commonLists"></Add>
    </el-drawer>
    <el-drawer :title="$t(`common.${itemName}`)" :size="576" v-model="drawer.showUpd">
      <Upd ref="updChildRef" @reset="reset" :commonLists="commonLists"></Upd>
    </el-drawer>
    <el-drawer :title="$t(`common.${itemName}`)" :size="576" v-model="drawer.showDetail">
      <Details :singleSelection="singleSelection" v-bind="customArgs"></Details>
    </el-drawer>
    <el-dialog title="列配置" v-model="drawer.showSortableCustom" :width="540">
      <Custom @cancelConfig="cancelConfig" v-bind="customArgs"></Custom>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, ref, nextTick, computed } from 'vue'
import { MutationConstants } from '@/store/modules/index/constants'
import { timetableApi } from '@/http/api/users/usersset/timetable'
import { IRequest } from '@/@types/httpInterface'
import dataStructure from '@/utils/dataStructure'
import { useStore } from '@/store'
import { useRoute, useRouter } from 'vue-router'
import { IState, ISelection } from './typings'
import { IPower } from '@/@types/iPower'
import { useI18n } from 'vue-i18n'
import { dateNormArray } from '@/utils/dateNorm'
import { CUSTOM_TABLES } from '@/constant/bus/bus_custom_table'
import { ElMessage, ElMessageBox } from 'element-plus'
// 组件
import Custom from '@/components/common/Custom/Custom.vue'
import CommonTable from '@/components/common/Table/CommonTable.vue'
import Add from './components/Add.vue'
import Upd from './components/Upd.vue'
import Details from '@/components/common/Details/Details.vue'

export default defineComponent({
  components: {
    Custom,
    CommonTable,
    Add,
    Upd,
    Details
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
      tableHeight: '100%',
      pagination: {
        page: 1,
        perpage: 18,
        order_by: 1, //0升序   1降序(请默认传1)
        total: 0,
        search_value: '',
        field: ''
      },
      itemName: 'add',
      commonLists: {
        companyList: []
      },
      customArgs: {
        common_array: ['created_id', 'created_name', 'created_at', 'updated_at', 'id', 'com_code'],
        handle_array: ['created_id', 'created_name', 'created_at', 'updated_at'],
        table: CUSTOM_TABLES.WORK_TIME_TABLE
      },
      drawer: {
        showAdd: false,
        showUpd: false,
        showDetail: false,
        showSortableCustom: false
      },
      buttonData: []
    })
    const updChildRef = ref()
    const requests = {
      getCompanyList() {
        const data = dataStructure(
          {},
          {
            search_value: null,
            order_by: 1
          }
        )
        timetableApi
          .get_company_list(data)
          .then(res => {
            let { status, custom_data } = res as IRequest
            if (status === 200) {
              state.commonLists.companyList = custom_data.role_value
            }
          })
          .catch(err => err)
      },
      getDel(id: any) {
        const data = dataStructure({ power_url: 'V1/WorkTimeTable/del' }, { id })
        timetableApi
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
      getList() {
        const data = dataStructure({}, state.pagination)
        timetableApi
          .get_list(data)
          .then(res => {
            let { status, custom_data } = res as IRequest
            if (status === 200) {
              state.pagination.total = custom_data.total
              let array: any = dateNormArray(custom_data.data)
              state.tableData = array
            }
          })
          .catch(err => err)
      },
      getIndex() {
        const data = dataStructure({ power_url: route.path }, {})
        timetableApi
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
        state.drawer.showSortableCustom = arg
      },
      // 关闭列配置弹出框
      cancelConfig() {
        state.drawer.showSortableCustom = false
      },

      handle(arg: any) {
        switch (arg) {
          case 'add':
            methods.doAdd()
            break
          case 'upd':
            methods.doUpd()
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
        // 重置表单
        switch (arg) {
          case 'add':
            state.drawer.showAdd = false
            break
          case 'upd':
            state.drawer.showUpd = false
            break
          default:
            break
        }
        requests.getList()
        // 父组件表格取消选中状态
        selection.singleSelection = {}
      },
      doDetail() {
        state.itemName = 'detail'
        state.drawer.showDetail = true
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
      async doUpd() {
        state.itemName = 'upd'
        state.drawer.showUpd = true
        await nextTick()
        const { id } = selection.singleSelection
        const updchildref = updChildRef
        updchildref.value.getView(id)
        if (!state.commonLists.companyList.length) {
          requests.getCompanyList()
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
      handleSizeChange(perpage: number) {
        state.pagination.perpage = perpage
        requests.getList() //传参顺序
      },
      handleCurrentChange(page: number) {
        state.pagination.page = page
        requests.getList()
      },
      currentChange(row: any) {
        selection.singleSelection = row
      },
      // ---------------------------------------------添加
      // 添加按钮
      doAdd() {
        state.itemName = 'add'
        state.drawer.showAdd = true
        if (!state.commonLists.companyList.length) {
          requests.getCompanyList()
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
