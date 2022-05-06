<!--
 * @Descripttion: 
 * @version: 
 * @Author: XJ
 * @Date: 2021-07-09 11:37:00
 * @LastEditors: HYH
 * @LastEditTime: 2022-05-06 09:40:25
-->
<!--  -->
<template>
  <div class="deinfo_add">
    <!-- 数据汇总 -->
    <el-divider content-position="left">{{ $t('common.data_collect') }}</el-divider>
    <!-- 要提交的表格 -->
    <el-form ref="addFormDataRef" :model="addForm" class="tableFormStyle">
      <el-table
        border
        :key="Math.random()"
        :data="addForm.addFormData"
        height="250"
        highlight-current-row
      >
        <!-- 库存ID -->
        <el-table-column show-overflow-tooltip prop="id" :label="$t('common.inventory_id')">
        </el-table-column>
        <!-- 品名 -->
        <el-table-column
          show-overflow-tooltip
          prop="inventory_type_name"
          :label="$t('common.inventory_type_name')"
        >
        </el-table-column>
        <!-- 型号 -->
        <el-table-column
          show-overflow-tooltip
          prop="model_number_name"
          :label="$t('common.model_number_name')"
        >
        </el-table-column>
        <!-- 销售单号 -->
        <el-table-column
          show-overflow-tooltip
          prop="sale_order_number"
          :label="$t('common.sale_order_number')"
        >
        </el-table-column>
        <!-- 操作量 -->
        <el-table-column
          show-overflow-tooltip
          prop="handle_number"
          :label="$t('common.handle_number')"
        >
        </el-table-column>
        <!-- 出库数量 -->
        <el-table-column
          show-overflow-tooltip
          prop="delivery_number"
          :label="$t('common.delivery_number')"
        >
          <template #default="scope">
            <el-form-item
              :prop="`addFormData.${scope.$index}.delivery_number`"
              :inline-message="true"
              :rules="[
                {
                  required: true,
                  validator: (rule, value, callback) => {
                    regexDeliverNum(rule, value, callback, scope)
                  },
                  trigger: 'change'
                }
              ]"
            >
              <el-input v-model="scope.row.delivery_number"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <!-- 入库状态 -->
        <el-table-column
          show-overflow-tooltip
          prop="inventory_enter_type_name"
          :label="$t('common.inventory_enter_type_name')"
        >
        </el-table-column>
        <!-- 操作 -->
        <el-table-column show-overflow-tooltip :label="$t('common.handle')">
          <!-- 移除 -->
          <template #default="scope">
            <el-button @click.stop="deleteRow(scope.$index, addForm.addFormData)" type="text">
              {{ $t('common.clear') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
    <!-- 展示搜索数据 -->
    <el-divider content-position="left">{{ $t('common.show_search') }}</el-divider>
    <el-table
      border
      :key="Math.random()"
      :data="addSearchData"
      :height="300"
      highlight-current-row
      @row-click="rowClick2"
    >
      <!-- 库存ID -->
      <el-table-column show-overflow-tooltip prop="inventory_id" :label="$t('common.inventory_id')">
      </el-table-column>
      <!-- 品名 -->
      <el-table-column
        show-overflow-tooltip
        prop="inventory_type_name"
        :label="$t('common.inventory_type_name')"
      >
      </el-table-column>
      <!-- 型号 -->
      <el-table-column
        show-overflow-tooltip
        prop="model_number_name"
        :label="$t('common.model_number_name')"
      >
      </el-table-column>
      <!-- 销售单号 -->
      <el-table-column
        show-overflow-tooltip
        prop="sale_order_number"
        :label="$t('common.sale_order_number')"
      >
      </el-table-column>
      <!-- 操作量 -->
      <el-table-column
        show-overflow-tooltip
        prop="handle_number"
        :label="$t('common.handle_number')"
      >
      </el-table-column>
      <!-- 入库状态 -->
      <el-table-column
        show-overflow-tooltip
        prop="inventory_enter_type_name"
        :label="$t('common.inventory_enter_type_name')"
      >
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref } from 'vue'
import { checkSaleNumber2, checkSaleNumber1, checkTwoDeci } from '@/utils/regp'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  props: {
    addForm: {
      type: Object,
      default: {}
    },
    addSearchData: {
      type: Array,
      default: []
    }
  },
  emits: ['rowClick2', 'unitMoneyAndNumChange'],
  setup(props, ctx) {
    const addFormDataRef = ref()
    const state = reactive({})
    const { t } = useI18n()
    const methods = {
      /**校验出库数量 */
      async regexDeliverNum(rule: object, value: string, callback: Function, scope: any) {
        // 出库数量不能大于未售数量
        const regpOnlyNum = /^[0-9]*[1-9][0-9]*$/
        if (!value) {
          callback(new Error(t('common.not_empty')))
        } else if (parseInt(scope.row.delivery_number) > parseInt(scope.row.handle_number)) {
          callback(new Error(`${t('common.not_greater_than')}${scope.row.handle_number}`))
        } else if (!regpOnlyNum.test(value)) {
          callback(new Error(t('common.regpOnlyNum')))
        } else {
          callback()
        }
      },
      unitMoneyAndNumChange(arg: string) {
        ctx.emit('unitMoneyAndNumChange', arg)
      },
      addFormDataRefValid() {
        let valid: any
        const addFormDataref = addFormDataRef
        addFormDataref.value.validate((valid2: boolean) => {
          valid = valid2
        })
        return valid
      },
      rowClick2(val: any) {
        ctx.emit('rowClick2', val)
      },
      deleteRow(index: number, rows: any) {
        rows.splice(index, 1)
      }
    }
    return {
      ...toRefs(state),
      ...methods,
      addFormDataRef,
      checkSaleNumber2
    }
  }
})
</script>
<style lang="scss" scoped>
@import '@/assets/css/table.scss';
@import '@/assets/css/element-common-style.scss';
</style>
