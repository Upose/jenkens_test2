<template>
  <div class="content">
    <div class="left_cont">
      <div class="box">
        <div class="header">
          <span>{{ $t('common.staff_header') }}</span>
        </div>
        <!-- <div class="part_line"></div> -->
        <div class="top">
          <div>
            <el-input
              type="text"
              :placeholder="$t('common.searchValue')"
              v-model="searchValue"
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

    <el-drawer :title="$t(`common.${itemName}`)" :size="576" v-model="drawer.showAdd">
      <Add @reset="reset" :commonLists="commonLists"></Add>
    </el-drawer>
    <el-drawer :title="$t(`common.${itemName}`)" :size="576" v-model="drawer.showUpd">
      <Upd ref="updChildRef" @reset="reset" :commonLists="commonLists"></Upd>
    </el-drawer>
    <el-drawer :title="$t(`common.${itemName}`)" :size="576" v-model="drawer.showDetail">
      <Details :singleSelection="singleSelection" v-bind="customArgs"></Details>
    </el-drawer>
    <!-- 自定义字段组件 -->
    <el-dialog title="列配置" v-model="drawer.showSortableCustom" :width="540">
      <Custom @cancelConfig="cancelConfig" v-bind="customArgs"></Custom>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, ref, nextTick, computed } from 'vue'
import { staffApi } from '@/http/api/users/usersset/staff'
import { IRequest } from '@/@types/httpInterface'
import dataStructure from '@/utils/dataStructure'
import { useStore } from '@/store'
import { useRoute, useRouter } from 'vue-router'
import { ElMessageBox, ElMessage } from 'element-plus'
import { ISelection, IState } from './typings'
import { IPower } from '@/@types/iPower'
import { dateNormArray } from '@/utils/dateNorm'
import { useI18n } from 'vue-i18n'
import { CUSTOM_TABLES } from '@/constant/bus/bus_custom_table'
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
      configUrl: process.env.VUE_APP_QIHONG_URL,
      commonLists: {
        jobStatusList: [
          { name: t('common.job_status_leave'), id: 0 },
          { name: t('common.job_status_on'), id: 1 },
          { name: t('common.job_status_quit'), id: 2 }
        ],
        languageList: [],
        companyList: [],
        powerList: [],
        roleList: []
      },
      scrollbarMaxHeight: '100%',
      tableHeight: '100%',
      pagination: {
        page: 1,
        perpage: 18,
        total: 100,
        order_by: 1, //0升序   1降序(请默认传1)
        field: ''
      },
      itemName: 'add',
      searchValue: '',
      customArgs: {
        common_array: [
          'created_id',
          'created_name',
          'created_at',
          'updated_at',
          'id',
          'com_code',
          'name',
          'gender'
        ],
        handle_array: ['created_id', 'created_name', 'created_at', 'updated_at'],
        table: CUSTOM_TABLES.STAFF
      },
      drawer: {
        showAdd: false,
        showUpd: false,
        showDetail: false,
        showSortableCustom: false
      },
      tableData: [],
      buttonData: []
    })
    const updChildRef = ref()
    const requests = {
      //多语言获取接口：V1/Language/list
      getLanguageList() {
        const data = dataStructure(
          {},
          {
            order_by: 1
          }
        )
        staffApi
          .get_language_list(data)
          .then(res => {
            let { status, custom_data } = res as IRequest
            if (status === 200) {
              state.commonLists.languageList = custom_data
            }
          })
          .catch(err => err)
      },
      // 员工信息获取接口：V1/Staff/list
      getList() {
        const data = dataStructure(
          {},
          {
            // user_id: getUserId(),
            page: state.pagination.page,
            perpage: state.pagination.perpage,
            search_value: state.searchValue,
            order_by: 1 //0升序   1降序(请默认传1)
          }
        )
        staffApi
          .get_list(data)
          .then(res => {
            let { status, custom_data } = res as IRequest
            if (status === 200) {
              state.pagination.total = custom_data.total
              let tableData: any = dateNormArray(custom_data.data)
              state.tableData = tableData
            }
          })
          .catch(err => err)
      },

      // 员工信息页面接口：V1/Staff/index
      getIndex() {
        const data = dataStructure({ power_url: route.path }, {})
        staffApi
          .get_index(data)
          .then(res => {
            let { status, power } = res as IRequest
            if (status === 200) {
              requests.getList()
              state.buttonData = power
            }
          })
          .catch(err => err)
      },

      //  员工信息删除接口：V1/Staff/del
      getDel(id: string) {
        const data = dataStructure(
          { power_url: 'V1/staff/del' },
          {
            id: id
          }
        )
        staffApi
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

      getStaffOrganizationView(id: string = '') {
        const data = dataStructure(
          {},
          {
            user_id: id
          }
        )
        staffApi
          .get_staffOrganization_view(data)
          .then((res: any) => {
            let { status, custom_data, info } = res as IRequest
            if (status == 200) {
              state.commonLists.powerList = custom_data
            }
          })
          .catch(err => err)
      },
      getCompanyList() {
        const data = dataStructure(
          {},
          {
            search_value: null,
            order_by: 1
          }
        )
        staffApi
          .get_company_list(data)
          .then(res => {
            let { status, custom_data } = res as IRequest
            if (status === 200) {
              state.commonLists.companyList = custom_data.role_value
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
          case 'del':
            methods.doDel()
            break
          case 'detail':
            methods.doDetail()
            break
          default:
            break
        }
      },
      doDetail() {
        state.itemName = 'detail'
        state.drawer.showDetail = true
      },
      reset(arg: any) {
        requests.getList()
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
      rowDblclick(row: object) {
        state.itemName = 'detail'
        state.drawer.showDetail = true

        selection.singleSelection = row
      },

      // 点击搜索按钮搜索
      onSearch() {
        requests.getList()
      },

      input() {
        if (!state.searchValue) {
          requests.getList()
        }
      },

      // 添加按钮
      doAdd() {
        state.itemName = 'add'
        state.drawer.showAdd = true

        if (!state.commonLists.languageList.length) {
          requests.getLanguageList()
        }
        if (!state.commonLists.powerList.length) {
          requests.getStaffOrganizationView()
        }
        if (!state.commonLists.companyList.length) {
          requests.getCompanyList()
        }
      },
      // 删除按钮
      doDel() {
        state.itemName = 'del'
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
      // 修改按钮
      async doUpd() {
        state.itemName = 'upd'
        state.drawer.showUpd = true
        const { id } = selection.singleSelection
        await nextTick()
        const updchildref = updChildRef
        updchildref.value.getView(id)
        if (!state.commonLists.languageList.length) {
          requests.getLanguageList()
        }
        if (!state.commonLists.powerList.length) {
          requests.getStaffOrganizationView()
        }
        if (!state.commonLists.companyList.length) {
          requests.getCompanyList()
        }
      },
      //切换选择
      rowClick(val: any) {
        //selection数组
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

@import '@/assets/css/page-common.scss'; //页面基础布局样式一v
.el-table {
  &:deep(.el-table__body-wrapper::-webkit-scrollbar) {
    display: block;
  }
}
</style>
