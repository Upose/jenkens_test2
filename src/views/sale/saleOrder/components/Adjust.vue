<!--
 * @Descripttion: 
 * @version: 
 * @Author: HYH
 * @Date: 2021-08-30 11:42:28
 * @LastEditors: XJ
 * @LastEditTime: 2022-03-30 11:38:33
-->
<!--  -->
<template>
  <el-drawer :title="$t(`common.money_adjust`)" :size="800" v-model="showAdjust">
    <div class="box-card">
      <div class="box-form">
        <el-divider content-position="left">{{ $t('common.base_info') }}</el-divider>
        <el-form
          class="formStyle2"
          :model="addForm"
          label-width="140px"
          :rules="addRule"
          ref="addRef"
          label-position="left"
          :validate-on-rule-change="false"
        >
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('common.sale_order_number')" prop="sale_order_number">
                <el-input v-model="addForm.sale_order_number" disabled> </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('common.before_adjust_money')" prop="sale_money">
                <el-input v-model="addForm.sale_money" disabled> </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('common.adjust_money')" prop="adjust_money">
                <el-input v-model="addForm.adjust_money" disabled> </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('common.reason')" prop="reason">
                <el-input v-model="addForm.reason"> </el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <el-divider content-position="left">{{ $t('common.adjust_log') }}</el-divider>
        <el-form ref="tableDataRef" :model="tableDataForm" class="tableFormStyle">
          <el-table
            border
            :key="Math.random()"
            :data="tableDataForm.tableData"
            height="500"
            highlight-current-row
          >
            <el-table-column type="index"> </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="model_number_name"
              :label="$t('common.model_number_name')"
            >
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="inventory_type_name"
              :label="$t('common.inventory_type_name')"
            >
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="unit_name" :label="$t('common.unit_name')">
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="handle_number"
              :label="$t('common.number')"
            >
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="sale_unit_money"
              :label="$t('common.before_unit_price')"
            >
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="adjust_unit_money"
              :label="$t('common.after_unit_price')"
            >
              <template #default="scope">
                <el-form-item
                  :prop="`tableData.${scope.$index}.adjust_unit_money`"
                  :rules="[
                    {
                      required: true,
                      validator: (rule, value, callback) => {
                        checkTwoDeci(rule, value, callback)
                      },
                      trigger: 'change'
                    }
                  ]"
                >
                  <el-input
                    v-model="scope.row.adjust_unit_money"
                    @change="afterUnitPrice(scope.row.adjust_unit_money)"
                  ></el-input>
                </el-form-item>
              </template>
            </el-table-column>
          </el-table>
        </el-form>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagination.page"
          :page-size="pagination.perpage"
          :page-sizes="[13, 18, 23, 28]"
          layout="total,  prev, pager, sizes,next, jumper"
          :total="pagination.total"
          style="text-align:right;"
        >
        </el-pagination>
      </div>
      <div class="box-button">
        <el-button @click="onSubmitAdd" type="success" plain>{{ $t('common.submit') }}</el-button>
      </div>
    </div>
  </el-drawer>
</template>

