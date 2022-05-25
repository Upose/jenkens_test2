<!--
 * @Descripttion: 
 * @version: 
 * @Author: HYH
 * @Date: 2021-08-30 09:20:30
 * @LastEditors: TJ
 * @LastEditTime: 2021-11-11 13:23:31
-->
<!--  -->
<template>
  <div class="box-card formStyle">
    <div class="box-form">
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
              <el-input disabled v-model="updForm.id"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item :label="$t('common.com_code')" prop="com_code">
              <el-select filterable clearable v-model="updForm.com_code">
                <el-option
                  v-for="item in commonLists.companyList"
                  :key="item.com_code"
                  :label="item.com_name"
                  :value="item.com_code"
                >
                  <span style="float: left">{{ item.com_name }}</span>
                  <span style="float: right;color: #999999;">{{ item.com_code }}</span>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item :label="$t('common.quantum_id')" prop="quantum_id">
              <el-input v-model="updForm.quantum_id"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item :label="$t('common.work_job_id')" prop="work_job_id">
              <el-input v-model="updForm.work_job_id"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item :label="$t('common.is_enabled')" prop="is_enabled">
              <el-switch
                :active-value="1"
                :inactive-value="0"
                v-model="updForm.is_enabled"
              ></el-switch>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="box-button">
      <el-button @click="onSubmitUpd" type="success" plain>{{ $t('common.submit') }}</el-button>
    </div>
  </div>
</template>

<script lang="ts">
interface IState {
  updForm: {
    id: any
    com_code: any
    quantum_id: any
    work_job_id: any
    is_enabled: any
  }
}
import { timetableApi } from '@/http/api/users/usersset/timetable'
import { IRequest } from '@/@types/httpInterface'
import dataStructure from '@/utils/dataStructure'
import { defineComponent, reactive, toRefs, computed, ref } from 'vue'
import { IValid } from '../typings'
import { useI18n } from 'vue-i18n'
import { ElMessageBox, ElMessage } from 'element-plus'
export default defineComponent({
  props: {
    commonLists: {
      type: Object,
      default: {}
    }
  },
  emits: ['reset'],
  setup(props, ctx) {
    const { t } = useI18n()
    const selection = reactive({
      singleSelection: null
    })
    const state: IState = reactive({
      updForm: {
        id: '',
        com_code: '',
        quantum_id: '',
        work_job_id: '',
        is_enabled: ''
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
    const updRef = ref()
    const updRule = computed(() => {
      const rule = {
        id: [
          {
            required: true,
            message: t('common.not_empty')
          },
          { validator: valid.checkOthers.validatorFun }
        ],
        com_code: [
          {
            required: true,
            message: t('common.not_empty')
          },
          { validator: valid.checkOthers.validatorFun }
        ],
        quantum_id: [
          {
            required: true,
            message: t('common.not_empty')
          },
          { validator: valid.checkOthers.validatorFun }
        ],
        work_job_id: [
          {
            required: true,
            message: t('common.not_empty')
          },
          { validator: valid.checkOthers.validatorFun }
        ],
        is_enabled: [
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
      getUpd() {
        const args = dataStructure({ power_url: 'V1/WorkTimeTable/upd' }, state.updForm)
        timetableApi
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
              const updref = updRef
              updref.value.validateField(field_name)
            }
          })
          .catch(err => err)
      },
      getView(id: any) {
        const args = dataStructure({ power_url: 'V1/WorkTimeTable/view' }, { id })
        timetableApi
          .get_view(args)
          .then(res => {
            let { status, custom_data, info } = res as IRequest
            if (status === 200) {
              state.updForm.id = custom_data.id
              state.updForm.com_code = custom_data.com_code
              state.updForm.quantum_id = custom_data.quantum_id
              state.updForm.work_job_id = custom_data.work_job_id
              state.updForm.is_enabled = custom_data.is_enabled
            }
          })
          .catch(err => err)
      }
    }
    const methods = {
      reset(arg: any) {
        // 重置表单
        const updref = updRef
        updref.value.resetFields()
        //  重置updRefVar
        ctx.emit('reset', arg)
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
      }
    }

    return {
      ...toRefs(state),
      ...toRefs(selection),
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
