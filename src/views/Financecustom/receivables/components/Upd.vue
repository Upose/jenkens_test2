<!--
 * @Descripttion: 
 * @version: 
 * @Author: HYH
 * @Date: 2021-08-30 15:36:38
 * @LastEditors: XJ
 * @LastEditTime: 2022-04-02 14:42:23
-->
<!--  -->
<template>
  <el-drawer :title="$t(`common.upd`)" :size="1000" v-model="showUpd">
    <div class="box-card formStyle dividerStyle">
      <div class="box-form">
        <!-- 基本信息 -->
        <el-divider content-position="left">{{ $t('common.base_info') }}</el-divider>
        <el-form
          :model="addForm"
          label-width="200px"
          :rules="addRule"
          ref="addRef"
          label-position="left"
        >
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('common.collection_order_number')" prop="id">
                <el-input v-model="addForm.id" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('common.collect_at')" prop="pay_at">
                <el-date-picker v-model="addForm.pay_at" type="date"> </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('common.settlement_currency')" prop="currency_unit">
                <el-select
                  disabled
                  filterable
                  clearable
                  v-model="addForm.currency_unit"
                  @change="getStockStatisticsId"
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
              <el-form-item :label="$t('common.buy_user')" prop="buy_user">
                <el-select
                  disabled
                  filterable
                  clearable
                  v-model="addForm.buy_user"
                  @change="getStockStatisticsId"
                >
                  <el-option
                    v-for="item in commonLists.customerList"
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
              <el-form-item :label="$t('common.collection_type_name')" prop="collection_type">
                <el-select filterable clearable v-model="addForm.collection_type">
                  <el-option
                    v-for="item in commonLists.collectionTypeList"
                    :key="item.collection_type_id"
                    :label="item.name"
                    :value="item.collection_type_id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <!-- <el-col :span="12">
							<el-form-item :label="$t('common.collecter')" prop="payer">
								<el-select
									filterable
									clearable
									v-model="addForm.payer"
									disabled
								>
									<el-option
										v-for="(item, index) in commonLists.accountList"
										:key="index"
										:label="item.payer_name"
										:value="item.payer"
									>
									</el-option>
								</el-select>
							</el-form-item>
						</el-col> -->
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('common.paid_amount_all')" prop="paid_amount">
                <el-input v-model="addForm.paid_amount" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="24">
              <el-form-item :label="$t('common.historical_explain')" prop="historical_explain">
                <el-input type="textarea" v-model="addForm.historical_explain"></el-input>
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
        <!-- 上传付款证明 -->
        <el-divider content-position="left">{{ $t('common.upload_payee_certificate') }}</el-divider>
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

        <!-- 动态信息 -->
        <el-divider content-position="left">{{ $t('common.dynamic_info') }}</el-divider>
        <el-form
          :model="addVarForm"
          label-width="200px"
          :rules="addVarRule"
          ref="addVarRef"
          label-position="left"
        >
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('common.inventory_order_id')" prop="inventory_order_id">
                <el-select
                  filterable
                  clearable
                  v-model="addVarForm.inventory_order_id"
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
              <el-form-item :label="$t('common.receivable_amount')" prop="paid_amount">
                <el-input v-model="addVarForm.paid_amount" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('common.last_wait_collect_money')" prop="wait_money">
                <el-input v-model="addVarForm.wait_money" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('common.this_payee')" prop="real_payment_money">
                <el-input
                  v-micrometer
                  v-model="addVarForm.real_payment_money"
                  :disabled="!addVarForm.inventory_order_id"
                >
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div style="text-align:right">
          <el-button type="success" plain @click="addRow">{{ $t('common.add_data') }}</el-button>
        </div>
        <el-divider content-position="left">{{ $t('common.data_collect') }}</el-divider>
        <AddTable @updateTableData="updateTableData" ref="addTableRef"></AddTable>
      </div>
      <div class="box-button">
        <el-button @click="onSubmitUpd" type="success" plain>{{ $t('common.submit') }}</el-button>
      </div>
    </div>
  </el-drawer>
</template>

