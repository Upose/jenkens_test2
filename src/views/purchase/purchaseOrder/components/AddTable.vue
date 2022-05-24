<!--
 * @Descripttion: 
 * @version: 
 * @Author: HYH
 * @Date: 2021-08-25 14:16:36
 * @LastEditors: TJ
 * @LastEditTime: 2022-03-14 09:55:25
-->
<!--  -->
<template>
	<div class="tableFormStyle">
		<!-- show-summary -->
		<el-table
			border
			:key="Math.random()"
			:data="tableData"
			height="500"
			highlight-current-row
		>
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
			<el-table-column
				show-overflow-tooltip
				prop="unit"
				:label="$t('common.unit_name')"
			>
			</el-table-column>
			<el-table-column
				show-overflow-tooltip
				prop="number"
				:label="$t('common.number')"
			>
			</el-table-column>
			<el-table-column
				show-overflow-tooltip
				prop="inventory_unit_money"
				:label="$t('common.inventory_unit_money')"
			>
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
			</el-table-column>
			<el-table-column :label="$t('common.handle')">
				<template #default="scope">
					<el-button type="text" @click="deleteRow(scope)">{{
						$t('common.clear')
					}}</el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script lang="ts">
interface IState {
	tableData: any[]
}
import { defineComponent, ref, reactive, toRefs, onMounted } from 'vue'
import { checkTwoDeci, checkSaleNumber1 } from '@/utils/regp'
export default defineComponent({
	emits: ['updateAddData'],
	setup(props, ctx) {
		const state: IState = reactive({
			tableData: [],
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
				let index = scope.$index
				let data = state.tableData
				data.splice(index, 1)
				ctx.emit('updateAddData', index)
			},
			pushTableData(commonLists: any, row: any) {
				const product_grade = methods.findName(
					commonLists.productGradeList,
					row.product_grade,
					'product_grade'
				)
				const inventory_type = methods.findName(
					commonLists.typeList,
					row.inventory_type,
					'id'
				)
				const model_number = methods.findName(
					commonLists.modelList,
					row.model_number,
					'id'
				)
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
					inventory_money: row.inventory_money,
				}
				state.tableData.push(newRow)
			},
		}
		onMounted(() => {})
		return {
			...toRefs(state),
			...requests,
			...methods,
			checkTwoDeci,
		}
	},
})
</script>
<style lang="scss" scoped></style>
