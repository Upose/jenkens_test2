<template>
  <div class="content">
    <div class="left_cont">
      <div class="box">
        <!-- <div class="header">
					<span>{{ $t('common.account') }}</span>
				</div> -->
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
          <CommonTable
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
    <!-- 新增 -->
    <el-drawer :title="$t(`common.${itemName}`)" v-model="drawer.showAdd">
      <el-scrollbar>
        <el-form :model="addForm" :rules="addRule" ref="addRef">
          <el-form-item :label="$t('common.name_cn')" prop="name_cn">
            <el-input v-model="addForm.name_cn"></el-input>
          </el-form-item>
          <el-form-item :label="$t('common.name_en')" prop="name_en">
            <el-input v-model="addForm.name_en"></el-input>
          </el-form-item>
          <el-form-item :label="$t('common.name_fr')" prop="name_fr">
            <el-input v-model="addForm.name_fr"></el-input>
          </el-form-item>
          <el-form-item :label="$t('common.account')" prop="account">
            <el-input v-model="addForm.account"></el-input>
          </el-form-item>
        </el-form>
        <div style="text-align: right;margin:5px">
          <el-button @click="onSubmitAdd" type="success" plain>{{ $t('common.submit') }}</el-button>
        </div>
      </el-scrollbar>
    </el-drawer>
    <!-- 修改 -->
    <el-drawer :title="$t(`common.${itemName}`)" v-model="drawer.showUpd">
      <el-scrollbar>
        <el-form :model="updForm" :rules="updRule" ref="updRef">
          <el-form-item :label="$t('common.ID')" prop="id">
            <el-input disabled v-model="updForm.id"></el-input>
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
          <el-form-item :label="$t('common.account')" prop="account">
            <el-input v-model="updForm.account"></el-input>
          </el-form-item>
        </el-form>
        <div style="text-align: right;margin:5px">
          <el-button @click="onSubmitUpd" type="success" plain>{{ $t('common.submit') }}</el-button>
        </div>
      </el-scrollbar>
    </el-drawer>
    <el-dialog
      :title="$t('common.columnConfiguration')"
      v-model="drawer.showSortableCustom"
      :width="540"
    >
      <Custom @cancelConfig="cancelConfig" v-bind="customArgs"></Custom>
    </el-dialog>
  </div>
  <!-- <div v-show="!isView">
    当前页面没有访问权限
  </div> -->
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, toRefs, watch, ref } from 'vue'
import { commonApi } from '@/http/api/common'
import { paymentAccountApi } from '@/http/api/financecustom/payment_account'
import { IRequest } from '@/@types/httpInterface'
import dataStructure from '@/utils/dataStructure'
import { getUserId } from '@/utils/cookie'
import { useStore } from '@/store'
import { useRoute, useRouter } from 'vue-router'
import { ElMessageBox, ElMessage } from 'element-plus'
import { IState, ISelection, IValid } from './typings'
import { IPower } from '@/@types/iPower'
import { useI18n } from 'vue-i18n'
import { dateNormArray } from '@/utils/dateNorm'
import { CUSTOM_TABLES } from '@/constant/bus/bus_custom_table'
import Custom from '@/components/common/Custom/Custom.vue'
import CommonTable from '@/components/common/Table/CommonTable.vue'
// const { t } = useI18n()
export default defineComponent({
  name: 'invtype',
  components: {
    CommonTable,
    Custom
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
      commonLists: {
        staffList: []
      },
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
        table: CUSTOM_TABLES.INVENTORY_PAYMENT_ACCOUNT
      },
      itemName: 'add', //页面唯一判定字段
      addForm: {
        name_cn: '',
        name_en: '',
        name_fr: '',
        account: ''
      },
      updForm: {
        id: null,
        name_cn: '',
        name_en: '',
        name_fr: '',
        account: ''
      },
      drawer: {
        showAdd: false,
        showUpd: false,
        showSortableCustom: false
      },
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
    const addRule = computed(() => {
      const rule = {
        name_cn: [
          { required: true, message: t('common.not_empty') },
          { validator: valid.checkOthers.validatorFun }
        ],
        name_en: [
          { required: true, message: t('common.not_empty') },
          { validator: valid.checkOthers.validatorFun }
        ],
        name_fr: [
          { required: true, message: t('common.not_empty') },
          { validator: valid.checkOthers.validatorFun }
        ],
        account: [
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
        name_cn: [
          { required: true, message: t('common.not_empty') },
          { validator: valid.checkOthers.validatorFun }
        ],
        name_en: [
          { required: true, message: t('common.not_empty') },
          { validator: valid.checkOthers.validatorFun }
        ],
        name_fr: [
          { required: true, message: t('common.not_empty') },
          { validator: valid.checkOthers.validatorFun }
        ],
        account: [
          { required: true, message: t('common.not_empty') },
          { validator: valid.checkOthers.validatorFun }
        ]
      }
      return rule
    })
    const requests = {
      // 获取所有人员接口
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
      // 库存类型获取接口：V1/InventoryType/list
      getList() {
        const data = dataStructure({}, state.pagination)
        paymentAccountApi
          .get_list(data)
          .then(res => {
            let { status, custom_data } = res as IRequest
            if (status === 200) {
              let tableData: any = dateNormArray(custom_data.data)
              state.tableData = tableData
              state.pagination.total = custom_data.total
            }
          })
          .catch(err => err)
      },
      // 库存类型页面接口：V1/InventoryType/index
      getIndex() {
        const data = dataStructure({ power_url: route.path }, {})
        paymentAccountApi
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
      // 库存类型修改接口：V1/InventoryType/upd
      getUpd() {
        const data = dataStructure({ power_url: 'V1/InventoryType/upd' }, state.updForm)
        paymentAccountApi
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
      // 库存类型添加接口：V1/InventoryType/add
      getAdd() {
        const data = dataStructure({ power_url: 'V1/InventoryType/add' }, state.addForm)
        paymentAccountApi
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
      // 库存类型删除接口：V1/InventoryType/del
      getDel(id: number) {
        const data = dataStructure(
          { power_url: 'V1/InventoryType/del' },
          {
            id: id
          }
        )
        paymentAccountApi
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
      // 库存类型查询数据接口：V1/InventoryType/view
      getView(id: number) {
        return new Promise((resolve, reject) => {
          const data = dataStructure({}, { id: id })
          paymentAccountApi
            .get_view(data)
            .then(res => {
              let { status, custom_data, info } = res as IRequest
              if (status === 200) {
                state.updForm.id = custom_data.id
                state.updForm.name_cn = custom_data.name_cn
                state.updForm.name_en = custom_data.name_en
                state.updForm.name_fr = custom_data.name_fr
                state.updForm.account = custom_data.account
                resolve('显示修改')
              }
            })
            .catch(err => err)
        })
      }
    }
    const methods = {
      // 关闭列配置弹出框
      cancelConfig() {
        state.drawer.showSortableCustom = false
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
        state.drawer.showSortableCustom = arg
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
        if (!state.commonLists.staffList.length) {
          requests.getStaffInfo()
        }
      },

      // 修改按钮
      doUpd() {
        const { id } = selection.singleSelection
        requests.getView(id).then(() => {
          if (!state.commonLists.staffList.length) {
            requests.getStaffInfo()
          }
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

@import '@/assets/css/page-common.scss';
</style>
