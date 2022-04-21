<!--
 * @Descripttion: 
 * @version: 
 * @Author: HYH
 * @Date: 2021-08-30 14:50:09
 * @LastEditors: TJ
 * @LastEditTime: 2022-03-11 17:17:47
-->
<!--  -->
<template>
  <el-drawer :title="$t(`common.switch`)" :size="800" v-model="showSwitch">
    <div class="box-card ">
      <div class="box-form">
        <el-divider content-position="left">{{ $t('common.base_info') }}</el-divider>
        <el-form
          class="formStyle2"
          :model="switchForm"
          label-width="140px"
          :rules="switchRule"
          ref="switchRef"
          label-position="left"
          :validate-on-rule-change="false"
        >
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('common.sale_order_number')" prop="sale_order_number">
                <el-input v-model="switchForm.sale_order_number" disabled> </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('common.presell_order_number')" prop="presell_order_number">
                <el-input
                  @change="presellOrderNumberSearch"
                  v-model="switchForm.presell_order_number"
                >
                  <template #append>
                    <el-button icon="el-icon-search" @click="presellOrderNumberSearch"></el-button>
                  </template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('common.sale_money_all')" prop="sale_money">
                <el-input v-model="switchForm.sale_money" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('common.currency_unit_name')" prop="currency_unit">
                <el-select filterable clearable v-model="switchForm.currency_unit">
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
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('common.buy_type_name')" prop="buy_type">
                <el-select filterable clearable v-model="switchForm.buy_type">
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
            <el-col :span="12">
              <el-form-item :label="$t('common.company')" prop="company">
                <el-input v-model="switchForm.company"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('common.buy_user')" prop="buy_user">
                <el-select
                  filterable
                  clearable
                  v-model="switchForm.buy_user"
                  @change="buyUserChange('switch')"
                >
                  <el-option
                    v-for="item in commonLists.customerList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
                <!-- <el-input  v-model="switchForm.buy_user"></el-input> -->
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('common.buy_photo')" prop="buy_photo">
                <el-input v-model="switchForm.buy_photo"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- <el-row>
						<el-col :span="12">
							<el-form-item
								:label="$t('common.collection_status_name')"
								prop="payment_status"
							>
								<el-select
									filterable
									clearable
									 v-model="switchForm.payment_status"
									:disabled="switchForm.init_payment_status ? false : true"
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
						<el-col :span="12">
							<el-form-item
								:label="$t('common.collection_type_name')"
								prop="collection_type"
							>
								<el-select
									filterable
									clearable
									 v-model="switchForm.collection_type"
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
					</el-row>
					<el-row>
						<el-col :span="12">
							<el-form-item
								:label="$t('common.collection_order_number')"
								prop="collection_order_number"
							>
								<el-input
									 v-model="switchForm.collection_order_number"
								></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item :label="$t('common.payee')" prop="payee">
								<el-select filterable clearable  v-model="switchForm.payee">
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
					</el-row> -->
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('common.buy_mail')" prop="buy_mail">
                <el-input v-model="switchForm.buy_mail"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('common.predict_delivery_at')" prop="predict_delivery_at">
                <el-date-picker v-model="switchForm.predict_delivery_at" type="date">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('common.sell_user')" prop="sell_user">
                <el-select filterable clearable v-model="switchForm.sell_user">
                  <el-option
                    v-for="item in commonLists.staffList"
                    :key="item.id"
                    :label="item.full_name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
                <!-- <el-input  v-model="switchForm.sell_user"></el-input> -->
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('common.sale_com_code_name')" prop="com_code">
                <el-select filterable clearable v-model="switchForm.com_code">
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
            <el-col :span="12">
              <el-form-item :label="$t('common.sale_at')" prop="sale_at">
                <el-date-picker v-model="switchForm.sale_at" type="datetime"> </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="24">
              <el-form-item :label="$t('common.explain')">
                <el-input type="textarea" v-model="switchForm.explain"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <!-- 要提交的表格 -->
        <SaleSwitch
          ref="SaleSwitchRef"
          :switchForm="switchForm"
          @unitMoneyAndNumChange="unitMoneyAndNumChange"
        ></SaleSwitch>
      </div>
      <div class="box-button">
        <el-button @click="onSubmitSwitch" type="success" plain>{{
          $t('common.submit')
        }}</el-button>
      </div>
    </div>
  </el-drawer>
</template>

