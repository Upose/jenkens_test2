/*
 * @Descripttion: 校验公共文件
 * @version:
 * @Author: TJ
 * @Date: 2021-03-30 10:41:44
 * @LastEditors: XJ
 * @LastEditTime: 2022-04-06 11:01:19
 */
// ##表单验证相关方法
import i18n from '@/locales'
import { dateNormOne, datetimeNormOne } from './dateNorm'
import { isChangeNumber } from './moneyToMicrometer'
//#   手机号验证
export async function checkPhoneNum(rule: object, value: string, callback: Function) {
  const regpPhoneNum = /^1(3|4|5|7|8)\d{9}$/
  if (!value) {
    callback(new Error(i18n.global.t('common.not_empty')))
  } else if (!regpPhoneNum.test(value)) {
    callback(new Error(i18n.global.t('common.regpPhoneNum')))
  } else {
    callback()
  }
}
//#    邮箱验证
export async function checkEmail(rule: object, value: string, callback: Function) {
  const regpEmail = /^[_a-z0-9\u4e00-\u9fa5]+(\.[_a-z0-9\u4e00-\u9fa5]+)*@[a-z0-9\u4e00-\u9fa5]+(\.[a-z0-9\u4e00-\u9fa5]+)*(\.[a-z]{2,})$/
  if (!value) {
    callback(new Error(i18n.global.t('common.not_empty')))
  } else if (!regpEmail.test(value)) {
    callback(new Error(i18n.global.t('common.regpEmail')))
  } else {
    callback()
  }
}
//# 账号:   字母 数字 字母数字混合 单一或混合 4-12位
export async function checkUsername(rule: object, value: string, callback: Function) {
  //
  const regpUsername = /^[a-zA-Z0-9]{4,12}$/
  if (!value) {
    callback(new Error(i18n.global.t('common.not_empty')))
  } else if (!regpUsername.test(value)) {
    callback(new Error(i18n.global.t('common.regpUsername')))
  } else {
    callback()
  }
}
//#    密码： 字母/数字/特殊字符---至少两种 可混合使用 8-16位
export async function checkPassword(rule: object, value: string, callback: Function) {
  //
  const regpPassword = /^(((?=.*[0-9])(?=.*[a-zA-Z])|(?=.*[0-9])(?=.*[^\s0-9a-zA-Z])|(?=.*[a-zA-Z])(?=.*[^\s0-9a-zA-Z]))[^\s]+)$/
  if (!value) {
    callback(new Error(i18n.global.t('common.not_empty')))
  } else if (!regpPassword.test(value)) {
    callback(new Error(i18n.global.t('common.regpPassword')))
  } else {
    callback()
  }
}
// 设置密码再次校验密码
export async function reCheckPassword(
  rule: object,
  value: string,
  callback: Function,
  upd1: string,
  upd2: string
) {
  const regpPassword = /^(((?=.*[0-9])(?=.*[a-zA-Z])|(?=.*[0-9])(?=.*[^\s0-9a-zA-Z])|(?=.*[a-zA-Z])(?=.*[^\s0-9a-zA-Z]))[^\s]+)$/
  if (!value) {
    callback(new Error(i18n.global.t('common.not_empty')))
  } else if (!regpPassword.test(value)) {
    callback(new Error(i18n.global.t('common.regpPassword')))
  } else if (upd1 !== upd2) {
    callback(new Error(i18n.global.t('common.differ')))
  } else {
    callback()
  }
}
//#用过   数量： 大于零，只能输入正整数
export async function checkOnlyNum(rule: object, value: string, callback: Function) {
  const regpOnlyNum = /^[0-9]*[1-9][0-9]*$/
  value = isChangeNumber(value)
  if (!value) {
    callback(new Error(i18n.global.t('common.not_empty')))
  } else if (!regpOnlyNum.test(value)) {
    callback(new Error(i18n.global.t('common.regpOnlyNum')))
  } else {
    callback()
  }
}
//#金额：最多两位小数
export async function checkTwoDeci(rule: object, value: string, callback: Function) {
  value = isChangeNumber(value)
  const regpTwoDeci = /(^(([1-9]{1}\d*)|(0{1}))(\.\d{1,2})?$)/
  if (!value) {
    callback(new Error(i18n.global.t('common.not_empty')))
  } else if (!regpTwoDeci.test(value)) {
    callback(new Error(i18n.global.t('common.regpTwoDeci')))
  } else {
    callback()
  }
}
//两个金额大小比较，不能为0
export async function checkTwoDeci2(rule: object, value: string, callback: Function, arg2: any) {
  value = isChangeNumber(value)
  arg2 = isChangeNumber(arg2)
  const regpTwoDeci = /(^(([1-9]{1}\d*)|(0{1}))(\.\d{1,2})?$)/
  if (!value) {
    callback(new Error(i18n.global.t('common.not_empty')))
  } else if (!regpTwoDeci.test(value)) {
    callback(new Error(i18n.global.t('common.regpTwoDeci')))
  } else if (parseInt(value) > parseInt(arg2)) {
    callback(new Error(`${i18n.global.t('common.not_greater_than')}${arg2}`))
  } else {
    callback()
  }
}
// 追加：卖出数量不能大于表格里的未售数量字段
export async function checkSaleNumber1(rule: object, value: string, callback: Function, arg2: any) {
  value = isChangeNumber(value)
  arg2 = isChangeNumber(arg2)
  console.log(value, typeof value, arg2, typeof arg2)
  const regpOnlyNum = /^[0-9]*[1-9][0-9]*$/
  if (!value) {
    callback(new Error(i18n.global.t('common.not_empty')))
  } else if (parseInt(value) > parseInt(arg2)) {
    callback(new Error(`${i18n.global.t('common.not_greater_than')}${arg2}`))
  } else if (!regpOnlyNum.test(value)) {
    callback(new Error(i18n.global.t('common.regpOnlyNum')))
  } else {
    callback()
  }
}
// ======================================以上是新项目用过

