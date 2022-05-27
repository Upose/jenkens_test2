<!--
 * @Description: 
 * @version: 
 * @Author: HYH
 * @Date: 2021-08-30 15:36:38
 * @LastEditors: HYH
 * @LastEditTime: 2022-05-27 10:42:53
-->
<!--  -->
<template>
  <el-drawer :title="$t(`common.add`)" :size="1000" v-model="showAdd">
    <div class="box-card formStyle dividerStyle">
      <div class="box-form">
        <!-- 基本信息 -->
        <el-divider content-position="left">{{ $t('common.base_info') }}</el-divider>
        <el-form
          :model="addForm"
          label-width="200px"
          :rules="addRule"
          ref="addRef"
          label-position="right"
        >
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('common.config_number')" prop="config_number">
                <el-input v-model="addForm.config_number" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('common.pay_at')" prop="pay_at">
                <el-date-picker v-model="addForm.pay_at" type="date"> </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('common.settlement_currency')" prop="currency_unit">
                <el-select
                  filterable
                  clearable
                  v-model="addForm.currency_unit"
                  @change="getStockStatisticsId"
                  @focus="selectFoucs"
                >
                  <el-option
                    v-for="item in commonLists.currencyUnitList"
                    :key="item.id"
                    :label="item.id_name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('common.inventory_supplier_name')" prop="supplier">
                <el-select
                  filterable
                  clearable
                  v-model="addForm.supplier"
                  @change="getStockStatisticsId"
                  @focus="selectFoucs"
                >
                  <el-option
                    v-for="item in commonLists.supplierList"
                    :key="item.id"
                    :label="item.id_name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('common.account_number')" prop="account_number">
                <el-select filterable clearable v-model="addForm.account_number">
                  <el-option
                    v-for="(item, index) in commonLists.accountList"
                    :key="index"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('common.payer_money_all')" prop="payment_money">
                <el-input v-model="addForm.payment_money" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item :label="$t('common.explain')" prop="explain">
                <el-input type="textarea" v-model="addForm.explain"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>

        <!-- 动态信息 -->
        <el-divider content-position="left">{{ $t('common.dynamic_info') }}</el-divider>
        <el-form
          :model="addVarForm"
          label-width="200px"
          :rules="addVarRule"
          ref="addVarRef"
          label-position="right"
        >
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('common.stock_statistics_id')" prop="stock_statistics_id">
                <el-select
                  filterable
                  clearable
                  v-model="addVarForm.stock_statistics_id"
                  @change="stockStatisticsIdChange"
                >
                  <el-option
                    v-for="(item, index) in stockStatisticsList"
                    :key="index"
                    :label="item.id"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('common.payment_money')" prop="payment_money">
                <el-input v-model="addVarForm.payment_money" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('common.last_wait_money')" prop="wait_money">
                <el-input v-model="addVarForm.wait_money" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('common.this_payer')" prop="real_payment_money">
                <!-- <el-input-number
                  v-model="addVarForm.real_payment_money"
                  :disabled="!addVarForm.stock_statistics_id"
                  :precision="2"
                  :controls="false"
                  :max="Number(addVarForm.wait_money)"
                >
                </el-input-number> -->
                <el-input
                  v-micrometer
                  v-model="addVarForm.real_payment_money"
                  :disabled="!addVarForm.stock_statistics_id"
                >
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <!-- 上传付款证明 -->
        <el-divider content-position="left">{{ $t('common.upload_payer_certificate') }}</el-divider>
        <el-upload
          ref="uploadRef"
          :before-upload="beforeUpload"
          action="#"
          :http-request="httpRequest"
          list-type="picture-card"
          multiple
          :limit="5"
          :on-exceed="onExceed"
          :on-remove="onRemove"
        >
          <template #default>
            <i class="el-icon-plus"></i>
          </template>
        </el-upload>
        <div style="text-align:right">
          <el-button type="success" plain @click="addRow">{{ $t('common.add_data') }}</el-button>
        </div>
        <el-divider content-position="left">{{ $t('common.data_collect') }}</el-divider>
        <AddTable @updateTableData="updateTableData" ref="addTableRef"></AddTable>
      </div>
      <div class="box-button">
        <el-button @click="onSubmitAdd" type="success" plain>{{ $t('common.submit') }}</el-button>
      </div>
    </div>
  </el-drawer>
