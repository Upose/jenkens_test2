<!--
 * @Descripttion: 
 * @version: 
 * @Author: HYH
 * @Date: 2021-08-25 14:16:36
 * @LastEditors: TJ
 * @LastEditTime: 2021-11-11 13:12:36
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
				prop="warehouse"
				:label="$t('common.inventory_warehouse_name')"
			>
			</el-table-column>
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
				prop="supplier"
				:label="$t('common.inventory_supplier_name')"
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
				prop="currency_unit"
				:label="$t('common.currency_unit_name')"
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
		const selection = reactive({
			singleSelection: null,
		})
		const state: IState = reactive({
			tableData: [],
			// tableObj: [],
			// commonLists: [],
		})
		const requests = {}
		const methods = {
			//切换选择
			rowClick(val: any) {
				selection.singleSelection = val
			},
			findName(arr: any, id: any) {
				let Item: any = arr.find((item: any) => {
					return item.id == id
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
				let newRow: any = {
					warehouse: '',
					unit: '',
					model_number: '',
					inventory_type: '',
					supplier: '',
					currency_unit: '',
					inventory_location: '',
					number: '',
					inventory_unit_money: '',
					inventory_money: '',
				}
				const {
					inventory_location,
					number,
					inventory_unit_money,
					inventory_money,
				} = row
				const warehouse = methods.findName(
					commonLists.warehouseList,
					row.warehouse
				)
				const inventory_type = methods.findName(
					commonLists.typeList,
					row.inventory_type
				)
				const model_number = methods.findName(
					commonLists.modelList,
					row.model_number
				)
				const unit = methods.findName(commonLists.unitList, row.unit)
				const supplier = methods.findName(
					commonLists.supplierList,
					row.supplier
				)
				const currency_unit = methods.findName(
					commonLists.currencyUnitList,
					row.currency_unit
				)
				newRow = {
					warehouse,
					unit,
					model_number,
					inventory_type,
					supplier,
					currency_unit,
					inventory_location,
					number,
					inventory_unit_money,
					inventory_money,
				}

				state.tableData.push(newRow)
			},
		}

		return {
			...toRefs(state),
			...toRefs(selection),
			...requests,
			...methods,
			checkTwoDeci,
		}
	},
})
</script>
<style lang="scss" scoped></style>
