/*
 * @Description: 
 * @version: 
 * @Author: HYH
 * @Date: 2021-07-07 18:08:11
 * @LastEditors: HYH
 * @LastEditTime: 2022-05-18 15:01:13
 */
/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
declare module 'vue-router-tab'