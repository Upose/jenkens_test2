<!--
 * @Descripttion: 
 * @version: 
 * @Author: HYH
 * @Date: 2021-08-30 10:37:55
 * @LastEditors: TJ
 * @LastEditTime: 2021-11-11 13:14:19
-->
<!--  -->
<template>
  <el-drawer :title="$t(`common.export`)" :size="576" v-model="showExport">
    <div class="box-card formStyle">
      <div class="box-form">
        <el-form
          :model="exportForm"
          label-width="250px"
          :rules="exportRule"
          ref="exportRef"
          label-position="left"
          :validate-on-rule-change="false"
        >
          <el-row>
            <el-col :span="24">
              <el-form-item :label="$t('common.stock_state')" prop="stock">
                <el-select filterable clearable v-model="exportForm.stock">
                  <el-option
                    v-for="item in commonLists.stockList"
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
              <el-form-item
                :label="$t('common.inventory_enter_type_name')"
                prop="inventory_enter_type"
              >
                <el-select filterable clearable v-model="exportForm.inventory_enter_type">
                  <el-option
                    v-for="item in commonLists.enterTypeList2"
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
              <el-form-item :label="$t('common.start_at')" prop="start_at">
                <el-date-picker
                  v-model="exportForm.start_at"
                  type="date"
                  @change="atChange('end_at')"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="24">
              <el-form-item :label="$t('common.end_at')" prop="end_at">
                <el-date-picker
                  v-model="exportForm.end_at"
                  type="date"
                  @change="atChange('start_at')"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item :label="$t('common.order_number')" prop="order_number">
                <el-input v-model="exportForm.order_number"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item :label="$t('common.inventory_type_name')" prop="inventory_type">
                <el-select
                  filterable
                  clearable
                  v-model="exportForm.inventory_type"
                  @change="inventoryTypeChange('export')"
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
                <el-select filterable clearable v-model="exportForm.model_number">
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
                <el-select
                  filterable
                  clearable
                  v-model="exportForm.unit"
                  :disabled="!(typeof exportForm.model_number === 'number')"
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
            <el-col :span="24">
              <el-form-item :label="$t('common.inventory_warehouse_name')" prop="warehouse">
                <el-select filterable clearable v-model="exportForm.warehouse">
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
              <el-form-item :label="$t('common.num')" prop="num">
                <el-input v-model="exportForm.num"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item :label="$t('common.order_by')" prop="order_by">
                <el-select filterable clearable v-model="exportForm.order_by">
                  <el-option
                    v-for="item in commonLists.orderByList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="box-button">
        <el-button @click="onSubmitExport" type="success" plain>{{
          $t('common.submit')
        }}</el-button>
      </div>
    </div>
  </el-drawer>
  <!-- 导出表单 -->
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
import AddTable from './AddTable.vue'
import { checkOnlyNum, checkAt } from '@/utils/regp'
interface IState {
  exportForm: {
    stock: any
    inventory_enter_type: any
    start_at: any
    end_at: any
    order_number: any
    inventory_type: any
    model_number: any
    unit: any
    warehouse: any
    num: any
    order_by: any
  }
  configUrl: any
  execlUrl: any
  showExport: boolean
}
export default defineComponent({
  props: {
    commonLists: {
      type: Object,
      default: {}
    },
    showExport: {
      type: Boolean,
      default: false
    }
  },
  emits: ['reset', 'inventoryTypeChange'],
  setup(props, ctx) {
    const { t } = useI18n()
    const state: IState = reactive({
      configUrl: process.env.VUE_APP_QIHONG_URL,
      execlUrl: '',
      exportForm: {
        stock: 1,
        inventory_enter_type: 3,
        start_at: '',
        end_at: '',
        order_number: '',
        inventory_type: null,
        model_number: null,
        unit: null,
        warehouse: null,
        num: 100,
        order_by: 1
      },
      showExport: props.showExport
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
    const exportRule = computed(() => {
      const rule = {
        stock: [
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
        start_at: [
          {
            required: true,
            validator: (rule: object, value: string, callback: Function) => {
              let arg1 = state.exportForm.start_at
              let arg2 = state.exportForm.end_at
              checkAt(rule, value, callback, arg1, arg2)
            }
          },
          { validator: valid.checkOthers.validatorFun }
        ],
        end_at: [
          {
            required: true,
            validator: (rule: object, value: string, callback: Function) => {
              let arg1 = state.exportForm.start_at
              let arg2 = state.exportForm.end_at
              checkAt(rule, value, callback, arg1, arg2)
            }
          },
          { validator: valid.checkOthers.validatorFun }
        ],
        num: [
          {
            required: true,
            validator: checkOnlyNum
          },
          { validator: valid.checkOthers.validatorFun }
        ],
        order_by: [
          {
            required: true,
            message: t('common.not_empty')
          },
          { validator: valid.checkOthers.validatorFun }
        ]
      }
      return rule
    })
    const exportRef = ref()
    const requests = {
      getExport() {
        let start_at = state.exportForm.start_at
        state.exportForm.start_at = start_at ? dateNormOne(start_at) : ''
        let end_at = state.exportForm.end_at
        state.exportForm.end_at = end_at ? dateNormOne(end_at) : ''
        const data = dataStructure({ power_url: 'V1/Inventory/export' }, state.exportForm)
        stockApi
          .get_export(data)
          .then(res => {
            let { status, custom_data, info, field_name } = res as IRequest
            if (status === 200) {
              ElMessage({
                type: 'success',
                message: info
              })
              state.execlUrl = custom_data
              let urls = state.configUrl + '/' + state.execlUrl
              window.location.href = urls
              methods.reset('export')
            } else if (status === 421) {
              // 特殊信息显示在表单下面
              valid.checkOthers.info = info
              valid.checkOthers.bool = true
              const exportref = exportRef
              exportref.value.validateField(field_name)
            }
          })
          .catch(err => err)
      }
    }
    const methods = {
      // 开始时间改变校验结束时间
      // 结束时间改变校验开始时间
      atChange(arg: string) {
        const exportref = exportRef
        exportref.value.validateField(arg)
      },
      // 导出提交按钮
      onSubmitExport() {
        const exportref = exportRef
        exportref.value.validate((valid: boolean) => {
          if (valid) {
            ElMessageBox.confirm(t('common.confirmExport'), t('common.tip'), {
              confirmButtonText: t('common.confirm'),
              cancelButtonText: t('common.cancel'),
              type: 'warning'
            })
              .then(() => {
                requests.getExport()
              })
              .catch(() => {
                ElMessage({
                  type: 'info',
                  message: t('common.cancelExport')
                })
              })
          }
        })
      },
      reset(arg: any) {
        // 重置表单
        // state.drawer.showAdd = false
        const exportref = exportRef
        exportref.value.resetFields()
        ctx.emit('reset', arg)
      },
      // 添加时库存类型改变加载库存型号
      inventoryTypeChange(arg: string) {
        let inventory_type: any
        state.exportForm.model_number = null
        inventory_type = state.exportForm.inventory_type
        ctx.emit('inventoryTypeChange', 'export', inventory_type)
      }
    }
    return {
      ...toRefs(state),
      ...requests,
      ...methods,
      exportRef,
      exportRule
    }
  }
})
</script>
<style lang="scss" scoped>
@import '@/assets/css/page-common-draw.scss'; //页面基础布局样式一
@import '@/assets/css/element-common-style.scss';
</style>
