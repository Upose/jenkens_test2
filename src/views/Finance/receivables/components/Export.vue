<!--
 * @Descripttion: 
 * @version: 
 * @Author: RD
 * @Date: 2021-10-29 14:19:39
 * @LastEditors: TJ
 * @LastEditTime: 2022-03-04 17:54:06
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
              <el-form-item :label="$t('common.status_type')" prop="status_type">
                <el-select
                  style="margin-right:10px;margin-bottom:5px"
                  filterable
                  clearable
                  v-model="exportForm.status_type"
                >
                  <el-option
                    v-for="(item, index) in commonLists.statusTypeList"
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
            <el-col :span="12">
              <el-form-item :label="$t('common.buy_user')" prop="buy_user">
                <el-select filterable clearable v-model="exportForm.buy_user">
                  <el-option
                    v-for="item in commonLists.customerList2"
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
          $t('common.export')
        }}</el-button>
      </div>
    </div>
  </el-drawer>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed, toRefs, onMounted } from 'vue'
import { receivablesApi } from '@/http/api/financecustom/receivables'
import { purchaseApi } from '@/http/api/othcustom/stockset/purchase'
import { IRequest } from '@/@types/httpInterface'
import dataStructure from '@/utils/dataStructure'
import { ElMessageBox, ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
import { dateNormOne } from '@/utils/dateNorm'
import { checkAt } from '@/utils/regp'
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
    const state = reactive({
      exportForm: {
        buy_user: '',
        status_type: '',
        start_at: '',
        end_at: '',
        num: 100,
        order_by: 1
      },
      configUrl: process.env.VUE_APP_QIHONG_URL,
      commonLists: props.commonLists,
      execlUrl: '',
      showExport: props.showExport
    })
    const exportRef = ref()

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
          }
        ],
        num: [
          {
            required: true,
            message: t('common.not_empty')
          }
        ],
        order_by: [
          {
            required: true,
            message: t('common.not_empty')
          }
        ],
        buy_user: [
          {
            required: true,
            message: t('common.not_empty')
          }
        ],
        status_type: [
          {
            required: true,
            message: t('common.not_empty')
          }
        ]
      }
      return rule
    })
    const requests = {
      // 财务中心收款管理导出接口：V1/ReceivablesManagement/export
      getExport() {
        const data = dataStructure(
          { power_url: 'V1/ReceivablesManagement/export' },
          {
            buy_user: state.exportForm.buy_user,
            status_type: state.exportForm.status_type,
            start_at: dateNormOne(state.exportForm.start_at),
            end_at: dateNormOne(state.exportForm.end_at),
            num: state.exportForm.num,
            order_by: state.exportForm.order_by
          }
        )
        receivablesApi
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
