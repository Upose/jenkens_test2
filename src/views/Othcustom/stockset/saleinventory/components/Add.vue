<!--
 * @Descripttion: 
 * @version: 
 * @Author: HYH
 * @Date: 2021-08-30 11:42:28
 * @LastEditors: HYH
 * @LastEditTime: 2022-04-22 14:11:36
-->
<!--  -->
<template>
  <el-drawer :title="$t(`common.billing`)" :size="800" v-model="showAdd">
    <div class="box-card">
      <div class="box-form">
        <el-divider content-position="left">{{ $t('common.base_info') }}</el-divider>
        <el-form
          class="formStyle2"
          :model="addForm"
          label-width="140px"
          :rules="addRule"
          ref="addRef"
          label-position="left"
          :validate-on-rule-change="false"
        >
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('common.sale_order_number')" prop="sale_order_number">
                <el-input v-model="addForm.sale_order_number" disabled> </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('common.sale_money_all')" prop="sale_money">
                <el-input v-model="addForm.sale_money" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('common.currency_unit_name')" prop="currency_unit">
                <el-select filterable clearable v-model="addForm.currency_unit">
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
              <el-form-item :label="$t('common.buy_type_name')" prop="buy_type">
                <el-select filterable clearable v-model="addForm.buy_type">
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
                <el-input v-model="addForm.company"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('common.buy_user')" prop="buy_user">
                <el-select filterable clearable v-model="addForm.buy_user" @change="buyUserChange">
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
                <el-input v-model="addForm.buy_photo"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('common.buy_mail')" prop="buy_mail">
                <el-input v-model="addForm.buy_mail"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('common.predict_delivery_at')" prop="predict_delivery_at">
                <el-date-picker v-model="addForm.predict_delivery_at" type="date"> </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('common.sell_user')" prop="sell_user">
                <el-select filterable clearable v-model="addForm.sell_user">
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
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('common.sale_com_code_name')" prop="com_code">
                <el-select filterable clearable v-model="addForm.com_code">
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
                <el-select filterable clearable v-model="addForm.product_grade">
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
              <el-form-item :label="$t('common.sale_at')" prop="sale_at">
                <el-date-picker v-model="addForm.sale_at" type="datetime"> </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24"
              ><el-form-item :label="$t('common.explain')">
                <el-input type="textarea" v-model="addForm.explain"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <!-- 要提交的表格 -->
        <SaleAdd
          ref="SaleAddRef"
          :addForm="addForm"
          @unitMoneyAndNumChange="unitMoneyAndNumChange"
          @addRowClick2="addRowClick2"
          :product_grade="addForm.product_grade"
        ></SaleAdd>
      </div>
      <div class="box-button">
        <el-button @click="onSubmitAdd" type="success" plain>{{ $t('common.submit') }}</el-button>
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
import { operationMul, operationAdd } from '@/utils/operation'
import { checkTwoDeci, checkTwoDeci1 } from '@/utils/regp'
import { IValid } from '../typings'
import SaleAdd from './SaleAdd.vue'
import { defineComponent, ref, reactive, toRefs, computed, onMounted } from 'vue'
interface IState {
  addForm: {
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
    com_code: any
    explain: any
    addFormData: any[]
    // +++
    product_grade: any
  }
  commonLists: any
  showAdd: boolean
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
    SaleAdd
  },
  setup(props, ctx) {
    const { t } = useI18n()
    const state: IState = reactive({
      addForm: {
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
        // payment_status: 0, //默认未付款
        // collection_type: '',
        // collection_order_number: '',
        // payee: '',
        com_code: '',
        explain: '',
        addFormData: [],
        product_grade: null
      },
      commonLists: props.commonLists,
      showAdd: props.showAdd
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
    const addRef = ref()
    const SaleAddRef = ref()
    const addRule = computed(() => {
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
            required: state.addForm.buy_type ? true : false,
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
        ],
        // +++
        product_grade: [
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
      getAdd() {
        // 日期不必填时需要处理
        let sale_at = state.addForm.sale_at
        state.addForm.sale_at = sale_at ? datetimeNormOne(sale_at) : ''
        let predict_delivery_at = state.addForm.predict_delivery_at
        state.addForm.predict_delivery_at = predict_delivery_at
          ? dateNormOne(predict_delivery_at)
          : ''
        // 过滤成后端需要的字段
        const addFormData = state.addForm.addFormData.map(item => {
          return {
            inventory_id: item.inventory_id,
            unsold_number: item.unsold_number,
            sale_number: item.sale_number,
            sale_unit_money: item.sale_unit_money,
            sale_money: item.sale_money
          }
        })

        const data = dataStructure(
          { power_url: 'V1/InventoryOrder/add' },
          {
            sale_order_number: state.addForm.sale_order_number,
            sale_money: state.addForm.sale_money,
            product_grade: state.addForm.product_grade,
            currency_unit: state.addForm.currency_unit,
            sale_at: state.addForm.sale_at,
            buy_type: state.addForm.buy_type,
            company: state.addForm.company,
            buy_user: state.addForm.buy_user,
            buy_photo: state.addForm.buy_photo,
            buy_mail: state.addForm.buy_mail,
            predict_delivery_at: state.addForm.predict_delivery_at,
            sell_user: state.addForm.sell_user,
            com_code: state.addForm.com_code,
            explain: state.addForm.explain,
            data: addFormData
          }
        )
        saleinventoryApi
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
              valid.checkOthers.num = true
              const addref = addRef
              addref.value.validateField(field_name)
            }
          })
          .catch(err => err)
      },
      getSaleOrderNumber() {
        const data = dataStructure(
          {},
          {
            sale_type: 0 //后端规定传0
          }
        )
        saleinventoryApi
          .get_sale_order_number(data)
          .then(res => {
            let { status, custom_data } = res as IRequest
            if (status === 200) {
              state.addForm.sale_order_number = custom_data.sale_order_number
            }
          })
          .catch(err => err)
      }
    }
    const methods = {
      addRowClick2(val: any) {
        let isPush = true
        state.addForm.addFormData.forEach(item => {
          if (item.inventory_id == val.inventory_id) {
            // 存在这个id就不添加
            isPush = false
          }
        })
        if (isPush) {
          state.addForm.addFormData.push(val)
        }
      },
      reset(arg: any) {
        //重置基本信息
        const addref = addRef
        addref.value.resetFields()
        // 重置两个表格
        state.addForm.addFormData = []
        const saleaddref = SaleAddRef
        saleaddref.value.addSearchData = []
        // 关闭抽屉
        ctx.emit('reset', arg)
      },
      // 单价改变导致总价改变
      unitMoneyAndNumChange(arg: string) {
        let total: any = 0
        let data: any
        switch (arg) {
          case 'add':
            data = state.addForm.addFormData
            data.forEach((item: any) => {
              item.sale_money = operationMul(item.sale_unit_money, item.sale_number, true)
              total = operationAdd(item.sale_money, total, true)
            })
            state.addForm.sale_money = total
            break
          default:
            break
        }
      },

      buyUserChange(name: string) {
        state.addForm.company = name
      },
      onSubmitAdd() {
        const addref = addRef
        addref.value.validate((valid: boolean) => {
          if (valid) {
            // 用户输入的内容校验成功才发起请求
            const saleaddref = SaleAddRef
            let valid2 = saleaddref.value.addFormDatarefValid()
            if (valid2) {
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
        })
      }
    }
    onMounted(() => {
      requests.getSaleOrderNumber()
    })
    return {
      ...toRefs(state),
      ...requests,
      ...methods,
      addRule,
      addRef,
      SaleAddRef
    }
  }
})
</script>
<style lang="scss" scoped>
@import '@/assets/css/page-common-draw.scss'; //页面基础布局样式一
@import '@/assets/css/element-common-style.scss';
</style>
