/*
 * @Descripttion: 
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2022-05-07 09:48:08
 */
const formatNumber = (number, sign = ',') => {
  if (number) {
    let parts = number.toString().split('.')
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, sign)
    return parts.join('.')
  } else {
    return ''
  }
}
let s = 0
s = formatNumber(s)
console.log(s);