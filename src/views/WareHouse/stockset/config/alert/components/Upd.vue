<!--
 * @Descripttion: 
 * @Author: TJ
 * @LastEditors: TJ
 * @LastEditTime: 2022-03-10 09:43:29
-->
<!--
 * @Descripttion: 
 * @version: 
 * @Author: RD
 * @Date: 2021-11-04 09:41:32
 * @LastEditors: TJ
 * @LastEditTime: 2021-11-05 11:22:03
-->
<!--  -->
<template>
  <el-drawer :title="$t(`common.upd`)" :size="576" v-model="showUpd">
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
              <el-form-item :label="$t('common.ID')" prop="id">
                <el-input disabled v-model="updForm.id"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item :label="$t('common.low_order_number')" prop="low_order_number">
                <el-input v-model="updForm.low_order_number"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item :label="$t('common.high_order_number')" prop="high_order_number">
                <el-input v-model="updForm.high_order_number"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item :label="$t('common.inventory_warehouse_name')" prop="warehouse">
                <el-select filterable clearable v-model="updForm.warehouse">
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
                  v-model="updForm.inventory_type"
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
                <el-select filterable clearable v-model="updForm.model_number">
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
        <el-button @click="onSubmitUpd" type="success" plain>{{ $t('common.submit') }}</el-button>
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
  updForm: {
    id: any
    low_order_number: any
    high_order_number: any
    warehouse: any
    inventory_type: any
    model_number: any
  }
  showUpd: any
}
export default defineComponent({
  props: {
    commonLists: {
      type: Object,
      default: {}
    },
    showUpd: {
      type: Boolean,
      default: false
    }
  },
  emits: ['reset', 'inventoryTypeChange', 'closeAdd'],
  setup(props, ctx) {
    const { t } = useI18n()
    const state: IState = reactive({
      updForm: {
        id: null,
        low_order_number: null,
        high_order_number: null,
        warehouse: '',
        inventory_type: null,
        model_number: null
      },
      showUpd: props.showUpd
    })
    const updRule = computed(() => {
      const rule = {
        id: [
          { required: true, message: t('common.not_empty') },
          { validator: valid.checkOthers.validatorFun }
        ],
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
    const updRef = ref()
    const requests = {
      getUpd() {
        const data = dataStructure({ power_url: 'V1/InventoryUnit/upd' }, state.updForm)
        alertApi
          .get_upd(data)
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
      // 库存单位查询数据接口：V1/InventoryUnit/view
      getView(id: number) {
        const data = dataStructure(
          {},
          {
            id: id
          }
        )
        alertApi
          .get_view(data)
          .then(res => {
            let { status, custom_data, info } = res as IRequest
            if (status === 200) {
              let inventory_type = custom_data.inventory_type
              // 拿到类型再去加载型号
              ctx.emit('inventoryTypeChange', inventory_type)
              state.updForm.id = custom_data.id
              state.updForm.low_order_number = custom_data.low_order_number
              state.updForm.high_order_number = custom_data.high_order_number
              state.updForm.warehouse = custom_data.warehouse
              state.updForm.inventory_type = inventory_type
              state.updForm.model_number = custom_data.model_number
            }
          })
          .catch(err => err)
      }
    }
    const methods = {
      inventoryTypeChange(arg: any) {
        state.updForm.model_number = null

        ctx.emit('inventoryTypeChange', arg)
      },
      reset(arg: any) {
        const updref = updRef
        updref.value.resetFields()
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
      updRef,
      ...methods,
      ...requests,
      ...toRefs(state),
      updRule
    }
  }
})
</script>
<style lang="scss" scoped>
@import '@/assets/css/page-common-draw.scss'; //页面基础布局样式一
@import '@/assets/css/element-common-style.scss';
</style>
