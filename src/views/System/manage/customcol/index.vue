<template>
  <div class="content">
    <div class="left_cont">
      <div class="box">
        <div class="top">
          <div>
            <el-input
              type="text"
              :placeholder="$t('common.searchValue')"
              class="input-with-select"
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
          </div>
        </div>
        <div class="tab">
          <el-table
            highlight-current-row
            :data="tableData"
            @row-click="rowClick"
            :height="tableHeight"
            border
          >
            <el-table-column show-overflow-tooltip prop="id" :label="$t('common.ID')">
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="table" :label="$t('common.table')">
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="created_name"
              :label="$t('common.created_name')"
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
              prop="updated_at"
              :label="$t('common.updated_at')"
            >
            </el-table-column>
          </el-table>
        </div>
        <div class="bot">
          <!-- 分页 -->
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
      <div class="box-card formStyle">
        <div class="box-form">
          <el-form
            :model="addForm"
            label-position="left"
            :rules="addRule"
            ref="addRef"
            label-width="140px"
          >
            <el-form-item :label="$t('common.table')" prop="table">
              <el-input v-model="addForm.table"></el-input>
            </el-form-item>
            <el-form-item :label="$t('common.add_data')" prop="all_field">
              <el-input v-model="addForm.all_field">
                <template #append>
                  <el-button icon="el-icon-plus" @click="addField"></el-button>
                </template>
              </el-input>
            </el-form-item>
          </el-form>
          <el-divider content-position="left">{{ $t('common.data_collect') }} </el-divider>
          <AddTable :all_array="addForm.all_array" @setAddArray="setAddArray"></AddTable>
        </div>
        <div class="box-button">
          <el-button @click="onSubmitAdd" type="success">{{ $t('common.submit') }}</el-button>
        </div>
      </div>
    </el-drawer>
    <el-drawer :title="$t(`common.${itemName}`)" :size="576" v-model="drawer.showUpd">
      <div class="box-card formStyle">
        <div class="box-form">
          <el-form
            :model="updForm"
            label-position="left"
            :rules="updRule"
            ref="updRef"
            label-width="140px"
          >
            <el-form-item :label="$t('common.ID')" prop="id">
              <el-input disabled v-model="updForm.id"></el-input>
            </el-form-item>
            <el-form-item :label="$t('common.table')" prop="table">
              <el-input v-model="updForm.table"></el-input>
            </el-form-item>
            <el-form-item :label="$t('common.add_data')" prop="all_field">
              <el-input v-model="updForm.all_field">
                <template #append>
                  <el-button icon="el-icon-plus" @click="addField"></el-button>
                </template>
              </el-input>
            </el-form-item>
          </el-form>
          <el-divider content-position="left">{{ $t('common.data_collect') }} </el-divider>
          <UpdTable
            class="tableInputStyle"
            :all_array="updForm.all_array"
            @setUpdArray="setUpdArray"
          ></UpdTable>
        </div>
        <div class="box-button">
          <el-button @click="onSubmitUpd" type="success">{{ $t('common.submit') }}</el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, toRefs, ref, nextTick } from 'vue'
