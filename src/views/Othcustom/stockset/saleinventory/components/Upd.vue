<!--
 * @Descripttion: 
 * @version: 
 * @Author: HYH
 * @Date: 2021-08-30 13:49:48
 * @LastEditors: TJ
 * @LastEditTime: 2022-03-03 13:25:48
-->
<!--  -->
<template>
  <el-drawer :title="$t(`common.upd`)" :size="800" v-model="showUpd">
    <div class="box-card">
      <div class="box-form">
        <el-divider content-position="left">{{ $t('common.base_info') }}</el-divider>
        <el-form
          class="formStyle2"
          :model="updForm"
          label-width="140px"
          label-position="left"
          :rules="updRule"
          ref="updRef"
          :validate-on-rule-change="false"
        >
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('common.sale_type_name')" prop="sale_type">
                <el-select filterable clearable v-model="updForm.sale_type" disabled>
                  <el-option
                    v-for="item in commonLists.saleTypeList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('common.sale_order_number')" prop="sale_order_number">
                <el-input v-model="updForm.sale_order_number" disabled> </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <!-- <el-col :span="12">
							<el-form-item
								:label="$t('common.sale_money_all')"
								prop="sale_money"
							>
								<el-input  v-model="updForm.sale_money" disabled></el-input>
							</el-form-item>
						</el-col> -->
            <el-col :span="12">
              <el-form-item :label="$t('common.currency_unit_name')" prop="currency_unit">
                <el-select filterable clearable v-model="updForm.currency_unit">
                  <el-option
                    v-for="item in commonLists.currencyUnitList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                    <span style="float: left">{{ item.name }}</span>
                    <span style="float: right;color: #999999;">{{ item.id }}</span>
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('common.buy_type_name')" prop="buy_type">
                <el-select filterable clearable v-model="updForm.buy_type">
                  <el-option
                    v-for="item in commonLists.buyTypeList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- <el-row>
						<el-col :span="12">
							<el-form-item
								:label="$t('common.unpaid_amount')"
								prop="unpaid_amount"
							>
								<el-input
									 v-model="updForm.unpaid_amount"
									disabled
								></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item
								:label="$t('common.paid_amount')"
								prop="paid_amount"
							>
								<el-input
									 v-model="updForm.paid_amount"
									disabled
								></el-input>
							</el-form-item>
						</el-col>
					</el-row> -->
          <el-row>
            <!-- <el-col :span="12">
							<el-form-item
								:label="$t('common.single_paid_amount')"
								prop="single_paid_amount"
							>
								<el-input
									 v-model="updForm.single_paid_amount"
									:disabled="!updForm.sale_type"
								></el-input>
							</el-form-item>
						</el-col> -->

            <el-col :span="12">
              <el-form-item :label="$t('common.company')" prop="company">
                <el-input v-model="updForm.company"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('common.buy_user')" prop="buy_user">
                <el-select
                  filterable
                  clearable
                  v-model="updForm.buy_user"
                  @change="buyUserChange('upd')"
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
              <el-form-item :label="$t('common.buy_photo')" prop="buy_photo">
                <el-input v-model="updForm.buy_photo"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('common.buy_mail')" prop="buy_mail">
                <el-input v-model="updForm.buy_mail"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('common.sale_at')" prop="sale_at">
                <el-date-picker v-model="updForm.sale_at" type="datetime"> </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('common.predict_delivery_at')" prop="predict_delivery_at">
                <el-date-picker v-model="updForm.predict_delivery_at" type="date"> </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- <el-row>
						<el-col :span="12">
							<el-form-item
								:label="$t('common.collection_type_name')"
								prop="collection_type"
							>
								<el-select
									filterable
									clearable
									 v-model="updForm.collection_type"
								>
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
						<el-col :span="12">
							<el-form-item
								:label="$t('common.collection_order_number')"
								prop="collection_order_number"
							>
								<el-input
									 v-model="updForm.collection_order_number"
								></el-input>
							</el-form-item>
						</el-col>
					</el-row> -->
          <!-- <el-row>
						<el-col :span="12">
							<el-form-item :label="$t('common.payee')" prop="payee">
								<el-select filterable clearable  v-model="updForm.payee">
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
						<el-col :span="12">
							<el-form-item
								:label="$t('common.collection_status_name')"
								prop="payment_status"
							>
								<el-select
									filterable
									clearable
									 v-model="updForm.payment_status"
									:disabled="updForm.init_payment_status || !updForm.sale_type"
								>
									<el-option
										v-for="item in commonLists.paymentStatusList"
										:key="item.id"
										:label="item.name"
										:value="item.id"
									>
									</el-option>
								</el-select>
							</el-form-item>
						</el-col>
					</el-row> -->
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('common.sell_user')" prop="sell_user">
                <el-select filterable clearable v-model="updForm.sell_user">
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
            <el-col :span="12">
              <el-form-item :label="$t('common.sale_com_code_name')" prop="com_code">
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
            <!-- <el-col :span="12">
							<el-form-item
								:label="$t('common.account')"
								prop="account_number"
							>
								<el-select
									 v-model="updForm.account_number"
									filterable
									clearable
								>
									<el-option
										v-for="(item, index) of commonLists.accountList"
										:key="index"
										:label="item.name"
										:value="item.id"
									>
										<span style="float: left">{{ item.name }}</span>
										<span style="float: right;color: #999999;">{{
											item.account
										}}</span>
									</el-option>
								</el-select>
							</el-form-item>
						</el-col> -->
          </el-row>
          <!-- <el-row>
						<el-col :span="24"
							><el-form-item :label="$t('common.pay_explain')">
								<el-input
									type="textarea"
									 v-model="updForm.pay_explain"
								></el-input>
							</el-form-item>
						</el-col>
					</el-row> -->

          <el-row>
            <el-col :span="24"
              ><el-form-item :label="$t('common.explain')">
                <el-input type="textarea" v-model="updForm.explain"></el-input>
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
</template>

