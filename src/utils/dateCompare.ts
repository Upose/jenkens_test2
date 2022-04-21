/*
 * @Descripttion:
 * @version:
 * @Author: XJ
 * @Date: 2021-06-29 16:17:13
 * @LastEditors: HYH
 * @LastEditTime: 2021-08-31 16:05:45
 */
// ##和现在比较时间大小
import { dateNormOne } from './dateNorm'
export function dateCompare(time: string, num: boolean) {
  let currentTime = dateNormOne(new Date()) //取今天的日期
  let othTime = dateNormOne(time) //选择时间
  if (num) {
    return othTime <= currentTime ? true : false
  } else {
    return othTime >= currentTime ? true : false
  }
}
