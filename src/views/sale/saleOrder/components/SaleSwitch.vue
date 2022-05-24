<!--
 * @Descripttion: 
 * @version: 
 * @Author: XJ
 * @Date: 2021-07-09 11:37:00
 * @LastEditors: TJ
 * @LastEditTime: 2022-03-09 10:33:44
-->
<!--  -->
<template>
	<div class="sale_switch">
		<el-divider content-position="left">{{
			$t('common.data_collect')
		}}</el-divider>
		<el-form ref="switchFormDataRef" :model="switchForm" class="tableFormStyle">
			<el-table
				border
				:key="Math.random()"
				:data="switchForm.switchFormData"
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
					prop="presell_number"
					:label="$t('common.presell_number')"
				>
				</el-table-column>
				<el-table-column
					show-overflow-tooltip
					prop="sale_number"
					:label="$t('common.sale_number_switch')"
				>
					<template #default="scope">
						<el-form-item
							:prop="`switchFormData.${scope.$index}.sale_number`"
							:rules="[
								{
									required: true,
									validator: (rule, value, callback) => {
										checkSaleNumber3(rule, value, callback, scope)
									},
								},
							]"
						>
							<el-input
								v-model="scope.row.sale_number"
								@change="unitMoneyAndNumChange('switch')"
							></el-input>
						</el-form-item>
					</template>
				</el-table-column>
				<el-divider content-position="left">{{
					$t('common.show_search')
				}}</el-divider>
				<el-table-column
					show-overflow-tooltip
					prop="sale_unit_money"
					:label="$t('common.sale_unit_money')"
				>
					<template #default="scope">
						<el-form-item
							:prop="`switchFormData.${scope.$index}.sale_unit_money`"
							:rules="[
								{
									required: true,
									validator: checkTwoDeci,
									trigger: ['change', 'blur'],
								},
							]"
						>
							<el-input
								v-model="scope.row.sale_unit_money"
								@change="unitMoneyAndNumChange('switch')"
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

				<!-- <el-table-column
          show-overflow-tooltip
          prop="unit_name"
          :label="$t('common.unit_name')"
          
        >
        </el-table-column> -->
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
								switchDeleteRow(scope.$index, switchForm.switchFormData)
							"
							type="text"
						>
							{{ $t('common.remove') }}
						</el-button>
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
import { checkTwoDeci, checkSaleNumber3 } from '@/utils/regp'
export default defineComponent({
	props: {
		switchForm: {
			type: Object,
			default: {},
		},
	},
	emits: ['unitMoneyAndNumChange'],
	setup(props, ctx) {
		const state = reactive({})
		const switchFormDataRef = ref()
		const requests = {}
		const methods = {
			switchFormDatarefValid() {
				let valid: any
				const switchformdataref = switchFormDataRef
				switchformdataref.value.validate((valid2: boolean) => {
					valid = valid2
				})

				return valid
			},
			unitMoneyAndNumChange(arg: string) {
				ctx.emit('unitMoneyAndNumChange', arg)
			},
			// 添加页面删除
			switchDeleteRow(index: number, rows: any) {
				rows.splice(index, 1)
				ctx.emit('unitMoneyAndNumChange', 'switch')
			},
		}
		return {
			...toRefs(state),
			...methods,
			checkTwoDeci,
			switchFormDataRef,
			checkSaleNumber3,
		}
	},
})
</script>
<style lang="scss" scoped>
@import '@/assets/css/table.scss';
@import '@/assets/css/element-common-style.scss';
</style>
