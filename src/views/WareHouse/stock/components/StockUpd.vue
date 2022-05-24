<!--
 * @Descripttion: 
 * @version: 
 * @Author: HYH
 * @Date: 2021-08-30 10:20:49
 * @LastEditors: TJ
 * @LastEditTime: 2022-03-09 15:32:30
-->
<!--  -->
<template>
  <el-drawer :title="$t(`common.upd`)" :size="576" v-model="showUpd">
    <div class="box-card formStyle desLabel">
      <div class="box-form">
        <el-descriptions :column="1" label-width="200px">
          <el-descriptions-item :label="$t('common.sale_number')">{{
            updForm.sale_number
          }}</el-descriptions-item>
        </el-descriptions>
        <el-form
          :model="updForm"
          label-width="200px"
          :rules="updRule"
          ref="updRef"
          label-position="left"
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
              <el-form-item
                :label="$t('common.inventory_enter_type_name')"
                prop="inventory_enter_type"
              >
                <el-select
                  filterable
                  clearable
                  v-model="updForm.inventory_enter_type"
                  :disabled="updList.inventory_enter_type == 1"
                  @change="inventoryEnterTypeChange"
                >
                  <el-option
                    v-for="item in commonLists.enterTypeList"
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
              <el-form-item :label="$t('common.entering_at')" prop="entering_at">
                <el-date-picker
                  v-model="updForm.entering_at"
                  type="date"
                  :disabled="updList.number !== updList.unsold"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item :label="$t('common.inventory_type_name')" prop="inventory_type">
                <el-select
                  filterable
                  clearable
                  v-model="updForm.inventory_type"
                  @change="inventoryTypeChange('add')"
                  disabled
                >
                  <el-option
                    v-for="item in commonLists.typeList"
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
              <el-form-item :label="$t('common.model_number_name')" prop="model_number">
                <el-select filterable clearable v-model="updForm.model_number" disabled>
                  <el-option
                    v-for="item in commonLists.modelList"
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
              <el-form-item :label="$t('common.unit_name')" prop="unit">
                <el-select filterable clearable v-model="updForm.unit" disabled>
                  <el-option
                    v-for="item in commonLists.unitList"
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
              <el-form-item :label="$t('common.inventory_warehouse_name')" prop="warehouse">
                <el-select filterable clearable v-model="updForm.warehouse">
                  <el-option
                    v-for="item in commonLists.warehouseList"
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
              <el-form-item :label="$t('common.inventory_supplier_name')" prop="supplier">
                <el-select filterable clearable v-model="updForm.supplier">
                  <el-option
                    v-for="item in commonLists.supplierList"
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
              <el-form-item :label="$t('common.number')" prop="number">
                <el-input
                  v-model="updForm.number"
                  @change="unitMoneyAndNumChange('upd')"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item :label="$t('common.inventory_unit_money')" prop="inventory_unit_money">
                <el-input
                  v-model="updForm.inventory_unit_money"
                  @change="unitMoneyAndNumChange('upd')"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item :label="$t('common.inventory_money')" prop="inventory_money">
                <el-input v-model="updForm.inventory_money" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="24">
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
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item :label="$t('common.inventory_location')" prop="inventory_location">
                <el-input v-model="updForm.inventory_location"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item :label="$t('common.order_number')" prop="order_number">
                <el-input v-model="updForm.order_number" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- ++++++++++ -->
          <el-row>
            <el-col :span="24">
              <el-form-item :label="$t('common.before_adjust_product_grade')" prop="product_grade">
                <el-select clearable filterable v-model="updForm.product_grade" disabled>
                  <el-option
                    v-for="(item, index) of commonLists.productGradeList"
                    :key="index"
                    :value="item.product_grade"
                    :label="item.name"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="24">
              <el-form-item :label="$t('common.adjust_type_name')" prop="adjust_type">
                <el-radio-group v-model="updForm.adjust_type">
                  <el-radio :label="-1">{{ $t('common.adjust_type_normal') }}</el-radio>
                  <el-radio :label="0">{{ $t('common.adjust_type_add') }}</el-radio>
                  <el-radio :label="1">{{ $t('common.adjust_type_reduce') }}</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 调减原因 -->
          <el-row v-if="updForm.adjust_type == 1">
            <el-col :span="24">
              <el-form-item :label="$t('common.minus_adjust_type_name')" prop="minus_adjust_type">
                <el-select clearable filterable v-model="updForm.minus_adjust_type">
                  <el-option
                    v-for="(item, index) of commonLists.minusAdjustTypeList"
                    :key="index"
                    :value="item.id"
                    :label="item.name"
                    :disabled="item.id == 1 && updForm.product_grade == 2"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 调减：等级调整为那一等级 -->
          <el-row v-if="updForm.adjust_type == 1 && updForm.minus_adjust_type == 1">
            <el-col :span="24">
              <el-form-item :label="$t('common.adjust_product_grade')" prop="adjust_product_grade">
                <el-select clearable filterable v-model="updForm.adjust_product_grade">
                  <el-option
                    v-for="(item, index) of commonLists.productGradeList"
                    :key="index"
                    :value="item.product_grade"
                    :label="item.name"
                    :disabled="item.product_grade <= updForm.product_grade"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-if="updForm.adjust_type !== -1">
            <el-col :span="24">
              <el-form-item :label="$t('common.reason')" prop="reason">
                <el-input type="textarea" v-model="updForm.reason"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-if="updForm.adjust_type !== -1">
            <el-col :span="24">
              <el-form-item :label="$t('common.inventory_number')" prop="inventory_number">
                <el-input v-model="updForm.inventory_number"></el-input>
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
import { stockApi } from '@/http/api/othcustom/stockset/stock'
import { IRequest } from '@/@types/httpInterface'
import dataStructure from '@/utils/dataStructure'
import { defineComponent, reactive, toRefs, onMounted, computed, ref } from 'vue'
import { IValid } from '../typings'
import { useI18n } from 'vue-i18n'
import { dateNormOne } from '@/utils/dateNorm'
import { ElMessageBox, ElMessage } from 'element-plus'
import { operationMul } from '@/utils/operation'
import { compareNumber } from '@/utils/regp'
import AddTable from './AddTable.vue'
import { checkTwoDeci, checkSaleNumber4 } from '@/utils/regp'
interface IState {
  updList: any
  updForm: {
    sale_number: any
    id: any
    entering_at: any
    order_number: any
    model_number: any
    number: any
    unit: any
    inventory_type: any
    warehouse: any
    supplier: any
    inventory_enter_type: any
    inventory_location: any
    inventory_unit_money: any
    inventory_money: any
    currency_unit: any
    // ++
    adjust_type: any
    inventory_number: any
    reason: any
    product_grade: any
    adjust_product_grade: any
    minus_adjust_type: any
  }
  showUpd: boolean
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
    },
    singleSelection: {
      type: Object,
      default: {}
    }
  },
  emits: ['reset', 'inventoryTypeChange'],
  setup(props, ctx) {
    const { t } = useI18n()
    const state: IState = reactive({
      updList: {},
      updForm: {
        sale_number: null,
        id: '',
        entering_at: '',
        order_number: '',
        model_number: null,
        number: null,
        unit: null,
        inventory_type: null,
        warehouse: null,
        supplier: null,
        inventory_enter_type: null,
        inventory_location: '',
        inventory_unit_money: '',
        inventory_money: '',
        currency_unit: null,
        adjust_type: null,
        inventory_number: null,
        reason: '',
        product_grade: null,
        adjust_product_grade: null,
        minus_adjust_type: null
      },
      showUpd: props.showUpd
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
    const updRule = computed(() => {
      const rule = {
        number: [
          {
            validator: (rule: object, value: string, callback: Function) => {
              let arg1 = state.updForm.sale_number
              let arg2 = state.updForm.number
              checkSaleNumber4(rule, value, callback, arg1, arg2)
            },
            required: true
          },
          // { type: 'number', message: t('common.regpOnlyNum') },
          { validator: valid.checkOthers.validatorFun }
        ],
        entering_at: [
          {
            required: true,
            message: t('common.not_empty')
          },
          { validator: valid.checkOthers.validatorFun }
        ],
        inventory_enter_type: [
          {
            required: true,
            message: t('common.not_empty')
          },
          { validator: valid.checkOthers.validatorFun }
        ],
        inventory_money: [
          {
            required: true,
            message: t('common.not_empty')
          },
          { validator: valid.checkOthers.validatorFun }
        ],

        inventory_unit_money: [
          {
            validator: checkTwoDeci,
            required: true
          },
          { validator: valid.checkOthers.validatorFun }
        ],
        currency_unit: [
          {
            required: true,
            message: t('common.not_empty')
          },
          { validator: valid.checkOthers.validatorFun }
        ],
        supplier: [
          {
            required: true,
            message: t('common.not_empty')
          },
          { validator: valid.checkOthers.validatorFun }
        ],
        order_number: [
          {
            required: true,
            message: t('common.not_empty')
          },
          { validator: valid.checkOthers.validatorFun }
        ],
        warehouse: [
          {
            required: true,
            message: t('common.not_empty')
          },
          { validator: valid.checkOthers.validatorFun }
        ],
        // ++++
        adjust_type: [
          { required: true, message: t('common.not_empty') },
          { validator: valid.checkOthers.validatorFun }
        ],
        inventory_number: [
          {
            required: true,
            validator: (rule: object, value: string, callback: Function) => {
              let arg1 = state.updForm.inventory_number
              let arg2 = props.singleSelection.stock
              // 调减1 时就比较，初始null和调增0不比较
              let isCompare = state.updForm.adjust_type
              compareNumber(rule, value, callback, arg1, arg2, isCompare)
            }
          },
          { validator: valid.checkOthers.validatorFun }
        ],
        reason: [
          { required: true, message: t('common.not_empty') },
          { validator: valid.checkOthers.validatorFun }
        ],
        product_grade: [
          { required: true, message: t('common.not_empty') },
          { validator: valid.checkOthers.validatorFun }
        ],
        adjust_product_grade: [
          { required: true, message: t('common.not_empty') },
          { validator: valid.checkOthers.validatorFun }
        ],
        minus_adjust_type: [
          { required: true, message: t('common.not_empty') },
          { validator: valid.checkOthers.validatorFun }
        ]
      }
      return rule
    })
    const requests = {
      // 库存管理修改接口：V1/Inventory/upd
      getUpd() {
        // 处理时间
        let entering_at = state.updForm.entering_at
        state.updForm.entering_at = entering_at ? dateNormOne(entering_at) : ''
        // 处理数据
        const data = dataStructure(
          { power_url: 'V1/Inventory/upd' },
          {
            id: state.updForm.id,
            entering_at: state.updForm.entering_at,
            number: state.updForm.number,
            sale_number: state.updForm.sale_number,
            adjust_type: state.updForm.adjust_type,
            inventory_number: state.updForm.inventory_number,
            reason: state.updForm.reason,
            product_grade: state.updForm.product_grade,
            adjust_product_grade: state.updForm.adjust_product_grade,
            inventory_unit_money: state.updForm.inventory_unit_money,
            currency_unit: state.updForm.currency_unit,
            supplier: state.updForm.supplier,
            inventory_money: state.updForm.inventory_money,
            order_number: state.updForm.order_number,
            inventory_enter_type: state.updForm.inventory_enter_type
          }
        )
        stockApi
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
      getView(id: string) {
        return new Promise((resolve, reject) => {
          const data = dataStructure(
            {},
            {
              id: id
            }
          )
          stockApi
            .get_view(data)
            .then(res => {
              let { status, custom_data, info } = res as IRequest

              if (status === 200) {
                state.updList = custom_data
                state.updForm.id = custom_data.id
                state.updForm.entering_at = custom_data.entering_at
                state.updForm.order_number = custom_data.order_number
                state.updForm.inventory_type = custom_data.inventory_type
                state.updForm.model_number = custom_data.model_number
                state.updForm.warehouse = custom_data.warehouse
                state.updForm.unit = custom_data.unit
                state.updForm.sale_number = custom_data.sale_number
                state.updForm.number = custom_data.number
                state.updForm.inventory_unit_money = custom_data.inventory_unit_money
                state.updForm.inventory_money = custom_data.inventory_money
                state.updForm.inventory_enter_type = custom_data.inventory_enter_type
                state.updForm.currency_unit = custom_data.currency_unit
                state.updForm.inventory_location = custom_data.inventory_location
                state.updForm.supplier = custom_data.supplier
                state.updForm.product_grade = custom_data.product_grade

                resolve('修改页面')
              }
            })
            .catch(err => err)
        })
      }
    }
    const methods = {
      // 修改页面，入库状态改变为已入库，将入库时间改为今天
      inventoryEnterTypeChange() {
        if (state.updForm.inventory_enter_type) {
          state.updForm.entering_at = dateNormOne(new Date())
        } else {
          state.updForm.entering_at = state.updList.entering_at
        }
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
      unitMoneyAndNumChange(arg: string) {
        let unit_money: any = state.updForm.inventory_unit_money
        let number: any = state.updForm.number
        unit_money = !unit_money ? 0 : unit_money
        number = !number ? 0 : number
        state.updForm.inventory_money = operationMul(unit_money, number)
      },
      reset(arg: any) {
        // 重置表单
        // state.drawer.showAdd = false
        const updref = updRef
        updref.value.resetFields()
        ctx.emit('reset', arg)
      },
      // 添加时库存类型改变加载库存型号
      inventoryTypeChange(arg: string) {
        let inventory_type: any
        state.updForm.model_number = null
        inventory_type = state.updForm.inventory_type
        ctx.emit('inventoryTypeChange', 'upd', inventory_type)
      }
    }
    const updRef = ref()
    return {
      ...toRefs(state),
      ...requests,
      ...methods,
      updRef,
      updRule
    }
  }
})
</script>
<style lang="scss" scoped>
@import '@/assets/css/page-common-draw.scss'; //页面基础布局样式一
@import '@/assets/css/element-common-style.scss';
</style>
