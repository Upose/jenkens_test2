<!--
 * @Descripttion: 
 * @version: 
 * @Author: HYH
 * @Date: 2021-10-25 16:06:14
 * @LastEditors: TJ
 * @LastEditTime: 2022-03-08 15:59:17
-->
<template>
	<div class="tabs_content">
		<!-- tag区超过长度显示箭头，箭头让里面的tag区定位发生变化 -->
		<!-- <div v-if="showArrow" @click="clickLeftArrow" class="left_arrow">
			<i class="el-icon-arrow-left"></i>
		</div> -->
		<!-- v-for="(item, index) in $store.state.index.tabs" -->
		<div ref="tabsTagsRef" class="tabs_tags">
			<div ref="tagsInnerRef" class="tags_inner">
				<el-tag
					style="margin-right:10px"
					effect="plain"
					size="large"
					v-for="(item, index) in $store.state.index.tabs"
					:key="index"
					:closable="index === 0 ? false : true"
					:type="item.isChecked === true ? '' : 'info'"
					@close="closeTag(item.id)"
					@click="clickTag(item.id, item.menu_url)"
					class="el_tag"
				>
					{{ item.name }}
				</el-tag>
			</div>
		</div>
		<!-- <div v-if="showArrow" @click="clickRightArrow" class="right_arrow">
			<i class="el-icon-arrow-right"></i>
		</div> -->
		<div class="bottom_arrows">
			<!-- style="float:right" -->
			<el-dropdown class="close_btn" @command="dropdownClick">
				<el-button class="el-dropdown-link">
					<i class="el-icon-arrow-down"></i>
				</el-button>
				<template #dropdown>
					<el-dropdown-menu>
						<el-dropdown-item command="left">关闭左侧</el-dropdown-item>
						<el-dropdown-item command="right">关闭右侧</el-dropdown-item>
						<el-dropdown-item command="other">关闭其他</el-dropdown-item>
						<el-dropdown-item command="all">全部关闭</el-dropdown-item>
					</el-dropdown-menu>
				</template>
			</el-dropdown>
		</div>
	</div>
</template>

<script lang="ts">
import {
	computed,
	defineComponent,
	nextTick,
	onMounted,
	reactive,
	ref,
	toRefs,
	watch,
} from 'vue'
import {
	MutationConstants,
	GetterConstants,
} from '@/store/modules/index/constants'
import { useRoute, useRouter } from 'vue-router'
import { operationSub } from '@/utils/operation'
import { useStore } from '@/store'
import { bus } from '@/utils/bus'
import { BUS_TABS } from '@/constant/bus/bus_tabs'
interface IState {
	showArrow: boolean
	tabs: any[]
}
export default defineComponent({
	setup() {
		const store = useStore()
		const route = useRoute()
		const Router = useRouter()
		const state: IState = reactive({
			showArrow: true,
			tabs: store.state.index.tabs,
		})
		const tagsInnerRef = ref()
		const tabsTagsRef = ref()

		const methods = {
			// 点击标签跳转
			clickTag(id: any, url: any) {
				Router.push(url)
				let tabs = store.getters[GetterConstants.GET_TABS]
				tabs.forEach((el: any) => {
					if (el.id === id) {
						el.isChecked = true
					} else {
						el.isChecked = false
					}
				})
				store.commit(MutationConstants.SET_TABS, tabs)
			},
			// 关闭标签
			closeTag(id: any) {
				let tabs = store.getters[GetterConstants.GET_TABS]
				let closeIndex = tabs.findIndex((el: any) => el.id === id)
				let checkedIndex = tabs.findIndex((el: any) => el.isChecked === true)
				// 当要关闭和当前选中是同一个，需特殊处理；否则直接删除无影响
				if (closeIndex === checkedIndex) {
					// 需要关闭的是最后一个时
					if (closeIndex === tabs.length - 1) {
						tabs[closeIndex - 1].isChecked = true
						Router.push(tabs[closeIndex - 1].menu_url)
					}
					// 需要关闭的是中间一个时
					else {
						tabs[closeIndex + 1].isChecked = true
						Router.push(tabs[closeIndex + 1].menu_url)
					}
				}
				tabs.splice(closeIndex, 1)
				store.commit(MutationConstants.SET_TABS, tabs)
				//点击标签关闭之后判断是否显示左右箭头

				// methods.judgeShowArrow()
			},
			// 右侧下拉菜单批量删除
			dropdownClick(command: string) {
				let tabs = store.getters[GetterConstants.GET_TABS]
				let checkedIndex = tabs.findIndex((el: any) => el.isChecked === true)
				switch (command) {
					case 'left':
						tabs.splice(1, checkedIndex - 1)
						break
					case 'right':
						tabs.splice(checkedIndex + 1, tabs.length - checkedIndex - 1)
						break
					case 'all':
						tabs.splice(1, tabs.length - 1)
						tabs[0].isChecked = true
						Router.push(tabs[0].menu_url)
						break
					case 'other':
						tabs.splice(checkedIndex + 1, tabs.length - checkedIndex - 1)
						tabs.splice(1, checkedIndex - 1)
						break
					default:
						break
				}
				store.commit(MutationConstants.SET_TABS, tabs)
				//右侧下拉菜单批量删除判断是否显示左右箭头

				// methods.judgeShowArrow()
			},
		}
		onMounted(() => {})
		return {
			...toRefs(state),
			...methods,
			tagsInnerRef,
			tabsTagsRef,
		}
	},
})
</script>
<style lang="scss" scoped>
.el_tag:hover {
	cursor: pointer;
	color: #40b8ff;
}
.el-dropdown-link {
	cursor: pointer;
	color: #409eff;
}

.tabs_content {
	width: 100%;
	height: 100%;
	display: flex;

	.tabs_tags {
		height: 100%;
		width: 0;
		flex: 1;
		margin: 4px 0;
		position: relative;
		overflow: hidden; //超出隐藏
		white-space: nowrap; //强制不换行
		.tags_inner {
			position: absolute;
			// width: 100%;
			height: 100%;
			// text-overflow: ellipsis; //显示省略号
		}
	}
	.right_arrow,
	.left_arrow {
		height: 100%;
		width: 40px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		cursor: pointer;
		align-items: center;
	}

	.bottom_arrows {
		height: 100%;
		width: 40px;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
}
</style>
