<!--
 * @Descripttion: 
 * @version: 
 * @Author: HYH
 * @Date: 2021-08-05 18:26:53
 * @LastEditors: TJ
 * @LastEditTime: 2022-03-10 14:20:13
-->
<!--  -->
<template>
	<el-table
		v-if="showTable"
		border
		highlight-current-row
		:data="tableData"
		ref="singleTable"
		@row-click="rowClick"
		:height="tableHeight"
		:cell-class-name="cellClassName"
		:header-cell-class-name="headerCellClassName"
		@header-click="headerClick"
		row-key="id"
		:tree-props="{
			children: 'children',
			hasChildren: 'hasChildren',
		}"
	>
		<!-- <el-table-column type="index" label="⚙"> </el-table-column> -->
		<el-table-column type="index" label="⚙" v-if="showConfig">
		</el-table-column>
		<el-table-column type="index" v-else> </el-table-column>
		<template v-for="(item, index) in all_array" :key="index">
			<el-table-column
				v-if="item.isChecked && item.label !== 'is_enabled'"
				show-overflow-tooltip
				:prop="item.label"
				:label="$t(`common.${item.label}`)"
			>
			</el-table-column>
			<!-- 是否启用特殊处理，渲染成el-switch -->
			<el-table-column
				v-if="item.label === 'is_enabled'"
				show-overflow-tooltip
				:prop="item.label"
				:label="$t(`common.is_enabled`)"
			>
				<template #default="scope">
					<el-switch
						:active-value="1"
						:inactive-value="0"
						v-model="scope.row.is_enabled"
						disabled
					></el-switch>
				</template>
			</el-table-column>
		</template>
	</el-table>
</template>

<script lang="ts">
import {
	defineComponent,
	ref,
	reactive,
	toRefs,
	onMounted,
	watch,
	nextTick,
} from 'vue'
import {
	MutationConstants,
	GetterConstants,
} from '@/store/modules/index/constants'
import { useStore } from '@/store'
import dataStructure from '@/utils/dataStructure'
import { commonApi } from '@/http/api/common'
import { IRequest } from '@/@types/httpInterface'
import { bus } from '@/utils/bus'
interface IState {
	all_array: any
	tableHeight: any
	showTable: boolean
	showConfig: boolean
}
export default defineComponent({
	props: {
		table: {
			type: String,
			default: '',
		},
		common_array: {
			type: Array,
			default: [],
		},
		tableData: {
			type: Array,
			default: [],
		},
	},
	emits: ['rowClick', 'headerClick'],
	setup(props, ctx) {
		const store = useStore()
		const singleTable = ref()
		const state: IState = reactive({
			all_array: [],
			tableHeight: '100%',
			showTable: true,
			showConfig: false, //0：用户没有自定义列权限，1有
		})
		// bus总线监听
		bus.$on(props.table, (e: any) => {
			state.showTable = false
			state.all_array = e
			nextTick(() => {
				state.showTable = true
			})
			requests.getCustomUpd()
		})
		const requests = {
			getCustom() {
				const data = dataStructure(
					{},
					{
						table: props.table,
					}
				)
				commonApi
					.get_custom(data)
					.then(res => {
						let { status, custom_data, info } = res as IRequest
						if (status === 200) {
							const { all_array } = custom_data.data
							state.all_array = all_array
							state.showConfig = Boolean(custom_data.show)
						}
					})
					.catch(err => err)
			},
			getCustomUpd() {
				const data = dataStructure(
					{ power_url: 'V1/Public/the_custom_column_upd' },
					{
						table: props.table,
						all_array: state.all_array,
					}
				)
				commonApi
					.get_custom_upd(data)
					.then(res => {
						let { status, custom_data, info } = res as IRequest
						if (status === 200) {
						}
					})
					.catch(err => err)
			},
		}
		const methods = {
			headerClick(column: any, event: any) {
				const { type } = column
				if (type === 'index' && state.showConfig) {
					ctx.emit('headerClick', true)
				}
			},
			// 设置索引行表头字体大小
			headerCellClassName(e: any) {
				const { row, column, rowIndex, columnIndex } = e
				if (columnIndex == 0) {
					return 'header_cell_calss_name1'
				}
			},
			// 设置索引行背景
			cellClassName(e: any) {
				const { row, column, rowIndex, columnIndex } = e
				if (columnIndex == 0) {
					return 'cell_calss_name1'
				}
			},
			setCurrentRow() {
				const singletable = singleTable
				singletable.value.setCurrentRow()
			},
			rowClick(val: any) {
				const singletable = singleTable.value
				singletable.toggleRowExpansion(val)
				ctx.emit('rowClick', val)
			},
		}
		onMounted(() => {
			// methods.contextmenuStop()
			requests.getCustom()
		})
		return {
			...toRefs(state),
			...methods,
			...requests,
			singleTable,
		}
	},
})
</script>
<style lang="scss">
// 设置索引行表头字体大小
.header_cell_calss_name1 {
	font-size: 23px;
	line-height: 23px;
}
// 设置索引行背景
.cell_calss_name1 {
	background-color: #f6fcff;
	color: #5a5555;
}
</style>
