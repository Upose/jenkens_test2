<template>
  <div class="content">
    <div class="left_cont">
      <div class="box">
        <div class="header">
          <span>{{ $t('common.cominfo_header') }}</span>
        </div>
        <!-- <div class="part_line">
          
        </div> -->
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
            ref="singleTable"
            @row-click="rowClick"
            :height="tableHeight"
            @row-dblclick="rowDblclick"
          >
            <el-table-column
              show-overflow-tooltip
              prop="com_code"
              :label="$t('common.com_code')"
              width="100"
            >
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="com_sxname"
              :label="$t('common.com_sxname')"
              width="100"
            >
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="com_name" :label="$t('common.com_name')">
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="pid" :label="$t('common.pid')" width="120">
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="pid_sxname"
              :label="$t('common.pid_sxname')"
              width="100"
            >
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="is_enabled"
              :label="$t('common.is_enabled')"
              width="100"
            >
              <template #default="scope">
                <el-switch
                  :active-value="1"
                  :inactive-value="0"
                  disabled
                  v-model="scope.row.is_enabled"
                >
                </el-switch>
              </template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="created_name"
              :label="$t('common.created_name')"
              width="100"
            >
            </el-table-column>

            <el-table-column
              show-overflow-tooltip
              prop="created_at"
              :label="$t('common.created_at')"
              width="200"
            >
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="updated_at"
              :label="$t('common.updated_at')"
              width="200"
            >
            </el-table-column>
          </el-table>
        </div>
        <!-- <div class="bot">
        </div> -->
      </div>
    </div>

    <el-drawer :title="$t(`common.${itemName}`)" :size="576" v-model="drawer.showAdd">
      <div class="box-card formStyle">
        <div class="box-form">
          <el-form
            :model="addForm"
            label-width="200px"
            label-position="left"
            :rules="addRule"
            ref="addRef"
          >
            <el-form-item :label="$t('common.com_code')" prop="com_code">
              <el-input v-model="addForm.com_code"></el-input>
            </el-form-item>
            <el-form-item :label="$t('common.com_name_cn')" prop="com_name_cn">
              <el-input v-model="addForm.com_name_cn"></el-input>
            </el-form-item>
            <el-form-item :label="$t('common.com_name_en')" prop="com_name_en">
              <el-input v-model="addForm.com_name_en"></el-input>
            </el-form-item>
            <el-form-item :label="$t('common.com_name_fr')" prop="com_name_fr">
              <el-input v-model="addForm.com_name_fr"></el-input>
            </el-form-item>
            <el-form-item :label="$t('common.com_sxname')" prop="com_sxname">
              <el-input v-model="addForm.com_sxname"></el-input>
            </el-form-item>
            <el-form-item :label="$t('common.pid')" prop="pid">
              <el-select filterable clearable v-model="addForm.pid">
                <el-option
                  v-for="item in commonLists.companyList"
                  :key="item.com_code"
                  :label="item.com_sxname"
                  :value="item.com_code"
                >
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item :label="$t('common.is_enabled')" prop="is_enabled">
              <el-switch
                :active-value="1"
                :inactive-value="0"
                v-model="addForm.is_enabled"
              ></el-switch>
            </el-form-item>
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
            label-position="left"
            :rules="updRule"
            ref="updRef"
          >
            <el-form-item :label="$t('common.com_code')" prop="com_code">
              <el-input v-model="updForm.com_code" disabled></el-input>
            </el-form-item>
            <el-form-item :label="$t('common.com_name_cn')" prop="com_name_cn">
              <el-input v-model="updForm.com_name_cn"></el-input>
            </el-form-item>
            <el-form-item :label="$t('common.com_name_en')" prop="com_name_en">
              <el-input v-model="updForm.com_name_en"></el-input>
            </el-form-item>
            <el-form-item :label="$t('common.com_name_fr')" prop="com_name_fr">
              <el-input v-model="updForm.com_name_fr"></el-input>
            </el-form-item>
            <el-form-item :label="$t('common.com_sxname')" prop="com_sxname">
              <el-input v-model="updForm.com_sxname"></el-input>
            </el-form-item>

            <el-form-item :label="$t('common.pid')" prop="pid">
              <el-select filterable clearable v-model="updForm.pid">
                <el-option
                  v-for="item in commonLists.companyList"
                  :key="item.com_code"
                  :label="item.com_sxname"
                  :value="item.com_code"
                >
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item :label="$t('common.is_enabled')" prop="is_enabled">
              <el-switch
                :active-value="1"
                :inactive-value="0"
                v-model="updForm.is_enabled"
              ></el-switch>
            </el-form-item>
          </el-form>
        </div>
        <div class="box-button">
          <el-button @click="onSubmitUpd" type="success">提交</el-button>
        </div>
      </div>
    </el-drawer>
    <el-drawer :title="$t(`common.${itemName}`)" :size="576" v-model="drawer.showDetail">
      <div class="box-card desLabel">
        <div class="box-form">
          <el-descriptions :title="$t('common.base_info')" :column="1">
            <el-descriptions-item :label="$t('common.com_code') + ':'">{{
              singleSelection.com_code
            }}</el-descriptions-item>
            <el-descriptions-item :label="$t('common.com_sxname') + ':'">{{
              singleSelection.com_sxname
            }}</el-descriptions-item>
            <el-descriptions-item :label="$t('common.com_name') + ':'">{{
              singleSelection.com_name
            }}</el-descriptions-item>
            <el-descriptions-item :label="$t('common.pid') + ':'">{{
              singleSelection.pid
            }}</el-descriptions-item>
            <el-descriptions-item :label="$t('common.pid_sxname') + ':'">{{
              singleSelection.pid_sxname
            }}</el-descriptions-item>
          </el-descriptions>

          <el-descriptions :title="$t('common.handle_info')" :column="1">
            <el-descriptions-item :label="$t('common.created_name') + ':'" :span="2">{{
              singleSelection.created_name
            }}</el-descriptions-item>
            <el-descriptions-item :label="$t('common.is_enabled') + ':'">
              <el-switch disabled active-color="#13ce66" v-model="singleSelection.is_enabled">
              </el-switch>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('common.created_at') + ':'" :span="2">
              {{ singleSelection.created_at }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('common.updated_at') + ':'" :span="2">{{
              singleSelection.updated_at
            }}</el-descriptions-item>
          </el-descriptions>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  onBeforeMount,
  reactive,
  toRefs,
  watch,
  ref
} from 'vue'
import { cominfoApi } from '@/http/api/system/sets/cominfo'
import { IRequest } from '@/@types/httpInterface'
import dataStructure from '@/utils/dataStructure'
import { getUserId } from '@/utils/cookie'
import { useStore } from '@/store'
import { useRoute, useRouter } from 'vue-router'
import { ElMessageBox, ElMessage } from 'element-plus'
import { IState, ISelection } from './typings'
import { IPower, IValid } from '@/@types/iPower'
import { dateNormArray } from '@/utils/dateNorm'
import { useI18n } from 'vue-i18n'
export default defineComponent({
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
      drawer: {
        showAdd: false,
        showUpd: false,
        showDetail: false
      },
      tableHeight: '100%',
      itemName: 'add',
      searchValue: '',
      addForm: {
        com_code: '',
        com_name: '',
        pid: '',
        com_sxname: '',
        is_enabled: 0,
        com_name_cn: '',
        com_name_en: '',
        com_name_fr: ''
      },
      updForm: {
        com_code: '',
        com_name: '',
        pid: '',
        com_sxname: '',
        is_enabled: 0,
        com_name_cn: '',
        com_name_en: '',
        com_name_fr: ''
      },
      commonLists: {
        companyList: []
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
        com_code: [
          {
            required: true,
            message: t('common.not_empty')
          },
          {
            validator: valid.checkOthers.validatorFun
          }
        ],
        pid: [
          {
            required: true,
            message: t('common.not_empty')
          },
          {
            validator: valid.checkOthers.validatorFun
          }
        ],
        com_sxname: [
          {
            required: true,
            message: t('common.not_empty')
          },
          {
            validator: valid.checkOthers.validatorFun
          }
        ],
        com_name_cn: [
          {
            required: true,
            message: t('common.not_empty')
          },
          {
            validator: valid.checkOthers.validatorFun
          }
        ],
        com_name_en: [
          {
            required: true,
            message: t('common.not_empty')
          },
          {
            validator: valid.checkOthers.validatorFun
          }
        ],
        com_name_fr: [
          {
            required: true,
            message: t('common.not_empty')
          },
          {
            validator: valid.checkOthers.validatorFun
          }
        ],
        is_enabled: [
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
        com_code: [
          {
            required: true,
            message: t('common.not_empty')
          },
          {
            validator: valid.checkOthers.validatorFun
          }
        ],
        pid: [
          {
            required: true,
            message: t('common.not_empty')
          },
          {
            validator: valid.checkOthers.validatorFun
          }
        ],
        com_sxname: [
          {
            required: true,
            message: t('common.not_empty')
          },
          {
            validator: valid.checkOthers.validatorFun
          }
        ],
        com_name_cn: [
          {
            required: true,
            message: t('common.not_empty')
          },
          {
            validator: valid.checkOthers.validatorFun
          }
        ],
        com_name_en: [
          {
            required: true,
            message: t('common.not_empty')
          },
          {
            validator: valid.checkOthers.validatorFun
          }
        ],
        com_name_fr: [
          {
            required: true,
            message: t('common.not_empty')
          },
          {
            validator: valid.checkOthers.validatorFun
          }
        ],
        is_enabled: [
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
      // 公司获取接口：V1/Company/list
      getList() {
        const data = dataStructure(
          {},
          {
            search_value: state.searchValue,
            order_by: 1
          }
        )
        cominfoApi
          .get_list(data)
          .then((res: any) => {
            let { status, custom_data } = res as IRequest
            if (status === 200) {
              let tableData: any = dateNormArray(custom_data.role_value)
              let highestCompany = [{ com_sxname: '顶级公司', com_code: 0 }]
              state.tableData = tableData
              state.commonLists.companyList = highestCompany.concat(tableData)
            }
          })
          .catch((err: any) => err)
      },
      // 公司页面接口：V1/Company/index
      getIndex() {
        const data = dataStructure({ power_url: route.path }, {})
        cominfoApi
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
      // 公司修改接口：V1/Company/upd
      getUpd() {
        const data = dataStructure({ power_url: 'V1/Company/upd' }, state.updForm)
        cominfoApi
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
      //  公司添加接口：V1/Company/add
      getAdd() {
        const data = dataStructure({ power_url: 'V1/Company/add' }, state.addForm)
        cominfoApi
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
      // 公司删除接口：V1/Company/del
      getDel(com_code: string) {
        const data = dataStructure(
          { power_url: 'V1/Company/del' },
          {
            com_code: com_code
            /**"com_code":"QH" */
          }
        )
        cominfoApi
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
      // 公司修改查询数据接口：V1/Company/view
      getView(com_code: string) {
        return new Promise((resolve, reject) => {
          const data = dataStructure(
            {},
            {
              com_code: com_code
            }
          )
          cominfoApi
            .get_view(data)
            .then((res: any) => {
              let { status, custom_data, info } = res as IRequest

              if (status === 200) {
                const {
                  com_code,
                  com_name,
                  pid,
                  com_sxname,
                  is_enabled,
                  com_name_cn,
                  com_name_en,
                  com_name_fr
                } = custom_data
                state.updForm = {
                  com_code,
                  com_name,
                  pid,
                  com_sxname,
                  is_enabled,
                  com_name_cn,
                  com_name_en,
                  com_name_fr
                }
                resolve('显示修改')
              }
            })
            .catch((err: any) => err)
        })
      }
    }
    const methods = {
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
        if (handleRef) {
          handleRef.value.resetFields()
        }
        // 取消选中状态
        selection.singleSelection = {}
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
      // 添加按钮
      doAdd() {
        state.itemName = 'add'
        state.drawer.showAdd = true
      },
      // 删除按钮
      doDel() {
        ElMessageBox.confirm(t('common.confirmDel'), t('common.tip'), {
          confirmButtonText: t('common.confirm'),
          cancelButtonText: t('common.cancel'),
          type: 'warning'
        })
          .then(() => {
            let singleSelection = selection.singleSelection
            let com_code = singleSelection.com_code
            requests.getDel(com_code)
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
        const { com_code } = selection.singleSelection
        requests.getView(com_code).then(() => {
          state.itemName = 'upd'
          state.drawer.showUpd = true
        })
      },

      //切换选择
      rowClick(val: any) {
        //selection数组
        selection.singleSelection = val
      }
    }
    onMounted(() => {
      requests.getIndex()
      // requests.request_get_role_view()
    })
    return {
      ...toRefs(state),
      ...toRefs(selection),
      ...requests,
      ...methods,
      singleTable,
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
@import '../../../../assets/css/table.scss';
@import '../../../../assets/css/element-common-style.scss';

@import '@/assets/css/page-common.scss'; //页面基础布局样式一
</style>
