/*
 * @Descripttion: 
 * @version: 
 * @Author: HYH
 * @Date: 2021-07-07 18:08:11
 * @LastEditors: TJ
 * @LastEditTime: 2021-11-16 17:25:15
 */
/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
declare module 'vue-router-tab'