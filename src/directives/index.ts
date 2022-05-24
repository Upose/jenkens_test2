/*
 * @Description:
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2022-05-24 14:55:56
 */
// import directives
import { App } from 'vue'
import copy from './module/copy'
import thousands from './module/thousands'
import debounce from './module/debounce'
import throttle from './module/throttle'
import waterMark from './module/waterMark'
const directivesList: any = {
  copy,
  thousands,
  debounce,
  throttle,
  waterMark
}
const directives = {
  install: function(app: App<Element>) {
    Object.keys(directivesList).forEach(key => {
      // 注册自定义指令
      app.directive(key, directivesList[key])
    })
  }
}

export default directives
