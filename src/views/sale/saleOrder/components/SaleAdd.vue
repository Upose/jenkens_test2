<!--
 * @Description: 
 * @version: 
 * @Author: XJ
 * @Date: 2021-07-09 11:37:00
 * @LastEditors: HYH
 * @LastEditTime: 2022-05-26 16:55:46
-->
<!--  -->
<template>
  <div class="sale_add dividerStyle">
    <!-- 数据汇总 -->
    <el-divider content-position="left">{{ $t('common.data_collect') }}</el-divider>
    <el-form ref="addFormDataRef" :model="addForm" class="tableFormStyle">
      <el-table
        border
        :key="Math.random()"
        :data="addForm.addFormData"
        height="250"
        highlight-current-row
      >
        <!-- 库存ID -->
        <el-table-column
          show-overflow-tooltip
          prop="inventory_id"
          :label="$t('common.inventory_id')"
        >
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
        <!-- 可追加数量 -->
        <el-table-column
          show-overflow-tooltip
          prop="unsold_number"
          :label="$t('common.unsold_number')"
        >
        </el-table-column>
        <!-- 销售数量 -->
        <el-table-column show-overflow-tooltip prop="sale_number" :label="$t('common.sale_number')">
          <template #default="scope">
            <el-form-item
              :prop="`addFormData.${scope.$index}.sale_number`"
              :rules="[
                {
                  required: true,
                  validator: (rule, value, callback) => {
                    checkSaleNumber1(rule, value, callback, scope.row.unsold_number)
                  },
                  trigger: ['change', 'blur']
                }
              ]"
            >
              <el-input
                v-thousands
                v-model="scope.row.sale_number"
                @change="unitMoneyAndNumChange('add')"
              ></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <!-- 单价 -->
        <el-table-column
          show-overflow-tooltip
          prop="sale_unit_money"
          :label="$t('common.sale_unit_money')"
        >
          <template #default="scope">
            <el-form-item
              :prop="`addFormData.${scope.$index}.sale_unit_money`"
              :rules="[
                {
                  required: true,
                  validator: checkTwoDeci1,
                  trigger: ['change', 'blur']
                }
              ]"
            >
              <el-input
                v-thousands
                v-model="scope.row.sale_unit_money"
                @change="unitMoneyAndNumChange('add')"
              ></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <!-- 应收金额 -->
        <el-table-column show-overflow-tooltip prop="sale_money" :label="$t('common.sale_money')">
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="inventory_enter_type_name"
          :label="$t('common.inventory_enter_type_name')"
        >
        </el-table-column>
        <!-- 操作 -->
        <el-table-column show-overflow-tooltip :label="$t('common.handle')">
          <template #default="scope">
            <el-button @click.stop="addDeleteRow(scope.$index, addForm.addFormData)" type="text">
              {{ $t('common.remove') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
    <el-divider content-position="left">{{ $t('common.show_search') }}</el-divider>
    <!-- 搜索内容 -->
    <div class="formStyle">
      <el-input
        style="margin:0px 0px 10px"
        :placeholder="$t('common.searchValue')"
        v-model="addSearchValue"
        @focus="onAddFocus"
        @change="onAddSearch"
      >
        <template #append>
          <el-button icon="el-icon-search" @click="onAddSearch"></el-button> </template
      ></el-input>

      <span style="font-size:12px;color:#f56c6c;margin-left:10px" v-show="addSearchInfo">{{
        addSearchInfo
      }}</span>
    </div>

    <el-table
      :key="Math.random()"
      :data="addSearchData"
      :height="300"
      highlight-current-row
      @row-click="addRowClick2"
    >
      <el-table-column show-overflow-tooltip prop="inventory_id" :label="$t('common.inventory_id')">
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
      <el-table-column
        show-overflow-tooltip
        prop="inventory_enter_type_name"
        :label="$t('common.inventory_enter_type_name')"
      >
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="unsold_number"
        :label="$t('common.unsold_number')"
      >
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, toRefs, watch, ref } from 'vue'
import { saleinventoryApi } from '@/http/api/othcustom/stockset/saleinventory'
import { IRequest } from '@/@types/httpInterface'
import dataStructure from '@/utils/dataStructure'
import { dateNormArray, dateNormOne } from '@/utils/dateNorm'
import { checkTwoDeci1, checkSaleNumber1 } from '@/utils/regp'
export default defineComponent({
  props: {
    addForm: {
      type: Object,
      default: {}
    }
  },
  emits: ['unitMoneyAndNumChange', 'addRowClick2'],
  setup(props, ctx) {
    const state = reactive({
      addSearchValue: '',
      addSearchInfo: '',
      addSearchData: []
    })
    const addFormDataRef = ref()
    const requests = {
      getSaleSearch(arg: string) {
        // 先清空报错提示
        state.addSearchInfo = ''
        const data = dataStructure(
          {},
          {
            search_value: arg,
            product_grade: props.addForm.product_grade
          }
        )
        saleinventoryApi
          .get_sale_search(data)
          .then(res => {
            let { status, custom_data, info } = res as IRequest
            if (status === 200) {
              console.log(custom_data)

              let tableData: any = dateNormArray(custom_data.data)
              state.addSearchData = tableData
            } else if (status === 421) {
              // 特殊信息显示
              state.addSearchInfo = info
            }
          })
          .catch(err => err)
      }
    }
    const methods = {
      addFormDatarefValid() {
        let valid: any
        const addformdataref = addFormDataRef
        addformdataref.value.validate((valid2: boolean) => {
          valid = valid2
        })

        return valid
      },
      unitMoneyAndNumChange(arg: string) {
        ctx.emit('unitMoneyAndNumChange', arg)
      },
      // 添加页面删除
      addDeleteRow(index: number, rows: any) {
        rows.splice(index, 1)
        ctx.emit('unitMoneyAndNumChange', 'add')
      },
      onAddSearch() {
        requests.getSaleSearch(state.addSearchValue)
      },
      onAddFocus() {
        state.addSearchInfo = ''
      },
      addRowClick2(val: any) {
        ctx.emit('addRowClick2', val)
      }
    }
    return {
      ...toRefs(state),
      ...methods,
      checkTwoDeci1,
      checkSaleNumber1,
      addFormDataRef
    }
  }
})
</script>
<style lang="scss" scoped>
@import '@/assets/css/table.scss';
@import '@/assets/css/element-common-style.scss';
</style>
