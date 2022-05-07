/*
 * @Descripttion:千分符相关方法
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2022-05-07 10:06:39
 */
/**
 * @description 给价格加入符号作为千分位， 默认使用逗号
 * @param number 数字 || 数字字符串
 * @param sign 符号
 * @returns
 */
const formatNumber = (number: any, sign: any = ',') => {
  if (number.toString() === '0') return '0'
  if (number) {
    let parts = number.toString().split('.')
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, sign)
    return parts.join('.')
  } else {
    return ''
  }
}
/**
 * @description 给数量(千分位)去除符号 (,) 并转换为数字
 * @param num
 * @returns
 */
const delComma = (num: any) => {
  if (num === undefined || num === null || num === '') {
    return 0
  }
  num = num.toString()
  num = num.replace(/[ ]/g, '') //去除空格
  num = num.replace(/,/gi, '')
  return Number(num)
}
export { formatNumber, delComma }
