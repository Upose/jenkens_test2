/*
 * @Descripttion:
 * @Author: TJ
 * @LastEditors: XJ
 * @LastEditTime: 2022-03-31 11:14:26
 */
import { nextTick } from 'vue'
import { changeMoney, changeNumber } from '../utils/moneyToMicrometer'
export default function registerDirective(app: any) {
  // #全局自定义指令
  // #el-input自动获取焦点
  app.directive('focus', {
    beforeMount(el: any, binding: any, vnode: any) {
      nextTick(() => {
        // 聚焦元素
        el.querySelector('input').focus()
      })
    }
  })
  // #监听部分el-input框，使其值改为千分符样式
  app.directive('micrometer', {
    beforeMount(el: any, binding: any, vnode: any) {
      nextTick(() => {
        // 获取元素
        let ele = el.querySelector('input')
        // 默认先更改显示
        // ele.value = changeMoney(ele.value)
        // 监听失去焦点，转为千分符
        ele.addEventListener('blur', function() {
          ele.value = changeMoney(ele.value)
          ele.dispatchEvent(new Event('input')) //失去焦点时不主动触发input事件去更新state里面的状态值
        })
        // 监听获取焦点，转为正常数值，并且更新到
        ele.addEventListener('focus', function() {
          ele.value = changeNumber(ele.value)
          ele.dispatchEvent(new Event('input'))
        })
      })
    }
  })
  // #监听部分el-input框input事件，最后一次去掉值左右两端的空格
  app.directive('trim', {
    beforeMount(el: any, binding: any, vnode: any) {
      nextTick(() => {
        // 聚焦元素
        let ele = el.querySelector('input')
        let timer: any = null
        ele.addEventListener('input', function(a: any, b: any) {
          clearTimeout(timer)
          timer = setTimeout(() => {
            ele.value = ele.value.trim()
            // 需手动触发input事件
            ele.dispatchEvent(new Event('input'))
          }, 500)
        })
      })
    }
  })
}
