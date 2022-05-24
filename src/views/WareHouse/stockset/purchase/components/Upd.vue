<!--
 * @Descripttion: 
 * @version: 
 * @Author: HYH
 * @Date: 2021-08-30 09:20:30
 * @LastEditors: XJ
 * @LastEditTime: 2022-03-29 16:05:58
-->
<!--  -->
<template>
  <el-drawer :title="$t(`common.upd`)" :size="1000" v-model="showAppend">
    <div class="box-card formStyle dividerStyle">
      <div class="box-form">
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
              <el-form-item :label="$t('common.id')" prop="id">
                <el-input v-model="addForm.id" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('common.order_number')" prop="order_number">
                <el-input v-model="addForm.order_number" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('common.entering_at')" prop="entering_at">
                <el-date-picker v-model="addForm.entering_at" type="date"> </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('common.currency_unit_name')" prop="currency_unit">
                <el-select filterable clearable v-model="addForm.currency_unit" disabled>
                  <el-option
                    v-for="item in commonLists.currencyUnitList"
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
              <el-form-item :label="$t('common.inventory_supplier_name')" prop="supplier">
                <el-select filterable clearable v-model="addForm.supplier" disabled>
                  <el-option
                    v-for="item in commonLists.supplierList"
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
              <el-form-item :label="$t('common.inventory_warehouse_name')" prop="warehouse">
                <el-select filterable clearable v-model="addForm.warehouse" disabled>
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
            <el-col :span="12">
              <el-form-item :label="$t('common.gross')" prop="num">
                <el-input v-model="addForm.num" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('common.payment_money')" prop="payment_money">
                <el-input v-model="addForm.payment_money" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('common.explain')" prop="explain">
                <el-input v-model="addForm.explain" type="textarea"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>

        <el-divider content-position="left">{{ $t('common.dynamic_info') }}</el-divider>
        <el-form
          :model="addForm"
          label-width="200px"
          :rules="addRuleVar"
          ref="addRefVar"
          label-position="left"
        >
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('common.product_grade')" prop="product_grade">
                <el-select filterable clearable v-model="addForm.product_grade">
                  <el-option
                    v-for="item in commonLists.productGradeList"
                    :key="item.product_grade"
                    :label="item.name"
                    :value="item.product_grade"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('common.inventory_type_name')" prop="inventory_type">
                <el-select
                  filterable
                  clearable
                  v-model="addForm.inventory_type"
                  @change="inventoryTypeChange"
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
            <el-col :span="12">
              <el-form-item :label="$t('common.model_number_name')" prop="model_number">
                <el-select
                  allow-create
                  default-first-option
                  filterable
                  clearable
                  v-model="addForm.model_number"
                >
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
            <el-col :span="12">
              <el-form-item :label="$t('common.unit_name')" prop="unit">
                <el-select filterable clearable v-model="addForm.unit">
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
            <el-col :span="12">
              <el-form-item :label="$t('common.number')" prop="number">
                <el-input
                  v-model="addForm.number"
                  @change="unitMoneyAndNumChange('add')"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('common.inventory_unit_money')" prop="inventory_unit_money">
                <el-input
                  v-model="addForm.inventory_unit_money"
                  @change="unitMoneyAndNumChange('add')"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('common.inventory_money')" prop="inventory_money">
                <el-input v-model="addForm.inventory_money" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('common.inventory_location')" prop="inventory_location">
                <el-input v-model="addForm.inventory_location"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div style="text-align:right">
          <el-button type="success" plain @click="addRow">{{ $t('common.add_data') }}</el-button>
        </div>
        <el-divider content-position="left">{{ $t('common.data_collect') }}</el-divider>
        <UpdTable
          ref="updTableRef"
          @updateAddData="updateAddData"
          @delAddData="delAddData"
        ></UpdTable>
      </div>

      <div class="box-button">
        <el-button @click="onSubmitUpd" type="success" plain>{{ $t('common.submit') }}</el-button>
      </div>
    </div>
  </el-drawer>
</template>

