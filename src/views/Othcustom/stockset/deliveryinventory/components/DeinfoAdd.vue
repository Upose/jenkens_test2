<!--
 * @Descripttion: 
 * @version: 
 * @Author: XJ
 * @Date: 2021-07-09 11:37:00
 * @LastEditors: TJ
 * @LastEditTime: 2022-02-22 10:29:42
-->
<!--  -->
<template>
	<div class="deinfo_add">
		<el-divider content-position="left">{{
			$t('common.data_collect')
		}}</el-divider>
		<!-- 要提交的表格 -->

		<el-form ref="addFormDataRef" :model="addForm" class="tableFormStyle">
			<el-table
				border
				:key="Math.random()"
				:data="addForm.addFormData"
				height="250"
				highlight-current-row
			>
				<el-table-column
					show-overflow-tooltip
					prop="id"
					:label="$t('common.inventory_id')"
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
					prop="sale_order_number"
					:label="$t('common.sale_order_number')"
				>
				</el-table-column>
				<el-table-column
					show-overflow-tooltip
					prop="sale_number"
					:label="$t('common.sale_number')"
				>
				</el-table-column>
				<el-table-column
					show-overflow-tooltip
					prop="delivery_number"
					:label="$t('common.delivery_number')"
				>
					<template #default="scope">
						<el-form-item
							:prop="`addFormData.${scope.$index}.delivery_number`"
							:rules="[
								{
									required: true,
									validator: (rule, value, callback) => {
										checkSaleNumber2(rule, value, callback, scope)
									},
									trigger: 'change',
								},
							]"
						>
							<el-input v-model="scope.row.delivery_number"></el-input>
						</el-form-item>
					</template>
				</el-table-column>
				<el-table-column
					show-overflow-tooltip
					prop="inventory_enter_type_name"
					:label="$t('common.inventory_enter_type_name')"
				>
				</el-table-column>
				<el-table-column show-overflow-tooltip :label="$t('common.handle')">
					<template #default="scope">
						<el-button
							@click.stop="deleteRow(scope.$index, addForm.addFormData)"
							type="text"
						>
							{{ $t('common.clear') }}
						</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-form>
		<el-divider content-position="left">{{
			$t('common.show_search')
		}}</el-divider>
		<el-table
			border
			:key="Math.random()"
			:data="addSearchData"
			:height="300"
			highlight-current-row
			@row-click="rowClick2"
		>
			<el-table-column
				show-overflow-tooltip
				prop="inventory_id"
				:label="$t('common.inventory_id')"
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
				prop="sale_order_number"
				:label="$t('common.sale_order_number')"
			>
			</el-table-column>
			<el-table-column
				show-overflow-tooltip
				prop="sale_number"
				:label="$t('common.sale_number')"
			>
			</el-table-column>

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
import { checkSaleNumber2 } from '@/utils/regp'
export default defineComponent({
	props: {
		addForm: {
			type: Object,
			default: {},
		},
		addSearchData: {
			type: Array,
			default: [],
		},
	},
	emits: ['rowClick2'],
	setup(props, ctx) {
		const addFormDataRef = ref()
		const state = reactive({})
		const methods = {
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
			},
		}
		return {
			...toRefs(state),
			...methods,
			addFormDataRef,
			checkSaleNumber2,
		}
	},
})
</script>
<style lang="scss" scoped>
@import '@/assets/css/table.scss';
@import '@/assets/css/element-common-style.scss';
</style>
