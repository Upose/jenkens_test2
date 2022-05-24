<!--
 * @Descripttion: 
 * @version: 
 * @Author: HYH
 * @Date: 2021-08-25 14:16:36
 * @LastEditors: TJ
 * @LastEditTime: 2021-11-11 13:13:34
-->
<!--  -->
<template>
	<el-drawer
		:title="$t(`common.lot_details`)"
		:size="1000"
		v-model="showLotDetails"
	>
		<div class="formStyle desLabel" style="padding:20px">
			<el-divider content-position="left">{{
				$t('common.base_info')
			}}</el-divider>
			<el-descriptions :column="1">
				<el-descriptions-item
					align="right"
					:width="200"
					:label="$t('common.order_number') + ':'"
					>{{ order_number }}</el-descriptions-item
				>
			</el-descriptions>
			<el-divider content-position="left">{{
				$t('common.data_collect')
			}}</el-divider>
			<el-table
				v-if="tableData.length"
				:key="Math.random()"
				:data="tableData"
				height="500"
				highlight-current-row
			>
				<el-table-column
					show-overflow-tooltip
					prop="inventory_warehouse_name"
					:label="$t('common.inventory_warehouse_name')"
				>
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
					prop="unit_name"
					:label="$t('common.unit_name')"
				>
				</el-table-column>
				<el-table-column
					show-overflow-tooltip
					prop="inventory_supplier_name"
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
					prop="unsold"
					:label="$t('common.unsold')"
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
					prop="currency_unit_name"
					:label="$t('common.currency_unit_name')"
				>
				</el-table-column>
				<el-table-column
					show-overflow-tooltip
					prop="inventory_location"
					:label="$t('common.inventory_location')"
				>
				</el-table-column>
			</el-table>
		</div>
	</el-drawer>
</template>

<script lang="ts">
import { stockApi } from '@/http/api/othcustom/stockset/stock'
import { IRequest } from '@/@types/httpInterface'
import dataStructure from '@/utils/dataStructure'
import { defineComponent, ref, reactive, onMounted, toRefs } from 'vue'
export default defineComponent({
	props: {
		order_number: {
			type: String,
			default: '',
		},
		showLotDetails: {
			type: Boolean,
			default: false,
		},
	},
	setup(props) {
		const state = reactive({
			tableData: [],
			showLotDetails: props.showLotDetails,
		})
		const requests = {
			getLotNumberList() {
				const data = dataStructure(
					{ power_url: 'V1/Inventory/lot_details' },
					{
						order_number: props.order_number,
						order_by: 1,
					}
				)
				stockApi
					.get_lot_number_list(data)
					.then(res => {
						let { status, custom_data, info } = res as IRequest
						if (status === 200) {
							state.tableData = custom_data.data
						}
					})
					.catch(err => err)
			},
		}
		onMounted(() => {
			requests.getLotNumberList()
		})
		return {
			...toRefs(state),
		}
	},
})
</script>
<style lang="scss" scoped></style>
