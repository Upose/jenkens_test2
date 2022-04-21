<template>
  <div class="content ">
    <div class="left_cont">
      <div class="box">
        <div class="header">
          <span>{{ $t('common.position_header') }}</span>
        </div>
        <!-- <div class="part_line"></div> -->
        <div class="top">
          <div>
            <!-- <el-input
              type="text"
              :placeholder="$t('common.searchValue')"
               v-model="pagination.search_value"
              @input="input"
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
            <el-button
              type="primary"
              class="el-icon-s-custom"
              @click="handle('user')"
              :disabled="isEmeptyObj"
            >
              {{ $t('common.position_header') }}
            </el-button>
          </div>
        </div>
        <div class="tab">
          <CommonTreeTable
            :tableData="tableData"
            @rowClick="rowClick"
            v-bind="customArgs"
            @headerClick="headerClick"
          >
          </CommonTreeTable>
        </div>
      </div>
    </div>
    <el-drawer :title="$t(`common.${itemName}`)" :size="576" v-model="drawer.showAdd">
      <div class="box-card formStyle">
        <div class="box-form">
          <el-form
            :model="addForm"
            label-width="200px"
            :rules="addRule"
            ref="addRef"
            label-position="left"
          >
            <el-row>
              <el-col :span="24">
                <el-form-item :label="$t('common.pid')" prop="parent_id">
                  <el-input v-model="addForm.parent_id"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item :label="$t('common.name')" prop="com_code">
                  <el-select filterable clearable v-model="addForm.com_code">
                    <el-option
                      v-for="item in commonLists.companyList"
                      :key="item.com_code"
                      :label="item.com_name"
                      :value="item.com_code"
                    >
                      <span style="float: left">{{ item.com_name }}</span>
                      <span style="float: right;color: #999999;">{{ item.com_code }}</span>
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item :label="$t('common.name_cn')" prop="name_cn">
                  <el-input v-model="addForm.name_cn"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item :label="$t('common.name_en')" prop="name_en">
                  <el-input v-model="addForm.name_en"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item :label="$t('common.name_fr')" prop="name_fr">
                  <el-input v-model="addForm.name_fr"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
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
            label-width="200px"
            :rules="updRule"
            ref="updRef"
            label-position="left"
          >
            <el-row>
              <el-col :span="24">
                <el-form-item :label="$t('common.id')" prop="id">
                  <el-input v-model="updForm.id" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item :label="$t('common.pid')" prop="parent_id">
                  <el-input v-model="updForm.parent_id"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item :label="$t('common.name')" prop="com_code">
                  <el-select filterable clearable v-model="updForm.com_code">
                    <el-option
                      v-for="item in commonLists.companyList"
                      :key="item.com_code"
                      :label="item.com_name"
                      :value="item.com_code"
                    >
                      <span style="float: left">{{ item.com_name }}</span>
                      <span style="float: right;color: #999999;">{{ item.com_code }}</span>
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item :label="$t('common.name_cn')" prop="name_cn">
                  <el-input v-model="updForm.name_cn"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item :label="$t('common.name_en')" prop="name_en">
                  <el-input v-model="updForm.name_en"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item :label="$t('common.name_fr')" prop="name_fr">
                  <el-input v-model="updForm.name_fr"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div class="box-button">
          <el-button @click="onSubmitUpd" type="success">{{ $t('common.submit') }}</el-button>
        </div>
      </div>
    </el-drawer>
    <el-drawer :title="$t(`common.${itemName}`)" :size="576" v-model="drawer.showUser">
      <div class="box-card formStyle">
        <div class="box-form">
          <el-form
            :model="userForm"
            label-width="200px"
            :rules="userRule"
            ref="userRef"
            label-position="left"
          >
            <el-row>
              <el-col :span="24">
                <el-form-item :label="$t('common.id')" prop="id">
                  <el-input v-model="userForm.id" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item :label="$t('common.staff_id')" prop="user_id">
                  <el-select filterable clearable v-model="userForm.user_id" @change="userIdChange">
                    <el-option
                      v-for="item in commonLists.staffList"
                      :key="item.id"
                      :label="item.full_name"
                      :value="item.id"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <el-table highlight-current-row :data="userForm.selectedData">
            <el-table-column type="index" width="100"> </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="user_id"
              :label="$t('common.staff_id')"
              width="300"
            >
              <template #default="scope">
                <span>{{ findName(commonLists.staffList, scope.row.user_id) }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('common.handle')" width="100">
              <template #default="scope">
                <el-button
                  @click.stop="deleteUserId(scope.$index, userForm.selectedData)"
                  type="text"
                >
                  {{ $t('common.clear') }}
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="box-button">
          <el-button @click="onSubmitUser" type="success">{{ $t('common.submit') }}</el-button>
        </div>
      </div>
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
import { computed, defineComponent, onMounted, reactive, toRefs, watch, ref } from 'vue'
import { MutationConstants, GetterConstants } from '@/store/modules/index/constants'
import { commonApi } from '@/http/api/common'
import { positionApi } from '@/http/api/system/sets/position'
import { IRequest } from '@/@types/httpInterface'
import dataStructure from '@/utils/dataStructure'
import { ElMessageBox, ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
import { IPower } from '@/@types/iPower'
import { useStore } from '@/store'
import { useRoute, useRouter } from 'vue-router'
import { IState, ISelection } from './typings'
import { dateNormArray } from '@/utils/dateNorm'
import Custom from '@/components/common/Custom/Custom.vue'
import CommonTreeTable from '@/components/common/Table/CommonTreeTable.vue'
import { checkOnlyNumZero } from '@/utils/regp'
// const { t } = useI18n()
export default defineComponent({
  components: {
    Custom,
    CommonTreeTable
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
      tableHeight: '100%',
      pagination: {
        order_by: 1,
        search_value: null
      },
      commonLists: {
        companyList: [],
        selectedPositionList: [],
        staffList: []
      },
      itemName: 'add',
      addForm: {
        name_cn: '',
        name_en: '',
        name_fr: '',
        com_code: '',
        parent_id: null
      },
      updForm: {
        id: null,
        name_cn: '',
        name_en: '',
        name_fr: '',
        com_code: '',
        parent_id: null
      },
      userForm: {
        id: null,
        user_id: '',
        selectedData: []
      },
      customArgs: {
        common_array: [
          'id',
          'created_id',
          'created_name',
          'created_at',
          'updated_at',
          'name_cn',
          'name_en',
          'name_fr',
          'parent_id',
          'parent_name'
        ],
        table: 'position'
      },
      drawer: {
        showAdd: false,
        showUpd: false,
        showUser: false,
        showSortableCustom: false
      },
      tableData: [],
      buttonData: []
    })

    const addRef = ref()
    const updRef = ref()
    const userRef = ref()
    const addRule = computed(() => {
      const rule = {
        name_cn: [{ required: true, message: t('common.not_empty') }],
        name_en: [{ required: true, message: t('common.not_empty') }],
        name_fr: [{ required: true, message: t('common.not_empty') }],
        com_code: [{ required: true, message: t('common.not_empty') }],
        parent_id: [
          { required: true, message: t('common.not_empty') },
          { validator: checkOnlyNumZero }
        ]
      }
      return rule
    })
    const updRule = computed(() => {
      const rule = {
        id: [{ required: true, message: t('common.not_empty') }],
        name_cn: [{ required: true, message: t('common.not_empty') }],
        name_en: [{ required: true, message: t('common.not_empty') }],
        name_fr: [{ required: true, message: t('common.not_empty') }],
        com_code: [{ required: true, message: t('common.not_empty') }],
        parent_id: [
          { required: true, message: t('common.not_empty') },
          { validator: checkOnlyNumZero }
        ]
      }
      return rule
    })
    const userRule = computed(() => {
      const rule = {
        id: [{ required: true, message: t('common.not_empty') }],
        name_cn: [{ required: true, message: t('common.not_empty') }],
        name_en: [{ required: true, message: t('common.not_empty') }],
        name_fr: [{ required: true, message: t('common.not_empty') }],
        com_code: [{ required: true, message: t('common.not_empty') }],
        parent_id: [
          { required: true, message: t('common.not_empty') },
          { validator: checkOnlyNumZero }
        ]
      }
      return rule
    })
    const requests = {
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
      getSelectedPosition(pos_id: any) {
        const data = dataStructure(
          {},
          {
            pos_id: pos_id
          }
        )
        positionApi
          .get_selected_position(data)
          .then((res: any) => {
            let { status, custom_data } = res as IRequest
            if (status === 200) {
              //
              state.userForm.selectedData = custom_data
            }
          })
          .catch((err: any) => err)
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
        commonApi
          .get_company_list(data)
          .then((res: any) => {
            let { status, custom_data } = res as IRequest
            if (status === 200) {
              state.commonLists.companyList = custom_data.role_value
            }
          })
          .catch((err: any) => err)
      },
      getList() {
        const data = dataStructure({}, state.pagination)
        positionApi
          .get_list(data)
          .then(res => {
            let { status, custom_data } = res as IRequest
            if (status === 200) {
              let tableData: any = dateNormArray(custom_data.data)
              state.tableData = tableData
            }
          })
          .catch(err => err)
      },
      getIndex() {
        const data = dataStructure({ power_url: route.path }, {})
        positionApi
          .get_index(data)
          .then(res => {
            let { status, power } = res as IRequest
            if (status === 200) {
              let hasView
              power.forEach((item: IPower) => {
                if (item.widget_id === 'view') {
                  requests.getList()
                  // requests.getCustom()
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
      getStaffPosition() {
        let userIdArr = [] as any
        state.userForm.selectedData.forEach((item: any) => {
          userIdArr.push(item.user_id)
        })
        const data = dataStructure(
          {},
          {
            pos_id: state.userForm.id,
            user_id: userIdArr
          }
        )
        positionApi
          .get_staff_position(data)
          .then(res => {
            let { status, custom_data, info } = res as IRequest
            if (status === 200) {
              ElMessage({
                type: 'success',
                message: info
              })
              methods.reset('user')
            }
          })
          .catch(err => err)
      },
      getUpd() {
        const data = dataStructure({ power_url: 'V1/Position/upd' }, state.updForm)
        positionApi
          .get_upd(data)
          .then(res => {
            let { status, custom_data, info } = res as IRequest
            if (status === 200) {
              ElMessage({
                type: 'success',
                message: info
              })
              methods.reset('upd')
            }
          })
          .catch(err => err)
      },
      getAdd() {
        const data = dataStructure({ power_url: 'V1/Position/add' }, state.addForm)
        positionApi
          .get_add(data)
          .then(res => {
            let { status, custom_data, info } = res as IRequest
            if (status === 200) {
              ElMessage({
                type: 'success',
                message: info
              })
              methods.reset('add')
            }
          })
          .catch(err => err)
      },
      getDel(id: number) {
        const data = dataStructure(
          { power_url: 'V1/Position/del' },
          {
            id: id
          }
        )
        positionApi
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
      getView(id: number) {
        return new Promise((resolve, reject) => {
          const data = dataStructure(
            {},
            {
              id: id
            }
          )
          positionApi
            .get_view(data)
            .then(res => {
              let { status, custom_data, info } = res as IRequest
              if (status === 200) {
                const { id, name_cn, name_en, name_fr, com_code, parent_id } = custom_data
                state.updForm = {
                  id,
                  name_cn,
                  name_en,
                  name_fr,
                  com_code,
                  parent_id
                }
                resolve('显示修改页面')
              }
            })
            .catch(err => err)
        })
      }
    }

    const methods = {
      findName(arr: any, id: any) {
        let Item: any = arr.find((item: any) => {
          return item.id == id
        })
        return Item?.name ? Item?.name : Item?.full_name
      },
      deleteUserId(index: number, rows: any) {
        rows.splice(index, 1)
      },
      userIdChange() {
        let selectedData = state.userForm.selectedData
        let user_id = state.userForm.user_id
        let isRepeat = false
        selectedData.forEach(item => {
          if (item.user_id === user_id) {
            isRepeat = true
          }
        })
        if (!isRepeat) {
          state.userForm.selectedData.push({ user_id: state.userForm.user_id })
        }
      },
      // 单击事件
      rowClick(row: any) {
        selection.singleSelection = row
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
          case 'user':
            methods.doUser()
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
          case 'user':
            state.drawer.showUser = false
            handleRef = userRef
            break
          default:
            break
        }
        if (handleRef) {
          handleRef.value.resetFields()
        }
        // 取消选中状态
        selection.singleSelection = {}
      },

      doUser() {
        state.itemName = 'user'
        state.drawer.showUser = true
        const { id } = selection.singleSelection
        state.userForm.id = id
        requests.getSelectedPosition(id)
        requests.getStaffInfo()
      },
      onSubmitAdd() {
        const addref = addRef
        addref.value.validate((valid: boolean) => {
          if (valid) {
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
        })
      },
      onSubmitUpd() {
        const updref = updRef
        updref.value.validate((valid: boolean) => {
          if (valid) {
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
        })
      },
      onSubmitUser() {
        const userref = userRef
        userref.value.validate((valid: boolean) => {
          if (valid) {
            // 用户输入的内容校验成功才发起请求
            ElMessageBox.confirm(t('common.confirmUpd'), t('common.tip'), {
              confirmButtonText: t('common.confirm'),
              cancelButtonText: t('common.cancel'),
              type: 'warning'
            })
              .then(() => {
                requests.getStaffPosition()
              })
              .catch(() => {
                ElMessage({
                  type: 'info',
                  message: t('common.cancelUpd')
                })
              })
          }
        })
      },
      doDel() {
        state.itemName = 'del'
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
        state.itemName = 'add'
        state.drawer.showAdd = true
        if (!state.commonLists.companyList.length) {
          requests.getCompanyList()
        }
      },

      // 修改按钮
      doUpd() {
        const { id } = selection.singleSelection
        requests.getView(id).then(() => {
          state.itemName = 'upd'
          state.drawer.showUpd = true
          if (!state.commonLists.companyList.length) {
            requests.getCompanyList()
          }
        })
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
      userRule,
      addRef,
      updRef,
      userRef,
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
