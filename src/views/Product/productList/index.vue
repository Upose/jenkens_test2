<template>
  <div class="content">
    <div class="left_cont">
      <div class="box">
        <div class="top">
          <div>
            <el-select
              filterable
              clearable
              v-model="pagination.inventory_type_id"
              @change="inventoryTypeIdChange"
              :placeholder="$t('common.inventory_type_name')"
            >
              <el-option
                v-for="item in commonLists.typeList2"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
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
          <!-- 下拉框供用户选择 -->
          <el-form-item :label="$t('common.inventory_type_name')" prop="inventory_type_id">
            <el-select
              style="width: 100%;"
              filterable
              clearable
              v-model="addForm.inventory_type_id"
            >
              <el-option
                v-for="item in commonLists.typeList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('common.model_number_name')" prop="name">
            <el-input v-model="addForm.name"></el-input>
          </el-form-item>
          <el-form-item :label="$t('common.specification')" prop="specification">
            <el-input v-model="addForm.specification"></el-input>
          </el-form-item>
          <el-form-item :label="$t('common.explain')" prop="explain">
            <el-input type="textarea" v-model="addForm.explain"></el-input>
          </el-form-item>
        </el-form>
        <div style="text-align: right;margin:5px;">
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
          <el-form-item :label="$t('common.model_number_name')" prop="name">
            <el-input v-model="updForm.name"></el-input>
          </el-form-item>
          <el-form-item :label="$t('common.specification')" prop="specification">
            <el-input v-model="addForm.specification"></el-input>
          </el-form-item>
          <el-form-item :label="$t('common.explain')" prop="explain">
            <el-input type="textarea" v-model="updForm.explain"></el-input>
          </el-form-item>
        </el-form>
        <div style="text-align: right;margin:5px;">
          <el-button @click="onSubmitUpd" type="success" plain>{{ $t('common.submit') }}</el-button>
        </div>
      </el-scrollbar>
    </el-drawer>
    <el-dialog :title="$t('common.columnConfiguration')" v-model="drawer.showSortableCustom" :width="540">
      <Custom @cancelConfig="cancelConfig" v-bind="customArgs"></Custom>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, toRefs, watch, ref } from 'vue'
import { MutationConstants, GetterConstants } from '@/store/modules/index/constants'
import { invmodelApi } from '@/http/api/othcustom/stockset/config/invmodel'
import { IRequest } from '@/@types/httpInterface'
import dataStructure from '@/utils/dataStructure'
import { getUserId } from '@/utils/cookie'
import { useStore } from '@/store'
import { useRoute, useRouter } from 'vue-router'
import { ElMessageBox, ElMessage } from 'element-plus'
import { ISelection, IState, IValid } from './typings'
import { IPower } from '@/@types/iPower'
import { useI18n } from 'vue-i18n'
import { dateNormArray } from '@/utils/dateNorm'
import { CUSTOM_TABLES } from '@/constant/bus/bus_custom_table'
import Custom from '@/components/common/Custom/Custom.vue'
import CommonTable from '@/components/common/Table/CommonTable.vue'
// const { t } = useI18n()
export default defineComponent({
  name: 'invmodel',
  components: {
    Custom,
    CommonTable
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
      tableHeight: '100%',
      pagination: {
        page: 1,
        perpage: 18,
        total: null,
        inventory_type_id: null,
        order_by: 1,
        field: ''
      },
      commonLists: {
        typeList: [],
        typeList2: []
      },
      itemName: 'add',
      customArgs: {
        common_array: [
          'id',
          'created_id',
          'created_name',
          'created_at',
          'updated_at',
          'name',
          'explain'
        ],
        table: CUSTOM_TABLES.INVENTORY_MODEL
      },
      addForm: {
        inventory_type_id: null,
        name: '',
        explain: '',
        specification: ''
      },
      updForm: {
        id: null,
        name: '',
        explain: '',
        specification: ''
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
        name: [
          { required: true, message: t('common.not_empty') },
          { validator: valid.checkOthers.validatorFun }
        ],
        inventory_type_id: [
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
        ]
      }
      return rule
    })
    const requests = {
      // 库存类型接口：V1/InventoryType/all_list
      getTypeList() {
        const data = dataStructure(
          {},
          {
            order_by: 1
          }
        )
        invmodelApi
          .get_type_list(data)
          .then(res => {
            let { status, custom_data, info } = res as IRequest
            if (status === 200) {
              // 主页头部需要全部字段
              let arr = [{ id: 0, name: t('common.all') }] // 类型列表接受参数
              state.commonLists.typeList2 = arr.concat(custom_data)
              state.commonLists.typeList = custom_data
            }
          })
          .catch(err => err)
      },
      getList() {
        const data = dataStructure(
          {},
          {
            page: state.pagination.page,
            perpage: state.pagination.perpage,
            order_by: state.pagination.order_by,
            field: state.pagination.field,
            inventory_type_id: state.pagination.inventory_type_id //null传全部
          }
        )
        invmodelApi
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
      // 库存型号页面接口：V1/InventoryModel/index

      getIndex() {
        const data = dataStructure({ power_url: route.path }, {})
        invmodelApi
          .get_index(data)
          .then(res => {
            let { status, power } = res as IRequest
            if (status === 200) {
              requests.getList()
              state.buttonData = power
              requests.getTypeList()
            }
          })
          .catch(err => err)
      },
      // 库存类型修改接口：V1/InventoryType/upd
      getUpd() {
        const data = dataStructure({ power_url: 'V1/InventoryType/upd' }, state.updForm)
        invmodelApi
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
      // 库存型号添加接口：V1/InventoryModel/add

      getAdd() {
        const data = dataStructure({ power_url: 'V1/InventoryType/add' }, state.addForm)
        invmodelApi
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
      // 库存型号删除接口：V1/InventoryModel/del
      getDel(id: number) {
        const data = dataStructure(
          { power_url: 'V1/InventoryType/del' },
          {
            id: id
          }
        )
        invmodelApi
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
      // 库存型号查询数据接口：V1/InventoryModel/view
      getView(id: number) {
        return new Promise((resolve, reject) => {
          const data = dataStructure(
            {},
            {
              id: id
            }
          )
          invmodelApi
            .get_view(data)
            .then(res => {
              let { status, custom_data, info } = res as IRequest
              if (status === 200) {
                const { id, name, explain } = custom_data
                state.updForm = { id, name, explain }
                resolve('显示修改页面')
              }
            })
            .catch(err => err)
        })
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
      inventoryTypeIdChange() {
        requests.getList()
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
        if (!state.commonLists.typeList.length) {
          requests.getTypeList()
        }
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
      ...methods,
      ...requests,
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