<script lang="ts">
import { saleinventoryApi } from '@/http/api/othcustom/stockset/saleinventory'
import { IRequest } from '@/@types/httpInterface'
import dataStructure from '@/utils/dataStructure'
import { useI18n } from 'vue-i18n'
import { dateNormOne, datetimeNormOne } from '@/utils/dateNorm'
import { ElMessageBox, ElMessage } from 'element-plus'
import { operationMul } from '@/utils/operation'
import { checkTwoDeci1 } from '@/utils/regp'
import { IValid } from '../typings'
import SaleSwitch from './SaleSwitch.vue'
import { defineComponent, ref, reactive, toRefs, computed } from 'vue'
interface IState {
  switchForm: {
    sale_at: any
    init_payment_status: any
    presell_order_number: any
    sale_order_number: any
    sale_money: any
    currency_unit: any
    buy_type: any
    company: any
    buy_user: any
    buy_photo: any
    buy_mail: any
    predict_delivery_at: any
    sell_user: any
    // payment_status: any
    // collection_type: any
    // collection_order_number: any
    // payee: any
    com_code: any
    explain: any
    switchFormData: any[]
  }
  commonLists: any
  showSwitch: boolean
}
export default defineComponent({
  props: {
    commonLists: {
      type: Object,
      default: {}
    },
    showSwitch: {
      type: Boolean,
      default: false
    }
  },
  emits: ['reset'],
  components: {
    SaleSwitch
  },
  setup(props, ctx) {
    const { t } = useI18n()
    const state: IState = reactive({
      switchForm: {
        sale_at: '',
        init_payment_status: '',
        presell_order_number: '',
        sale_order_number: '',
        sale_money: null,
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
        switchFormData: []
      },
      commonLists: props.commonLists,
      showSwitch: props.showSwitch
    })
    const switchRef = ref()
    const SaleSwitchRef = ref()
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
    const switchRule = computed(() => {
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
        presell_order_number: [
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
        sale_money: [
          {
            required: true,
            validator: checkTwoDeci1
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
          {
            validator: valid.checkOthers.validatorFun
          }
        ],
        company: [
          {
            required: state.switchForm.buy_type ? true : false,
            message: t('common.not_empty')
          },
          {
            validator: valid.checkOthers.validatorFun
          }
        ],
        buy_user: [
          {
            required: true,
            message: t('common.not_empty')
          },
          {
            validator: valid.checkOthers.validatorFun
          }
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
          {
            validator: valid.checkOthers.validatorFun
          }
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
      buyUserChange(arg: any) {
        let findName = (el: any) => {
          let obj = state.commonLists.customerList.find((e: any) => e.id === el)
          let name = obj?.name
          let re = /\([^\)]+\)/g
          name = name.match(re)[0]
          name = name.substring(1, name.length - 1) //ddsdd
          return name
        }
        switch (arg) {
          case 'switch':
            state.switchForm.company = findName(state.switchForm.buy_user)
            break
          default:
            break
        }
      },
      getSaleOrderNumber(sale_type: number) {
        const data = dataStructure(
          {},
          {
            sale_type
          }
        )
        saleinventoryApi
          .get_sale_order_number(data)
          .then(res => {
            let { status, custom_data } = res as IRequest
            if (status === 200) {
              state.switchForm.sale_order_number = custom_data.sale_order_number
            }
          })
          .catch(err => err)
      },
      // 转单提交
      getSwitch() {
        let sale_at = state.switchForm.sale_at
        sale_at = sale_at ? datetimeNormOne(sale_at) : ''
        let predict_delivery_at = state.switchForm.predict_delivery_at
        state.switchForm.predict_delivery_at = predict_delivery_at
          ? dateNormOne(predict_delivery_at)
          : ''
        const data = dataStructure(
          { power_url: 'V1/InventoryOrder/transfer_of_order' },
          {
            sale_at: state.switchForm.sale_at,
            init_payment_status: state.switchForm.init_payment_status,
            presell_order_number: state.switchForm.presell_order_number,
            sale_order_number: state.switchForm.sale_order_number,
            sale_money: state.switchForm.sale_money,
            currency_unit: state.switchForm.currency_unit,
            buy_type: state.switchForm.buy_type,
            company: state.switchForm.company,
            buy_user: state.switchForm.buy_user,
            buy_photo: state.switchForm.buy_photo,
            buy_mail: state.switchForm.buy_mail,
            predict_delivery_at: state.switchForm.predict_delivery_at,
            sell_user: state.switchForm.sell_user,
            com_code: state.switchForm.com_code,
            explain: state.switchForm.explain,
            data: state.switchForm.switchFormData
          }
        )
        saleinventoryApi
          .get_switch(data)
          .then(res => {
            let { status, custom_data, info, field_name } = res as IRequest
            if (status === 200) {
              ElMessage({
                type: 'success',
                message: info
              })
              methods.reset('switch')
            } else if (status === 421) {
              // 特殊信息显示在表单下面
              valid.checkOthers.info = info
              valid.checkOthers.num = true
              const switchref = switchRef
              switchref.value.validateField(field_name)
            }
          })
          .catch(err => err)
      },
      // 转单搜索
      getSwitchSearch(search_value: string) {
        state.switchForm.presell_order_number = search_value
        const data = dataStructure(
          {},
          {
            search_value: search_value
          }
        )
        saleinventoryApi
          .get_switch_search(data)
          .then(res => {
            let { status, custom_data, field_name, info } = res as IRequest
            if (status === 200) {
              let inventory_log = custom_data.inventory_log

              // 付款状态需要一个初始值，初始值为已付款不可更改
              state.switchForm.init_payment_status = inventory_log.payment_status
              state.switchForm.sale_at = inventory_log.sale_at
              state.switchForm.sale_money = inventory_log.sale_money
              state.switchForm.currency_unit = inventory_log.currency_unit
              state.switchForm.buy_type = inventory_log.buy_type
              state.switchForm.company = inventory_log.company
              state.switchForm.buy_user = inventory_log.buy_user
              state.switchForm.buy_photo = inventory_log.buy_photo
              state.switchForm.buy_mail = inventory_log.buy_mail
              state.switchForm.predict_delivery_at = inventory_log.predict_delivery_at
              state.switchForm.sell_user = inventory_log.sell_user
              state.switchForm.explain = inventory_log.explain
              state.switchForm.switchFormData = custom_data.inventory_order
              state.switchForm.com_code = inventory_log.com_code

              // 先执行远程搜索再赋值com_code
            } else if (status === 421) {
              // 特殊信息显示在表单下面
              valid.checkOthers.info = info
              valid.checkOthers.num = true
              const switchref = switchRef
              switchref.value.validateField(field_name)
            }
          })
          .catch(err => err)
      }
    }
    const methods = {
      reset(arg: any) {
        // 重置表单
        let handleRef = null
        switch (arg) {
          case 'switch':
            //重置表单
            const switchref = switchRef
            switchref.value.resetFields()
            // 清空当前表格
            state.switchForm.switchFormData = []
            ctx.emit('reset', arg)
            break
          default:
            break
        }
      },
      switchDeleteRow(index: number, rows: any) {
        rows.splice(index, 1)
        methods.unitMoneyAndNumChange('switch')
      },
      // 单价改变导致总价改变
      unitMoneyAndNumChange(arg: string) {
        let total = 0
        let data: any
        switch (arg) {
          case 'switch':
            data = state.switchForm.switchFormData
            data.forEach((item: any) => {
              item.sale_money = operationMul(item.sale_unit_money, item.sale_number)
              total += item.sale_money
            })
            state.switchForm.sale_money = total
            break
          default:
            break
        }
      },
      onSubmitSwitch() {
        let arg: any
        let arg2: any
        const switchref = switchRef
        switchref.value.validate((valid: boolean) => {
          arg = valid
        })
        const saleswitchref = SaleSwitchRef
        arg2 = saleswitchref.value.switchFormDatarefValid()
        if (arg && arg2) {
          ElMessageBox.confirm(t('common.confirmSwitch'), t('common.tip'), {
            confirmButtonText: t('common.confirm'),
            cancelButtonText: t('common.cancel'),
            type: 'warning'
          })
            .then(() => {
              requests.getSwitch()
            })
            .catch(() => {
              ElMessage({
                type: 'info',
                message: t('common.cancelSwitch')
              })
            })
        }
      },
      // 转单搜索方法
      presellOrderNumberSearch() {
        // 搜索之前清空两个table
        state.switchForm.switchFormData = []
        let search_value = state.switchForm.presell_order_number
        requests.getSwitchSearch(search_value)
      }
    }

    return {
      ...toRefs(state),
      ...requests,
      ...methods,
      switchRef,
      switchRule,
      SaleSwitchRef
    }
  }
})
</script>
<style lang="scss" scoped>
@import '@/assets/css/page-common-draw.scss'; //页面基础布局样式一
@import '@/assets/css/element-common-style.scss';
</style>
