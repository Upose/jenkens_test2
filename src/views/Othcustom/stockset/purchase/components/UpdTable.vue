<!--
 * @Descripttion: 
 * @version: 
 * @Author: HYH
 * @Date: 2021-08-25 14:16:36
 * @LastEditors: XJ
 * @LastEditTime: 2022-03-29 16:32:05
-->
<!--  -->
<template>
  <div>
    <el-form ref="tableDataRef" class="tableFormStyle" :model="{ tableData }">
      <el-table border :key="Math.random()" :data="tableData" height="500" highlight-current-row>
        <el-table-column
          show-overflow-tooltip
          prop="product_grade"
          :label="$t('common.product_grade')"
        >
        </el-table-column>
        <!-- <el-table-column
				show-overflow-tooltip
				prop="warehouse"
				:label="$t('common.inventory_warehouse_name')"
			>
			</el-table-column> -->
        <el-table-column
          show-overflow-tooltip
          prop="inventory_type"
          :label="$t('common.inventory_type_name')"
        >
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="model_number"
          :label="$t('common.model_number_name')"
        >
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="unit" :label="$t('common.unit_name')">
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="number" :label="$t('common.number')">
          <template #default="scope">
            <el-form-item
              :prop="`tableData.${scope.$index}.number`"
              :rules="[
                {
                  required: true,
                  validator: (rule, value, callback) => {
                    checkOnlyNumZero(rule, value, callback)
                  },
                  trigger: 'change'
                }
              ]"
            >
              <el-input
                v-model="scope.row.number"
                @change="numberAndUnitMoneyChange(scope)"
              ></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="inventory_unit_money"
          :label="$t('common.inventory_unit_money')"
        >
          <template #default="scope">
            <el-form-item
              :prop="`tableData.${scope.$index}.inventory_unit_money`"
              :rules="[
                {
                  required: true,
                  validator: (rule, value, callback) => {
                    checkTwoDeci1(rule, value, callback)
                  },
                  trigger: 'change'
                }
              ]"
            >
              <el-input
                v-model="scope.row.inventory_unit_money"
                @change="numberAndUnitMoneyChange(scope)"
              ></el-input>
            </el-form-item>
          </template>
        </el-table-column>

        <el-table-column
          show-overflow-tooltip
          prop="inventory_money"
          :label="$t('common.inventory_money')"
        >
        </el-table-column>

        <el-table-column
          show-overflow-tooltip
          prop="inventory_location"
          :label="$t('common.inventory_location')"
        >
          <template #default="scope">
            <el-form-item
              :prop="`tableData.${scope.$index}.inventory_location`"
              :rules="[
                {
                  required: true,
                  trigger: 'change'
                }
              ]"
            >
              <el-input
                v-model="scope.row.inventory_location"
                @change="numberAndUnitMoneyChange(scope)"
              ></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column :label="$t('common.handle')">
          <template #default="scope">
            <el-button type="text" @click="deleteRow(scope)">{{ $t('common.clear') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
  </div>
</template>

<script lang="ts">
interface IState {
  tableData: any[]
}
import { defineComponent, ref, reactive, toRefs, onMounted } from 'vue'
import { checkTwoDeci1, checkOnlyNumZero } from '@/utils/regp'
import { operationMul } from '@/utils/operation'
import { ElMessageBox, ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  emits: ['delAddData', 'updateAddData'],
  setup(props, ctx) {
    const { t } = useI18n()
    const state: IState = reactive({
      tableData: []
    })
    const requests = {}
    const methods = {
      findName(arr: any, value: any, value_name: any) {
        let Item: any = arr.find((item: any) => {
          return item[value_name] == value
        })
        return Item?.name
      },
      deleteRow(scope: any) {
        let newData = state.tableData.filter((item: any) => item.id)

        if (newData.length <= 1 && scope.row?.id) {
          ElMessage({
            type: 'info',
            message: '不可删除'
          })
          return
        }
        ElMessageBox.confirm(t('common.tip'), {
          confirmButtonText: t('common.confirm'),
          cancelButtonText: t('common.cancel'),
          type: 'warning'
        })
          .then(() => {
            let index = scope.$index
            let data = state.tableData
            data.splice(index, 1)
            ctx.emit('delAddData', index)
          })
          .catch(() => {
            ElMessage({
              type: 'info',
              message: t('common.cancelDel')
            })
          })
      },
      pushTableData(commonLists: any, row: any) {
        const product_grade = methods.findName(
          commonLists.productGradeList,
          row.product_grade,
          'product_grade'
        )
        const inventory_type = methods.findName(commonLists.typeList, row.inventory_type, 'id')
        const model_number = methods.findName(commonLists.modelList, row.model_number, 'id')
        const unit = methods.findName(commonLists.unitList, row.unit, 'id')
        let newRow = {
          unit,
          product_grade,
          inventory_type,
          // 如果花色没有添加过，表格中显示花色name值,提交到后端由后端处理
          model_number: model_number ? model_number : row.model_number,
          inventory_location: row.inventory_location,
          number: row.number,
          inventory_unit_money: row.inventory_unit_money,
          inventory_money: row.inventory_money
        }
        state.tableData.push(newRow)
      },
      // 单价和数量改变时重新计算
      numberAndUnitMoneyChange(scope: any) {
        let index = scope.$index
        let data = state.tableData
        state.tableData[index].inventory_money = operationMul(
          data[index].number,
          data[index].inventory_unit_money
        )
        ctx.emit('updateAddData', index, data)
      }
    }
    onMounted(() => {})
    return {
      ...toRefs(state),
      ...requests,
      ...methods,
      checkTwoDeci1,
      checkOnlyNumZero
    }
  }
})
</script>
<style lang="scss" scoped>
@import '@/assets/css/element-common-style.scss';
</style>
