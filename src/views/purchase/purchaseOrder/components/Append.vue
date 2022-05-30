<!--
 * @Description: 
 * @version: 
 * @Author: HYH
 * @Date: 2021-08-30 09:20:30
 * @LastEditors: HYH
 * @LastEditTime: 2022-05-27 15:47:58
-->
<!--  -->
<template>
  <!-- 追加 -->
  <el-drawer :title="$t(`common.append`)" :size="1000" v-model="showAppend">
    <div class="box-card formStyle dividerStyle">
      <div class="box-form">
        <!-- 进本信息 -->
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
              <el-form-item :label="$t('common.id')" prop="id">
                <el-input v-model="addForm.id" disabled></el-input>
              </el-form-item>
            </el-col>
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
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('common.inventory_supplier_name')" prop="supplier">
                <el-select filterable clearable v-model="addForm.supplier">
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
            <el-col :span="12">
              <el-form-item :label="$t('common.inventory_warehouse_name')" prop="warehouse">
                <el-select filterable clearable v-model="addForm.warehouse">
                  <el-option
                    v-for="item in commonLists.warehouseList"
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
        <!-- 动态信息 -->
        <el-divider content-position="left">{{ $t('common.dynamic_info') }}</el-divider>
        <el-form
          :model="addVarForm"
          label-width="200px"
          :rules="addRuleVar"
          ref="addRefVar"
          label-position="right"
        >
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('common.product_grade')" prop="product_grade">
                <el-select filterable clearable v-model="addVarForm.product_grade">
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
                  v-model="addVarForm.inventory_type"
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
                  v-model="addVarForm.model_number"
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
                <el-select filterable clearable v-model="addVarForm.unit">
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
                  v-thousands
                  v-model="addVarForm.number"
                  @change="setTotalMoney"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('common.inventory_unit_money')" prop="inventory_unit_money">
                <el-input
                  v-thousands
                  v-model="addVarForm.inventory_unit_money"
                  @change="setTotalMoney"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('common.inventory_money')" prop="inventory_money">
                <el-input v-model="addVarForm.inventory_money" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('common.inventory_location')" prop="inventory_location">
                <el-input v-model="addVarForm.inventory_location"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div style="text-align:right">
          <el-button type="success" plain @click="addRow">{{ $t('common.add_data') }}</el-button>
        </div>
        <el-divider content-position="left">{{ $t('common.data_collect') }}</el-divider>
        <AddTable ref="addTableRef" @updateAddData="updateAddData"></AddTable>
      </div>

      <div class="box-button">
        <el-button @click="onSubmitAppend" type="success" plain>{{
          $t('common.submit')
        }}</el-button>
      </div>
    </div>
  </el-drawer>
</template>

<script lang="ts">
interface IState {
  addForm: {
    // 共有
    id: any
    payment_money: any // +
    num: any
    warehouse: any
    explain: any
    currency_unit: any
    supplier: any
  }
  // ---------汇总
  data: any[]
  addVarForm: {
    // ===单次添加
    inventory_unit_money: any
    inventory_money: any
    model_number: any
    number: any
    unit: any
    inventory_type: any
    inventory_location: any
    product_grade: any // +
  }
  commonLists: any
  showAppend: any
}
import { purchaseApi } from '@/http/api/othcustom/stockset/purchase'
import { IRequest } from '@/@types/httpInterface'
import dataStructure from '@/utils/dataStructure'
import { defineComponent, reactive, toRefs, onMounted, computed, ref } from 'vue'
import { IValid } from '../typings'
import { useI18n } from 'vue-i18n'
import { ElMessageBox, ElMessage } from 'element-plus'
import { operationMul, operationAdd } from '@/utils/operation'
import AddTable from './AddTable.vue'
import { defineRules, formatPrice } from '@/utils/formValid'
import { delComma } from '@/utils/thousand'
const { inputInfo, selectInfo, email, isNumber, two_length_number, debounce } = defineRules