import { customcolApi } from '@/http/api/system/manage/customcol'
import { IRequest } from '@/@types/httpInterface'
import dataStructure from '@/utils/dataStructure'
import { useStore } from '@/store'
import { useRoute, useRouter } from 'vue-router'
import { ElMessageBox, ElMessage } from 'element-plus'
import { IState, ISelection } from './typings'
import { IPower, IValid } from '@/@types/iPower'
import { dateNormArray } from '@/utils/dateNorm'
import { useI18n } from 'vue-i18n'
import Sortable from 'sortablejs'
import UpdTable from './components/UpdTable.vue'
import AddTable from './components/AddTable.vue'
export default defineComponent({
  components: {
    UpdTable,
    AddTable
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
      companyList: [],
      drawer: {
        showAdd: false,
        showUpd: false
      },
      tableHeight: '100%',
      itemName: 'add',
      searchValue: '',
      pagination: {
        page: 1,
        perpage: 18,
        total: 100
      },
      addForm: {
        all_array: [],
        table: '',
        all_field: ''
      },
      updForm: {
        id: '',
        all_array: [],
        all_field: '',
        table: ''
      },
      tableData: [],
      buttonData: []
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
    const addRef = ref()
    const updRef = ref()
    const addRule = computed(() => {
      const rule = {
        table: [
          {
            required: true,
            message: t('common.not_empty')
          },
          {
            validator: valid.checkOthers.validatorFun
          }
        ]
      }
      return rule
    })
    const updRule = computed(() => {
      const rule = {
        id: [
          {
            required: true,
            message: t('common.not_empty')
          },
          {
            validator: valid.checkOthers.validatorFun
          }
        ],
        table: [
          {
            required: true,
            message: t('common.not_empty')
          },
          {
            validator: valid.checkOthers.validatorFun
          }
        ]
      }
      return rule
    })

    const requests = {
      getList() {
        const data = dataStructure(
          {},
          {
            // user_id: getUserId(),
            page: state.pagination.page,
            perpage: state.pagination.perpage,
            search_value: state.searchValue,
            order_by: null
          }
        )
        customcolApi
          .get_list(data)
          .then((res: any) => {
            let { status, custom_data } = res as IRequest
            if (status === 200) {
              state.pagination.total = custom_data.total
              let tableData: any = dateNormArray(custom_data.data)
              state.tableData = tableData
            }
          })
          .catch((err: any) => err)
      },
      getIndex() {
        const data = dataStructure({ power_url: route.path }, {})
        customcolApi
          .get_index(data)
          .then((res: any) => {
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
          .catch((err: any) => err)
      },
      getUpd() {
        const data = dataStructure({ power_url: 'V1/TheCustomColumn/upd' }, state.updForm)
        customcolApi
          .get_upd(data)
          .then((res: any) => {
            let { status, custom_data, info, field_name } = res as IRequest
            if (status === 200) {
              ElMessage({
                type: 'success',
                message: info
              })
              methods.reset('upd')
            } else if (status === 421) {
              // 特殊信息显示在表单下面
              valid.checkOthers.info = info
              valid.checkOthers.num = true
              const updref = updRef
              updref.value.validateField(field_name)
            }
          })
          .catch((err: any) => err)
      },
      getAdd() {
        const data = dataStructure({ power_url: 'V1/TheCustomColumn/add' }, state.addForm)
        customcolApi
          .get_add(data)
          .then((res: any) => {
            let { status, custom_data, info, field_name } = res as IRequest
            if (status === 200) {
              ElMessage({
                type: 'success',
                message: info
              })
              methods.reset('add')
            } else if (status === 421) {
              // 特殊信息显示在表单下面
              valid.checkOthers.info = info
              valid.checkOthers.num = true
              const addref = addRef
              addref.value.validateField(field_name)
            }
          })
          .catch((err: any) => err)
      },
      getDel(id: number) {
        const data = dataStructure(
          { power_url: 'V1/TheCustomColumn/del' },
          {
            id: id
          }
        )
        customcolApi
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
      getView(id: number) {
        return new Promise((resolve, reject) => {
          const data = dataStructure(
            {},
            {
              id: id
            }
          )
          customcolApi
            .get_view(data)
            .then((res: any) => {
              let { status, custom_data, info } = res as IRequest
              if (status === 200) {
                const { all_array, id, table } = custom_data

                all_array.forEach((item: any) => {
                  if (!item.isSort) {
                    item.isSort = false
                  }
                })
                state.updForm.all_array = all_array
                state.updForm.id = id
                state.updForm.table = table
                resolve('显示修改页')
              }
            })
            .catch((err: any) => err)
        })
      }
    }
    const methods = {
      setUpdArray(all_array: any) {
        state.updForm.all_array = all_array
      },
      setAddArray(all_array: any) {
        state.addForm.all_array = all_array
      },
      addField() {
        let all_field: any
        switch (state.itemName) {
          case 'add':
            all_field = state.addForm.all_field
            if (all_field) {
              state.addForm.all_array.push({
                isChecked: true,
                isSort: false,
                label: state.addForm.all_field
              })
            }
            break
          case 'upd':
            all_field = state.updForm.all_field
            if (all_field) {
              state.updForm.all_array.push({
                isChecked: true,
                isSort: false,
                label: state.updForm.all_field
              })
            }
            break
          default:
            break
        }
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
        let handleRef = null
        switch (arg) {
          case 'add':
            state.drawer.showAdd = false
            handleRef = addRef
            break
          case 'upd':
            state.drawer.showUpd = false
            handleRef = updRef
            break
          default:
            break
        }
        // methods.reset('del')
        if (handleRef) {
          handleRef.value.resetFields()
        }
        // 取消选中状态
        selection.singleSelection = {}
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
      handleSizeChange(perpage: number) {
        state.pagination.perpage = perpage
        requests.getList() //传参顺序
      },
      handleCurrentChange(page: number) {
        state.pagination.page = page
        requests.getList()
      },
      onSubmitAdd() {
        let valid1: any
        const addref = addRef
        addref.value.validate((valid: boolean) => {
          valid1 = valid
        })

        if (valid1) {
          // 用户输入的内容校验成功才发起请求
          ElMessageBox.confirm(t('common.confirmAdd'), t('common.tip'), {
            confirmButtonText: t('common.confirm'),
            cancelButtonText: t('common.cancel'),
            type: 'warning'
          })
            .then(() => {
              requests.getAdd()
            })
            .catch(() => {
              ElMessage({
                type: 'info',
                message: t('common.cancelAdd')
              })
            })
        }
      },
      onSubmitUpd() {
        let valid1: any
        const updref = updRef
        updref.value.validate((valid: boolean) => {
          valid1 = valid
        })

        if (valid1) {
          // 用户输入的内容校验成功才发起请求
          ElMessageBox.confirm(t('common.confirmUpd'), t('common.tip'), {
            confirmButtonText: t('common.confirm'),
            cancelButtonText: t('common.cancel'),
            type: 'warning'
          })
            .then(() => {
              requests.getUpd()
            })
            .catch(() => {
              ElMessage({
                type: 'info',
                message: t('common.cancelUpd')
              })
            })
        }
      },
      // 添加按钮
      doAdd() {
        state.itemName = 'add'
        state.drawer.showAdd = true
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
            const { id } = selection.singleSelection
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
      doUpd() {
        const { id } = selection.singleSelection
        requests.getView(id).then(() => {
          state.itemName = 'upd'
          state.drawer.showUpd = true
        })
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
      addRule,
      updRule,
      addRef,
      updRef,
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
