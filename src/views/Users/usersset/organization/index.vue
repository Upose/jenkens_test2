<template>
  <div class="content">
    <div class="left_cont">
      <div class="box">
        <div class="header">
          <span>{{ $t('common.organization_header') }}</span>
        </div>
        <div class="top">
          <div>
            <!-- <el-input
              type="text"
              
              placeholder="请输入您要查询的内容"
              class="input-with-select"
               v-model="searchValue"
            @change="onSearch"          >
              <template #append>
                <el-button icon="el-icon-search" @click="onSearch"></el-button>
              </template>
            </el-input> -->
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
          <CommonTreeTable
            :tableData="tableData"
            :common_array="customArgs.common_array"
            @headerClick="headerClick"
            @rowClick="rowClick"
            :translate="customArgs.translate"
            :table="customArgs.table"
          >
          </CommonTreeTable>
        </div>
      </div>
    </div>
    <el-drawer :title="$t(`common.${itemName}`)" :size="576" v-model="drawer.showAdd">
      <Add @reset="reset" :commonLists="commonLists"></Add>
    </el-drawer>
    <el-drawer :title="$t(`common.${itemName}`)" :size="576" v-model="drawer.showUpd">
      <Upd
        :singleSelection="singleSelection"
        ref="updChildRef"
        @reset="reset"
        :commonLists="commonLists"
      ></Upd>
    </el-drawer>
    <el-dialog title="列配置" v-model="drawer.showSortableCustom" :width="540">
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
import { organizationApi } from '@/http/api/users/usersset/organization'
import { IRequest } from '@/@types/httpInterface'
import dataStructure from '@/utils/dataStructure'
import { getUserId } from '@/utils/cookie'
import { useStore } from '@/store'
import { useRoute, useRouter } from 'vue-router'
import { ElMessageBox, ElMessage } from 'element-plus'
import { ISelection, IState } from './typings'
import { IPower, IValid } from '@/@types/iPower'
import { dateNormArray } from '@/utils/dateNorm'
import { useI18n } from 'vue-i18n'
import { checkOnlyNumZero } from '@/utils/regp'
import { CUSTOM_TABLES } from '@/constant/bus/bus_custom_table'
import Custom from '@/components/common/Custom/Custom.vue'
import CommonTreeTable from '@/components/common/Table/CommonTreeTable.vue'
import Add from './components/Add.vue'
import Upd from './components/Upd.vue'
export default defineComponent({
  components: {
    Custom,
    CommonTreeTable,
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
      commonLists: {
        companyList: [],
        orderbyList: [
          {
            id: 1,
            name: t('common.ascend')
          },
          {
            id: 0,
            name: t('common.descend')
          }
        ],
        parentIdList: []
      },
      drawer: {
        showAdd: false,
        showUpd: false,
        showSortableCustom: false
      },
      customArgs: {
        common_array: [
          'id',
          'created_id',
          'created_name',
          'created_at',
          'updated_at',
          'name',
          'com_code',
          'order_by'
        ],
        handle_array: ['created_id', 'created_name', 'created_at', 'updated_at'],
        table: CUSTOM_TABLES.ORGANIZATION
      },
      tableHeight: '100%',
      itemName: 'add',
      searchValue: '',

      tableData: [],
      buttonData: []
    })

    const updChildRef = ref()
    const requests = {
      getList() {
        const data = dataStructure(
          {},
          {
            order_by: 1
          }
        )
        organizationApi
          .get_list(data)
          .then((res: any) => {
            let { status, custom_data } = res as IRequest
            if (status === 200) {
              let tableData: any = dateNormArray(custom_data)

              state.tableData = tableData
              // 创建顶级机构需要给后端传一个值0，代表顶级公司
              let obj = [{ id: 1, name: t('common.top_level') }]
              state.commonLists.parentIdList = obj.concat(tableData)
            }
          })
          .catch((err: any) => err)
      },
      getIndex() {
        const data = dataStructure({ power_url: route.path }, {})
        organizationApi
          .get_index(data)
          .then((res: any) => {
            let { status, power } = res as IRequest
            if (status === 200) {
              // foreach是同步的
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
          .catch((err: any) => err)
      },

      getDel(id: number) {
        const data = dataStructure(
          { power_url: 'V1/Organization/del' },
          {
            id
          }
        )
        organizationApi
          .get_del(data)
          .then((res: any) => {
            let { status, custom_data, info } = res as IRequest
            if (status === 200) {
              ElMessage({
                type: 'success',
                message: info
              })
              methods.reset('del')
            }
          })
          .catch((err: any) => err)
      },

      // 2.16 公司获取接口：V1/Company/list
      getCompanyList() {
        const data = dataStructure(
          {},
          {
            search_value: null,
            order_by: 1
          }
        )
        organizationApi
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
      // 打开列配置弹出框
      headerClick(arg: boolean) {
        state.drawer.showSortableCustom = arg
      },
      // 关闭列配置弹出框
      cancelConfig() {
        state.drawer.showSortableCustom = false
      },
      rowClick(row: any) {
        selection.singleSelection = row
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
      // 添加按钮
      doAdd() {
        state.itemName = 'add'
        state.drawer.showAdd = true
        if (!state.commonLists.companyList.length) {
          requests.getCompanyList()
        }
      },
      // 删除按钮
      doDel() {
        state.itemName = 'del'
        ElMessageBox.confirm(t('common.confirmDel'), t('common.tip'), {
          confirmButtonText: t('common.confirm'),
          cancelButtonText: t('common.cancel'),
          type: 'warning'
        })
          .then(() => {
            let singleSelection = selection.singleSelection
            let id = singleSelection.id
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
        await nextTick()
        const { id } = selection.singleSelection
        const updchildref = updChildRef
        updchildref.value.getView(id)
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
