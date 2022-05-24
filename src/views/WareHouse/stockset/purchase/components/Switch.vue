<!--
 * @Descripttion: 
 * @version: 
 * @Author: HYH
 * @Date: 2021-08-30 09:20:30
 * @LastEditors: TJ
 * @LastEditTime: 2021-11-10 17:47:03
-->
<!--  -->
<template>
  <el-drawer :title="$t(`common.switch`)" :size="576" v-model="showSwitch">
    <div class="box-card formStyle dividerStyle">
      <div class="box-form">
        <el-form
          :model="addForm"
          label-width="200px"
          :rules="addRule"
          ref="addRef"
          label-position="left"
        >
          <el-row>
            <el-col :span="24">
              <el-form-item :label="$t('common.id')" prop="id">
                <el-input v-model="addForm.id" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item :label="$t('common.stock_type_name')" prop="stock_type">
                <el-select filterable clearable v-model="addForm.stock_type">
                  <el-option
                    v-for="item in commonLists.stockTypeList"
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
        <el-button @click="onSubmitAdd" type="success" plain>{{ $t('common.submit') }}</el-button>
      </div>
    </div>
  </el-drawer>
</template>

<script lang="ts">
interface IState {
  addForm: {
    id: any
    stock_type: any
  }
  commonLists: any
}
import { purchaseApi } from '@/http/api/othcustom/stockset/purchase'
import { IRequest } from '@/@types/httpInterface'
import dataStructure from '@/utils/dataStructure'
import { defineComponent, reactive, toRefs, computed, ref, onMounted, watch } from 'vue'
import { IValid } from '../typings'
import { useI18n } from 'vue-i18n'
import { ElMessageBox, ElMessage } from 'element-plus'
export default defineComponent({
  props: {
    commonLists: {
      type: Object
    },
    showSwitch: {
      type: Boolean,
      default: false
    },
    singleSelection: {
      type: Object,
      default: {}
    }
  },
  emits: ['reset'],
  setup(props, ctx) {
    const { t } = useI18n()
    const state: IState = reactive({
      addForm: {
        id: computed(() => props.singleSelection.id),
        stock_type: null
      },
      commonLists: props.commonLists,
      showSwitch: props.showSwitch
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
    const addRule = computed(() => {
      const rule = {
        id: [
          {
            required: true,
            message: t('common.not_empty')
          },
          { validator: valid.checkOthers.validatorFun }
        ],
        stock_type: [
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
      getSwitch() {
        const args = dataStructure(
          { power_url: 'V1/Stock/transfer_of_order' },
          {
            id: state.addForm.id,
            stock_type: state.addForm.stock_type
          }
        )
        purchaseApi
          .get_switch(args)
          .then(res => {
            let { status, custom_data, info, field_name } = res as IRequest
            if (status === 200) {
              ElMessage({
                type: 'success',
                message: info
              })
              methods.reset('switch')
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
            ElMessageBox.confirm(t('common.confirmSubmit'), t('common.tip'), {
              confirmButtonText: t('common.confirm'),
              cancelButtonText: t('common.cancel'),
              type: 'warning'
            })
              .then(() => {
                requests.getSwitch()
              })
              .catch(() => {
                ElMessage({
                  type: 'info',
                  message: t('common.cancelSubmit')
                })
              })
          }
        })
      }
    }
    onMounted(() => {})
    return {
      ...toRefs(state),
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
