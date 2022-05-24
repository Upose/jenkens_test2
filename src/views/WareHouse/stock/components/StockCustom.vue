<!--
 * @Descripttion: 
 * @version: 
 * @Author: XJ
 * @Date: 2021-06-18 11:24:23
 * @LastEditors: TJ
 * @LastEditTime: 2022-02-28 17:40:31
-->
<!--  -->
<template>
	<div class="stock_sale">
		<el-tabs v-model="tabs.activeName" type="card">
			<el-tab-pane :label="$t('common.sale_log')" name="first">
				<div class="tab2 tableButtonStyle">
					<el-table
						border
						:key="Math.random()"
						:data="tableData"
						:height="tableHeight"
						@row-click="rowClick"
						highlight-current-row
					>
						<el-table-column
							show-overflow-tooltip
							prop="sale_order_number"
							:label="$t('common.sale_order_number')"
							width="180"
						>
						</el-table-column>
						<el-table-column
							show-overflow-tooltip
							prop="handle_number"
							:label="$t('common.handle_number')"
							width="70"
						>
						</el-table-column>
						<el-table-column
							show-overflow-tooltip
							prop="created_at"
							:label="$t('common.created_at')"
							width="150"
						>
						</el-table-column>
					</el-table>
				</div>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs } from 'vue'
import { useI18n } from 'vue-i18n'
import { stockApi } from '@/http/api/othcustom/stockset/stock'
import { IRequest } from '@/@types/httpInterface'
import dataStructure from '@/utils/dataStructure'
import { dateNormArray } from '@/utils/dateNorm'
export default defineComponent({
	props: {
		onGetLog: {
			//父组件把方法传过来
			type: Function,
			default: null,
		},
	},
	setup(props) {
		const { t } = useI18n()
		const state = reactive({
			tableHeight: '100%',
			tabs: {
				activeName: 'first',
			},
			tableData: [],
		})
		const requests = {
			//  卖出列表接口：V1/Inventory/sale_list========用于下方表格
			getSaleList1(id: string) {
				const data = dataStructure(
					{},
					{
						inventory_id: id,
					}
				)
				stockApi
					.get_sale_list(data)
					.then(res => {
						let { status, custom_data, info } = res as IRequest
						if (status === 200) {
							let array: any = dateNormArray(custom_data)
							state.tableData = array
						}
					})
					.catch(err => err)
			},
		}
		const methods = {
			rowClick(arg: any) {
				let sale_order_number = arg.sale_order_number
				if (props.onGetLog) {
					props.onGetLog('', sale_order_number)
				}
			},
		}
		return {
			...toRefs(state),
			...methods,
			...requests,
		}
	},
})
</script>
<style lang="scss" scoped>
.stock_sale {
	width: 100%;
	height: 100%;
	.tab2 {
		height: 300px;
	}
}
</style>
