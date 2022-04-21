<template>
  <div class="content">
    <div class="left_cont">
      <div class="box">
        <div class="header">
          <span>{{ $t('common.roleinfo_header') }}</span>
        </div>
        <!-- <div class="part_line"></div> -->
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
          <!-- 	@row-click="rowClick" -->
          <el-table
            highlight-current-row
            :data="tableData"
            ref="singleTable"
            @row-click="rowClick"
            :height="tableHeight"
            @row-dblclick="rowDblclick"
          >
            <el-table-column show-overflow-tooltip prop="id" :label="$t('common.ID')" width="50">
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="com_code"
              :label="$t('common.com_code')"
              width="100"
            >
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="name_cn"
              :label="$t('common.name_cn')"
              width="120"
            >
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="name_en"
              :label="$t('common.name_en')"
              width="120"
            >
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="name_fr"
              :label="$t('common.name_fr')"
              width="120"
            >
            </el-table-column>

            <el-table-column
              show-overflow-tooltip
              prop="role_remark"
              :label="$t('common.role_remark')"
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
            label-width="200px"
            label-position="left"
            :rules="addRule"
            ref="addRef"
          >
            <el-form-item :label="$t('common.com_code')" prop="com_code">
              <el-select filterable clearable v-model="addForm.com_code">
                <el-option
                  v-for="item in companyList"
                  :key="item.com_code"
                  :label="item.com_code"
                  :value="item.com_code"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('common.name_cn')" prop="name_cn">
              <el-input v-model="addForm.name_cn"></el-input>
            </el-form-item>
            <el-form-item :label="$t('common.name_en')" prop="name_en">
              <el-input v-model="addForm.name_en"></el-input>
            </el-form-item>
            <el-form-item :label="$t('common.name_fr')" prop="name_fr">
              <el-input v-model="addForm.name_fr"></el-input>
            </el-form-item>
            <el-form-item :label="$t('common.role_remark')" prop="role_remark">
              <el-input v-model="addForm.role_remark"></el-input>
            </el-form-item>
            <el-form-item :label="$t('common.is_enabled')" prop="is_enabled">
              <el-switch
                :active-value="1"
                :inactive-value="0"
                v-model="addForm.is_enabled"
              ></el-switch>
            </el-form-item>
            <el-form-item :label="$t('common.examine')" prop="examine">
              <el-select filterable clearable v-model="addForm.examine">
                <el-option
                  v-for="(item, index) in roleExamineList"
                  :key="index"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
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
            <el-form-item :label="$t('common.ID')" prop="id">
              <el-input v-model="updForm.id" disabled></el-input>
            </el-form-item>
            <el-form-item :label="$t('common.com_code')" prop="com_code">
              <el-select filterable clearable v-model="updForm.com_code">
                <el-option
                  v-for="item in companyList"
                  :key="item.com_code"
                  :label="item.com_code"
                  :value="item.com_code"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('common.name_cn')" prop="name_cn">
              <el-input v-model="updForm.name_cn"></el-input>
            </el-form-item>
            <el-form-item :label="$t('common.name_en')" prop="name_en">
              <el-input v-model="updForm.name_en"></el-input>
            </el-form-item>
            <el-form-item :label="$t('common.name_fr')" prop="name_fr">
              <el-input v-model="updForm.name_fr"></el-input>
            </el-form-item>
            <el-form-item :label="$t('common.role_remark')" prop="role_remark">
              <el-input v-model="updForm.role_remark"></el-input>
            </el-form-item>
            <el-form-item :label="$t('common.is_enabled')" prop="is_enabled">
              <el-switch
                :active-value="1"
                :inactive-value="0"
                v-model="updForm.is_enabled"
              ></el-switch>
            </el-form-item>
            <el-form-item :label="$t('common.examine')" prop="examine">
              <el-select filterable clearable v-model="updForm.examine">
                <el-option
                  v-for="(item, index) in roleExamineList"
                  :key="index"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <div class="box-button">
          <el-button @click="onSubmitUpd" type="success">{{ $t('common.submit') }}</el-button>
        </div>
      </div>
    </el-drawer>
    <el-drawer :title="$t(`common.${itemName}`)" :size="576" v-model="drawer.showDetail">
      <div class="box-card desLabel">
        <div class="box-form">
          <el-descriptions :title="$t('common.base_info') + ':'" :column="1">
            <el-descriptions-item :label="$t('common.id') + ':'">{{
              singleSelection.id
            }}</el-descriptions-item>
            <el-descriptions-item :label="$t('common.com_code') + ':'">{{
              singleSelection.com_code
            }}</el-descriptions-item>
            <el-descriptions-item :label="$t('common.name') + ':'">{{
              singleSelection.name
            }}</el-descriptions-item>
            <el-descriptions-item :label="$t('common.role_remark') + ':'">{{
              singleSelection.role_remark
            }}</el-descriptions-item>
          </el-descriptions>

          <el-descriptions :title="$t('common.handle_info')" :column="1">
            <el-descriptions-item :label="$t('common.is_enabled') + ':'">
              <el-switch
                disabled
                :active-value="1"
                :inactive-value="0"
                v-model="singleSelection.is_enabled"
              >
              </el-switch>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('common.created_name') + ':'">{{
              singleSelection.created_name
            }}</el-descriptions-item>
            <el-descriptions-item :label="$t('common.created_at') + ':'">
              {{ singleSelection.created_at }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('common.updated_at') + ':'">{{
              singleSelection.updated_at
            }}</el-descriptions-item>
          </el-descriptions>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, toRefs, watch, ref } from 'vue'
