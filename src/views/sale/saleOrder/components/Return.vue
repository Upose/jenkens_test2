<!--
 * @Descripttion: 
 * @version: 
 * @Author: HYH
 * @Date: 2021-08-30 13:49:48
 * @LastEditors: XJ
 * @LastEditTime: 2022-03-31 11:48:10
-->
<!--  -->
<template>
  <el-drawer :title="$t(`common.return`)" :size="800" v-model="showReturn">
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
              <el-form-item :label="$t('common.is_return_money')" prop="is_return_money">
                <el-select filterable clearable v-model="updForm.is_return_money">
                  <el-option
                    v-for="item in commonLists.returnList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="退货总数" prop="num">
                <el-input v-model="updForm.num" disabled> </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="退货总金额" prop="sale_money">
                <el-input v-model="updForm.sale_money" disabled> </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('common.sale_order_number')" prop="id">
                <el-input v-model="updForm.id" disabled> </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('common.sale_com_code_name')" prop="com_code">
                <el-select filterable clearable v-model="updForm.com_code" disabled>
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
            <el-col :span="12">
              <el-form-item :label="$t('common.product_grade_name')" prop="product_grade">
                <el-select filterable clearable v-model="updForm.product_grade" disabled>
                  <el-option
                    v-for="item in commonLists.productGradeList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.product_grade"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('common.currency_unit_name')" prop="currency_unit">
                <el-select filterable clearable v-model="updForm.currency_unit" disabled>
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
              <el-form-item :label="$t('common.buy_user')" prop="buy_user">
                <el-select filterable clearable v-model="updForm.buy_user" disabled>
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
                <el-input v-model="updForm.buy_photo" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24"
              ><el-form-item :label="$t('common.explain')">
                <el-input type="textarea" v-model="updForm.explain"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <SaleReturn :updForm="updForm" @numChange="numChange"></SaleReturn>
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
import { dateNormOne } from '@/utils/dateNorm'
import { ElMessageBox, ElMessage } from 'element-plus'
import { operationMul, operationSub, operationAdd } from '@/utils/operation'
import { IValid } from '../typings'
import { defineComponent, ref, reactive, toRefs, computed } from 'vue'
import { GetterConstants } from '@/store/modules/users/constants'
import { useStore } from '@/store'
import SaleReturn from './SaleReturn.vue'
interface IState {
  updForm: {
    is_return_money: any
    id: any
    num: any
    sale_money: any
    com_code: any
    product_grade: any
    currency_unit: any
    buy_user: any
    buy_photo: any
    explain: any
    order_data: any[]
    delivery_data: any[]
  }
  commonLists: any
  showReturn: boolean
}
export default defineComponent({
  components: {
    SaleReturn
  },
  props: {
    commonLists: {
      type: Object,
      default: {}
    },
    showReturn: {
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
        is_return_money: null,
        id: '',
        num: 0, //下面会执行相加函数，初始值避免为null
        sale_money: 0, //下面会执行相加函数，初始值避免为null
        com_code: '',
        product_grade: null,
        currency_unit: '',
        buy_user: '',
        buy_photo: '',
        explain: null,
        order_data: [],
        delivery_data: []
      },
      commonLists: props.commonLists,
      showReturn: props.showReturn
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
    const payTableRef = ref()
    const updRule = computed(() => {
      const rule = {
        is_return_money: [
          {
            required: true,
            message: t('common.not_empty')
          },
          {
            validator: valid.checkOthers.validatorFun
          }
        ],
        id: [
          {
            required: true,
            message: t('common.not_empty')
          },
          {
            validator: valid.checkOthers.validatorFun
          }
        ],
        num: [
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
          {
            validator: valid.checkOthers.validatorFun
          }
        ],
        product_grade: [
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
        ]
      }
      return rule
    })
    const requests = {
      getSalesReturnSearch(id: any) {
        const data = dataStructure({}, { id })
        saleinventoryApi
          .get_sales_return_search(data)
          .then(res => {
            let { status, custom_data, info } = res as IRequest
            if (status === 200) {
              state.updForm.delivery_data = custom_data.delivery_list_value
              state.updForm.order_data = custom_data.order_list_value
            }
          })
          .catch(err => err)
      },
      getReturn() {
        // const {
        // 	inventory_id,
        // 	sale_order_number,
        // 	warehouse,
        // 	inventory_type,
        // 	model_number,
        // 	num,
        // 	currency_unit,
        // 	sale_unit_money,
        // 	sale_money,
        // } = state.updForm.order_data
        const data = dataStructure({ power_url: 'V1/InventoryOrder/sales_return' }, state.updForm)
        saleinventoryApi
          .get_return(data)
          .then(res => {
            let { status, custom_data, info, field_name } = res as IRequest
            if (status === 200) {
              ElMessage({
                type: 'success',
                message: info
              })
              methods.reset('return')
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
        return new Promise((resolve, reject) => {
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
                state.updForm.id = custom_data.id
                state.updForm.currency_unit = custom_data.currency_unit
                state.updForm.buy_user = custom_data.buy_user
                state.updForm.buy_photo = custom_data.buy_photo
                custom_data.collection_order_number
                state.updForm.explain = custom_data.explain
                state.updForm.com_code = custom_data.com_code
                state.updForm.product_grade = custom_data.product_grade
                state.updForm.order_data = custom_data.order_data
                state.updForm.delivery_data = custom_data.delivery_data
                resolve('显示修改')
              }
            })
            .catch(err => err)
        })
      }
    }
    const methods = {
      // 退货数量，导致退货总量和退货总价改变
      numChange() {
        let num: any = 0
        let sale_money: any = 0
        let order_data = state.updForm.order_data
        order_data.forEach((item: any) => {
          item.sale_money = operationMul(item.num, item.sale_unit_money)
          sale_money = operationAdd(sale_money, item.sale_money)
          num = operationAdd(num, item.num)
        })
        let delivery_data = state.updForm.delivery_data
        delivery_data.forEach((item: any) => {
          item.sale_money = operationMul(item.num, item.sale_unit_money)
          sale_money = operationAdd(sale_money, item.sale_money)
          num = operationAdd(num, item.num)
        })
        state.updForm.num = num
        state.updForm.sale_money = sale_money
      },
      reset(arg: any) {
        //重置表单
        const updref = updRef
        updref.value.resetFields()
        ctx.emit('reset', arg)
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
                requests.getReturn()
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

    return {
      ...toRefs(state),
      ...requests,
      ...methods,
      updRef,
      updRule,
      payTableRef
    }
  }
})
</script>
<style lang="scss" scoped>
@import '@/assets/css/page-common-draw.scss'; //页面基础布局样式一
@import '@/assets/css/element-common-style.scss';
</style>
