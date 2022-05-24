<!--
 * @Descripttion: 
 * @version: 
 * @Author: HYH
 * @Date: 2021-08-30 15:36:38
 * @LastEditors: TJ
 * @LastEditTime: 2021-12-04 19:03:34
-->
<!--  -->
<template>
  <el-drawer title="库存数量调整" :size="800" v-model="showQuantity">
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
                <el-input v-model="addForm.id">
                  <template #append>
                    <el-button class="el-icon-search" @click="onSearch"></el-button>
                  </template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="24">
              <el-form-item :label="$t('common.number')" prop="number ">
                <el-input v-model="addForm.number" disabled> </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item :label="$t('common.order_number')" prop="order_number ">
                <el-input v-model="addForm.order_number" disabled> </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item :label="$t('common.sale_number')" prop="sale_number ">
                <el-input v-model="addForm.sale_number" disabled> </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item
                :label="$t('common.compare_adjuster_number')"
                prop="compare_adjuster_number"
              >
                <el-input v-model="addForm.compare_adjuster_number" disabled> </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item :label="$t('common.adjuster_number')" prop="adjuster_number">
                <el-input v-model="addForm.adjuster_number"> </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item :label="$t('common.reason')" prop="reason">
                <el-input type="textarea" v-model="addForm.reason"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <el-divider content-position="left">调整信息</el-divider>
        <el-table
          border
          :key="Math.random()"
          :data="quantityList"
          height="500px"
          highlight-current-row
        >
          <el-table-column show-overflow-tooltip prop="id" :label="$t('common.ID')">
          </el-table-column>

          <el-table-column
            show-overflow-tooltip
            prop="order_number"
            :label="$t('common.order_number')"
          >
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="before_number"
            :label="$t('common.before_number')"
          >
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="after_number"
            :label="$t('common.after_number')"
          >
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="number"
            :label="$t('common.adjuster_number')"
          >
          </el-table-column>
          <el-table-column show-overflow-tooltip prop="reason" :label="$t('common.reason')">
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
import { defineComponent, ref, reactive, toRefs, computed } from 'vue'
interface IState {
  addForm: {
    id: any
    adjuster_number: any
    compare_adjuster_number: any
    number: any
    order_number: any
    sale_number: any
    reason: any
  }
  commonLists: any
  quantityList: any
  showQuantity: boolean
}
export default defineComponent({
  props: {
    commonLists: {
      type: Object,
      default: {}
    },
    showQuantity: {
      type: Boolean,
      default: false
    }
  },
  emits: ['reset', 'typeChange'],

  setup(props, ctx) {
    const { t } = useI18n()
    const state: IState = reactive({
      addForm: {
        adjuster_number: null,
        compare_adjuster_number: null,
        id: '',
        number: null,
        order_number: '',
        sale_number: '',
        reason: ''
      },
      commonLists: props.commonLists,
      showQuantity: props.showQuantity,
      quantityList: []
    })

    const addRef = ref()
    const addRule = computed(() => {
      const rule = {
        id: [{ required: true, message: t('common.not_empty') }],
        reason: [{ required: true, message: t('common.not_empty') }],
        adjuster_number: [{ required: true, message: t('common.not_empty') }]
      }
      return rule
    })

    const requests = {
      // 可满足条件的库存信息调整搜索搜索接口y

      getQuantitySearch() {
        const data = dataStructure(
          {},
          {
            id: state.addForm.id
          }
        )
        stocktakingApi
          .get_quantity_search(data)
          .then(res => {
            let { status, custom_data, info } = res as IRequest
            if (status === 200) {
              state.addForm.compare_adjuster_number = custom_data.adjuster_number
              state.addForm.number = custom_data.number
              state.addForm.order_number = custom_data.order_number
              state.addForm.sale_number = custom_data.sale_number
            }
          })
          .catch(err => err)
      },
      getQuantity() {
        const data = dataStructure(
          { power_url: 'V1/InventoryInformation/quantity_adjuster' },
          state.addForm
        )
        stocktakingApi
          .get_quantity(data)
          .then(res => {
            let { status, custom_data, info, field_name } = res as IRequest
            if (status === 200) {
              ElMessage({
                type: 'success',
                message: info
              })
              methods.reset('quantity_adjuster')
            }
          })
          .catch(err => err)
      },
      getQuantityList() {
        const data = dataStructure(
          {},
          {
            id: state.addForm.id
          }
        )
        stocktakingApi
          .get_quantity_list(data)
          .then(res => {
            let { status, custom_data, info } = res as IRequest
            if (status === 200) {
              state.quantityList = custom_data
            }
          })
          .catch(err => err)
      }
    }
    const methods = {
      onSearch() {
        requests.getQuantitySearch()
        requests.getQuantityList()
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
                requests.getQuantity()
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
