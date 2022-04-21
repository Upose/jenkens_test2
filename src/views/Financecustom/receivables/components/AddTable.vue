<!--
 * @Descripttion: 
 * @version: 
 * @Author: HYH
 * @Date: 2021-08-25 14:16:36
 * @LastEditors: TJ
 * @LastEditTime: 2022-03-14 17:49:26
-->
<!--  -->
<template>
	<div class="tableFormStyle">
		<el-table
			border
			:key="Math.random()"
			:data="tableData"
			height="500"
			highlight-current-row
			show-summary
		>
			<el-table-column
				show-overflow-tooltip
				prop="inventory_order_id"
				:label="$t('common.inventory_order_id')"
			>
			</el-table-column>

			<!-- 创建时间 -->
			<el-table-column
				show-overflow-tooltip
				prop="created_at"
				:label="$t('common.created_at')"
			>
			</el-table-column>
			<el-table-column
				show-overflow-tooltip
				prop="account_number_name"
				:label="$t('common.account_number')"
			>
			</el-table-column>
			<!-- 数量 -->
			<el-table-column
				show-overflow-tooltip
				prop="number"
				:label="$t('common.number')"
			>
			</el-table-column>

			<el-table-column
				show-overflow-tooltip
				prop="paid_amount"
				:label="$t('common.receivable_amount')"
			>
			</el-table-column>

			<el-table-column
				show-overflow-tooltip
				prop="wait_money"
				:label="$t('common.wait_collect_money')"
			>
			</el-table-column>
			<el-table-column
				show-overflow-tooltip
				prop="real_payment_money"
				:label="$t('common.this_payee')"
			>
			</el-table-column>
			<el-table-column
				show-overflow-tooltip
				prop="file"
				:label="$t(`common.payee_certificate`)"
			>
				<template #default="scope">
					<div style="height:22px;line-height:22px">
						<el-image
							v-for="(item2, index2) in scope.row.file"
							:key="index2"
							style="width:22px;height:22px;"
							:src="configUrl + item2"
							:preview-src-list="[configUrl + item2]"
							alt="#"
						/>
					</div>
				</template>
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
	tableData: any
	configUrl: any
}
import {
	defineComponent,
	ref,
	reactive,
	toRefs,
	onMounted,
	computed,
} from 'vue'
export default defineComponent({
	props: {
		// tableData: {
		// 	type: Array,
		// 	default: [],
		// },
	},
	setup(props, ctx) {
		const state: IState = reactive({
			configUrl: process.env.VUE_APP_QIHONG_URL,
			// tableData:  props.tableData, //这样赋值不会响应
			tableData: [],
		})
		const methods = {
			deleteRow(scope: any) {
				let index = scope.$index
				let data = state.tableData
				let deleted_row = data.splice(index, 1)[0]
				ctx.emit('updateTableData', index, deleted_row)
			},
			pushTableData(newRow: any) {
				state.tableData.push(newRow)
			},
		}
		onMounted(() => {})
		return {
			...toRefs(state),
			...methods,
		}
	},
})
</script>
<style lang="scss" scoped></style>
