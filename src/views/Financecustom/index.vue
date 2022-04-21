<!--
 * @Descripttion: 
 * @version: 
 * @Author: XJ
 * @Date: 2021-05-26 09:46:56
 * @LastEditors: TJ
 * @LastEditTime: 2021-12-13 16:22:17
-->
<!--  -->
<template>
	<router-view v-slot="{ Component }">
		<keep-alive :max="10">
			<component :is="Component" />
		</keep-alive>
	</router-view>
</template>
