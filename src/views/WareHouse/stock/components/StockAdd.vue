<!--
 * @Descripttion: 
 * @version: 
 * @Author: HYH
 * @Date: 2021-08-30 09:20:30
 * @LastEditors: TJ
 * @LastEditTime: 2022-03-09 10:34:36
-->
<!--  -->
<template>
  <el-drawer :title="$t(`common.add`)" :size="1000" v-model="showAdd">
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
              <el-form-item :label="$t('common.order_number')" prop="order_number">
                <el-input v-model="addForm.order_number"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                :label="$t('common.inventory_enter_type_name')"
                prop="inventory_enter_type"
              >
                <el-select
                  filterable
                  clearable
                  v-model="addForm.inventory_enter_type"
                  @change="typeAndAtChange('entering_at')"
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
          <!-- <el-row>
              <el-col :span="24">
                <el-form-item :label="$t('common.id')" prop="id">
                  <el-input  v-model="addForm.id" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row> -->

          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('common.entering_at')" prop="entering_at">
                <el-date-picker
                  v-model="addForm.entering_at"
                  type="date"
                  @change="typeAndAtChange('inventory_enter_type')"
                >
                </el-date-picker>
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
              <el-form-item :label="$t('common.inventory_warehouse_name')" prop="warehouse">
                <el-select filterable clearable v-model="addForm.warehouse">
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
            <el-col :span="12">
              <el-form-item :label="$t('common.inventory_type_name')" prop="inventory_type">
                <el-select
                  filterable
                  clearable
                  v-model="addForm.inventory_type"
                  @change="inventoryTypeChange('add')"
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
                <el-select filterable clearable v-model="addForm.model_number">
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
                <el-select
                  filterable
                  clearable
                  v-model="addForm.unit"
                  :disabled="!(typeof addForm.model_number === 'number')"
                >
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
              <el-form-item :label="$t('common.inventory_supplier_name')" prop="supplier">
                <el-select filterable clearable v-model="addForm.supplier">
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
            <el-col :span="12">
              <el-form-item :label="$t('common.number')" prop="number">
                <el-input
                  v-model="addForm.number"
                  @change="unitMoneyAndNumChange('add')"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
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
              <el-form-item :label="$t('common.currency_unit_name')" prop="currency_unit">
                <el-select filterable clearable v-model="addForm.currency_unit">
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
              <el-form-item :label="$t('common.inventory_location')" prop="inventory_location">
                <el-input v-model="addForm.inventory_location"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div style="text-align:right">
          <el-button type="primary" @click="addRow">{{ $t('common.add_data') }}</el-button>
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
    entering_at: any
    order_number: any
    warehouse: any
    inventory_enter_type: any
    // ===
    inventory_unit_money: any
    inventory_money: any
    currency_unit: any
    model_number: any
    number: any
    unit: any
    inventory_type: any
    inventory_location: any
    supplier: any
    // ---------
    data: any[]
  }
  commonLists: any
  showAdd: boolean
}
import { stockApi } from '@/http/api/othcustom/stockset/stock'
import { IRequest } from '@/@types/httpInterface'
import dataStructure from '@/utils/dataStructure'
import { defineComponent, reactive, toRefs, onMounted, computed, ref } from 'vue'
import { IValid } from '../typings'
import { useI18n } from 'vue-i18n'
import { dateNormOne } from '@/utils/dateNorm'
import { ElMessageBox, ElMessage } from 'element-plus'
import { operationMul } from '@/utils/operation'
import AddTable from './AddTable.vue'
import { checkOnlyNum, checkTwoDeci, checkAt1 } from '@/utils/regp'
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
  emits: ['reset', 'inventoryTypeChange'],
  components: {
    AddTable
  },
  setup(props, ctx) {
    const { t } = useI18n()
    const selection = reactive({
      singleSelection: null
    })
    const state: IState = reactive({
      tableData: [],
      addForm: {
        entering_at: '',
        order_number: '',
        warehouse: null,
        inventory_enter_type: null,
        // ===
        inventory_unit_money: '',
        inventory_money: '',
        currency_unit: null,
        model_number: null,
        number: null,
        unit: null,
        inventory_type: null,
        inventory_location: '',
        supplier: null,
        // ---------
        data: []
      },
      commonLists: props.commonLists,
      showAdd: props.showAdd
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
    const addRule = computed(() => {
      const rule = {
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
            validator: (rule: object, value: string, callback: Function) => {
              let type: any
              if (state.addForm.inventory_enter_type === 1) {
                type = 'ltDate'
              } else if (state.addForm.inventory_enter_type === 0) {
                type = 'gtDate'
              }
              let times = state.addForm.entering_at
              checkAt1(rule, value, callback, type, times)
            }
          },
          { validator: valid.checkOthers.validatorFun }
        ],

        inventory_enter_type: [
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
        warehouse: [
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
        currency_unit: [
          {
            required: true,
            message: t('common.not_empty')
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
        ]
      }
      return rule
    })
    const requests = {
      // 库存管理添加接口：V1/Inventory/add
      getAdd() {
        let handle_entering_at = state.addForm.entering_at
        state.addForm.entering_at = handle_entering_at ? dateNormOne(handle_entering_at) : ''
        const { order_number, entering_at, inventory_enter_type, data } = state.addForm
        const args = dataStructure(
          { power_url: 'V1/Inventory/add' },
          { order_number, entering_at, inventory_enter_type, data }
        )
        stockApi
          .get_add(args)
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
              valid.checkOthers.bool = true
              const addref = addRef
              addref.value.validateField(field_name)
            }
          })
          .catch(err => err)
      }
    }
    const methods = {
      updateAddData(index: any) {
        state.addForm.data.splice(index, 1)
      },
      addRow() {
        const addrefvar = addRefVar
        addrefvar.value.validate((valid: any) => {
          if (valid) {
            const {
              warehouse,
              number,
              unit,
              model_number,
              inventory_type,
              supplier,
              inventory_location,
              inventory_unit_money,
              inventory_money,
              currency_unit
            } = state.addForm
            let row = {
              warehouse,
              number,
              unit,
              model_number,
              inventory_type,
              supplier,
              inventory_location,
              inventory_unit_money,
              inventory_money,
              currency_unit
            }
            state.addForm.data.push(row)
            // 获取子组件，传递数据，调用方法
            const addtableref = addTableRef
            addtableref.value.pushTableData(state.commonLists, row)
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
      // 添加时入库状态和时间改变，校验彼此
      typeAndAtChange(arg: string) {
        const addref = addRef
        addref.value.validateField(arg)
      },
      reset(arg: any) {
        // 重置表单
        // state.drawer.showAdd = false
        const addref = addRef
        addref.value.resetFields()
        //  重置addRefVar
        const addrefvar = addRefVar
        addrefvar.value.resetFields()
        addrefvar.value.tableData = []
        ctx.emit('reset', arg)
      },
      // 添加时库存类型改变加载库存型号
      inventoryTypeChange(arg: string) {
        let inventory_type: any
        state.addForm.model_number = null
        inventory_type = state.addForm.inventory_type
        ctx.emit('inventoryTypeChange', 'add', inventory_type)
      },
      onSubmitAdd() {
        const addref = addRef
        addref.value.validate((valid: boolean) => {
          if (valid) {
            // 用户输入的内容校验成功才发起请求
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
        })
      }
    }

    return {
      ...toRefs(state),
      ...toRefs(selection),
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
