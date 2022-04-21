<!--
 * @Descripttion: 
 * @version: 
 * @Author: HYH
 * @Date: 2021-08-25 14:16:36
 * @LastEditors: TJ
 * @LastEditTime: 2022-03-08 14:06:59
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
		>
			<el-table-column
				show-overflow-tooltip
				prop="account_number"
				:label="$t('common.account')"
			>
			</el-table-column>
			<el-table-column
				show-overflow-tooltip
				prop="real_payment_money"
				:label="$t('common.real_payment_money')"
			>
			</el-table-column>
			<el-table-column
				show-overflow-tooltip
				prop="surplus_real_payment_money"
				:label="$t('common.surplus_real_payment_money')"
			>
			</el-table-column>
			<el-table-column
				show-overflow-tooltip
				prop="payer"
				:label="$t('common.payer')"
			>
			</el-table-column>
			<el-table-column
				show-overflow-tooltip
				prop="explain"
				:label="$t('common.explain')"
			>
			</el-table-column>
			<el-table-column
				show-overflow-tooltip
				prop="picture"
				:label="$t('common.picture')"
			>
				<template #default="scope">
					<div id="elImage" style="line-height:100%">
						<el-image
							v-for="(item, index) of scope.row.picture"
							:key="index"
							:src="configUrl + item.url"
							style="width: 22px;height: 22px;"
							:preview-src-list="[configUrl + item.url]"
						>
						</el-image>
					</div>
				</template>
			</el-table-column>
			<el-table-column
				show-overflow-tooltip
				prop="created_at"
				:label="$t('common.created_at')"
			>
			</el-table-column>
		</el-table>
	</div>
</template>

<script lang="ts">
interface IState {
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
		tableData: {
			type: Array,
			default: [],
		},
	},
	setup(props) {
		const state: IState = reactive({
			configUrl: process.env.VUE_APP_QIHONG_URL,
			// tableData:  props.tableData, //这样赋值不会响应
			tableData: computed(() => props.tableData),
		})
		onMounted(() => {})
		return {
			...toRefs(state),
		}
	},
})
</script>
<style lang="scss" scoped></style>