<script lang="ts">
import { saleinventoryApi } from '@/http/api/othcustom/stockset/saleinventory'
import { IRequest } from '@/@types/httpInterface'
import dataStructure from '@/utils/dataStructure'
import { useI18n } from 'vue-i18n'
import { dateNormOne, dateNormArray, datetimeNormOne } from '@/utils/dateNorm'
import { ElMessageBox, ElMessage } from 'element-plus'
import { operationMul, operationSub } from '@/utils/operation'
import { checkTwoDeci, checkTwoDeci3 } from '@/utils/regp'
import { IValid } from '../typings'
import { defineComponent, ref, reactive, toRefs, computed, onMounted } from 'vue'
import PayTable from './PayTable.vue'
import { GetterConstants } from '@/store/modules/users/constants'
import { useStore } from '@/store'
interface IState {
  updForm: {
    init_payment_status: any
    sale_type: any
    sale_order_number: any
    currency_unit: any
    buy_type: any
    company: any
    buy_user: any
    buy_photo: any
    buy_mail: any
    predict_delivery_at: any
    sell_user: any
    com_code: any
    explain: any
    sale_at: any
  }
  commonLists: any
}
export default defineComponent({
  components: {
    PayTable
  },
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
  setup(props, ctx) {
    const store = useStore()
    const { t } = useI18n()
    const state: IState = reactive({
      updForm: {
        sale_at: '',
        init_payment_status: null,
        sale_type: null,
        sale_order_number: '',
        // sale_money: null,
        // single_paid_amount: 0, //默认为0
        // paid_amount: '',
        currency_unit: null,
        buy_type: null,
        company: '',
        buy_user: '',
        buy_photo: '',
        buy_mail: '',
        predict_delivery_at: '',
        sell_user: '',
        // payment_status: null,
        // collection_type: '',
        // collection_order_number: '',
        // payee: '',
        com_code: '',
        explain: '',
        // unpaid_amount: '',
        // pay_explain: '',
        account_number: null
        // data: [],
      },
      commonLists: props.commonLists,
      showUpd: props.showUpd
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
    const updRef = ref()
    const uploadRef = ref()
    const updRule = computed(() => {
      const rule = {
        sale_at: [
          {
            required: true,
            message: t('common.not_empty')
          },
          {
            validator: valid.checkOthers.validatorFun
          }
        ],
        sale_type: [
          {
            required: true,
            message: t('common.not_empty')
          },
          {
            validator: valid.checkOthers.validatorFun
          }
        ],
        sale_order_number: [
          {
            required: true,
            message: t('common.not_empty')
          },
          {
            validator: valid.checkOthers.validatorFun
          }
        ],
        currency_unit: [
          {
            required: true,
            message: t('common.not_empty')
          },
          {
            validator: valid.checkOthers.validatorFun
          }
        ],
        buy_type: [
          {
            required: true,
            message: t('common.not_empty')
          },
          { validator: valid.checkOthers.validatorFun }
        ],
        company: [
          {
            required: state.updForm.buy_type == 1 ? true : false,
            message: t('common.not_empty')
          },
          { validator: valid.checkOthers.validatorFun }
        ],
        buy_user: [
          {
            required: true,
            message: t('common.not_empty')
          },
          { validator: valid.checkOthers.validatorFun }
        ],

        predict_delivery_at: [
          {
            required: true,
            message: t('common.not_empty')
          },
          {
            validator: valid.checkOthers.validatorFun
          }
        ],
        sell_user: [
          {
            required: true,
            message: t('common.not_empty')
          },
          { validator: valid.checkOthers.validatorFun }
        ],
        com_code: [
          {
            required: true,
            message: t('common.not_empty')
          },
          { validator: valid.checkOthers.validatorFun }
        ]
      }
      return rule
    })
    const requests = {
      getUpd() {
        let predict_delivery_at = state.updForm.predict_delivery_at
        state.updForm.predict_delivery_at = predict_delivery_at
          ? dateNormOne(predict_delivery_at)
          : ''
        let sale_at = state.updForm.sale_at
        state.updForm.sale_at = sale_at ? datetimeNormOne(sale_at) : ''
        const data = dataStructure({ power_url: 'V1/InventoryOrder/upd' }, state.updForm)
        saleinventoryApi
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

      getView(id: string) {
        const data = dataStructure(
          { power_url: 'V1/InventoryOrder/view' },
          {
            id: id
          }
        )
        saleinventoryApi
          .get_view(data)
          .then(res => {
            let { status, custom_data, info } = res as IRequest
            if (status === 200) {
              // 付款状态需要一个初始值，初始值为已付款不可更改
              state.updForm.init_payment_status = custom_data.payment_status
              state.updForm.sale_type = custom_data.sale_type
              state.updForm.sale_order_number = custom_data.id
              state.updForm.currency_unit = custom_data.currency_unit
              state.updForm.buy_type = custom_data.buy_type
              state.updForm.company = custom_data.company
              state.updForm.buy_user = custom_data.buy_user
              state.updForm.buy_photo = custom_data.buy_photo
              state.updForm.buy_mail = custom_data.buy_mail
              state.updForm.predict_delivery_at = custom_data.predict_delivery_at
              state.updForm.sell_user = custom_data.sell_user
              state.updForm.explain = custom_data.explain
              state.updForm.com_code = custom_data.com_code
              state.updForm.sale_at = custom_data.sale_at
            }
          })
          .catch(err => err)
      }
    }
    const methods = {
      reset(arg: any) {
        //重置表单
        const updref = updRef
        updref.value.resetFields()

        ctx.emit('reset', arg)
      },
      buyUserChange(arg: any) {
        let findName = (el: any) => {
          let obj = state.commonLists.customerList.find((e: any) => e.id === el)
          let name = obj?.name
          let re = /\([^\)]+\)/g
          name = name.match(re)[0]
          name = name.substring(1, name.length - 1) //ddsdd
          return name
        }
        state.updForm.company = findName(state.updForm.buy_user)
      },
      onSubmitUpd() {
        const updref = updRef
        updref.value.validate((valid: boolean) => {
          if (valid) {
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
      }
    }
    onMounted(() => {
      //缓存后，不会执行
    })
    return {
      ...toRefs(state),
      ...requests,
      ...methods,
      updRef,
      updRule,
      uploadRef
    }
  }
})
</script>
<style lang="scss" scoped>
@import '@/assets/css/page-common-draw.scss'; //页面基础布局样式一
@import '@/assets/css/element-common-style.scss';
</style>