</template>

<script lang="ts">
import { paymentApi } from '@/http/api/financecustom/payment/index'
import { IRequest } from '@/@types/httpInterface'
import dataStructure from '@/utils/dataStructure'
import { useI18n } from 'vue-i18n'
import { dateNormOne, datetimeNormOne, dateNormArray } from '@/utils/dateNorm'
import { ElMessageBox, ElMessage } from 'element-plus'
import { IValid } from '../typings'
import AddTable from './AddTable.vue'
import { useStore } from '@/store'
import { GetterConstants } from '@/store/modules/users/constants'
import { operationAdd } from '@/utils/operation'
import { checkTwoDeci2 } from '@/utils/regp'
import { changeNumber } from '@/utils/moneyToMicrometer'
import { defineComponent, ref, reactive, toRefs, computed, onMounted, onActivated } from 'vue'
interface IState {
  addForm: {
    config_number: any
    pay_at: any
    supplier: any
    currency_unit: any
    explain: any
    payment_money: any
    account_number: any
  }
  fileData: any[]
  addVarForm: {
    stock_statistics_id: any
    // account_number: any
    wait_money: any
    real_payment_money: any
    payment_money: any
  }
  collectData: any[]
  commonLists: any
  showAdd: boolean
  stockStatisticsList: any[]
  stockStatisticsListCurItem: any
}
export default defineComponent({
  props: {
    commonLists: {
      type: Object,
      default: {}
    },
    showAdd: {
      type: Boolean,
      default: false
    }
  },
  emits: ['reset'],
  components: {
    AddTable
  },
  setup(props, ctx) {
    const store = useStore()
    const { t } = useI18n()
    const state: IState = reactive({
      addForm: {
        config_number: '',
        pay_at: '',
        supplier: '',
        currency_unit: '',
        explain: '',
        payment_money: '',
        account_number: ''
      },
      fileData: [],
      addVarForm: {
        stock_statistics_id: '',
        // account_number: '',
        wait_money: '',
        real_payment_money: 0,
        payment_money: ''
      },
      collectData: [], //数据汇总
      commonLists: props.commonLists,
      showAdd: props.showAdd,
      stockStatisticsList: [],
      stockStatisticsListCurItem: null
    })

    const addRef = ref()
    const addVarRef = ref()
    const addTableRef = ref()
    const uploadRef = ref()
    const addRule = computed(() => {
      const rule = {
        config_number: [
          {
            required: true,
            message: t('common.not_empty')
          }
        ],

        pay_at: [
          {
            required: true,
            message: t('common.not_empty')
          }
        ],
        supplier: [
          {
            required: true,
            message: t('common.not_empty')
          }
        ],
        currency_unit: [
          {
            required: true,
            message: t('common.not_empty')
          }
        ],
        account_number: [
          {
            required: true,
            message: t('common.not_empty')
          }
        ]
      }
      return rule
    })
    const addVarRule = computed(() => {
      const rule = {
        wait_money: [
          {
            required: true,
            message: t('common.not_empty')
          }
        ],

        payment_money: [
          {
            required: true,
            message: t('common.not_empty')
          }
        ],
        real_payment_money: [
          {
            required: true,
            validator: (rule: any, value: any, callback: any) => {
              let arg2 = state.addVarForm.wait_money
              checkTwoDeci2(rule, value, callback, arg2)
            }
          }
        ],
        stock_statistics_id: [
          {
            required: true,
            message: t('common.not_empty')
          }
        ]
      }
      return rule
    })

    const requests = {
      // // 财务中心进货单财务付款ID生成接口：V1/PaymentManagement/config_number
      getConfigNumber() {
        const data = dataStructure({ power_url: 'V1/PaymentManagement/config_number' }, {})
        paymentApi
          .get_config_number(data)
          .then(res => {
            let { status, custom_data, info } = res as IRequest
            state.addForm.config_number = custom_data.data
          })
          .catch(err => err)
      },
      // 财务中心付款管理进货单据搜索接口：V1/PaymentManagement/stock_number
      getStockNumberSearch() {
        const data = dataStructure(
          { power_url: 'V1/PaymentManagement/stock_number' },
          {
            search_value: null,
            order_by: 1,
            supplier: state.addForm.supplier,
            currency_unit: state.addForm.currency_unit
          }
        )
        paymentApi
          .get_stock_number_search(data)
          .then(res => {
            let { status, custom_data, info } = res as IRequest
            if (status === 200) {
              state.stockStatisticsList = dateNormArray(custom_data.data)
            }
          })
          .catch(err => err)
      },
      getAdd() {
        state.addForm.pay_at = dateNormOne(state.addForm.pay_at)

        const data = dataStructure(
          { power_url: 'V1/PaymentManagement/add' },
          {
            ...state.addForm,
            data: state.collectData
          }
        )
        paymentApi
          .get_add(data)
          .then(res => {
            let { status, custom_data, info, field_name } = res as IRequest
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
      // 上传头像获取url接口
      getUploading(formData: any, file: any) {
        paymentApi
          .get_uploading(formData)
          .then((res: any) => {
            let { status, custom_data, info } = res as IRequest
            if (status == 200) {
              let fileObj = {
                name: file.name,
                uid: file.uid,
                path: custom_data.path
              }
              state.fileData.push(fileObj)
            }
          })
          .catch(err => err)
      },
      getUploadingDel(url: any, index?: any) {
        const data = dataStructure({}, { url })
        paymentApi
          .get_uploading_del(data)
          .then(res => {
            let { status, custom_data, info } = res as IRequest
            if (status === 200) {
              // 本地数据删除对应图片
              state.fileData.splice(index, 1)
              ElMessage({
                type: 'success',
                message: info
              })
            }
          })
          .catch(err => err)
      }
    }
    const methods = {
      selectFoucs() {
        if (!state.collectData.length) return
        ElMessage({
          message: '切换当前选择将清空汇总数据',
          type: 'warning'
        })
      },
      calculateFinallyMoney() {
        let payment_money_all: any = 0
        state.collectData.forEach(item => {
          payment_money_all = operationAdd(item?.real_payment_money, payment_money_all, true)
        })
        state.addForm.payment_money = payment_money_all
      },
      // 添加一行数据
      addRow() {
        const addvarref = addVarRef
        addvarref.value.validate((valid: any) => {
          if (valid) {
            let file = state.fileData.map(item => item?.path)
            let row = {
              stock_statistics_id: state.addVarForm.stock_statistics_id,
              number: state.stockStatisticsListCurItem.number,
              real_payment_money: state.addVarForm.real_payment_money,
              wait_money: state.addVarForm.wait_money,
              payment_money: state.addVarForm.payment_money,
              file
            }
            // 先判断和之前的是否重复
            let isRepeat = state.collectData.some(
              (item: any) => item.stock_statistics_id === row.stock_statistics_id
            )

            if (isRepeat) {
              ElMessage({
                type: 'error',
                message: '重复添加'
              })
              return
            }
            // 上传到后端的data添加数据
            state.collectData.push(row)

            // 重新计算最终总金额
            methods.calculateFinallyMoney()
            // 获取子组件，传递数据，调用方法
            let newRow = {
              stock_statistics_id: state.addVarForm.stock_statistics_id,
              created_at: state.stockStatisticsListCurItem.created_at,
              account_number_name: state.commonLists.accountList.find(
                (item: any) => item.id === state.addForm.account_number
              )?.name,
              number: state.stockStatisticsListCurItem.number,
              payment_money: state.addVarForm.payment_money,
              wait_money: state.addVarForm.wait_money,
              real_payment_money: state.addVarForm.real_payment_money,
              file
            }

            // 清空fileData
            state.fileData = []
            // 删除显示图片
            const uploadref = uploadRef
            uploadref.value.clearFiles()
            // 子组件表格添加新行
            const addtableref = addTableRef
            addtableref.value.pushTableData(newRow)
          }
        })
      },
      // 将待付金额全部给予此次付款
      // getRealPaymentMoneyAll() {
      // 	state.addVarForm.real_payment_money = state.addVarForm.wait_money
      // },

      // 切换单据编号
      stockStatisticsIdChange(id: any) {
        let targetItem = state.stockStatisticsList.find(item => item.id === id)
        state.stockStatisticsListCurItem = targetItem
        state.addVarForm.wait_money = targetItem?.wait_money
        state.addVarForm.payment_money = targetItem?.payment_money
      },
      // 选择供应商或者结算币种后获取单据编号所有数据
      getStockStatisticsId() {
        requests.getStockNumberSearch()
        // 清空当前汇总数据
        state.collectData = []
        // 子组件表格清空
        const addtableref = addTableRef
        addtableref.value.tableData = []
        //  重置动态信息表单
        const addvarref = addVarRef
        addvarref.value.resetFields()
      },
      onRemove(file: any) {
        state.fileData.forEach((item: any, index: any) => {
          if (file.uid === item.uid) {
            requests.getUploadingDel(item.path, index)
          }
        })
      },
      onExceed(files: any, fileList: any) {
        ElMessage.warning(
          `当前限制选择 5个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length +
            fileList.length} 个文件`
        )
      },
      //#   图片上传限制
      beforeUpload(file: any) {
        const isLt2M = file.size / 1024 / 1024 < 5
        if (!isLt2M) {
          ElMessage.error('上传头像图片大小不能超过 5MB!')
        }
        return isLt2M
      },
      //#   上传图片
      httpRequest(file: any) {
        let user_id = store.getters[GetterConstants.GET_USERID]
        let language_id = store.getters[GetterConstants.GET_LANGUAGE]
        const formData: any = new FormData()
        formData.append('picture', file.file)
        formData.append('user_id', user_id)
        formData.append('language_id', language_id)
        formData.append('access_sys_code', 'web')
        requests.getUploading(formData, file.file)
      },
      reset(arg: any) {
        // 重置表单
        const addref = addRef
        addref.value.resetFields()
        //  重置动态信息表单
        const addvarref = addVarRef
        addvarref.value.resetFields()
        // 将文件数据清空
        state.fileData = []
        state.collectData = []
        // 子组件表格清空
        const addtableref = addTableRef
        addtableref.value.tableData = []
        ctx.emit('reset', arg)
      },
      updateTableData(index: any, deleted_row: any) {
        // 删除对应上传到后端的数据
        state.collectData.splice(index, 1)
        // 删除后台图片
        deleted_row?.file.forEach((item: any) => {
          requests.getUploadingDel(item)
        })
        methods.calculateFinallyMoney()
      },

      onSubmitAdd() {
        // 校验基本信息
        const addref = addRef
        let addvalid: any
        addref.value.validate((valid: boolean) => {
          addvalid = valid
        })
        if (!addvalid) return
        if (!state.collectData.length) {
          ElMessage({
            type: 'error',
            message: '请添加数据'
          })
          return
        }
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
    }
    onActivated(() => {})

    onMounted(() => {})
    return {
      ...toRefs(state),
      ...methods,
      ...requests,
      addRule,
      addTableRef,
      addRef,
      addVarRef,
      uploadRef,
      addVarRule
    }
  }
})
</script>
<style lang="scss" scoped>
@import '@/assets/css/page-common-draw.scss'; //页面基础布局样式一
@import '@/assets/css/element-common-style.scss';
</style>
