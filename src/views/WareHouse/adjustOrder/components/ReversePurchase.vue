<!--
 * @Descripttion: 
 * @version: 
 * @Author: HYH
 * @Date: 2021-08-30 15:36:38
 * @LastEditors: TJ
 * @LastEditTime: 2022-03-10 14:24:26
-->
<!--  -->
<template>
  <el-drawer title="进货单红冲" :size="800" v-model="showPurchase">
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
                <el-select clearable filterable v-model="addForm.id" @change="orderNumberChange">
                  <el-option
                    v-for="(item, index) of commonLists.allPurchaseList"
                    :key="index"
                    :value="item.id"
                    :label="item.order_number"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- <el-row>
						<el-col :span="24">
							<el-form-item :label="$t('common.purchase')" prop="data">
								<el-select multiple clearable filterable  v-model="addForm.data">
									<el-option
										v-for="(item, index) of purchaseList"
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
        <el-divider content-position="left">进货信息</el-divider>
        <el-table
          border
          :key="Math.random()"
          :data="purchaseList"
          height="500px"
          highlight-current-row
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" />
          <template v-for="(item, index) in customArgs.all_array" :key="index">
            <el-table-column
              v-if="item.isChecked"
              show-overflow-tooltip
              :prop="item.label"
              :label="$t(`common.${item.label}`)"
            >
            </el-table-column>
          </template>
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
import { defineComponent, ref, reactive, toRefs, computed, onMounted, onActivated } from 'vue'
import { CUSTOM_TABLES } from '@/constant/bus/bus_custom_table'
import { commonApi } from '@/http/api/common'
interface IState {
  addForm: {
    id: any
    reason: any
    data: any[]
  }
  commonLists: any
  purchaseList: any
  showPurchase: boolean
  customArgs: {
    all_array: any[]
    common_array: any[]
    table: any
  }
}
export default defineComponent({
  props: {
    commonLists: {
      type: Object,
      default: {}
    },
    showPurchase: {
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
      showPurchase: props.showPurchase,
      purchaseList: [],
      customArgs: {
        all_array: [],
        common_array: ['created_id', 'created_name', 'created_at', 'updated_at', 'id'],
        table: CUSTOM_TABLES.INVENTORY
      }
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
        ]
      }
      return rule
    })

    const requests = {
      getCustom() {
        const data = dataStructure(
          { power_url: 'V1/Public/the_custom_column' },
          {
            table: state.customArgs.table
          }
        )
        commonApi
          .get_custom(data)
          .then(res => {
            let { status, custom_data, info } = res as IRequest
            if (status === 200) {
              const { all_array } = custom_data.data
              state.customArgs.all_array = all_array
            }
          })
          .catch(err => err)
      },
      getPurchase() {
        const data = dataStructure(
          { power_url: 'V1/InventoryInformation/stock_red_punch' },
          state.addForm
        )
        stocktakingApi
          .get_purchase(data)
          .then(res => {
            let { status, custom_data, info, field_name } = res as IRequest
            if (status === 200) {
              ElMessage({
                type: 'success',
                message: info
              })
              methods.reset('order')
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
      getPurchaseNextSearch(order_number: any) {
        const data = dataStructure({}, { order_number })
        stocktakingApi
          .get_purchase_next_search(data)
          .then(res => {
            let { status, custom_data, info } = res as IRequest
            if (status === 200) {
              state.purchaseList = custom_data.data
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

      orderNumberChange(id: any) {
        let Item = props.commonLists.allPurchaseList.find((item: any) => item.id === id)

        requests.getPurchaseNextSearch(Item?.order_number)
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
                requests.getPurchase()
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
    onMounted(() => {
      requests.getCustom()
    })

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
