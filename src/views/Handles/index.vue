<!--
 * @Descripttion: 
 * @version: 
 * @Author: XJ
 * @Date: 2021-06-28 17:18:20
 * @LastEditors: TJ
 * @LastEditTime: 2021-11-11 19:13:20
-->
<!--  -->
<template>
	<div class="handles">
		<el-container>
			<el-aside width="250px">
				<el-menu
					:default-active="handlesActiveIndex"
					class="el-menu-vertical-demo"
					@open="handleOpen"
					@close="handleClose"
					:router="true"
				>
					<el-menu-item index="/index/handles/percenter">
						<i class="el-icon-menu"></i>
						<template #title>{{ $t('common.per_center') }}</template>
					</el-menu-item>
					<el-menu-item index="/index/handles/editupd">
						<i class="el-icon-menu"></i>
						<template #title>{{ $t('common.edit_upd') }}</template>
					</el-menu-item>
				</el-menu>
			</el-aside>
			<el-main style="background-color:#fff">
				<router-view></router-view>
			</el-main>
		</el-container>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed, toRefs } from 'vue'
import { useRoute } from 'vue-router'
export default defineComponent({
	setup() {
		const route = useRoute()
		const state = reactive({
			handlesActiveIndex: computed(() => {
				return route.path
			}),
		})
		const methods = {
			handleOpen(key: any, keyPath: any) {},
			handleClose(key: any, keyPath: any) {},
		}
		return {
			...toRefs(state),
			...methods,
		}
	},
})
</script>
<style lang="scss" scoped>
@import '@/assets/css/element-common-style.scss';
.handles {
	width: 100%;
	height: 100%;
	.el-container {
		height: 100%;
		.el-aside {
			height: 100%;
		}
		.el-main {
			width: 100%;
			height: 100%;
		}
	}
}
</style>
