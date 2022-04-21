/*
 * @Descripttion:
 * @version:
 * @Author: HYH
 * @Date: 2021-09-29 17:44:53
 * @LastEditors: HYH
 * @LastEditTime: 2021-09-29 17:46:51
 */
export function arrUnique(array: any[]) {
  let res = array.filter(function(item, index, array) {
    return array.indexOf(item) === index
  })
  return res
}