//#   数量： 大于等于零
export async function checkOnlyNumZero(rule: object, value: string, callback: Function) {
  const regpOnlyNumZero = /^[0-9]*[0-9][0-9]*$/
  if (!value) {
    callback(new Error(i18n.global.t('common.not_empty')))
  } else if (!regpOnlyNumZero.test(value)) {
    callback(new Error(i18n.global.t('common.regpOnlyNumZero')))
  } else {
    callback()
  }
}

//#    金额：最多两位小数,可以为零
export async function checkTwoDeci1(rule: object, value: string, callback: Function) {
  value = isChangeNumber(value)
  console.log(!value, typeof value, value)

  const regpTwoDeci = /(^(([1-9]{1}\d*)|(0{1}))(\.\d{1,2})?$)/
  if (!value) {
    callback(new Error(i18n.global.t('common.not_empty')))
  } else if (!regpTwoDeci.test(value)) {
    callback(new Error(i18n.global.t('common.regpTwoDeci')))
  } else {
    callback()
  }
}

// 两个金额大小比较,可以为零
export async function checkTwoDeci3(
  rule: object,
  value: string,
  callback: Function,
  arg1: any,
  arg2: any
) {
  const regpTwoDeci = /(^(([1-9]{1}\d*)|(0{1}))(\.\d{1,2})?$)/
  // if (!value) {
  // 	callback(new Error(i18n.global.t('common.not_empty')))
  // } else
  if (!regpTwoDeci.test(value)) {
    callback(new Error(i18n.global.t('common.regpTwoDeci')))
  } else if (parseInt(arg1) > parseInt(arg2)) {
    callback(new Error(`${i18n.global.t('common.not_greater_than')}${arg2}`))
  } else {
    callback()
  }
}

// 出库数量不能大于未售数量
export async function checkSaleNumber2(
  rule: object,
  value: string,
  callback: Function,
  scope: any
) {
  const regpOnlyNum = /^[0-9]*[1-9][0-9]*$/
  if (!value) {
    callback(new Error(i18n.global.t('common.not_empty')))
  } else if (parseInt(scope.row.delivery_number) > parseInt(scope.row.sale_number)) {
    callback(new Error(`${i18n.global.t('common.not_greater_than')}${scope.row.sale_number}`))
  } else if (!regpOnlyNum.test(value)) {
    callback(new Error(i18n.global.t('common.regpOnlyNum')))
  } else {
    callback()
  }
}

// ------------------------------------------saleinventory销售信息

