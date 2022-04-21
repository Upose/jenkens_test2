<template>
  <div class="content">
    <div class="left_cont">
      <div class="box">
        <div class="header">
          <span>{{ $t('common.widget_header') }}</span>
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
          <el-table
            highlight-current-row
            :data="tableData"
            ref="singleTable"
            @row-click="rowClick"
            @row-dblclick="rowDblclick"
            :height="tableHeight"
          >
            <el-table-column show-overflow-tooltip prop="widget_id" :label="$t('common.widget_id')">
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="menu_id" :label="$t('common.menu_id')">
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="widget_nid"
              :label="$t('common.widget_nid')"
            >
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="name_cn" :label="$t('common.name_cn')">
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="name_en" :label="$t('common.name_en')">
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="name_fr" :label="$t('common.name_fr')">
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="widget_type"
              :label="$t('common.widget_type')"
            >
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="order_by" :label="$t('common.order_by')">
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="is_enabled"
              :label="$t('common.is_enabled')"
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
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pagination.page"
            :page-size="pagination.perpage"
            :page-sizes="[13, 18, 23, 28]"
            layout="total,  prev, pager, sizes,next, jumper"
            :total="pagination.total"
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
            :rules="addRule"
            ref="addRef"
            label-position="left"
          >
            <el-form-item :label="$t('common.widget_id')" prop="widget_id">
              <el-select
                filterable
                clearable
                allow-create
                default-first-option
                v-model="addForm.widget_id"
              >
                <el-option
                  v-for="item in commonLists.widgetIdList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('common.menu_id')" prop="menu_id">
              <el-select filterable clearable v-model="addForm.menu_name">
                <el-option style="height: auto;padding: 0;">
                  <el-tree
                    ref="treeRef"
                    :highlight-current="true"
                    :indent="8"
                    node-key="id"
                    :data="commonLists.menuIdList"
                    :props="commonLists.defaultProps"
                    accordion
                    @node-click="handleChange"
                  >
                  </el-tree>
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item :label="$t('common.widget_nid')" prop="widget_nid">
              <el-input v-model="addForm.widget_nid"></el-input>
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
            <el-form-item :label="$t('common.widget_type')" prop="widget_type">
              <el-select filterable clearable v-model="addForm.widget_type">
                <el-option
                  v-for="item in commonLists.showList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('common.order_by')" prop="order_by">
              <el-input v-model="addForm.order_by"></el-input>
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
            :rules="updRule"
            ref="updRef"
            label-position="left"
          >
            <el-form-item :label="$t('common.widget_id')" prop="widget_id">
              <el-select filterable clearable v-model="updForm.widget_id" disabled>
                <el-option
                  v-for="item in commonLists.widgetIdList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('common.menu_id')" prop="menu_id">
              <el-select filterable clearable v-model="updForm.menu_name" disabled>
                <el-option style="height: auto;padding: 0;">
                  <el-tree
                    ref="treeRef"
                    :highlight-current="true"
                    :indent="8"
                    node-key="id"
                    :data="commonLists.menuIdList"
                    :props="commonLists.defaultProps"
                    accordion
                    @node-click="handleChange"
                  >
                  </el-tree>
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item :label="$t('common.widget_nid')" prop="widget_nid">
              <el-input v-model="updForm.widget_nid"></el-input>
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
            <el-form-item :label="$t('common.widget_type')" prop="widget_type">
              <el-select filterable clearable v-model="updForm.widget_type">
                <el-option
                  v-for="item in commonLists.showList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('common.order_by')" prop="order_by">
              <el-input v-model="updForm.order_by"></el-input>
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
          <el-descriptions :title="$t('common.base_info')" :column="1">
            <el-descriptions-item :label="$t('common.widget_id') + ':'">{{
              singleSelection.widget_id
            }}</el-descriptions-item>
            <el-descriptions-item :label="$t('common.menu_id') + ':'">{{
              singleSelection.menu_id
            }}</el-descriptions-item>
            <el-descriptions-item :label="$t('common.widget_nid') + ':'">{{
              singleSelection.widget_nid
            }}</el-descriptions-item>
            <el-descriptions-item :label="$t('common.name_cn') + ':'">{{
              singleSelection.name_cn
            }}</el-descriptions-item>
            <el-descriptions-item :label="$t('common.name_en') + ':'">{{
              singleSelection.name_en
            }}</el-descriptions-item>
            <el-descriptions-item :label="$t('common.name_fr') + ':'">{{
              singleSelection.name_fr
            }}</el-descriptions-item>
            <el-descriptions-item :label="$t('common.widget_type') + ':'">{{
              singleSelection.widget_type
            }}</el-descriptions-item>
            <el-descriptions-item :label="$t('common.order_by') + ':'">{{
              singleSelection.order_by
            }}</el-descriptions-item>

            <!-- ----------------------------------------- -->
          </el-descriptions>

          <el-descriptions :title="$t('common.handle_info')" :column="1">
            <el-descriptions-item :label="$t('common.is_enabled') + ':'">
              <el-switch disabled active-color="#13ce66" v-model="singleSelection.is_enabled">
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
  <!-- <div v-show="!isView">
    当前页面没有访问权限
  </div> -->
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, toRefs, watch, ref } from 'vue'

