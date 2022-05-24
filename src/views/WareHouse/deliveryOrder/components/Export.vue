<!--
 * @Descripttion: 
 * @version: 
 * @Author: RD
 * @Date: 2021-10-29 14:19:39
 * @LastEditors: TJ
 * @LastEditTime: 2022-03-07 10:02:29
-->
<!--  -->
<template>
  <el-drawer :title="$t(`common.export`)" :size="576" v-model="showExport">
    <div class="box-card formStyle">
      <div class="box-form">
        <el-form
          :model="exportForm"
          label-width="200px"
          :rules="exportRule"
          ref="exportRef"
          label-position="left"
        >
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
          $t('common.export')
        }}</el-button>
      </div>
    </div>
  </el-drawer>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed, toRefs, onMounted } from 'vue'
import { deliveryinventoryApi } from '@/http/api/othcustom/stockset/deliveryinventory'
import { purchaseApi } from '@/http/api/othcustom/stockset/purchase'
import { IRequest } from '@/@types/httpInterface'
import dataStructure from '@/utils/dataStructure'
import { ElMessageBox, ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
import { dateNormOne } from '@/utils/dateNorm'
import { checkAt } from '@/utils/regp'
interface IValid {
  checkOthers: {
    validatorFun: Function
    fun: Function
    info: string
    num: boolean
  }
}
export default defineComponent({
  props: {
    commonLists: {
      type: Object
    },
    showExport: {
      type: Boolean,
      default: false
    }
  },
  emits: ['reset'],
  setup(props, ctx) {
    const { t } = useI18n()
    const state = reactive({
      exportForm: {
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
            message: t('common.not_empty')
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
      // 生成cvg接口
      getDeliveryinventoryExport() {
        const data = dataStructure(
          { power_url: 'V1/InventoryDelivery/export' },
          {
            start_at: dateNormOne(state.exportForm.start_at),
            end_at: dateNormOne(state.exportForm.end_at),
            num: state.exportForm.num,
            order_by: state.exportForm.order_by
          }
        )
        deliveryinventoryApi
          .get_export(data)
          .then(res => {
            let { status, custom_data, info, field_name } = res as IRequest
            if (status === 200) {
              ElMessage({
                type: 'success',
                message: info
              })
              let urls = state.configUrl + '/' + custom_data
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
      // 开始时间改变校验结束时间
      // 结束时间改变校验开始时间
      atChange(arg: string) {
        const exportref = exportRef
        exportref.value.validateField(arg)
      },
      reset(arg: any) {
        // 重置表单
        // state.drawer.showAdd = false
        const exportref = exportRef
        exportref.value.resetFields()
        ctx.emit('reset', arg)
      },
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
                requests.getDeliveryinventoryExport()
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
    onMounted(() => {})
    return {
      ...toRefs(state),
      ...methods,
      ...requests,
      exportRule,
      exportRef
    }
  }
})
</script>
<style lang="scss" scoped>
@import '@/assets/css/page-common-draw.scss'; //页面基础布局样式一
@import '@/assets/css/element-common-style.scss';
</style>
