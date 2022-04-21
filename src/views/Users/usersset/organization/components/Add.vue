<!--
 * @Descripttion: 
 * @version: 
 * @Author: HYH
 * @Date: 2021-08-30 09:20:30
 * @LastEditors: TJ
 * @LastEditTime: 2021-12-14 16:38:07
-->
<!--  -->
<template>
  <div class="box-card formStyle">
    <div class="box-form">
      <el-form
        :model="addForm"
        label-width="200px"
        label-position="left"
        :rules="addRule"
        ref="addRef"
      >
        <el-row>
          <el-col :span="24">
            <el-form-item :label="$t('common.com_code')" prop="com_code">
              <el-select filterable clearable v-model="addForm.com_code">
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
            <el-form-item :label="$t('common.name')" prop="name">
              <el-input v-model="addForm.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item :label="$t('common.parent_id')" prop="parent_id">
              <el-select v-model="addForm.parent_name" filterable clearable>
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
              <el-input v-model="addForm.order_by"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item :label="$t('common.is_enabled')" prop="is_enabled">
              <el-switch
                :active-value="1"
                :inactive-value="0"
                v-model="addForm.is_enabled"
              ></el-switch>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="box-button">
      <el-button type="success" plain @click="onSubmitAdd"> {{ $t('common.submit') }}</el-button>
    </div>
  </div>
</template>

<script lang="ts">
interface IState {
  addForm: {
    name: any
    com_code: any
    parent_id: any
    is_enabled: any
    order_by: any
    parent_name: any
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
    }
  },
  emits: ['reset'],
  setup(props, ctx) {
    const { t } = useI18n()
    const selection = reactive({
      singleSelection: null
    })
    const state: IState = reactive({
      addForm: {
        name: '',
        com_code: '',
        parent_id: '',
        parent_name: '', //属性下拉框辅助字段
        is_enabled: false,
        order_by: ''
        // id: '',
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
    const addRef = ref()
    const addRule = computed(() => {
      const rule = {
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
      getAdd() {
        const data = dataStructure({ power_url: 'V1/Organization/add' }, state.addForm)
        organizationApi
          .get_add(data)
          .then((res: any) => {
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
              valid.checkOthers.num = true
              const addref = addRef
              addref.value.validateField(field_name)
            }
          })
          .catch((err: any) => err)
      }
    }
    const methods = {
      handleChange(data: any, node: any, self: any) {
        state.addForm.parent_id = data.id
        state.addForm.parent_name = data.name
      },
      reset(arg: any) {
        // 重置表单
        const addref = addRef
        addref.value.resetFields()
        ctx.emit('reset', arg)
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
      addRule
    }
  }
})
</script>
<style lang="scss" scoped>
@import '@/assets/css/page-common-draw.scss'; //页面基础布局样式一
@import '@/assets/css/element-common-style.scss';
</style>
