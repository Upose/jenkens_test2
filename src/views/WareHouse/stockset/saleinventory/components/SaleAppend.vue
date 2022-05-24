<!--
 * @Descripttion: 
 * @version: 
 * @Author: XJ
 * @Date: 2021-07-09 11:37:00
 * @LastEditors: TJ
 * @LastEditTime: 2022-03-09 10:31:11
-->
<!--  -->
<template>
	<div class="sale_append dividerStyle">
		<el-divider content-position="left">{{
			$t('common.data_collect')
		}}</el-divider>
		<el-form ref="appendFormDataRef" :model="appendForm" class="tableFormStyle">
			<el-table
				border
				:key="Math.random()"
				:data="appendForm.appendFormData"
				height="250"
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
					prop="unsold_number"
					:label="$t('common.unsold_number')"
				>
				</el-table-column>
				<el-table-column
					show-overflow-tooltip
					prop="sale_number"
					:label="$t('common.sale_number')"
				>
					<template #default="scope">
						<el-form-item
							:prop="`appendFormData.${scope.$index}.sale_number`"
							:rules="[
								{
									required: true,
									validator: (rule, value, callback) => {
										checkSaleNumber1(rule, value, callback, scope)
									},
									trigger: ['change', 'blur'],
								},
							]"
						>
							<el-input
								v-model="scope.row.sale_number"
								@change="unitMoneyAndNumChange"
							></el-input>
						</el-form-item>
					</template>
				</el-table-column>
				<el-table-column
					show-overflow-tooltip
					prop="sale_unit_money"
					:label="$t('common.sale_unit_money')"
				>
					<template #default="scope">
						<el-form-item
							:prop="`appendFormData.${scope.$index}.sale_unit_money`"
							:rules="[
								{
									required: true,
									validator: checkTwoDeci1,
									trigger: ['change', 'blur'],
								},
							]"
						>
							<el-input
								v-model="scope.row.sale_unit_money"
								@change="unitMoneyAndNumChange"
							></el-input>
						</el-form-item>
					</template>
				</el-table-column>
				<el-table-column
					show-overflow-tooltip
					prop="sale_money"
					:label="$t('common.sale_money')"
				>
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
							@click.stop="
								appendDeleteRow(scope.$index, appendForm.appendFormData)
							"
							type="text"
						>
							{{ $t('common.remove') }}
						</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-form>
		<el-divider content-position="left">{{
			$t('common.show_search')
		}}</el-divider>
		<!-- 搜索内容 -->
		<div class="formStyle">
			<el-input
				style="margin:0px 0px 10px"
				:placeholder="$t('common.searchValue')"
				v-model="appendSearchValue"
				@focus="onAppendFocus"
				@change="onAppendSearch"
			>
				<template #append>
					<el-button
						icon="el-icon-search"
						@click="onAppendSearch"
					></el-button> </template
			></el-input>
			<span
				style="font-size:12px;color:#f56c6c;margin-left:10px"
				v-show="appendSearchInfo"
				>{{ appendSearchInfo }}</span
			>
		</div>

		<el-table
			border
			:data="appendSearchData"
			:key="Math.random()"
			:height="300"
			highlight-current-row
			@row-click="appendRowClick"
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
import { checkTwoDeci1, checkSaleNumber1 } from '@/utils/regp'
import { useI18n } from 'vue-i18n'
export default defineComponent({
	props: {
		appendForm: {
			type: Object,
			default: {},
		},
		product_grade: {
			type: Number,
			default: 1,
		},
	},
	emits: ['unitMoneyAndNumChange', 'appendRowClick'],
	setup(props, ctx) {
		const { t } = useI18n()
		const state = reactive({
			appendSearchValue: '',
			appendSearchInfo: '',
			appendSearchData: [],
			appendFormDataRules: {
				sale_number: [
					{
						required: true,
						message: t('common.not_empty'),
					},
				],
				sale_unit_money: [
					{
						required: true,
						message: t('common.not_empty'),
					},
				],
			},
		})
		const appendFormDataRef = ref()
		const requests = {
			getSaleSearch(arg: string) {
				const data = dataStructure(
					{},
					{
						search_value: arg,
						product_grade: props.product_grade,
					}
				)
				saleinventoryApi
					.get_sale_search(data)
					.then(res => {
						let { status, custom_data, info } = res as IRequest
						if (status === 200) {
							let tableData: any = dateNormArray(custom_data.data)
							state.appendSearchData = tableData
						} else if (status === 421) {
							// 特殊信息显示
							state.appendSearchInfo = info
						}
					})
					.catch(err => err)
			},
		}
		const methods = {
			appendFormDatarefValid() {
				let valid: any
				const appendformdataref = appendFormDataRef
				appendformdataref.value.validate((valid2: boolean) => {
					valid = valid2
				})
				return valid
			},
			unitMoneyAndNumChange(arg: string) {
				ctx.emit('unitMoneyAndNumChange')
			},
			// 添加页面删除
			appendDeleteRow(index: number, rows: any) {
				rows.splice(index, 1)
				ctx.emit('unitMoneyAndNumChange')
			},

			onAppendSearch() {
				requests.getSaleSearch(state.appendSearchValue)
			},
			// 追加下面的搜索框聚焦清空报错提示
			onAppendFocus() {
				state.appendSearchInfo = ''
			},
			appendRowClick(val: any) {
				ctx.emit('appendRowClick', val)
			},
		}
		return {
			...toRefs(state),
			...methods,
			checkTwoDeci1,
			checkSaleNumber1,
			appendFormDataRef,
		}
	},
})
</script>
<style lang="scss" scoped>
@import '@/assets/css/table.scss';
@import '@/assets/css/element-common-style.scss';
</style>
