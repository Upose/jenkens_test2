<!--
 * @Descripttion: 
 * @Author: TJ
 * @LastEditors: TJ
 * @LastEditTime: 2022-02-22 09:21:59
-->
<template>
	<div class="tableInputStyle">
		<el-table id="upd_table" :data="all_array" highlight-current-row border>
			<el-table-column prop="isChecked" :label="$t('common.is_checked')">
				<template #default="scope">
					<el-checkbox v-model="scope.row.isChecked"></el-checkbox>
				</template>
			</el-table-column>
			<el-table-column prop="isSort" :label="$t('common.is_sort')">
				<template #default="scope">
					<el-checkbox v-model="scope.row.isSort"></el-checkbox>
				</template>
			</el-table-column>
			<el-table-column prop="label" :label="$t('common.field_name')">
				<template #default="scope">
					<el-input style="width:100%" v-model="scope.row.label"></el-input>
				</template>
			</el-table-column>
			<el-table-column :label="$t('common.handle')">
				<template #default="scope">
					<el-button
						@click.stop="deleteField(scope.$index, all_array)"
						type="text"
					>
						{{ $t('common.clear') }}
					</el-button>
				</template>
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
	nextTick,
} from 'vue'
import Sortable from 'sortablejs'
export default defineComponent({
	props: {
		all_array: {
			type: Array,
			default: [],
		},
	},
	emits: ['setUpdArray'],
	setup(props, ctx) {
		const state = reactive({
			all_array: props.all_array,
		})
		const methods = {
			deleteField(index: number, rows: any) {
				rows.splice(index, 1)
				ctx.emit('setUpdArray', rows)
			},
			// 拖动方法
			initUpdSort() {
				const tbody: any = document.querySelector(
					'#upd_table .el-table__body-wrapper tbody'
				)
				// 根据具体需求配置options配置项
				Sortable.create(tbody, {
					onEnd: (evt: any) => {
						let oldIndex = evt.oldIndex
						let newIndex = evt.newIndex
						let all_array = state.all_array
						let oldItem = all_array.splice(oldIndex, 1)[0]
						all_array.splice(newIndex, 0, oldItem)
						// 清空数据，再通过nextTick赋值
						state.all_array = []
						ctx.emit('setUpdArray', all_array)
						nextTick(() => {
							state.all_array = all_array
						})
					},
				})
			},
		}
		onMounted(() => {
			methods.initUpdSort()
		})
		return {
			...toRefs(state),
			...methods,
		}
	},
})
</script>

<style lang="scss" scoped>
@import '@/assets/css/element-common-style.scss';
</style>
