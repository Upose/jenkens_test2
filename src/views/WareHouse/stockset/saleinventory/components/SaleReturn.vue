<!--
 * @Descripttion: 
 * @version: 
 * @Author: XJ
 * @Date: 2021-07-09 11:37:00
 * @LastEditors: TJ
 * @LastEditTime: 2022-03-11 13:56:04
-->
<!--  -->
<template>
	<div>
		<el-divider content-position="left">销售信息退货</el-divider>
		<el-form ref="appendFormDataRef" :model="updForm" class="tableFormStyle">
			<el-table
				border
				:data="updForm.order_data"
				:key="Math.random()"
				:height="300"
				highlight-current-row
			>
				<el-table-column
					show-overflow-tooltip
					prop="inventory_id"
					:label="$t('common.inventory_id')"
				>
				</el-table-column>
				<el-table-column
					show-overflow-tooltip
					prop="sale_order_number"
					:label="$t('common.sale_order_number')"
				>
				</el-table-column>
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
					prop="currency_unit"
					:label="$t('common.currency_unit')"
				>
				</el-table-column>
				<el-table-column
					show-overflow-tooltip
					prop="sale_unit_money"
					:label="$t('common.sale_unit_money')"
				>
				</el-table-column>
				<el-table-column
					show-overflow-tooltip
					prop="sale_number"
					:label="$t('common.sale_number')"
				>
				</el-table-column>
				<!-- <el-table-column
					show-overflow-tooltip
					prop="num"
					:label="$t('common.return_num')"
				>
				</el-table-column> -->
				<el-table-column
					show-overflow-tooltip
					prop="num"
					:label="$t('common.return_num')"
				>
					<template #default="scope">
						<el-form-item
							:prop="`order_data.${scope.$index}.num`"
							:rules="[
								{
									required: true,
									validator: (rule, value, callback) => {
										checkSaleNumber5(rule, value, callback, scope)
									},
									trigger: ['change', 'blur'],
								},
							]"
						>
							<el-input v-model="scope.row.num" @change="numChange"></el-input>
						</el-form-item>
					</template>
				</el-table-column>
				<el-table-column
					show-overflow-tooltip
					prop="sale_money"
					:label="$t('common.sale_money')"
				>
					<template #default="scope">
						<el-form-item>
							<el-input v-model="scope.row.sale_money" disabled></el-input>
						</el-form-item>
					</template>
					<!-- <template #default="scope">
						<span>{{
							operationMul(scope.row.num, scope.row.sale_unit_money)
						}}</span>
					</template> -->
				</el-table-column>
			</el-table>
		</el-form>
		<el-divider content-position="left">出库信息退货</el-divider>

		<el-form ref="appendFormDataRef" :model="updForm" class="tableFormStyle">
			<el-table
				border
				:data="updForm.delivery_data"
				:key="Math.random()"
				:height="300"
				highlight-current-row
			>
				<el-table-column
					show-overflow-tooltip
					prop="inventory_id"
					:label="$t('common.inventory_id')"
				>
				</el-table-column>
				<el-table-column
					show-overflow-tooltip
					prop="sale_order_number"
					:label="$t('common.sale_order_number')"
				>
				</el-table-column>

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
					prop="currency_unit"
					:label="$t('common.currency_unit')"
				>
				</el-table-column>
				<el-table-column
					show-overflow-tooltip
					prop="sale_unit_money"
					:label="$t('common.sale_unit_money')"
				>
				</el-table-column>
				<el-table-column
					show-overflow-tooltip
					prop="sale_number"
					:label="$t('common.sale_number')"
				>
				</el-table-column>
				<!-- <el-table-column
					show-overflow-tooltip
					prop="num"
					:label="$t('common.return_num')"
				>
				</el-table-column> -->
				<!-- 可编辑 -->
				<el-table-column
					show-overflow-tooltip
					prop="num"
					:label="$t('common.return_num')"
				>
					<template #default="scope">
						<el-form-item
							:prop="`delivery_data.${scope.$index}.num`"
							:rules="[
								{
									required: true,
									validator: (rule, value, callback) => {
										checkSaleNumber5(rule, value, callback, scope)
									},
									trigger: ['change', 'blur'],
								},
							]"
						>
							<el-input v-model="scope.row.num" @change="numChange"></el-input>
						</el-form-item>
					</template>
				</el-table-column>
				<el-table-column
					show-overflow-tooltip
					prop="sale_money"
					:label="$t('common.sale_money')"
				>
					<template #default="scope">
						<el-form-item>
							<el-input v-model="scope.row.sale_money" disabled></el-input>
						</el-form-item>
					</template>
				</el-table-column>
			</el-table>
		</el-form>
	</div>
</template>

<script lang="ts">
import {
	computed,
	defineComponent,
	onMounted,
	reactive,
	toRefs,
	watch,
	ref,
} from 'vue'
import { saleinventoryApi } from '@/http/api/othcustom/stockset/saleinventory'
import { IRequest } from '@/@types/httpInterface'
import dataStructure from '@/utils/dataStructure'
import { dateNormArray, dateNormOne } from '@/utils/dateNorm'
import { checkTwoDeci, checkSaleNumber5 } from '@/utils/regp'
import { operationMul } from '@/utils/operation'
export default defineComponent({
	props: {
		updForm: {
			type: Object,
			default: {},
		},
	},
	emits: ['numChange'],
	setup(props, ctx) {
		const state = reactive({
			delivery_data: [],
			order_data: [],
		})
		const requests = {
			getSalesReturnSearch(id: any) {
				const data = dataStructure({}, { id })
				saleinventoryApi
					.get_sales_return_search(data)
					.then(res => {
						let { status, custom_data, info } = res as IRequest
						if (status === 200) {
							state.delivery_data = custom_data.delivery_list_value
							state.order_data = custom_data.order_list_value
						}
					})
					.catch(err => err)
			},
		}
		const methods = {
			numChange() {
				ctx.emit('numChange')
			},
		}

		return {
			...toRefs(state),
			...methods,
			...requests,
			checkTwoDeci,
			checkSaleNumber5,
			operationMul,
		}
	},
})
</script>
<style lang="scss" scoped>
@import '@/assets/css/table.scss';
@import '@/assets/css/element-common-style.scss';
</style>