// 转单：转单数量不能大于表格里的预售数量字段
export async function checkSaleNumber3(
  rule: object,
  value: string,
  callback: Function,
  scope: any
) {
  const regpOnlyNum = /^[0-9]*[1-9][0-9]*$/
  if (!value) {
    callback(new Error(i18n.global.t('common.not_empty')))
  } else if (parseInt(scope.row.sale_number) > parseInt(scope.row.presell_number)) {
    callback(new Error(`${i18n.global.t('common.not_greater_than')}${scope.row.presell_number}`))
  } else if (!regpOnlyNum.test(value)) {
    callback(new Error(i18n.global.t('common.regpOnlyNum')))
  } else {
    callback()
  }
}
// 转单：转单数量不能大于表格里的预售数量字段
export async function checkSaleNumber5(
  rule: object,
  value: string,
  callback: Function,
  scope: any
) {
  const regpOnlyNumZero = /^[0-9]*[0-9][0-9]*$/
  if (!value) {
    callback(new Error(i18n.global.t('common.not_empty')))
  } else if (parseInt(scope.row.num) > parseInt(scope.row.sale_number)) {
    callback(new Error(`${i18n.global.t('common.not_greater_than')}${scope.row.sale_number}`))
  } else if (!regpOnlyNumZero.test(value)) {
    callback(new Error(i18n.global.t('common.regpOnlyNumZero')))
  } else {
    callback()
  }
}
export async function checkSaleNumber4(
  rule: object,
  value: string,
  callback: Function,
  arg1: any,
  arg2: any
) {
  const regpOnlyNum = /^[0-9]*[1-9][0-9]*$/
  if (!value) {
    callback(new Error(i18n.global.t('common.not_empty')))
  } else if (!regpOnlyNum.test(value)) {
    callback(new Error(i18n.global.t('common.regpOnlyNum')))
  } else if (parseInt(arg2) > parseInt(arg1)) {
    callback(new Error(`${i18n.global.t('common.not_greater_than')}${arg1}`))
  } else {
    callback()
  }
}
// 和今天进行时间比较
export async function checkAt1(
  rule: object,
  value: string,
  callback: Function,
  type: any,
  times: string
) {
  if (!value) {
    callback(new Error(i18n.global.t('common.not_empty')))
  } else if (type === 'ltDate') {
    //精确到天：日期不能早于今天
    if (dateNormOne(times) > dateNormOne(new Date())) {
      callback(new Error(i18n.global.t('common.ltDate')))
    } else {
      callback()
    }
  } else if (type === 'gtDate') {
    //精确到天：日期不能晚于今天
    if (dateNormOne(times) < dateNormOne(new Date())) {
      callback(new Error(i18n.global.t('common.gtDate')))
    } else {
      callback()
    }
  } else if (type === 'ltDateTime') {
    //精确到时分秒：时间不能超过今天
    if (datetimeNormOne(times) > datetimeNormOne(new Date())) {
      callback(new Error('不能超过今天'))
    } else {
      callback()
    }
  } else if (type === 'gtDateTime') {
    //精确到时分秒：时间不能小于今天
    if (datetimeNormOne(times) < datetimeNormOne(new Date())) {
      callback(new Error('不能小于今天'))
    } else {
      callback()
    }
  } else {
    callback()
  }
}

// 两个时间互相比较限定
export async function checkAt(
  rule: object,
  value: string,
  callback: Function,
  arg1: any,
  arg2: any
) {
  if (!value) {
    callback(new Error(i18n.global.t('common.not_empty')))
  } else if (dateNormOne(arg1) > dateNormOne(arg2)) {
    callback(new Error(i18n.global.t('common.startAndEnd')))
  } else {
    callback()
  }
}

// 库存盘点：两个整数进行大小比较
export async function compareNumber(
  rule: object,
  value: string,
  callback: Function,
  arg1: any,
  arg2: any,
  isCompare: any
) {
  const regpOnlyNum = /^[0-9]*[1-9][0-9]*$/
  if (!value) {
    callback(new Error(i18n.global.t('common.not_empty')))
  } else if (!regpOnlyNum.test(value)) {
    callback(new Error(i18n.global.t('common.regpOnlyNum')))
  } else if (isCompare) {
    if (parseInt(arg1) > parseInt(arg2)) {
      callback(new Error(`${i18n.global.t('common.not_greater_than')}${arg2}`))
    } else {
      callback()
    }
  } else {
    callback()
  }
}
