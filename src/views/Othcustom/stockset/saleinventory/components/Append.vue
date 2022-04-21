<!--
 * @Descripttion: 
 * @version: 
 * @Author: HYH
 * @Date: 2021-08-30 14:26:20
 * @LastEditors: TJ
 * @LastEditTime: 2022-02-18 11:58:03
-->
<!--  -->
<template>
  <el-drawer :title="$t(`common.append`)" :size="800" v-model="showAppend">
    <div class="box-card">
      <div class="box-form">
        <el-divider content-position="left">{{ $t('common.base_info') }}</el-divider>
        <el-form
          class="formStyle2"
          :model="appendForm"
          label-width="140px"
          label-position="left"
          :rules="appendRule"
          ref="appendRef"
        >
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('common.sale_order_number')" prop="sale_order_number">
                <el-input @change="saleOrderNumberSearch" v-model="appendForm.sale_order_number">
                  <template #append>
                    <el-button icon="el-icon-search" @click="saleOrderNumberSearch"></el-button>
                  </template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('common.sale_money_all')" prop="sale_money">
                <el-input v-model="appendForm.sale_money" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('common.currency_unit_name')" prop="currency_unit">
                <el-select filterable clearable v-model="appendForm.currency_unit" disabled>
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
                <el-select filterable clearable v-model="appendForm.buy_type" disabled>
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

          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('common.company')" prop="company">
                <el-input v-model="appendForm.company" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('common.buy_user')" prop="buy_user">
                <el-select
                  filterable
                  clearable
                  v-model="appendForm.buy_user"
                  disabled
                  @change="buyUserChange('append')"
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
                <el-input v-model="appendForm.buy_photo" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('common.collection_status_name')" prop="payment_status">
                <el-select filterable clearable v-model="appendForm.payment_status" disabled>
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
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('common.collection_type_name')" prop="collection_type">
                <el-select filterable clearable v-model="appendForm.collection_type" disabled>
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
                <el-input v-model="appendForm.collection_order_number" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('common.payee')" prop="payee">
                <el-select filterable clearable v-model="appendForm.payee" disabled>
                  <el-option
                    v-for="item in commonLists.staffList"
                    :key="item.id"
                    :label="item.full_name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
                <!-- <el-input  v-model="appendForm.payee" disabled></el-input> -->
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('common.buy_mail')" prop="buy_mail">
                <el-input v-model="appendForm.buy_mail" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('common.predict_delivery_at')" prop="predict_delivery_at">
                <el-date-picker v-model="appendForm.predict_delivery_at" type="date" disabled>
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('common.sell_user')" prop="sell_user">
                <el-select filterable clearable v-model="appendForm.sell_user" disabled>
                  <el-option
                    v-for="item in commonLists.staffList"
                    :key="item.id"
                    :label="item.full_name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
                <!-- <el-input
                     v-model="appendForm.sell_user"
                    disabled
                  ></el-input> -->
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('common.product_grade_name')" prop="product_grade">
                <el-select filterable clearable v-model="appendForm.product_grade">
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
            <el-col :span="12">
              <el-form-item :label="$t('common.sale_at')" prop="sale_at">
                <el-date-picker v-model="appendForm.sale_at" type="datetime"> </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item :label="$t('common.explain')">
                <el-input type="textarea" v-model="appendForm.explain" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <!-- 增加的不显示，禁用 -->
        </el-form>
        <SaleAppend
          ref="SaleAppendRef"
          :appendForm="appendForm"
          @unitMoneyAndNumChange="unitMoneyAndNumChange"
          @appendRowClick="appendRowClick"
          :product_grade="appendForm.product_grade"
        ></SaleAppend>
      </div>
      <div class="box-button">
        <el-button @click="onSubmitAppend(itemName)" type="success" plain>{{
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
import SaleAppend from './SaleAppend.vue'
import { defineComponent, ref, reactive, toRefs, computed } from 'vue'
interface IState {
  appendForm: {
    sale_at: any
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
    payment_status: any
    collection_type: any
    collection_order_number: any
    payee: any
    explain: any
    appendFormData: any[]
    // ++
    product_grade: any
  }
  commonLists: any
  showAppend: boolean
}
export default defineComponent({
  props: {
    commonLists: {
      type: Object,
      default: {}
    },
    showAppend: {
      type: Boolean,
      default: false
    }
  },
  emits: ['reset'],
  components: {
    SaleAppend
  },
  setup(props, ctx) {
    const { t } = useI18n()
    const state: IState = reactive({
      appendForm: {
        sale_at: '',
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
        payment_status: null,
        collection_type: '',
        collection_order_number: '',
        payee: '',
        explain: '',
        appendFormData: [],
        // ++
        product_grade: null
      },
      commonLists: props.commonLists,
      showAppend: props.showAppend
    })
    const appendRef = ref()
    const SaleAppendRef = ref()
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
    const appendRule = computed(() => {
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
        ]
      }
      return rule
    })
    const requests = {
      getAppendSearch(search_value: string) {
        const data = dataStructure(
          {},
          {
            search_value: search_value
          }
        )
        saleinventoryApi
          .get_append_search(data)
          .then(res => {
            let { status, custom_data, info, field_name } = res as IRequest
            if (status === 200) {
              let inventory_log = custom_data.inventory_log
              state.appendForm.sale_order_number = inventory_log.id
              state.appendForm.sale_money = inventory_log.sale_money
              state.appendForm.currency_unit = inventory_log.currency_unit
              ;(state.appendForm.buy_type = inventory_log.buy_type),
                (state.appendForm.company = inventory_log.company),
                (state.appendForm.buy_user = inventory_log.buy_user),
                (state.appendForm.buy_photo = inventory_log.buy_photo),
                (state.appendForm.buy_mail = inventory_log.buy_mail),
                (state.appendForm.predict_delivery_at = inventory_log.predict_delivery_at),
                (state.appendForm.sell_user = inventory_log.sell_user),
                (state.appendForm.payment_status = inventory_log.payment_status),
                (state.appendForm.collection_type = inventory_log.collection_type),
                (state.appendForm.collection_order_number = inventory_log.collection_order_number),
                (state.appendForm.payee = inventory_log.payee),
                (state.appendForm.explain = inventory_log.explain),
                (state.appendForm.sale_at = inventory_log.sale_at),
                (state.appendForm.appendFormData = custom_data.inventory_order),
                (state.appendForm.product_grade = inventory_log.product_grade)
            } else if (status === 421) {
              // 特殊信息显示在表单下面
              valid.checkOthers.info = info
              valid.checkOthers.num = true
              const appendref = appendRef
              appendref.value.validateField(field_name)
            }
          })
          .catch(err => err)
      },
      getAppend() {
        let sale_at = state.appendForm.sale_at
        sale_at = sale_at ? datetimeNormOne(sale_at) : ''
        const data = dataStructure(
          { power_url: 'V1/InventoryOrder/presell_additional' },
          {
            sale_order_number: state.appendForm.sale_order_number,
            sale_money: state.appendForm.sale_money,
            data: state.appendForm.appendFormData,
            sale_at
          }
        )
        saleinventoryApi
          .get_append(data)
          .then(res => {
            let { status, custom_data, info, field_name } = res as IRequest
            if (status === 200) {
              ElMessage({
                type: 'success',
                message: info
              })
              methods.reset('append')
            } else if (status === 421) {
              // 特殊信息显示在表单下面
              valid.checkOthers.info = info
              valid.checkOthers.num = true
              const appendref = appendRef
              appendref.value.validateField(field_name)
            }
          })
          .catch(err => err)
      }
    }
    const methods = {
      reset(arg: any) {
        //重置表单
        const appendref = appendRef
        appendref.value.resetFields()
        // 重置两个表格
        state.appendForm.appendFormData = []
        const saleappendref = SaleAppendRef
        saleappendref.value.appendSearchData = []
        ctx.emit('reset', arg)
      },
      saleOrderNumberSearch() {
        // 搜索之前清空两个table
        state.appendForm.appendFormData = []
        const saleappendref = SaleAppendRef
        saleappendref.value.appendSearchData = []
        let sale_order_numbe = state.appendForm.sale_order_number
        requests.getAppendSearch(sale_order_numbe)
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
        switch (arg) {
          case 'append':
            state.appendForm.company = findName(state.appendForm.buy_user)
            break
          default:
            break
        }
      },
      // 单价改变导致总价改变
      unitMoneyAndNumChange() {
        let total = 0
        let data: any
        data = state.appendForm.appendFormData
        data.forEach((item: any) => {
          item.sale_money = operationMul(item.sale_unit_money, item.sale_number)
          total += item.sale_money
        })
        state.appendForm.sale_money = total
      },
      // 追加提交按钮
      onSubmitAppend() {
        let arg: any
        let arg2: any
        const appendref = appendRef
        appendref.value.validate((valid: boolean) => {
          arg = valid
        })
        let saleappendref = SaleAppendRef
        arg2 = saleappendref.value.appendFormDatarefValid
        if (arg && arg2) {
          ElMessageBox.confirm(t('common.confirmAppend'), t('common.tip'), {
            confirmButtonText: t('common.confirm'),
            cancelButtonText: t('common.cancel'),
            type: 'warning'
          })
            .then(() => {
              requests.getAppend()
            })
            .catch(() => {
              ElMessage({
                type: 'info',
                message: t('common.cancelAppend')
              })
            })
        }
      },
      appendRowClick(val: any) {
        let isPush = true
        state.appendForm.appendFormData.forEach(item => {
          if (item.inventory_id == val.inventory_id) {
            // 存在这个id就不添加
            isPush = false
          }
        })
        if (isPush) {
          state.appendForm.appendFormData.push(val)
        }
      }
    }

    return {
      ...toRefs(state),
      ...methods,
      ...requests,
      appendRule,
      SaleAppendRef,
      appendRef
    }
  }
})
</script>
<style lang="scss" scoped>
@import '@/assets/css/page-common-draw.scss'; //页面基础布局样式一
@import '@/assets/css/element-common-style.scss';
</style>
