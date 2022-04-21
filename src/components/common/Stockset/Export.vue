<template>
  <!-- 导出表单 -->
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
            <el-form-item :label="$t('common.inventory_warehouse_name')" prop="warehouse">
              <el-select v-model="exportForm.warehouse" filterable clearable>
                <el-option
                  v-for="(item, index) in commonLists.warehouseList"
                  :key="index"
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
            <el-form-item :label="$t('common.inventory_type_name')" prop="inventory_type">
              <el-select
                v-model="exportForm.inventory_type"
                filterable
                clearable
                @change="inventoryTypeChange"
              >
                <el-option
                  v-for="(item, index) in commonLists.typeList"
                  :key="index"
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
              <el-select v-model="exportForm.model_number" filterable clearable>
                <el-option
                  v-for="(item, index) in commonLists.modelList"
                  :key="index"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="differ_page === 'amountcollect'">
          <el-col :span="24">
            <el-form-item :label="$t('common.currency_unit_name')" prop="currency_unit">
              <el-select v-model="exportForm.currency_unit" filterable clearable>
                <el-option
                  v-for="(item, index) in commonLists.currencyUnitList"
                  :key="index"
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
            <el-form-item :label="$t('common.date_start_end')" prop="date">
              <el-date-picker
                v-model="exportForm.date"
                :unlink-panels="true"
                type="daterange"
                :start-placeholder="$t('common.start_at')"
                :end-placeholder="$t('common.end_at')"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="排序字段" prop="search_value">
              <el-select filterable clearable v-model="exportForm.search_value">
                <el-option
                  v-for="item in commonLists.orderByFieldList"
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
      <el-button @click="onSubmitExport" type="success" plain>{{ $t('common.submit') }}</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { collectApi } from '@/http/api/othcustom/stockset/summary/collect'
import { datecollectApi } from '@/http/api/othcustom/stockset/summary/datecollect'
import { amountcollectApi } from '@/http/api/othcustom/stockset/summary/amountcollect'
import { IRequest } from '@/@types/httpInterface'
import dataStructure from '@/utils/dataStructure'
import { defineComponent, reactive, toRefs, computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElMessageBox, ElMessage } from 'element-plus'
import { dateNormDateRange } from '@/utils/dateNorm'
interface IState {
  exportForm: {
    warehouse: any
    inventory_type: any
    model_number: any
    order_by: any
    // ++
    date: any
    search_value: any
    currency_unit: any
  }
  configUrl: any
  execlUrl: any
}
interface IValid {
  checkOthers: {
    validatorFun: Function
    fun: Function
    info: string
    bool: boolean
  }
}
export default defineComponent({
  props: {
    commonLists: {
      type: Object,
      default: {}
    },
    differ_page: {
      type: String,
      default: ''
    },
    date: {
      type: Array,
      default: []
    }
  },
  emits: ['inventoryTypeChange', 'reset'],
  setup(props, ctx) {
    const { t } = useI18n()
    const state: IState = reactive({
      configUrl: process.env.VUE_APP_QIHONG_URL,
      execlUrl: '',
      exportForm: {
        warehouse: null,
        inventory_type: null,
        model_number: null,
        order_by: 1,
        currency_unit: null,
        date: props.date,
        search_value: null
      }
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
        order_by: [
          {
            required: true,
            message: t('common.not_empty')
          },
          { validator: valid.checkOthers.validatorFun }
        ],
        date: [
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
      getCollectExport() {
        state.exportForm.date = dateNormDateRange(state.exportForm.date)
        const { warehouse, inventory_type, model_number, currency_unit } = state.exportForm
        const data = dataStructure(
          { power_url: 'V1/Inventory/collect_index_export' },
          {
            order_by: state.exportForm.order_by,
            date: state.exportForm.date,
            search_value: state.exportForm.search_value,
            currency_unit,
            warehouse,
            inventory_type,
            model_number
          }
        )
        collectApi
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
      },
      getDatecollectExport() {
        const data = dataStructure(
          { power_url: 'V1/Inventory/date_collect_index_export' },
          state.exportForm
        )
        datecollectApi
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
      },
      getAmountcollectExport() {
        const data = dataStructure(
          { power_url: 'V1/Inventory/amount_collect_index_export' },
          state.exportForm
        )
        amountcollectApi
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
                state.exportForm.date = dateNormDateRange(state.exportForm.date)
                switch (props.differ_page) {
                  case 'collect':
                    requests.getCollectExport()
                    break
                  case 'datecollect':
                    requests.getDatecollectExport()
                    break
                  case 'amountcollect':
                    requests.getAmountcollectExport()
                    break
                  default:
                    break
                }
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
      inventoryTypeChange() {
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
