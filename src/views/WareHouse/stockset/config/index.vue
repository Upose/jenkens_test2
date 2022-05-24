<!--
 * @Descripttion: 
 * @version: 
 * @Author: XJ
 * @Date: 2021-05-26 09:46:56
 * @LastEditors: TJ
 * @LastEditTime: 2021-11-11 16:16:30
-->
<!--  -->
<template>
	<router-view v-slot="{ Component }">
		<keep-alive>
			<component :is="Component" />
		</keep-alive>
	</router-view>
</template>