export default defineComponent({
  props: {
    commonLists: {
      type: Object
    },
    showAppend: {
      type: Boolean,
      default: false
    }
  },
  emits: ['reset', 'inventoryTypeChange'],
  components: {
    AddTable
  },
  setup(props, ctx) {
    const { t } = useI18n()
    const state: IState = reactive({
      addForm: {
        // 共有
        id: '',
        payment_money: null,
        num: null, //不上传到后端
        warehouse: null,
        explain: '',
        currency_unit: null,
        supplier: null
      },
      addVarForm: {
        // ===单次添加
        inventory_unit_money: '',
        inventory_money: '',
        model_number: null,
        number: null,
        unit: null,
        inventory_type: null,
        inventory_location: '',
        product_grade: null // +产品等级
      },
      // ---------汇总
      data: [],
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
    const addTableRef = ref()
    const addRule = reactive({
      id: inputInfo,
      payment_money: inputInfo,
      supplier: selectInfo,
      currency_unit: selectInfo,
      warehouse: selectInfo
    })
    const addRuleVar = reactive({
      model_number: selectInfo,
      unit: selectInfo,
      number: isNumber,
      inventory_unit_money: two_length_number,
      inventory_type: selectInfo,
      inventory_money: selectInfo,
      product_grade: selectInfo
    })

    const requests = {
      // 追加请求
      getAppend() {
        const args = dataStructure(
          { power_url: 'V1/Stock/presell_additional' },
          {
            warehouse: state.addForm.warehouse,
            payment_money: state.addForm.payment_money,
            id: state.addForm.id,
            supplier: state.addForm.supplier,
            currency_unit: state.addForm.currency_unit,
            explain: state.addForm.explain,
            data: state.data
          }
        )
        purchaseApi
          .get_append(args)
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
              valid.checkOthers.bool = true
              const addref = addRef
              addref.value.validateField(field_name)
            }
          })
          .catch(err => err)
      },
      getAppendSearch(id: any) {
        const data = dataStructure({}, { id }) //id:进货单号
        purchaseApi
          .get_append_search(data)
          .then(res => {
            let { status, custom_data } = res as IRequest
            if (status === 200) {
              const { inventory, stock } = custom_data
              const addtableref = addTableRef
              // 重新加载需要清空表格数据
              addtableref.value.tableData = []
              state.addForm.id = stock.id
              state.addForm.payment_money = stock.payment_money
              state.addForm.supplier = stock.supplier
              state.addForm.currency_unit = stock.currency_unit
              state.addForm.num = stock.num
              state.addForm.warehouse = stock.warehouse
              state.addForm.explain = stock.explain
              inventory.forEach((item: any) => {
                // row1提交到后端的简化后数据
                let row1 = {
                  // warehouse: item.warehouse,
                  unit: item.unit,
                  model_number: item.model_number,
                  inventory_type: item.inventory_type,
                  inventory_location: item.inventory_location,
                  number: item.number,
                  inventory_unit_money: item.inventory_unit_money,
                  inventory_money: item.inventory_money,
                  product_grade: item.product_grade
                }
                state.data.push(row1)
                // row为表格显示数据
                let row = {
                  // warehouse: item.inventory_warehouse_name,
                  number: item.number,
                  unit: item.unit_name,
                  model_number: item.model_number_name,
                  inventory_type: item.inventory_type_name,
                  inventory_location: item.inventory_location,
                  inventory_unit_money: item.inventory_unit_money,
                  inventory_money: item.inventory_money,
                  product_grade: item.product_grade_name //+
                }
                const addtableref = addTableRef
                addtableref.value.tableData.push(row)
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
        state.data.forEach((item: any) => {
          payment_money = operationAdd(payment_money, item.inventory_money)
          num = operationAdd(num, item.number)
        })
        state.addForm.payment_money = payment_money
        state.addForm.num = num
      },
      updateAddData(index: any) {
        state.data.splice(index, 1)
        // 重新计算最终总金额
        methods.calculateFinallyMoney()
      },
      addRow() {
        const addrefvar = addRefVar
        addrefvar.value.validate((valid: any) => {
          if (valid) {
            let row = {
              number: state.addVarForm.number,
              unit: state.addVarForm.unit,
              model_number: state.addVarForm.model_number,
              inventory_type: state.addVarForm.inventory_type,
              inventory_location: state.addVarForm.inventory_location,
              inventory_unit_money: state.addVarForm.inventory_unit_money,
              inventory_money: state.addVarForm.inventory_money,
              product_grade: state.addVarForm.product_grade
            }
            // 先判断和之前的是否重复
            let isRepeat = state.data.some(
              (item: any) =>
                item.model_number === row.model_number &&
                item.inventory_type === row.inventory_type &&
                item.product_grade === row.product_grade
            )
            let confirmAddRow = () => {
              state.data.push(row)
              // 重新计算最终总金额
              methods.calculateFinallyMoney()
              // 获取子组件，传递数据，调用方法
              const addtableref = addTableRef
              addtableref.value.pushTableData(state.commonLists, row)
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
      /**设置入库总金额 */
      setTotalMoney(arg: string) {
        // addVarForm.number 数量
        // addVarForm.inventory_unit_money 单价
        state.addVarForm.inventory_money = formatPrice(
          delComma(state.addVarForm.number) * delComma(state.addVarForm.inventory_unit_money)
        )
      },
      reset(arg: any) {
        // 重置表单
        const addref = addRef
        addref.value.resetFields()
        //  重置addRefVar
        const addrefvar = addRefVar
        addrefvar.value.resetFields()

        state.data = []
        ctx.emit('reset', arg)
      },
      // 添加时库存类型改变加载库存型号
      inventoryTypeChange() {
        let inventory_type: any
        state.addVarForm.model_number = null
        inventory_type = state.addVarForm.inventory_type
        ctx.emit('inventoryTypeChange', inventory_type)
      },
      onSubmitAppend() {
        const addref = addRef
        let isValid = false
        addref.value.validate((valid: boolean) => {
          isValid = valid
        })
        if (!isValid) return //基本信息校验失败，不再执行
        if (!state.data.length) return //数据汇总没有数据，不再执行
        ElMessageBox.confirm(t('common.tip'), {
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
              message: t('common.cancelAdd')
            })
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
      addTableRef
    }
  }
})
</script>
<style lang="scss" scoped>
@import '@/assets/css/page-common-draw.scss'; //页面基础布局样式一
@import '@/assets/css/element-common-style.scss';
</style>
