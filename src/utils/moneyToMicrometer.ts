/*
 * @Descripttion:
 * @Author: TJ
 * @LastEditors: XJ
 * @LastEditTime: 2022-04-06 10:33:25
 */
// 判断是否是千分符
export function isMicrometer(arg: any) {
  if (arg.toString().indexOf(',') < 0) return false
  return true
}
// 判断是否是千分符后转正常
export function isChangeNumber(arg: any) {
  if (arg.toString().indexOf(',') < 0) return arg
  return changeNumber(arg)
}
// 转千分符
export function changeMoney(money: any) {
  if (!money) {
    return '0'
  }
  let a = (money + '').replace(/,/g, '')
  if (a.indexOf('.') != -1) {
    if (a.split('.')[1].length > 2) {
      a = Math.round(+a * 100) / 100 + ''
    }
    if (a.split('.').length == 2) {
      return (+a.split('.')[0]).toLocaleString() + '.' + a.split('.')[1]
    } else {
      return (+a.split('.')[0]).toLocaleString()
    }
  } else {
    return (+a.split('.')[0]).toLocaleString()
  }
}

//金额干分位字符转数字
export function changeNumber(val: any) {
  if (val) {
    let a = (val + '').replace(/,/g, '')
    return a
  } else {
    return '0'
  }
}
