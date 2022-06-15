<template>
  <div class="content ">
    <div class="left_cont">
      <div class="box">
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

        <!-- @contextmenu.prevent.stop -->
        <div class="tab">
          <CommonTable
            ref="CommonTableRef"
            @sortChange="sortChange"
            :tableData="tableData"
            @rowClick="rowClick"
            v-bind="customArgs"
            @headerClick="headerClick"
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
    <el-drawer :title="$t(`common.${itemName}`)" :size="576" v-model="showAdd">
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
                <el-form-item :label="$t('common.name')" prop="name">
                  <el-input v-model="addForm.name"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item :label="$t('common.store_name')" prop="store_name">
                  <el-input v-model="addForm.store_name"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item :label="$t('common.level')" prop="level">
                  <el-select filterable clearable v-model="addForm.level">
                    <el-option
                      v-for="item in commonLists.levelList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item :label="$t('common.executor')" prop="executor">
                  <el-select clearable filterable v-model="addForm.executor">
                    <el-option
                      v-for="(item, index) of commonLists.executorList"
                      :key="index"
                      :value="item.user_id"
                      :label="item.full_name"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item :label="$t('common.linkman')" prop="linkman">
                  <el-input v-model="addForm.linkman"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item :label="$t('common.phone')" prop="photo">
                  <el-select
                    v-model="addForm.photo"
                    multiple
                    filterable
                    clearable
                    allow-create
                    default-first-option
                    :multiple-limit="3"
                    :placeholder="$t('common.p_photo')"
                  >
                    <el-option
                      v-for="item in commonLists.photoList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item :label="$t('common.address')" prop="address">
                  <el-input v-model="addForm.address"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div class="box-button">
          <el-button @click="onSubmitAdd" type="success" plain>{{ $t('common.submit') }}</el-button>
        </div>
      </div>
    </el-drawer>
    <el-drawer :title="$t(`common.${itemName}`)" :size="576" v-model="showUpd">
      <div class="box-card formStyle">
        <div class="box-form">
          <el-form
            :model="updForm"
            label-width="200px"
            :rules="updRule"
            ref="updRef"
            label-position="left"
            :validate-on-rule-change="false"
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
                <el-form-item :label="$t('common.name')" prop="name">
                  <el-input v-model="updForm.name"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item :label="$t('common.store_name')" prop="store_name">
                  <el-input v-model="updForm.store_name"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item :label="$t('common.level')" prop="level">
                  <el-select filterable clearable v-model="updForm.level">
                    <el-option
                      v-for="item in commonLists.levelList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item :label="$t('common.executor')" prop="executor">
                  <el-select clearable filterable v-model="updForm.executor">
                    <el-option
                      v-for="(item, index) of commonLists.executorList"
                      :key="index"
                      :value="item.user_id"
                      :label="item.full_name"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item :label="$t('common.linkman')" prop="linkman">
                  <el-input v-model="updForm.linkman"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item :label="$t('common.phone')" prop="photo">
                  <el-select
                    v-model="updForm.photo"
                    multiple
                    filterable
                    clearable
                    allow-create
                    default-first-option
                    :multiple-limit="3"
                    :placeholder="$t('common.p_photo')"
                  >
                    <el-option
                      v-for="item in commonLists.photoList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item :label="$t('common.address')" prop="address">
                  <el-input v-model="updForm.address"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div class="box-button">
          <el-button @click="onSubmitUpd" type="success" plain>{{ $t('common.submit') }}</el-button>
        </div>
      </div>
    </el-drawer>
    <el-dialog :title="$t('common.columnConfiguration')" v-model="showSortableCustom" :width="540">
      <Custom @cancelConfig="cancelConfig" v-bind="customArgs"></Custom>
    </el-dialog>
  </div>

  <!-- <div v-show="!isView">
    当前页面没有访问权限
  </div> -->
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, toRefs, ref } from 'vue'
import { clientApi } from '@/http/api/othcustom/stockset/client'
import { IRequest } from '@/@types/httpInterface'
import dataStructure from '@/utils/dataStructure'
import { ElMessageBox, ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
import { IPower } from '@/@types/iPower'
import { useRoute, useRouter } from 'vue-router'
import { IState, ISelection, IValid } from './typings'
import { dateNormArray } from '@/utils/dateNorm'
import { CUSTOM_TABLES } from '@/constant/bus/bus_custom_table'
import Custom from '@/components/common/Custom/Custom.vue'
import CommonTable from '@/components/common/Table/CommonTable.vue'
export default defineComponent({
  components: {
    CommonTable,
    Custom
  },
  setup() {
    const { t } = useI18n()
    const route = useRoute()
    const router = useRouter()
    const selection: ISelection = reactive({
      singleSelection: {}
    })
    const isEmeptyObj = computed(() => {
      return Object.keys(selection.singleSelection).length === 0 ? true : false
    })
    const state: IState = reactive({
      tableHeight: '100%',
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
        table: CUSTOM_TABLES.INVENTORY_CLIENT
        // showCustom: store.state.index.showCustom,
      },
      commonLists: {
        levelList: [
          { id: 1, name: t('common.oneLevel') },
          { id: 2, name: t('common.twoLevel') },
          { id: 3, name: t('common.threeLevel') },
          { id: 4, name: t('common.fourLevel') },
          { id: 5, name: t('common.fiveLevel') }
        ],
        executorList: [],
        photoList: []
      },
      itemName: 'add',
      addForm: {
        name: '',
        level: '',
        executor: '',
        // +++
        linkman: '',
        photo: [],
        address: '',
        store_name: ''
      },
      updForm: {
        id: '',
        name: '',
        level: '',
        executor: '',
        // +++
        linkman: '',
        photo: [],
        address: '',
        store_name: ''
      },

      showAdd: false,
      showUpd: false,
      showSortableCustom: false,
      tableData: [],
      buttonData: []
    })
    const valid: IValid = reactive({
      checkOthers: {
        fun: (rule: object, value: string, callback: Function, info: any, bool: boolean) => {
          if (bool) {
            callback(new Error(info))
            valid.checkOthers.bool = false
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
            valid.checkOthers.bool
          )
        },
        info: '',
        bool: false
      }
    })
    const addRef = ref()
    const updRef = ref()
    const singleTable = ref()
    const CommonTableRef = ref()
    const addRule = computed(() => {
      const rule = {
        name: [
          { required: true, message: t('common.not_empty') },
          { validator: valid.checkOthers.validatorFun }
        ],
        level: [
          { required: true, message: t('common.not_empty') },
          { validator: valid.checkOthers.validatorFun }
        ],
        executor: [
          { required: true, message: t('common.not_empty') },
          { validator: valid.checkOthers.validatorFun }
        ],
        linkman: [
          { required: true, message: t('common.not_empty') },
          { validator: valid.checkOthers.validatorFun }
        ],
        photo: [
          { required: true, message: t('common.not_empty') },
          { validator: valid.checkOthers.validatorFun }
        ],
        address: [
          { required: true, message: t('common.not_empty') },
          { validator: valid.checkOthers.validatorFun }
        ]
      }
      return rule
    })
    const updRule = computed(() => {
      const rule = {
        id: [
          { required: true, message: t('common.not_empty') },
          { validator: valid.checkOthers.validatorFun }
        ],
        name: [
          { required: true, message: t('common.not_empty') },
          { validator: valid.checkOthers.validatorFun }
        ],
        level: [
          { required: true, message: t('common.not_empty') },
          { validator: valid.checkOthers.validatorFun }
        ],
        executor: [
          { required: true, message: t('common.not_empty') },
          { validator: valid.checkOthers.validatorFun }
        ],
        linkman: [
          { required: true, message: t('common.not_empty') },
          { validator: valid.checkOthers.validatorFun }
        ],
        photo: [
          { required: true, message: t('common.not_empty') },
          { validator: valid.checkOthers.validatorFun }
        ],
        address: [
          { required: true, message: t('common.not_empty') },
          { validator: valid.checkOthers.validatorFun }
        ]
      }
      return rule
    })
    const requests = {
      getExecutor() {
        const data = dataStructure(
          {},
          {
            order_by: 1
          }
        )
        clientApi
          .get_executor(data)
          .then(res => {
            let { status, custom_data } = res as IRequest
            if (status === 200) {
              state.commonLists.executorList = custom_data
            }
          })
          .catch(err => err)
      },
      getList() {
        const data = dataStructure({}, state.pagination)
        clientApi
          .get_list(data)
          .then(res => {
            let { status, custom_data } = res as IRequest
            if (status === 200) {
              if (!!custom_data.data) {
                let tableData: any = dateNormArray(custom_data.data)
                state.tableData = tableData
              }

              state.pagination.total = custom_data.total
            }
          })
          .catch(err => err)
      },
      getIndex() {
        const data = dataStructure({ power_url: route.path }, {})
        clientApi
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
      getUpd() {
        const data = dataStructure({ power_url: 'V1/InventoryClient/upd' }, state.updForm)
        clientApi
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
              valid.checkOthers.bool = true
              const updref = updRef
              updref.value.validateField(field_name)
            }
          })
          .catch(err => err)
      },
      getAdd() {
        const data = dataStructure({ power_url: 'V1/InventoryClient/add' }, state.addForm)
        clientApi
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
              valid.checkOthers.bool = true
              const addref = addRef
              addref.value.validateField(field_name)
            }
          })
          .catch(err => err)
      },
      getDel(id: number) {
        const data = dataStructure(
          { power_url: 'V1/InventoryClient/del' },
          {
            id: id
          }
        )
        clientApi
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
      // 库存单位查询数据接口：V1/InventoryClient/view
      getView(id: number) {
        return new Promise((resolve, reject) => {
          const data = dataStructure(
            {},
            {
              id: id
            }
          )
          clientApi
            .get_view(data)
            .then(res => {
              let { status, custom_data, info } = res as IRequest
              if (status === 200) {
                state.updForm.id = custom_data.id
                state.updForm.name = custom_data.name
                state.updForm.level = custom_data.level
                state.updForm.executor = custom_data.executor
                state.updForm.linkman = custom_data.linkman
                state.updForm.photo = !custom_data.photo ? [] : custom_data.photo
                state.updForm.address = custom_data.address
                state.updForm.store_name = custom_data.store_name
                resolve('显示修改页面')
              }
            })
            .catch(err => err)
        })
      }
    }

    const methods = {
      // 关闭列配置弹出框
      cancelConfig() {
        state.showSortableCustom = false
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
      rowClick(val: any) {
        selection.singleSelection = val
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
        const CommonTableref = CommonTableRef
        CommonTableref.value.setCurrentRow()
        // 重置表单
        let handleRef = null
        switch (arg) {
          case 'add':
            state.showAdd = false
            handleRef = addRef
            break
          case 'upd':
            state.showUpd = false
            handleRef = updRef
            break
          default:
            break
        }
        requests.getList()

        if (handleRef) {
          handleRef.value.resetFields()
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

      doDel() {
        state.itemName = 'del'
        let singleSelection = selection.singleSelection
        let id = singleSelection.id
        ElMessageBox.confirm(t('common.confirmDel'), t('common.tip'), {
          confirmButtonText: t('common.confirm'),
          cancelButtonText: t('common.cancel'),
          type: 'warning',
          confirmButtonClass: 'warning'
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
        state.showAdd = true
        if (!state.commonLists.executorList.length) {
          requests.getExecutor()
        }
      },

      // 修改按钮
      doUpd() {
        const { id } = selection.singleSelection
        requests.getView(id).then(() => {
          state.itemName = 'upd'
          state.showUpd = true
          if (!state.commonLists.executorList.length) {
            requests.getExecutor()
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
      singleTable,
      addRule,
      updRule,
      addRef,
      updRef,
      isEmeptyObj,
      CommonTableRef
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/css/table.scss';
@import '@/assets/css/element-common-style.scss';

@import '@/assets/css/page-common.scss'; //页面基础布局样式一
</style>