<script lang="ts">
interface IState {
  addForm: {
    // 共有
    entering_at: any
    order_number: any
    id: any
    payment_money: any // +
    num: any
    warehouse: any
    explain: any
    // ===单次添加
    inventory_unit_money: any
    inventory_money: any
    currency_unit: any
    model_number: any
    number: any
    unit: any
    inventory_type: any
    inventory_location: any
    supplier: any
    product_grade: any // +
    // ---------汇总
    data: any[]
  }
  commonLists: any
  showAppend: any
}
import { purchaseApi } from '@/http/api/othcustom/stockset/purchase'
import { IRequest } from '@/@types/httpInterface'
import dataStructure from '@/utils/dataStructure'
import {
  defineComponent,
  reactive,
  toRefs,
  onMounted,
  computed,
  ref,
  nextTick,
  onBeforeMount,
  watch,
  onActivated,
  onDeactivated
} from 'vue'
import { IValid } from '../typings'
import { useI18n } from 'vue-i18n'
import { dateNormOne } from '@/utils/dateNorm'
import { ElMessageBox, ElMessage } from 'element-plus'
import { operationMul, operationAdd } from '@/utils/operation'
import UpdTable from './UpdTable.vue'
import { checkOnlyNum, checkTwoDeci, checkAt1 } from '@/utils/regp'
export default defineComponent({
  props: {
    commonLists: {
      type: Object
    },
    showAppend: {
      type: Boolean,
      default: false
    },
    singleSelection: {
      type: Object,
      default: {}
    }
  },
  emits: ['reset', 'inventoryTypeChange'],
  components: {
    UpdTable
  },
  setup(props, ctx) {
    const { t } = useI18n()
    const state: IState = reactive({
      addForm: {
        // 共有
        entering_at: '',
        order_number: '',
        id: '',
        payment_money: null,
        num: null,
        warehouse: null,
        explain: '',
        // ===单次添加
        inventory_unit_money: '',
        inventory_money: '',
        currency_unit: null,
        model_number: null,
        number: null,
        unit: null,
        inventory_type: null,
        inventory_location: '',
        supplier: null,
        // =====
        product_grade: null, // +产品等级
        // ---------汇总
        data: []
      },
      commonLists: props.commonLists,
      showAppend: props.showAppend
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
    const addRefVar = ref()
    const updTableRef = ref()

    const addRule = computed(() => {
      const rule = {
        id: [
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
        entering_at: [
          {
            required: true,
            message: t('common.not_empty')
            // validator: (rule: object, value: string, callback: Function) => {
            // 	let type: any = 'gtDate'
            // 	let times = state.addForm.entering_at
            // 	checkAt1(rule, value, callback, type, times)
            // },
          },
          { validator: valid.checkOthers.validatorFun }
        ],
        payment_money: [
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
        currency_unit: [
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
        ]
      }
      return rule
    })
    const addRuleVar = computed(() => {
      const rule = {
        // ========
        model_number: [
          {
            required: true,
            message: t('common.not_empty')
          },
          { validator: valid.checkOthers.validatorFun }
        ],
        unit: [
          {
            required: true,
            message: t('common.not_empty')
          },
          { validator: valid.checkOthers.validatorFun }
        ],

        number: [
          {
            required: true,
            validator: checkOnlyNum
          },
          { validator: valid.checkOthers.validatorFun }
        ],
        inventory_unit_money: [
          {
            required: true,
            validator: checkTwoDeci
          },
          { validator: valid.checkOthers.validatorFun }
        ],

        inventory_type: [
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
      // 修改移除接口：V1/Stock/inventory_remove
      getUpdRemove(id: any, order_number: any) {
        const args = dataStructure(
          { power_url: 'V1/Stock/inventory_remove' },
          {
            id,
            order_number
          }
        )
        purchaseApi
          .get_upd_remove(args)
          .then(res => {
            let { status, custom_data, info } = res as IRequest
            if (status === 200) {
              ctx.emit('reset', '')
              ElMessage({
                type: 'success',
                message: info
              })
            }
          })
          .catch(err => err)
      },
      // 修改接口
      getUpd() {
        let handle_entering_at = state.addForm.entering_at
        state.addForm.entering_at = handle_entering_at ? dateNormOne(handle_entering_at) : ''
        const args = dataStructure(
          { power_url: 'V1/Stock/upd' },
          {
            order_number: state.addForm.order_number,
            warehouse: state.addForm.warehouse,
            entering_at: state.addForm.entering_at,
            payment_money: state.addForm.payment_money,
            id: state.addForm.id,
            supplier: state.addForm.supplier,
            currency_unit: state.addForm.currency_unit,
            explain: state.addForm.explain,
            data: state.addForm.data
          }
        )
        purchaseApi
          .get_upd(args)
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
              const addref = addRef
              addref.value.validateField(field_name)
            }
          })
          .catch(err => err)
      },
      getAppendSearch(order_number: any) {
        const data = dataStructure({}, { order_number })
        purchaseApi
          .get_append_search(data)
          .then(res => {
            let { status, custom_data } = res as IRequest
            const { inventory, stock } = custom_data
            if (status === 200) {
              const updtableref = updTableRef
              // 重新加载需要清空表格数据
              updtableref.value.tableData = []
              state.addForm.entering_at = stock.entering_at
              state.addForm.explain = stock.explain
              state.addForm.id = stock.id
              state.addForm.order_number = stock.order_number
              state.addForm.payment_money = stock.payment_money
              state.addForm.supplier = stock.supplier
              state.addForm.currency_unit = stock.currency_unit
              state.addForm.num = stock.num
              state.addForm.warehouse = stock.warehouse
              inventory.forEach((item: any) => {
                // row1提交到后端的简化后数据
                let row1 = {
                  // warehouse: item.warehouse,
                  id: item.id,
                  unit: item.unit,
                  model_number: item.model_number,
                  inventory_type: item.inventory_type,
                  inventory_location: item.inventory_location,
                  number: item.number,
                  inventory_unit_money: item.inventory_unit_money,
                  inventory_money: item.inventory_money,
                  product_grade: item.product_grade
                }
                state.addForm.data.push(row1)
                // row为表格显示数据
                let row = {
                  // warehouse: item.inventory_warehouse_name,
                  id: item.id,
                  number: item.number,
                  unit: item.unit_name,
                  model_number: item.model_number_name,
                  inventory_type: item.inventory_type_name,
                  inventory_location: item.inventory_location,
                  inventory_unit_money: item.inventory_unit_money,
                  inventory_money: item.inventory_money,
                  product_grade: item.product_grade_name //+
                }
                const updtableref = updTableRef
                updtableref.value.tableData.push(row)
              })
            }
          })
          .catch(err => err)
      }
    }
    const methods = {
      // 计算最终总金额
      calculateFinallyMoney() {
        let payment_money: any = 0
        let num: any = 0
        state.addForm.data.forEach((item: any) => {
          payment_money = operationAdd(payment_money, item.inventory_money)
          num = operationAdd(num, item.number)
        })
        state.addForm.payment_money = payment_money
        state.addForm.num = num
      },
      async delAddData(index: any) {
        let id = state.addForm.data[index]?.id
        const order_number = state.addForm.order_number
        if (id) {
          requests.getUpdRemove(id, order_number)
        }
        state.addForm.data.splice(index, 1)

        // 重新计算最终总金额
        methods.calculateFinallyMoney()
      },
      updateAddData(index: any, data: any) {
        state.addForm.data[index].number = data[index].number
        state.addForm.data[index].inventory_unit_money = data[index].inventory_unit_money
        state.addForm.data[index].inventory_money = data[index].inventory_money
        state.addForm.data[index].inventory_location = data[index].inventory_location
        // 重新计算最终总金额
        methods.calculateFinallyMoney()
      },
      addRow() {
        const addrefvar = addRefVar
        addrefvar.value.validate((valid: any) => {
          if (valid) {
            let row = {
              number: state.addForm.number,
              unit: state.addForm.unit,
              model_number: state.addForm.model_number,
              inventory_type: state.addForm.inventory_type,
              inventory_location: state.addForm.inventory_location,
              inventory_unit_money: state.addForm.inventory_unit_money,
              inventory_money: state.addForm.inventory_money,
              product_grade: state.addForm.product_grade
            }
            // 先判断和之前的是否重复
            let isRepeat = state.addForm.data.some(
              (item: any) =>
                item.unit === row.unit &&
                item.model_number === row.model_number &&
                item.inventory_type === row.inventory_type &&
                item.inventory_location === row.inventory_location &&
                item.product_grade === row.product_grade
            )
            let confirmAddRow = () => {
              state.addForm.data.push(row)
              // 重新计算最终总金额
              methods.calculateFinallyMoney()
              // 获取子组件，传递数据，调用方法
              const updtableref = updTableRef
              updtableref.value.pushTableData(state.commonLists, row)
            }
            if (isRepeat) {
              ElMessageBox.confirm(t('common.confirmRepeatAdd'), t('common.tip'), {
                confirmButtonText: t('common.confirm'),
                cancelButtonText: t('common.cancel'),
                type: 'warning'
              })
                .then(() => {
                  confirmAddRow()
                })
                .catch(() => {
                  ElMessage({
                    type: 'info',
                    message: t('common.cancelAdd')
                  })
                })
            } else {
              confirmAddRow()
            }
          }
        })
      },
      // 单位和数量改变
      unitMoneyAndNumChange(arg: string) {
        let unit_money: any
        let number: any
        unit_money = state.addForm.inventory_unit_money
        number = state.addForm.number
        unit_money = !unit_money ? 0 : unit_money
        number = !number ? 0 : number
        state.addForm.inventory_money = operationMul(unit_money, number)
      },
      reset(arg: any) {
        // 重置表单
        const addref = addRef
        addref.value.resetFields()
        //  重置addRefVar
        const addrefvar = addRefVar
        addrefvar.value.resetFields()
        //  重置子组件表格数据
        const updtableref = updTableRef
        updtableref.value.tableData = []

        state.addForm.data = []
        ctx.emit('reset', arg)
      },
      // 添加时库存类型改变加载库存型号
      inventoryTypeChange() {
        let inventory_type: any
        state.addForm.model_number = null
        inventory_type = state.addForm.inventory_type
        ctx.emit('inventoryTypeChange', inventory_type)
      },
      onSubmitUpd() {
        const addref = addRef
        addref.value.validate((valid: boolean) => {
          if (valid) {
            // 用户输入的内容校验成功才发起请求
            ElMessageBox.confirm(t('common.tip'), {
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
                  message: t('common.cancelAdd')
                })
              })
          }
        })
      }
    }
    onMounted(() => {
      // 一次就失效
    })

    // onDeactivated(() => {
    //
    // })
    return {
      ...toRefs(state),
      ...requests,
      ...methods,
      addRef,
      addRule,
      addRuleVar,
      addRefVar,
      updTableRef
    }
  }
})
</script>
<style lang="scss" scoped>
@import '@/assets/css/page-common-draw.scss'; //页面基础布局样式一
@import '@/assets/css/element-common-style.scss';
</style>
