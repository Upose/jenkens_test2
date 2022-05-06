/*
 * @Descripttion:
 * @version:
 * @Author: XJ
 * @Date: 2021-06-15 17:33:08
 * @LastEditors: HYH
 * @LastEditTime: 2022-05-05 12:00:24
 */
// ##时间格式化处理
interface IDayjs {
  $s: any
  [propName: string]: any
}
import dayjs from 'dayjs'

// export function dateNormLen(data: any) {
// 	if (!data) return []
// 	let Data: any[] = data.map((item: any) => {
// 		// 创建时间
// 		if (item.created_at) {
// 			item.created_at = dayjs(item.created_at).format('YYYY-MM-DD HH:mm:ss')
// 		}
// 		// 修改时间
// 		if (item.updated_at) {
// 			item.updated_at = dayjs(item.updated_at).format('YYYY-MM-DD HH:mm:ss')
// 		}
// 		if (item.children.length) {
// 			dateNormLen(item.children)
// 		}
// 		return item
// 	})
// 	return Data
// }
/**数组或者嵌套数组的时间格式化 */
export function dateNormArray(data: any) {
  // 如果数组存在且数组不为空数组执行时间格式化，或者返回空
  if (!(data && data.length)) return []
  let Data: any[] = data.map((item: any) => {
    // 创建时间
    if (item.created_at) {
      item.created_at = dayjs(item.created_at).format('YYYY-MM-DD HH:mm:ss')
    }
    // 修改时间
    if (item.updated_at) {
      item.updated_at = dayjs(item.updated_at).format('YYYY-MM-DD HH:mm:ss')
    }
    // 收付款时间
    if (item.account_at) {
      item.account_at = item.account_at = dayjs(item.account_at).format('YYYY-MM-DD HH:mm:ss')
    }
    if (item.children) {
      dateNormArray(item.children)
    }
    return item
  })
  return Data
}

/**处理单个时间 */
export function dateNormOne(arg: any) {
  let date = dayjs(arg).format('YYYY-MM-DD')
  return date
}
export function datetimeNormOne(arg: any) {
  let date = dayjs(arg).format('YYYY-MM-DD HH:mm:ss')
  return date
}
export function timeNormOne(arg: any) {
  let date = dayjs(arg).format('HH:mm:ss')
  return date
}

/**处理日期时间段数组 */

export function dateNormDateRange(date: any[]) {
  let dates = date.map((ele: any) => {
    ele = dateNormOne(ele)
    return ele
  })
  return dates
}
/**获取当前月第一天和最后一天 */

export function getCurMonthFirstDayAndLastDay() {
  let date = new Date()
  let month = date.getMonth()
  let year = date.getFullYear()
  return [new Date(year, month), new Date(year, month + 1, 0)]
}
