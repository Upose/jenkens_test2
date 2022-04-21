/*
 * @Descripttion:
 * @version:
 * @Author: HYH
 * @Date: 2021-08-06 10:48:22
 * @LastEditors: HYH
 * @LastEditTime: 2021-09-14 16:06:04
 */
// 定义bus方法
interface IBus {
  $on: any
  $off: any
  $emit: any
}

import mitt from 'mitt'
const bus = {} as IBus
const emitter = mitt()
bus.$on = emitter.on
bus.$off = emitter.off
bus.$emit = emitter.emit

export { bus }
