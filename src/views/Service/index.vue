<!--
 * @Descripttion: 
 * @version: 
 * @Author: TJ
 * @Date: 2021-04-25 09:06:53
 * @LastEditors: TJ
 * @LastEditTime: 2021-11-22 19:45:54
-->
<template>
	<div class="service">
		{{
			NODE_ENV === 'jinfu_use'
				? $t('common.welcome')
				: $t('common.qskt_welcome')
		}}
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue'
import {
	MutationConstants,
	GetterConstants,
} from '@/store/modules/index/constants'
import { useStore } from '@/store'
export default defineComponent({
	setup() {
		const store = useStore()
		const state = reactive({
			NODE_ENV: process.env.NODE_ENV,
		})
		const methods = {
			changeIsChecked() {
				let tabs = store.getters[GetterConstants.GET_TABS]
				// 排除当前页面是直接给的初始值情况
				if (tabs.length == 1) return
				tabs.forEach((item: any) => {
					if (item.isChecked) item.isChecked = false
					if (item.menu_url == '/index/service') item.isChecked = true
				})
				store.commit(MutationConstants.SET_TABS, tabs)
			},
		}
		onMounted(() => {
			methods.changeIsChecked()
		})
		return {
			...toRefs(state),
			methods,
		}
	},
})
</script>

<style lang="scss" scoped>
.service {
	height: 100%;
	width: 100%;
}
</style>
