<!--
 * @Description: 
 * @version: 
 * @Author: HYH
 * @Date: 2021-08-30 09:20:30
 * @LastEditors: HYH
 * @LastEditTime: 2022-05-26 16:09:05
-->
<template>
  <!-- 开单 -->
  <el-drawer :title="$t(`common.billing`)" :size="1000" v-model="showAdd">
    <div class="box-card formStyle dividerStyle">
      <div class="box-form">
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
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('common.gross')" prop="collect_number">
                <el-input v-model="addForm.collect_number" disabled></el-input>
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
            <el-col :span="12">
              <el-form-item :label="$t('common.explain')" prop="explain">
                <el-input v-model="addForm.explain" type="textarea"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>

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
            <!-- 数量 -->
            <el-col :span="12">
              <el-form-item :label="$t('common.number')" prop="number">
                <el-input v-thousands v-model="addVarForm.number" @blur="setTotalMoney"> </el-input>
              </el-form-item>
            </el-col>
            <!-- 单价 -->
            <el-col :span="12">
              <el-form-item :label="$t('common.inventory_unit_money')" prop="inventory_unit_money">
                <el-input
                  v-thousands
                  v-model="addVarForm.inventory_unit_money"
                  @blur="setTotalMoney"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <!-- 入库金额 -->
              <el-form-item :label="$t('common.inventory_money')" prop="inventory_money">
                <el-input v-model="addVarForm.inventory_money" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <!-- 货位 -->
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
        <el-button @click="onSubmitAdd" type="success" plain>{{ $t('common.submit') }}</el-button>
      </div>
    </div>
  </el-drawer>
</template>

<script lang="ts">
interface IState {
  tableData: any[]
  addForm: {
    payment_money: any
    warehouse: any
    explain: any
    currency_unit: any
    supplier: any
    collect_number: any
  }
  addVarForm: {
    inventory_unit_money: any
    inventory_money: any
    model_number: any
    number: any
    unit: any
    inventory_type: any
    inventory_location: any
    product_grade: any
  }
  // ---------汇总
  data: any[]
  commonLists: any
}
import { purchaseApi } from '@/http/api/othcustom/stockset/purchase'
import { IRequest } from '@/@types/httpInterface'
import dataStructure from '@/utils/dataStructure'
import { defineComponent, reactive, toRefs, onMounted, computed, ref, onActivated } from 'vue'
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
    showAdd: {
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
      currentComponent: 'AddTable',
      tableData: [],
      addForm: {
        payment_money: null,
        warehouse: null,
        explain: '',
        currency_unit: null,
        supplier: null,
        collect_number: null
      },
      addVarForm: {
        inventory_unit_money: '',
        inventory_money: '',
        model_number: null,
        number: null,
        unit: null,
        inventory_type: null,
        inventory_location: '',
        product_grade: null // +产品等级
      },
      data: [],

      commonLists: props.commonLists,
      showAdd: props.showAdd
    })
    const addRef = ref()
    const addRefVar = ref()
    const addTableRef = ref()
    const addRule = reactive({
      payment_money: selectInfo,
      supplier: selectInfo,
      currency_unit: selectInfo,
      warehouse: selectInfo
    })
    const addRuleVar = reactive({
      model_number: selectInfo,
      number: isNumber,
      inventory_unit_money: two_length_number,
      unit: selectInfo,
      inventory_type: selectInfo,
      inventory_money: selectInfo,
      product_grade: selectInfo
    })

    const requests = {
      // 库存管理添加接口：V1/Stock/add
      getAdd() {
        const args = dataStructure(
          { power_url: 'V1/Stock/add' },
          {
            warehouse: state.addForm.warehouse,
            payment_money: state.addForm.payment_money,
            supplier: state.addForm.supplier,
            currency_unit: state.addForm.currency_unit,
            explain: state.addForm.explain,
            data: state.data
          }
        )
        purchaseApi
          .get_add(args)
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
      }
    }
    const methods = {
      // 计算最终总金额
      calculateFinallyMoney() {
        let payment_money: any = 0
        let collect_number: any = 0
        state.data.forEach((item: any) => {
          payment_money = operationAdd(payment_money, item.inventory_money, true)
          collect_number = operationAdd(collect_number, item.number, true)
        })
        state.addForm.payment_money = payment_money
        state.addForm.collect_number = collect_number
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
              // 上传到后端的data添加数据
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
      setTotalMoney() {
        // addVarForm.number 数量
        // addVarForm.inventory_unit_money 单价
        state.addVarForm.inventory_money = formatPrice(
          delComma(state.addVarForm.number) * delComma(state.addVarForm.inventory_unit_money)
        )
      },

      reset(arg: any) {
        // 重置基本信息表单
        const addref = addRef
        addref.value.resetFields()
        //  重置动态信息表单
        const addrefvar = addRefVar
        addrefvar.value.resetFields()
        // 将addForm中的data清空
        state.data = []
        // 子组件表格清空
        const addtableref = addTableRef
        addtableref.value.tableData = []
        ctx.emit('reset', arg)
      },
      // 添加时库存类型改变加载库存型号
      inventoryTypeChange() {
        let inventory_type: any
        state.addVarForm.model_number = null
        inventory_type = state.addVarForm.inventory_type
        ctx.emit('inventoryTypeChange', inventory_type)
      },
      onSubmitAdd() {
        const addref = addRef
        let isValid = false
        addref.value.validate((valid: boolean) => {
          isValid = valid
        })
        if (!isValid) return //基本信息校验失败，不再执行
        if (!state.data.length) return //数据汇总没有数据，不再执行
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
    onMounted(() => {})
    onActivated(() => {})
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
