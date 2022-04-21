<!--
 * @Descripttion: 
 * @version: 
 * @Author: XJ
 * @Date: 2021-05-10 10:39:40
 * @LastEditors: TJ
 * @LastEditTime: 2021-11-10 16:46:46
-->
<template>
  <div class="content">
    <div class="left_cont">
      <div class="box">
        <div class="header">
          <span>{{ $t('common.state_header') }}</span>
        </div>
        <!-- <div class="part_line"></div> -->
        <div class="top">
          <div>
            <!-- 搜索内容 -->
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
            <!-- 操作按钮 -->
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
          <!-- 表格内容 -->
          <el-table
            highlight-current-row
            :data="tableData"
            ref="singleTable"
            @row-click="rowClick"
            :height="tableHeight"
            @row-dblclick="rowDblclick"
          >
            <el-table-column show-overflow-tooltip prop="id" :label="$t('common.id')" width="100">
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="name_cn"
              :label="$t('common.name_cn')"
              width="150"
            >
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="name_en"
              :label="$t('common.name_en')"
              width="180"
            >
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="name_fr" :label="$t('common.name_fr')">
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="code"
              :label="$t('common.code')"
              width="100"
            >
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="order_by"
              :label="$t('common.order_by')"
              width="100"
            >
            </el-table-column>
            <!-- <el-table-column show-overflow-tooltip prop="pid" :label="$t('common.pid')" width="100">
            </el-table-column> -->

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
          <!-- 表单 -->
          <el-form
            :model="addForm"
            label-width="200px"
            label-position="left"
            :rules="addRule"
            ref="addRef"
          >
            <el-form-item :label="$t('common.id')" prop="id">
              <el-input v-model="addForm.id"></el-input>
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
            <el-form-item :label="$t('common.code')" prop="code">
              <el-input v-model="addForm.code"></el-input>
            </el-form-item>
            <!-- <el-form-item :label="$t('common.order_by')" prop="order_by">
              <el-input
                 v-model="addForm.order_by"
              ></el-input>
            </el-form-item> -->
            <el-form-item :label="$t('common.pid')" prop="pid">
              <el-input v-model="addForm.pid"></el-input>
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
          <!-- 提交按钮 -->
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
            <el-form-item :label="$t('common.id')" prop="id">
              <el-input v-model="updForm.id"></el-input>
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
            <el-form-item :label="$t('common.code')" prop="code">
              <el-input v-model="updForm.code"></el-input>
            </el-form-item>
            <!-- <el-form-item :label="$t('common.order_by')" prop="order_by">
              <el-input
                 v-model="updForm.order_by"
              ></el-input>
            </el-form-item> -->
            <el-form-item :label="$t('common.pid')" prop="pid">
              <el-input v-model="updForm.pid"></el-input>
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
          <!-- 提交按钮 -->
          <el-button @click="onSubmitUpd" type="success">{{ $t('common.submit') }}</el-button>
        </div>
      </div>
    </el-drawer>
    <el-drawer :title="$t(`common.${itemName}`)" :size="576" v-model="drawer.showDetail">
      <div class="box-card desLabel">
        <div class="box-form">
          <el-descriptions :title="$t('common.base_info')" :column="1">
            <el-descriptions-item :label="$t('common.id') + ':'">{{
              singleSelection.id
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
            <el-descriptions-item :label="$t('common.code') + ':'">{{
              singleSelection.code
            }}</el-descriptions-item>
            <el-descriptions-item :label="$t('common.order_by') + ':'">{{
              singleSelection.order_by
            }}</el-descriptions-item>
            <el-descriptions-item :label="$t('common.pid') + ':'">{{
              singleSelection.pid
            }}</el-descriptions-item>
          </el-descriptions>

          <el-descriptions :title="$t('common.handle_info')" :column="1">
            <el-descriptions-item :label="$t('common.is_enabled') + ':'">
              <el-switch
                disabled
                :active-value="1"
                :inactive-value="0"
                active-color="#13ce66"
                v-model="singleSelection.is_enabled"
              >
              </el-switch>
            </el-descriptions-item>
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
import { areaApi } from '@/http/api/system/sets/area'
import { IRequest } from '@/@types/httpInterface'
import dataStructure from '@/utils/dataStructure'
import { getUserId } from '@/utils/cookie'
import { useStore } from '@/store'
import { useRoute, useRouter } from 'vue-router'
import { ElMessageBox, ElMessage } from 'element-plus'
import { IState, ISelection } from './typings'
import { IPower, IValid } from '@/@types/iPower'
import { useI18n } from 'vue-i18n'
import { dateNormArray } from '@/utils/dateNorm'
import { checkOnlyNumZero } from '@/utils/regp'
export default defineComponent({
  setup() {
    const { t } = useI18n()
    const singleTable = ref()
    const addRef = ref()
    const updRef = ref()
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
      buttonData: [],
      itemName: 'add',
      searchValue: '',
      drawer: {
        showAdd: false,
        showUpd: false,
        showDetail: false
      },
      pagination: {
        page: 1,
        perpage: 18,
        total: 100
      },
      addForm: {
        id: '',
        name_cn: '',
        name_en: '',
        name_fr: '',
        code: null,
        order_by: null,
        pid: null,
        is_enabled: 0
      },
      updForm: {
        id: '',
        name_cn: '',
        name_en: '',
        name_fr: '',
        code: null,
        order_by: null,
        pid: null,
        is_enabled: 0
      },
      tableHeight: '100%'
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
    const addRule = computed(() => {
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
        code: [
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
            validator: checkOnlyNumZero
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
        id: [
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
        code: [
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
            validator: checkOnlyNumZero
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
      // 国家信息页面接口:V1/Area/index
      getIndex() {
        const data = dataStructure({ power_url: route.path }, {})
        areaApi
          .get_area_index(data)
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
      // 国家信息获取接口:V1/Area/list
      getList() {
        const data = dataStructure(
          {},
          {
            page: state.pagination.page,
            perpage: state.pagination.perpage,
            search_value: state.searchValue,
            order_by: 1
          }
        )
        areaApi
          .get_area_list(data)
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
      // 国家信息添加接口:V1/Area/add
      getAdd() {
        const data = dataStructure({ power_url: 'V1/Area/add' }, state.addForm)
        areaApi
          .get_area_add(data)
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
      // 国家信息查询数据接口:V1/Area/view
      getView(id: string) {
        return new Promise((resolve, inject) => {
          const data = dataStructure(
            {},
            {
              id
            }
          )
          areaApi
            .get_area_view(data)
            .then((res: any) => {
              let { status, custom_data, info } = res as IRequest

              if (status === 200) {
                const {
                  id,
                  name_cn,
                  name_en,
                  name_fr,
                  code,
                  order_by,
                  pid,
                  is_enabled
                } = custom_data
                state.updForm = {
                  id,
                  name_cn,
                  name_en,
                  name_fr,
                  code,
                  order_by,
                  pid,
                  is_enabled
                }
                resolve('修改页面')
              }
            })
            .catch((err: any) => err)
        })
      },
      // 国家信息修改接口:V1/Area/upd
      getUpd() {
        const data = dataStructure({ power_url: 'V1/Area/upd' }, state.updForm)
        areaApi
          .get_area_upd(data)
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
      // 国家信息删除接口:V1/Area/del
      getDel(id: string) {
        const data = dataStructure(
          { power_url: 'V1/Area/del' },
          {
            id: id
          }
        )
        areaApi
          .get_area_del(data)
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
      }
    }

    const methods = {
      // 搜索按钮
      onSearch() {
        requests.getList()
      },

      input() {
        if (!state.searchValue) {
          requests.getList()
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
      // 添加
      doAdd() {
        state.itemName = 'add'
        state.drawer.showAdd = true
      },
      // 修改
      doUpd() {
        const { id } = selection.singleSelection
        requests.getView(id).then(() => {
          state.itemName = 'upd'
          state.drawer.showUpd = true
        })
      },
      // 删除
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
      // 添加页提交按钮
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
      // 修改页提交按钮
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
      // 切换选择
      rowClick(val: any) {
        //selection数组
        selection.singleSelection = val
      },
      // 表格点击事件，传递表格数据
      rowDblclick(row: object) {
        state.itemName = 'detail'
        state.drawer.showDetail = true
        selection.singleSelection = row
      },
      handleSizeChange(perpage: number) {
        state.pagination.perpage = perpage
        requests.getList() //传参顺序
      },
      handleCurrentChange(page: number) {
        state.pagination.page = page
        requests.getList()
      }
    }
    onMounted(() => {
      requests.getIndex()
    })
    return {
      ...toRefs(state),
      ...toRefs(selection),
      ...methods,
      ...requests,
      addRule,
      updRule,
      singleTable,
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