import { widgetApi } from '@/http/api/system/manage/widget'
import { IRequest } from '@/@types/httpInterface'
import dataStructure from '@/utils/dataStructure'
import { useStore } from '@/store'
import { useRoute, useRouter } from 'vue-router'
import { ElMessageBox, ElMessage } from 'element-plus'
import { ISelection, IState } from './typings'
import { IPower, IValid } from '@/@types/iPower'
import { dateNormArray } from '@/utils/dateNorm'
import { useI18n } from 'vue-i18n'
import { checkOnlyNumZero } from '@/utils/regp'
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
      pagination: {
        page: 1,
        perpage: 18,
        total: 100
      },

      itemName: 'add',
      searchValue: '',
      commonLists: {
        widgetIdList: [
          {
            value: 'view',
            label: t('common.view')
          },
          {
            value: 'add',
            label: t('common.add')
          },
          {
            value: 'upd',
            label: t('common.upd')
          },
          {
            value: 'del',
            label: t('common.del')
          },
          {
            value: 'more',
            label: t('common.more')
          },
          {
            value: 'import',
            label: t('common.import')
          },
          {
            value: 'export',
            label: t('common.export')
          }
        ],

        showList: [
          {
            value: 1,
            label: t('common.menu_show')
          },
          {
            value: 0,
            label: t('common.display')
          }
        ],
        menuIdList: [],
        defaultProps: {
          children: 'children',
          label: 'name'
        }
      },
      addForm: {
        widget_id: '',
        menu_id: null,
        menu_name: '',
        widget_nid: null,
        name_cn: '',
        name_en: '',
        name_fr: '',
        widget_type: null,
        order_by: null
      },

      updForm: {
        widget_id: '',
        menu_id: null,
        menu_name: '',
        widget_nid: null,
        name_cn: '',
        name_en: '',
        name_fr: '',
        widget_type: null,
        order_by: null
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
        widget_id: [
          {
            required: true,
            message: t('common.not_empty')
          },
          {
            validator: valid.checkOthers.validatorFun
          }
        ],
        menu_id: [
          {
            required: true,
            message: t('common.not_empty')
          },
          {
            validator: valid.checkOthers.validatorFun
          }
        ],
        menu_name: [
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
        widget_type: [
          {
            required: true,
            message: t('common.not_empty')
          },
          {
            validator: valid.checkOthers.validatorFun
          }
        ],
        order_by: [
          {
            required: true,
            validator: checkOnlyNumZero
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
        widget_id: [
          {
            required: true,
            message: t('common.not_empty')
          },
          {
            validator: valid.checkOthers.validatorFun
          }
        ],
        menu_id: [
          {
            required: true,
            message: t('common.not_empty')
          },
          {
            validator: valid.checkOthers.validatorFun
          }
        ],
        menu_name: [
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
        widget_type: [
          {
            required: true,
            message: t('common.not_empty')
          },
          {
            validator: valid.checkOthers.validatorFun
          }
        ],
        order_by: [
          {
            required: true,
            validator: checkOnlyNumZero
          },
          {
            validator: valid.checkOthers.validatorFun
          }
        ]
      }
      return rule
    })

    const requests = {
      // menu获取接口：V1/Menu/list
      getMenuList(searchValue: string | null = null) {
        const data = dataStructure(
          {},
          {
            search_value: searchValue,
            order_by: 1
          }
        )
        widgetApi
          .get_menu_list(data)
          .then((res: any) => {
            let { status, custom_data } = res as IRequest
            if (status === 200) {
              let role_value = custom_data.role_value

              state.commonLists.menuIdList = role_value
            }
          })
          .catch((err: any) => err)
      },
      //  页面控件获取接口：V1/Widget/list
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
        widgetApi
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
      // 页面控件页面接口：V1/Widget/index
      getIndex() {
        const data = dataStructure({ power_url: route.path }, {})
        widgetApi
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
      // 页面控件修改接口：V1/Widget/upd
      getUpd() {
        const data = dataStructure({ power_url: 'V1/Widget/upd' }, state.updForm)
        widgetApi
          .get_upd(data)
          .then(res => {
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
          .catch(err => err)
      },
      //  页面控件添加接口：V1/Widget/add
      getAdd() {
        const data = dataStructure({ power_url: 'V1/Widget/add' }, state.addForm)
        widgetApi
          .get_add(data)
          .then(res => {
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
          .catch(err => err)
      },
      // 页面控件删除接口：V1/Widget/del
      getDel(widget_id: null | string, menu_id: number) {
        const data = dataStructure(
          { power_url: 'V1/Widget/del' },
          {
            widget_id: widget_id,
            menu_id: menu_id
          }
        )
        widgetApi
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
      // 页面控件修改查询数据接口：V1/Widget/view
      getView(widget_id: null | string, menu_id: number) {
        return new Promise((resolve, reject) => {
          const data = dataStructure(
            {},
            {
              widget_id: widget_id,
              menu_id: menu_id
            }
          )
          widgetApi
            .get_view(data)
            .then(res => {
              let { status, custom_data, info } = res as IRequest
              if (status === 200) {
                const {
                  widget_id,
                  menu_id,
                  menu_name,
                  widget_nid,
                  name_cn,
                  name_en,
                  name_fr,
                  widget_type,
                  order_by
                } = custom_data
                state.updForm = {
                  widget_id,
                  menu_id,
                  menu_name,
                  widget_nid,
                  name_cn,
                  name_en,
                  name_fr,
                  widget_type,
                  order_by
                }
                resolve('显示修改页面')
              }
            })
            .catch(err => err)
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
      handleChange(data: any, node: any, self: any) {
        if (state.itemName == 'add') {
          state.addForm.menu_id = data.id
          state.addForm.menu_name = data.name
        } else if (state.itemName == 'upd') {
          state.updForm.menu_id = data.id
          state.updForm.menu_name = data.name
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
      rowDblclick(row: object) {
        state.itemName = 'detail'
        selection.singleSelection = row
        state.drawer.showDetail = true
      },
      //切换选择
      rowClick(val: any) {
        //selection数组
        selection.singleSelection = val
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
        if (!state.commonLists.menuIdList.length) {
          requests.getMenuList()
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
            let widget_id = singleSelection.widget_id
            let menu_id = singleSelection.menu_id
            requests.getDel(widget_id, menu_id)
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
        const { widget_id, menu_id } = selection.singleSelection
        requests.getView(widget_id, menu_id).then(() => {
          if (!state.commonLists.menuIdList.length) {
            requests.getMenuList()
          }
          state.itemName = 'upd'
          state.drawer.showUpd = true
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
