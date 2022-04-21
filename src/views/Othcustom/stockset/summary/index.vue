<!--
 * @Descripttion: 
 * @version: 
 * @Author: XJ
 * @Date: 2021-05-26 09:46:56
 * @LastEditors: XJ
 * @LastEditTime: 2022-04-01 13:41:05
-->
<!--  -->
<template>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
  <!-- <router-view></router-view> -->
</template>
