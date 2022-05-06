<!--
 * @Descripttion: 
 * @version: 
 * @Author: HYH
 * @Date: 2021-08-30 15:24:12
 * @LastEditors: HYH
 * @LastEditTime: 2022-04-21 18:30:43
-->
<!--  -->
<template>
  <el-drawer :title="$t(`common.export`)" :size="576" v-model="showExport">
    <div class="box-card">
      <div class="box-form">
        <el-form
          class="formStyle"
          :model="exportForm"
          label-width="200px"
          :rules="exportRule"
          ref="exportRef"
          label-position="left"
        >
          <el-row>
            <el-col :span="24">
              <el-form-item :label="$t('common.collection_status_name')" prop="payment_status">
                <el-select filterable clearable v-model="exportForm.payment_status">
                  <el-option
                    v-for="item in commonLists.paymentStatusList2"
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
              <el-form-item :label="$t('common.buy_type_name')" prop="buy_type">
                <el-select filterable clearable v-model="exportForm.buy_type">
                  <el-option
                    v-for="item in commonLists.buyTypeList2"
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
import { saleinventoryApi } from '@/http/api/othcustom/stockset/saleinventory'
import { IRequest } from '@/@types/httpInterface'
import dataStructure from '@/utils/dataStructure'
import { useI18n } from 'vue-i18n'
import { dateNormOne } from '@/utils/dateNorm'
import { ElMessageBox, ElMessage } from 'element-plus'
import { operationMul } from '@/utils/operation'
import { checkOnlyNum, checkAt } from '@/utils/regp'
import { IValid } from '../typings'
import { defineComponent, ref, reactive, toRefs, computed } from 'vue'
interface IState {
  exportForm: {
    payment_status: any
    buy_type: any
    start_at: any
    end_at: any
    num: any
    order_by: any
  }
  configUrl: any
  execlUrl: any
  commonLists: any
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
  emits: ['reset'],
  setup(props, ctx) {
    const { t } = useI18n()
    const state: IState = reactive({
      exportForm: {
        payment_status: 3,
        buy_type: 3,
        start_at: '',
        end_at: '',
        num: 100,
        order_by: 1
      },
      configUrl: process.env.VUE_APP_QIHONG_URL,
      execlUrl: '',
      commonLists: props.commonLists,
      showExport: props.showExport
    })
    const exportRef = ref()
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
    const exportRule = computed(() => {
      const rule = {
        sale_type: [
          {
            required: true,
            message: t('common.not_empty')
          },
          {
            validator: valid.checkOthers.validatorFun
          }
        ],
        payment_status: [
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
          {
            validator: valid.checkOthers.validatorFun
          }
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
          {
            validator: valid.checkOthers.validatorFun
          }
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
          {
            validator: valid.checkOthers.validatorFun
          }
        ],
        num: [
          {
            required: true,
            validator: checkOnlyNum
          },
          {
            validator: valid.checkOthers.validatorFun
          }
        ],
        order_by: [
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
      // 导出接口
      getExport() {
        const data = dataStructure(
          { power_url: 'V1/InventoryOrder/export' },
          {
            payment_status: state.exportForm.payment_status,
            buy_type: state.exportForm.buy_type,
            start_at: dateNormOne(state.exportForm.start_at),
            end_at: dateNormOne(state.exportForm.end_at),
            num: state.exportForm.num,
            order_by: state.exportForm.order_by
          }
        )
        saleinventoryApi
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
              valid.checkOthers.num = true
              const exportref = exportRef
              exportref.value.validateField(field_name)
            }
          })
          .catch(err => err)
      }
    }
    const methods = {
      reset(arg: any) {
        // 重置表单
        switch (arg) {
          case 'export':
            //重置表单
            const exportref = exportRef
            exportref.value.resetFields()
            ctx.emit('reset', arg)
            break
          default:
            break
        }
      },

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
      }
    }
    return {
      ...toRefs(state),
      ...methods,
      ...requests,
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