import { roleinfoApi } from '@/http/api/system/manage/roleinfo'
import { IRequest } from '@/@types/httpInterface'
import dataStructure from '@/utils/dataStructure'
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
    //
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
      roleExamineList: [],
      drawer: {
        showAdd: false,
        showUpd: false,
        showDetail: false
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
        com_code: '',
        name_cn: '',
        name_en: '',
        name_fr: '',
        role_remark: '',
        is_enabled: null,
        examine: ''
      },

      updForm: {
        id: null,
        com_code: '',
        name_cn: '',
        name_en: '',
        name_fr: '',
        role_remark: '',
        is_enabled: null,
        examine: ''
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
        role_remark: [
          {
            required: true,
            message: t('common.not_empty')
          },
          {
            validator: valid.checkOthers.validatorFun
          }
        ],
        name_cn: [
          {
            required: true,
            message: t('common.not_empty')
          }
        ],
        name_en: [
          {
            required: true,
            message: t('common.not_empty')
          },
          {
            validator: valid.checkOthers.validatorFun
          }
        ],
        name_fr: [
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
        ],
        examine: [
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
        role_remark: [
          {
            required: true,
            message: t('common.not_empty')
          },
          {
            validator: valid.checkOthers.validatorFun
          }
        ],
        name_cn: [
          {
            required: true,
            message: t('common.not_empty')
          },
          {
            validator: valid.checkOthers.validatorFun
          }
        ],
        name_en: [
          {
            required: true,
            message: t('common.not_empty')
          },
          {
            validator: valid.checkOthers.validatorFun
          }
        ],
        name_fr: [
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
        ],
        examine: [
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
      // 角色可查看接口获取接口：V1/Role/role_examine
      getRoleExamine(role_id: any = null) {
        const data = dataStructure(
          {},
          {
            role_id
          }
        )
        roleinfoApi
          .get_role_examine(data)
          .then(res => {
            let { status, custom_data } = res as IRequest
            if (status === 200) {
              state.roleExamineList = custom_data.data
              if (state.itemName == 'upd') {
                state.updForm.examine = custom_data.data.find((item: any) => item.pitch_on)?.id
              }
            }
          })
          .catch(err => err)
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
        roleinfoApi
          .get_company_list(data)
          .then(res => {
            let { status, custom_data } = res as IRequest
            if (status === 200) {
              state.companyList = custom_data.role_value
            }
          })
          .catch(err => err)
      },
      // 所有角色获取接口
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
        roleinfoApi
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
      // (角色信息)角色页面权限接口：V1/Role/index
      getIndex() {
        const data = dataStructure({ power_url: route.path }, {})
        roleinfoApi
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
      // 角色修改接口：V1/Role/upd
      getUpd() {
        const data = dataStructure({ power_url: 'V1/Role/upd' }, state.updForm)
        roleinfoApi
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
      //  角色添加接口：V1/Role/add
      getAdd() {
        const data = dataStructure({ power_url: 'V1/Role/add' }, state.addForm)
        roleinfoApi
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
      // 角色删除接口：V1/Role/del
      getDel(idArr: number[]) {
        const data = dataStructure(
          { power_url: 'V1/Role/del' },
          {
            id: idArr
          }
        )
        roleinfoApi
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
      // 角色修改查询数据接口：V1/Role/view
      getView(id: number) {
        return new Promise((resolve, reject) => {
          const data = dataStructure(
            {},
            {
              id: id
            }
          )
          roleinfoApi
            .get_view(data)
            .then((res: any) => {
              let { status, custom_data, info } = res as IRequest
              if (status === 200) {
                const {
                  id,
                  com_code,
                  name_cn,
                  name_en,
                  name_fr,
                  role_remark,
                  is_enabled,
                  examine
                } = custom_data
                state.updForm = {
                  id,
                  com_code,
                  name_cn,
                  name_en,
                  name_fr,
                  role_remark,
                  is_enabled,
                  examine
                }
                resolve('显示修改页')
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
        // methods.reset('del')
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
      handleSizeChange(perpage: number) {
        state.pagination.perpage = perpage
        requests.getList() //传参顺序
      },
      handleCurrentChange(page: number) {
        state.pagination.page = page
        requests.getList()
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
        if (!state.companyList.length) {
          requests.getCompanyList()
        }
        requests.getRoleExamine()
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
            let idArr: number[] = []
            idArr.push(singleSelection.id)
            requests.getDel(idArr)
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
          if (!state.companyList.length) {
            requests.getCompanyList()
          }
          requests.getRoleExamine(id)
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
@import '@/assets/css/table.scss';
@import '@/assets/css/element-common-style.scss';

@import '@/assets/css/page-common.scss'; //页面基础布局样式一
</style>
