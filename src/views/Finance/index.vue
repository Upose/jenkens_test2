<!--
 * @Description: 
 * @version: 
 * @Author: XJ
 * @Date: 2021-05-26 09:46:56
 * @LastEditors: HYH
 * @LastEditTime: 2022-05-24 18:07:39
-->
<!--  -->
<template>
  <router-view v-slot="{ Component }">
    <keep-alive :max="10">
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>
