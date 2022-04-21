<!--
 * @Descripttion: 
 * @version: 
 * @Author: TJ
 * @Date: 2021-04-07 09:19:25
 * @LastEditors: TJ
 * @LastEditTime: 2022-02-15 10:53:25
-->
<template>
	<router-view></router-view>
</template>

<script lang="ts">
import { useRouter } from 'vue-router'
export default {
	name: 'App',
	setup() {
		const router = useRouter()
	},
}
</script>

<style lang="scss">
@import './assets/css/reset.scss';
#app {
	width: 100%;
	height: 100vh;
}
// 修改浏览器或者table滚动条样式

/*滚动条整体部分,必须要设置*/
::-webkit-scrollbar {
	width: 8px;
	height: 8px;
	background-color: transparent;
	// position: relative;
	// position: fixed;
	// position: absolute;
	// float: right;
}
/*滚动条的轨道*/
::-webkit-scrollbar-track {
	background-color: transparent;
}
/*滚动条的滑块按钮*/
::-webkit-scrollbar-thumb {
	border-radius: 10px;
	background-color: gray;
	// box-shadow: inset 0 0 5px rgb(7,61,92);
}
/*滚动条的上下两端的按钮*/
::-webkit-scrollbar-button {
	height: 0;
	// background-color: rgb(7,61,92);
}

// 两个滚动条的交汇处
::-webkit-scrollbar-corner {
	background-color: transparent;
}
</style>