<script lang="ts">
import { saleinventoryApi } from '@/http/api/othcustom/stockset/saleinventory'
import { IRequest } from '@/@types/httpInterface'
import dataStructure from '@/utils/dataStructure'
import { useI18n } from 'vue-i18n'
import { ElMessageBox, ElMessage } from 'element-plus'
import { checkTwoDeci } from '@/utils/regp'
import { changeMoney, changeNumber } from '@/utils/moneyToMicrometer'
import { dateNormArray } from '@/utils/dateNorm'
import { defineComponent, ref, reactive, toRefs, computed, watch } from 'vue'
import AdjustTable from './AdjustTable.vue'
import { operationMul, operationAdd } from '@/utils/operation'
import { useStore } from '@/store'
interface IState {
  addForm: {
    sale_order_number: any
    sale_money: any
    adjust_money: any
    reason: any
    data: any[]
  }
  showAdjust: boolean
  tableDataForm: {
    tableData: any[]
  }
  pagination: {
    page: any
    perpage: any
    total: any
  }
}
export default defineComponent({
  props: {
    showAdjust: {
      type: Boolean,
      default: false
    }
  },
  emits: ['reset'],
  components: {
    AdjustTable
  },
  setup(props, ctx) {
    const { t } = useI18n()
    const store = useStore()
    const state: IState = reactive({
      addForm: {
        sale_order_number: '',
        sale_money: '',
        adjust_money: '',
        reason: '',
        data: []
      },
      tableDataForm: {
        tableData: []
      },
      showAdjust: props.showAdjust,
      pagination: {
        page: 1,
        perpage: 18,
        total: 100
      }
    })

    const addRef = ref()
    const tableDataRef = ref()
    const addRule = computed(() => {
      const rule = {
        sale_order_number: [
          {
            required: true,
            message: t('common.not_empty')
          }
        ],
        sale_money: [
          {
            required: true,
            message: t('common.not_empty')
          }
        ],
        adjust_money: [
          {
            required: true,
            message: t('common.not_empty')
          }
        ],
        reason: [
          {
            required: true,
            message: t('common.not_empty')
          }
        ]
      }
      return rule
    })
    const requests = {
      getAdjustSaleMoney() {
        let tableData = state.tableDataForm.tableData
        // 将数据映射成后端需要的字段
        let newTableData = tableData.map((item, index, array) => {
          return {
            sale_order_number: item.sale_order_number,
            inventory_log_id: item.id, //这里对应不一样
            inventory_id: item.inventory_id,
            order_number: item.order_number,
            model_number: item.model_number,
            inventory_type: item.inventory_type,
            currency_unit: item.currency_unit,
            warehouse: item.warehouse,
            supplier: item.supplier,
            handle_number: item.handle_number,
            sale_unit_money: item.sale_unit_money,
            sale_money: item.sale_money,
            adjust_unit_money: item.adjust_unit_money
          }
        })
        state.addForm.data = newTableData
        const data = dataStructure(
          { power_url: 'V1/InventoryOrder/adjust_amount_of_money' },
          state.addForm
        )
        saleinventoryApi
          .get_adjust_sale_money(data)
          .then(res => {
            let { status, custom_data, info, field_name } = res as IRequest
            if (status === 200) {
              ElMessage({
                type: 'success',
                message: info
              })
              methods.reset('adjust')
            }
          })
          .catch(err => err)
      },
      // 销售记录
      getSaleLogList(sale_order_number: any) {
        // 先清空再赋值
        state.tableDataForm.tableData = []
        const data = dataStructure(
          {},
          {
            page: state.pagination.page,
            perpage: state.pagination.perpage,
            order_by: 1,
            sale_order_number
          }
        )
        saleinventoryApi
          .get_sale_log_list(data)
          .then(res => {
            let { status, custom_data, info } = res as IRequest
            if (status === 200) {
              state.pagination.total = custom_data.total
              let tableData: any = dateNormArray(custom_data.data)
              tableData.forEach((item: any) => {
                // 给调整后单价一个初始值
                item.adjust_unit_money = item.sale_unit_money = changeNumber(item.sale_unit_money)
                item.handle_number = changeNumber(item.handle_number)
              })
              state.tableDataForm.tableData = tableData
            }
          })
          .catch(err => err)
      }
    }
    const methods = {
      // // 由调整前的单价计算总金额
      // beforeUnitPriceChange(sale_unit_money: any) {
      // 	let sale_money = 0
      // 	let data = state.tableDataForm.tableData
      // 	data.forEach((item, index) => {
      // 		sale_money = operationAdd(
      // 			operationMul(item.sale_unit_money, item.handle_number),
      // 			sale_money
      // 		)
      // 	})
      // 	state.addForm.sale_money = sale_money
      // },
      // 由调整后的单价计算总金额
      afterUnitPrice(adjust_unit_money: any) {
        let adjust_money: any = 0
        let data = state.tableDataForm.tableData
        data.forEach((item, index) => {
          adjust_money = operationAdd(
            operationMul(item.adjust_unit_money, item.handle_number),
            adjust_money
          )
        })

        state.addForm.adjust_money = adjust_money
      },
      handleSizeChange(perpage: number) {
        state.pagination.perpage = perpage
        requests.getSaleLogList(state.addForm.sale_order_number)
      },
      handleCurrentChange(page: number) {
        state.pagination.page = page
        requests.getSaleLogList(state.addForm.sale_order_number)
      },
      reset(arg: any) {
        //重置基本信息
        const addref = addRef
        addref.value.resetFields()

        // 关闭抽屉
        ctx.emit('reset', arg)
      },
      // 校验用户提交的表格
      addFormDataRefValid() {
        let valid1: any
        const tabledataref = tableDataRef
        tabledataref.value.validate((valid: boolean) => {
          valid1 = valid
        })
        return valid1
      },
      onSubmitAdd() {
        // 先校验用户提交表格，失败则函数不再往下执行
        let valid1 = methods.addFormDataRefValid()
        let valid2 = null
        // 校验表单
        const addref = addRef
        addref.value.validate((valid: boolean) => {
          valid2 = valid
        })

        if (valid1 && valid2) {
          ElMessageBox.confirm(t('common.confirmAdd'), t('common.tip'), {
            confirmButtonText: t('common.confirm'),
            cancelButtonText: t('common.cancel'),
            type: 'warning'
          })
            .then(() => {
              requests.getAdjustSaleMoney()
            })
            .catch(() => {
              ElMessage({
                type: 'info',
                message: t('common.cancelAdd')
              })
            })
        }
      }
    }
    return {
      ...toRefs(state),
      ...requests,
      ...methods,
      checkTwoDeci,
      addRule,
      addRef,
      tableDataRef
    }
  }
})
</script>
<style lang="scss" scoped>
@import '@/assets/css/page-common-draw.scss'; //页面基础布局样式一
@import '@/assets/css/element-common-style.scss';
</style>