<script lang="ts">
import { receivablesApi } from '@/http/api/financecustom/receivables'
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
import { changeNumber } from '@/utils/moneyToMicrometer'
import { defineComponent, ref, reactive, toRefs, computed, onMounted } from 'vue'
import { checkTwoDeci2 } from '@/utils/regp'
interface IState {
  configUrl: any
  addForm: {
    id: any
    pay_at: any
    buy_user: any
    currency_unit: any
    explain: any
    historical_explain: any
    account_number: any
    paid_amount: any
    collection_type: any
  }
  fileData: any[]
  addVarForm: {
    inventory_order_id: any
    real_payment_money: any
    paid_amount: any
    wait_money: any
  }
  collectData: any[]
  commonLists: any
  showUpd: boolean
  stockStatisticsList: any[]
  stockStatisticsListCurItem: any
}
export default defineComponent({
  props: {
    commonLists: {
      type: Object,
      default: {}
    },
    showUpd: {
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
      configUrl: process.env.VUE_APP_QIHONG_URL,
      addForm: {
        id: '',
        pay_at: '',
        currency_unit: '',
        explain: '',
        historical_explain: '',
        account_number: '',
        buy_user: '',
        paid_amount: '',
        collection_type: ''
      },
      fileData: [],
      addVarForm: {
        inventory_order_id: '',
        wait_money: '',
        paid_amount: '',
        real_payment_money: 0
      },
      collectData: [], //数据汇总
      commonLists: props.commonLists,
      showUpd: props.showUpd,
      stockStatisticsList: [],
      stockStatisticsListCurItem: null
    })

    const addRef = ref()
    const addVarRef = ref()
    const addTableRef = ref()
    const uploadRef = ref()
    const addRule = computed(() => {
      const rule = {
        collection_type: [
          {
            required: true,
            message: t('common.not_empty')
          }
        ],
        id: [
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
        buy_user: [
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
        ],

        historical_explain: [
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
        paid_amount: [
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
        inventory_order_id: [
          {
            required: true,
            message: t('common.not_empty')
          }
        ],
        wait_money: [
          {
            required: true,
            message: t('common.not_empty')
          }
        ]
      }
      return rule
    })

    const requests = {
      // 移除单条数据
      getRemove(deleted_row: any) {
        const data = dataStructure(
          {},
          {
            id: deleted_row.id,
            inventory_order_payment_record_id: state.addForm.id,
            inventory_order_id: deleted_row.inventory_order_id
          }
        )
        receivablesApi.get_remove(data).then(res => {
          let { status, custom_data, info } = res as IRequest
          if (status === 200) {
            requests.getStockNumberSearch()
            ElMessage({
              type: 'success',
              message: info
            })
          }
        })
      },
      // 财务中心付款管理详情接口：V1/PaymentManagement/details_list
      getDetailsList(id: any) {
        const data = dataStructure({}, { id })
        receivablesApi
          .get_details_list(data)
          .then(res => {
            let { status, custom_data, info } = res as IRequest
            if (status === 200) {
              const addtableref = addTableRef
              addtableref.value.tableData = []
              let data = dateNormArray(custom_data.data)

              data.forEach((item: any, index: any) => {
                let file = item?.picture.map((item: any) => item?.url)
                let row = {
                  inventory_order_id: item.inventory_order_id,
                  paid_amount: changeNumber(item.paid_amount),
                  number: item.number,
                  real_payment_money: changeNumber(item.real_payment_money),
                  file
                }
                // 上传到后端的data添加数据
                state.collectData.push(row)
                let newRow = {
                  id: item.id,
                  inventory_order_id: item.inventory_order_id,
                  created_at: item.created_at,
                  account_number_name: item.account_number,
                  number: item.number,
                  paid_amount: changeNumber(item.paid_amount),
                  real_payment_money: changeNumber(item.real_payment_money),
                  wait_money: item?.wait_money,
                  file
                }
                const addtableref = addTableRef
                addtableref.value.pushTableData(newRow)
              })
            }
          })
          .catch(err => err)
      },
      // 财务中心收款管理进货单据搜索接口：V1/ReceivablesManagement/stock_number
      getStockNumberSearch() {
        const data = dataStructure(
          { power_url: 'V1/ReceivablesManagement/stock_number' },
          {
            search_value: null,
            order_by: 1,
            buy_user: state.addForm.buy_user,
            currency_unit: state.addForm.currency_unit,
            id: state.addForm.id
          }
        )
        receivablesApi
          .get_stock_number_search(data)
          .then(res => {
            let { status, custom_data, info } = res as IRequest
            if (status === 200) {
              state.stockStatisticsList = dateNormArray(custom_data.data)
            }
          })
          .catch(err => err)
      },
      getUpd() {
        state.addForm.pay_at = dateNormOne(state.addForm.pay_at)
        let fileData = state.fileData.map(item => item?.path)
        const data = dataStructure(
          { power_url: 'V1/ReceivablesManagement/upd' },
          {
            ...state.addForm,
            file: fileData,
            data: state.collectData
          }
        )
        receivablesApi
          .get_upd(data)
          .then(res => {
            let { status, custom_data, info, field_name } = res as IRequest
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
      // 上传头像获取url接口
      getUploading(formData: any, file: any) {
        receivablesApi
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
        receivablesApi
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
      },
      getView(id: any) {
        const data = dataStructure({ power_url: 'V1/ReceivablesManagement/view' }, { id })
        receivablesApi
          .get_view(data)
          .then(res => {
            let { status, custom_data, info } = res as IRequest
            if (status === 200) {
              // 找到当前结算账号那条信息
              let targetItem = state.commonLists.accountList.find(
                (item: any) => item.name === custom_data?.account_number
              )
              state.addForm.id = custom_data?.id
              state.addForm.pay_at = custom_data?.pay_at
              state.addForm.currency_unit = custom_data?.currency_unit
              state.addForm.explain = custom_data?.explain
              state.addForm.historical_explain = custom_data?.historical_explain
              state.addForm.buy_user = custom_data?.buy_user
              state.addForm.account_number = targetItem?.id
              state.addForm.collection_type = custom_data?.collection_type
              state.addForm.paid_amount = changeNumber(custom_data?.paid_amount)
              requests.getStockNumberSearch()
            }
          })
          .catch(err => err)
      }
    }
    const methods = {
      calculateFinallyMoney() {
        let paid_amount_all: any = 0
        state.collectData.forEach(item => {
          paid_amount_all = operationAdd(item?.real_payment_money, paid_amount_all, true)
        })
        state.addForm.paid_amount = paid_amount_all
      },
      // 添加一行数据
      addRow() {
        const addvarref = addVarRef
        addvarref.value.validate((valid: any) => {
          if (valid) {
            let file = state.fileData.map(item => item?.path)
            let row = {
              inventory_order_id: state.addVarForm.inventory_order_id,
              paid_amount: state.addVarForm.paid_amount,
              number: state.stockStatisticsListCurItem.number,
              real_payment_money: state.addVarForm.real_payment_money,
              file
            }
            // 先判断和之前的是否重复
            let isRepeat = state.collectData.some(
              (item: any) => item.inventory_order_id === row.inventory_order_id
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
              inventory_order_id: state.addVarForm.inventory_order_id,
              created_at: state.stockStatisticsListCurItem.created_at,
              account_number_name: state.commonLists.accountList.find(
                (item: any) => item.id === state.addForm.account_number
              )?.name,
              number: state.stockStatisticsListCurItem.number,
              wait_money: state.addVarForm.wait_money,
              paid_amount: state.addVarForm.paid_amount,
              real_payment_money: state.addVarForm.real_payment_money,
              file
            }
            // 清空fileData
            state.fileData = []
            // 删除显示图片
            const uploadref = uploadRef
            uploadref.value.clearFiles()
            const addtableref = addTableRef
            addtableref.value.pushTableData(newRow)
          }
        })
        // 财务中心收款管理查询数据接口：V1/ReceivablesManagement/view
      },
      // 将待付金额全部给予此次付款
      getRealPaymentMoneyAll() {
        state.addVarForm.real_payment_money = state.addVarForm.wait_money
      },

      // 切换单据编号
      stockStatisticsIdChange(id: any) {
        let targetItem = state.stockStatisticsList.find(item => item.id === id)
        state.stockStatisticsListCurItem = targetItem
        state.addVarForm.paid_amount = targetItem?.paid_amount
        state.addVarForm.wait_money = targetItem?.wait_money
      },
      // 选择供应商或者结算币种后获取单据编号所有数据
      getStockStatisticsId() {
        requests.getStockNumberSearch()
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
        if (deleted_row?.id) {
          requests.getRemove(deleted_row)
        }
        // 删除对应上传到后端的数据
        state.collectData.splice(index, 1)
        // 删除后台图片
        deleted_row?.file.forEach((item: any) => {
          requests.getUploadingDel(item)
        })
        methods.calculateFinallyMoney()
      },
      onSubmitUpd() {
        // 校验基本信息
        const addref = addRef
        let addvalid: any
        addref.value.validate((valid: boolean) => {
          addvalid = valid
        })
        if (!addvalid) return
        // 是否上传图片
        // if (!state.fileData.length) {
        // 	ElMessage({
        // 		type: 'error',
        // 		message: '请上传付款证明',
        // 	})
        // 	return
        // }
        // 是否添加了数据

        if (!state.collectData.length) {
          ElMessage({
            type: 'error',
            message: '请添加数据'
          })
          return
        }
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
    }
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
