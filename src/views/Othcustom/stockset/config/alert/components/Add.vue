<!--
 * @Descripttion: 
 * @version: 
 * @Author: RD
 * @Date: 2021-11-04 09:41:32
 * @LastEditors: TJ
 * @LastEditTime: 2022-03-10 09:23:55
-->
<!--  -->
<template>
  <el-drawer :title="$t(`common.add`)" :size="576" v-model="showAdd">
    <div class="box-card formStyle">
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
              <el-form-item :label="$t('common.low_order_number')" prop="low_order_number">
                <el-input v-model="addForm.low_order_number"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item :label="$t('common.high_order_number')" prop="high_order_number">
                <el-input v-model="addForm.high_order_number"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
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
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item :label="$t('common.inventory_type_name')" prop="inventory_type">
                <el-select
                  filterable
                  clearable
                  v-model="addForm.inventory_type"
                  @change="inventoryTypeChange"
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
import { defineComponent, ref, reactive, toRefs, computed, watch } from 'vue'
import { alertApi } from '@/http/api/othcustom/stockset/config/alert'
import { IRequest } from '@/@types/httpInterface'
import dataStructure from '@/utils/dataStructure'
import { ElMessageBox, ElMessage } from 'element-plus'
import { IValid } from '../typings'
import { useI18n } from 'vue-i18n'

interface IState {
  addForm: {
    low_order_number: any
    high_order_number: any
    warehouse: any
    inventory_type: any
    model_number: any
  }
  showAdd: any
}
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
  emits: ['reset', 'inventoryTypeChange', 'closeAdd'],
  setup(props, ctx) {
    const { t } = useI18n()
    const state: IState = reactive({
      addForm: {
        low_order_number: null,
        high_order_number: null,
        warehouse: '',
        inventory_type: null,
        model_number: null
      },
      showAdd: props.showAdd
    })
    const addRule = computed(() => {
      const rule = {
        low_order_number: [
          { required: true, message: t('common.not_empty') },
          { validator: valid.checkOthers.validatorFun }
        ],
        high_order_number: [
          { required: true, message: t('common.not_empty') },
          { validator: valid.checkOthers.validatorFun }
        ],
        warehouse: [
          { required: true, message: t('common.not_empty') },
          { validator: valid.checkOthers.validatorFun }
        ],
        inventory_type: [
          { required: true, message: t('common.not_empty') },
          { validator: valid.checkOthers.validatorFun }
        ],
        model_number: [
          { required: true, message: t('common.not_empty') },
          { validator: valid.checkOthers.validatorFun }
        ]
      }
      return rule
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
    const requests = {
      getAdd() {
        const data = dataStructure({ power_url: 'V1/InventoryUnit/add' }, state.addForm)
        alertApi
          .get_add(data)
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
      inventoryTypeChange(arg: string) {
        // 重置型号
        state.addForm.model_number = null

        ctx.emit('inventoryTypeChange', arg)
      },
      reset(arg: any) {
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
      addRef,
      ...methods,
      ...requests,
      ...toRefs(state),
      addRule
    }
  }
})
</script>
<style lang="scss" scoped>
@import '@/assets/css/page-common-draw.scss'; //页面基础布局样式一
@import '@/assets/css/element-common-style.scss';
</style>
