/*
 * @Description:处理千分符的显示问题
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2022-05-26 15:12:46
 */
import { Directive, DirectiveBinding, nextTick } from 'vue'
import { formatNumber } from '@/utils/thousand'
const delComma = (num: any) => {
  if (num === undefined || num === null || num === '') {
    return ''
  }
  num = num.toString()
  num = num.replace(/[ ]/g, '') //去除空格
  num = num.replace(/,/gi, '')
  return Number(num)
}
export { formatNumber, delComma }

interface ElType extends HTMLElement {
  copyData: string | number
  input: any
}
const thousands: Directive = {
  mounted(el: ElType, binding: DirectiveBinding) {
    el.children[0].addEventListener('blur', handleInput)
  },

  beforeUnmount(el: ElType) {
    el.children[0].removeEventListener('input', el.input)
  }
}
function handleInput(e: any) {
  const target = formatNumber(delComma(JSON.parse(JSON.stringify(e.target.value)))) || ''
  e.target.value = target
}
export default thousands
