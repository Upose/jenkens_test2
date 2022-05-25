<!--
 * @Descripttion: 
 * @version: 
 * @Author: HYH
 * @Date: 2021-08-30 09:20:30
 * @LastEditors: TJ
 * @LastEditTime: 2021-12-14 16:36:34
-->
<!--  -->
<template>
  <div class="box-card formStyle">
    <div class="box-form">
      <el-form
        :model="updForm"
        label-width="200px"
        label-position="left"
        :rules="updRule"
        ref="updRef"
      >
        <el-row>
          <el-col :span="24">
            <el-form-item :label="$t('common.ID')" prop="id">
              <el-input v-model="updForm.id" disabled></el-input>
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
          <el-col :span="24"> </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item :label="$t('common.name')" prop="name">
              <el-input v-model="updForm.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item :label="$t('common.parent_id')" prop="parent_id">
              <el-select v-model="updForm.parent_name" filterable clearable>
                <el-option style="height: auto;padding: 0;">
                  <el-tree
                    :highlight-current="true"
                    node-key="id"
                    :data="commonLists.parentIdList"
                    :props="{
                      children: 'children',
                      label: 'name'
                    }"
                    accordion
                    @node-click="handleChange"
                  >
                  </el-tree>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item :label="$t('common.order_by')" prop="order_by">
              <el-input v-model="updForm.order_by"></el-input>
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
      <el-button type="success" plain @click="onSubmitUpd"> {{ $t('common.submit') }}</el-button>
    </div>
  </div>
</template>

<script lang="ts">
interface IState {
  updForm: {
    id: any
    name: any
    com_code: any
    parent_id: any
    parent_name: any
    is_enabled: any
    order_by: any
  }
}
import { organizationApi } from '@/http/api/users/usersset/organization'
import { IRequest } from '@/@types/httpInterface'
import dataStructure from '@/utils/dataStructure'
import { defineComponent, reactive, toRefs, computed, ref } from 'vue'
import { IValid } from '../typings'
import { useI18n } from 'vue-i18n'
import { ElMessageBox, ElMessage } from 'element-plus'
import { checkOnlyNumZero } from '@/utils/regp'
export default defineComponent({
  props: {
    commonLists: {
      type: Object,
      default: {}
    },
    singleSelection: {
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
        id: props.singleSelection.id,
        name: '',
        com_code: '',
        parent_id: '',
        parent_name: '',
        is_enabled: false,
        order_by: ''
      }
    })
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
    const updRef = ref()
    const updRule = computed(() => {
      const rule = {
        odl_id: [
          {
            required: true,
            message: t('common.not_empty')
          },
          {
            validator: valid.checkOthers.validatorFun
          }
        ],
        id: [
          {
            required: true,
            message: t('common.not_empty')
          },
          {
            validator: valid.checkOthers.validatorFun
          }
        ],
        name: [
          {
            required: true,
            message: t('common.not_empty')
          },
          {
            validator: valid.checkOthers.validatorFun
          }
        ],
        parent_id: [
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
            validator: checkOnlyNumZero
          },
          {
            validator: valid.checkOthers.validatorFun
          }
        ],
        is_enabled: [
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
      getUpd() {
        const data = dataStructure({ power_url: 'V1/Organization/upd' }, state.updForm)
        organizationApi
          .get_upd(data)
          .then((res: any) => {
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
              valid.checkOthers.num = true
              const updref = updRef
              updref.value.validateField(field_name)
            }
          })
          .catch((err: any) => err)
      },
      getView(id: number) {
        const data = dataStructure(
          {},
          {
            id: id
          }
        )
        organizationApi
          .get_view(data)
          .then((res: any) => {
            let { status, custom_data, info } = res as IRequest
            if (status === 200) {
              // 传回来的id是现在的old_id
              state.updForm.id = custom_data.id
              state.updForm.name = custom_data.name
              state.updForm.com_code = custom_data.com_code
              state.updForm.parent_id = custom_data.parent_id
              state.updForm.parent_name = custom_data.parent_name
              state.updForm.is_enabled = custom_data.is_enabled
              state.updForm.order_by = custom_data.order_by
            }
          })
          .catch((err: any) => err)
      }
    }
    const methods = {
      handleChange(data: any, node: any, self: any) {
        state.updForm.parent_id = data.id
        state.updForm.parent_name = data.name
      },
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
