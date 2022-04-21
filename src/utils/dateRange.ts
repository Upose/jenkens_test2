/*
 * @Descripttion: 获取一个指定的时间方法
 * @version:
 * @Author: TJ
 * @Date: 2021-04-21 10:49:37
 * @LastEditors: HYH
 * @LastEditTime: 2021-08-31 16:08:56
 */

// #cookie中30天后等的时间处理
export function dateRange(time: number) {
  // ======= 当前时间
  let inFifteenMinutes = new Date(
    new Date().getTime() + time * 24 * 60 * 60 * 100
  )
  return inFifteenMinutes
}
