<!--
 * @Descripttion: 
 * @version: 
 * @Author: HYH
 * @Date: 2021-08-30 15:36:38
 * @LastEditors: TJ
 * @LastEditTime: 2021-12-01 21:36:20
-->
<!--  -->
<template>
  <el-drawer title="出库单红冲" :size="800" v-model="showOutbound">
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
              <el-form-item :label="$t('common.id')" prop="id">
                <el-select clearable filterable v-model="addForm.id" @change="idChange">
                  <el-option
                    v-for="(item, index) of commonLists.allOutboundList"
                    :key="index"
                    :value="item.id"
                    :label="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- <el-row>
						<el-col :span="24">
							<el-form-item :label="$t('common.saleInfo_header')" prop="data">
								<el-select multiple clearable filterable  v-model="addForm.data">
									<el-option
										v-for="(item, index) of salesList"
										:key="index"
										:value="item.id"
										:label="item.id"
									></el-option>
								</el-select>
							</el-form-item>
						</el-col>
					</el-row> -->
          <el-row>
            <el-col :span="24">
              <el-form-item :label="$t('common.reason')" prop="reason">
                <el-input type="textarea" v-model="addForm.reason"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <el-divider content-position="left">销售信息</el-divider>
        <el-table
          border
          :key="Math.random()"
          :data="outboundList"
          height="500px"
          highlight-current-row
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column show-overflow-tooltip prop="id" :label="$t('common.ID')">
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="inventory_id"
            :label="$t('common.inventory_id')"
          >
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="order_number"
            :label="$t('common.order_number')"
          >
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="before_unsold"
            :label="$t('common.before_unsold')"
          >
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="later_unsold"
            :label="$t('common.later_unsold')"
          >
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="inventory_warehouse_name"
            :label="$t('common.inventory_warehouse_name')"
          >
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="inventory_type_name"
            :label="$t('common.inventory_type_name')"
          >
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="model_number_name"
            :label="$t('common.model_number_name')"
          >
          </el-table-column>
          <el-table-column show-overflow-tooltip prop="unit_name" :label="$t('common.unit_name')">
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="inventory_enter_type_name"
            :label="$t('common.inventory_enter_type_name')"
          >
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="sale_order_number"
            :label="$t('common.delivery_order_number')"
          >
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="handle_number"
            :label="$t('common.handle_number')"
          >
          </el-table-column>

          <!-- ============================ -->
          <el-table-column
            show-overflow-tooltip
            prop="created_name"
            :label="$t('common.created_name')"
          >
          </el-table-column>

          <el-table-column show-overflow-tooltip prop="created_at" :label="$t('common.created_at')">
          </el-table-column>
          <el-table-column show-overflow-tooltip prop="updated_at" :label="$t('common.updated_at')">
          </el-table-column>
        </el-table>
      </div>
      <div class="box-button">
        <el-button @click="onSubmitAdd" type="success" plain>{{ $t('common.submit') }}</el-button>
      </div>
    </div>
  </el-drawer>
</template>

<script lang="ts">
import { stocktakingApi } from '@/http/api/othcustom/stockset/stocktaking'
import { IRequest } from '@/@types/httpInterface'
import dataStructure from '@/utils/dataStructure'
import { useI18n } from 'vue-i18n'
import { dateNormOne, datetimeNormOne, dateNormArray } from '@/utils/dateNorm'
import { ElMessageBox, ElMessage } from 'element-plus'
import { IValid } from '../typings'
import { defineComponent, ref, reactive, toRefs, computed } from 'vue'
interface IState {
  addForm: {
    id: any
    reason: any
    data: any[]
  }
  commonLists: any
  outboundList: any
  showOutbound: boolean
}
export default defineComponent({
  props: {
    commonLists: {
      type: Object,
      default: {}
    },
    showOutbound: {
      type: Boolean,
      default: false
    }
  },
  emits: ['reset', 'typeChange'],

  setup(props, ctx) {
    const { t } = useI18n()
    const state: IState = reactive({
      addForm: {
        id: '',
        reason: '',
        data: []
      },
      commonLists: props.commonLists,
      showOutbound: props.showOutbound,
      outboundList: []
    })
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
    const addRef = ref()
    const addRule = computed(() => {
      const rule = {
        id: [
          { required: true, message: t('common.not_empty') },
          { validator: valid.checkOthers.validatorFun }
        ],
        reason: [
          { required: true, message: t('common.not_empty') },
          { validator: valid.checkOthers.validatorFun }
        ],
        data: [
          { required: true, message: t('common.not_empty') },
          { validator: valid.checkOthers.validatorFun }
        ]
      }
      return rule
    })

    const requests = {
      getOutbound() {
        const data = dataStructure(
          { power_url: 'V1/InventoryInformation/delivery_red_punch' },
          state.addForm
        )
        stocktakingApi
          .get_outbound(data)
          .then(res => {
            let { status, custom_data, info, field_name } = res as IRequest
            if (status === 200) {
              ElMessage({
                type: 'success',
                message: info
              })
              methods.reset('outbound')
            } else if (status === 421) {
              // 特殊信息显示在表单下面
              valid.checkOthers.info = info
              valid.checkOthers.num = true
              const addref = addRef
              addref.value.validateField(field_name)
            }
          })
          .catch(err => err)
      },
      getOutboundNextSearch() {
        const data = dataStructure(
          {},
          {
            sale_order_number: state.addForm.id
          }
        )
        stocktakingApi
          .get_outbound_next_search(data)
          .then(res => {
            let { status, custom_data, info } = res as IRequest
            if (status === 200) {
              state.outboundList = custom_data.data
            }
          })
          .catch(err => err)
      }
    }
    const methods = {
      handleSelectionChange(arg: any) {
        let data: any[] = []
        arg.forEach((item: any) => {
          data.push(item.id)
        })
        state.addForm.data = data
      },
      idChange() {
        requests.getOutboundNextSearch()
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
            ElMessageBox.confirm(t('common.confirmSubmit'), t('common.tip'), {
              confirmButtonText: t('common.confirm'),
              cancelButtonText: t('common.cancel'),
              type: 'warning'
            })
              .then(() => {
                requests.getOutbound()
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
    return {
      ...toRefs(state),
      ...methods,
      ...requests,
      addRule,
      addRef
    }
  }
})
</script>
<style lang="scss" scoped>
@import '@/assets/css/page-common-draw.scss'; //页面基础布局样式一
@import '@/assets/css/element-common-style.scss';
</style>
