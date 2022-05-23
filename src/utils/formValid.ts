/*
 * @Description: 表单校验
 * @version:
 * @Author: HYH
 * @Date: 2022-05-18 10:07:26
 * @LastEditors: HYH
 * @LastEditTime: 2022-05-23 10:47:15
 */
import i18n from '@/locales'
let currentPassword = '' //定义一个空字符串接受密码

//#   手机号验证
export async function checkPhoneNum(rule: object, value: string, callback: Function) {
  const regpCard = /^1(3|4|5|7|8)\d{9}$/
  if (!value) {
    callback(new Error(i18n.global.t('form.mobileWarning')))
  } else {
    callback()
  }
  // else if (!regpCard.test(value)) {
  //   callback(new Error(i18n.global.t('form.mobileRegpWarn')))
  // }
}
//#    邮箱验证
export async function checkemail(rule: object, value: string, callback: Function) {
  const regpEmail = /^[_a-z0-9\u4e00-\u9fa5]+(\.[_a-z0-9\u4e00-\u9fa5]+)*@[a-z0-9\u4e00-\u9fa5]+(\.[a-z0-9\u4e00-\u9fa5]+)*(\.[a-z]{2,})$/
  if (!value) {
    callback(new Error(i18n.global.t('common.emailWarning')))
  } else if (!regpEmail.test(value)) {
    callback(new Error(i18n.global.t('common.emailRegpWarning')))
  } else {
    callback()
  }
}
//#    密码验证
export async function checkPassword(rule: object, value: string, callback: Function) {
  currentPassword = value
  const regpPassword = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/
  if (!value) {
    callback(new Error(i18n.global.t('form.passwordWarning')))
  } else if (!regpPassword.test(value)) {
    callback(new Error(i18n.global.t('form.passwordRegp')))
  } else {
    callback()
  }
}
//#    再次输入密码验证
export async function checkpasswordAgain(rule: object, value: string, callback: Function) {
  if (!value) {
    callback(new Error(i18n.global.t('form.passwordAgain')))
  } else if (currentPassword !== value) {
    callback(new Error(i18n.global.t('form.passwordRegpWarning')))
  } else {
    callback()
  }
}

/**输入的折扣限制 */
export async function checkDiscount(rule: object, value: string, callback: Function) {
  const regp = /^[0-9]{1}(\.[0-9])?$/
  if (!value) {
    callback(new Error(i18n.global.t('common.inputInfo')))
  } else if (!regp.test(value) || Number(value) === 0) {
    callback(new Error(i18n.global.t('common.input0to10Number')))
  } else {
    callback()
  }
}
/**输入的价格限制 */
export async function checkPrice(rule: object, value: string, callback: Function) {
  const regpPrice = /^[\+\-]?(0|[1-9]\d{0,11}|0\.\d{1,2}|[1-9]\d{0,11}\.\d{1,2})$/
  if (!value) {
    callback(new Error(i18n.global.t('common.inputInfo')))
  } else if (!regpPrice.test(value) || Number(value) === 0) {
    callback(new Error(i18n.global.t('common.inputNotAllowed')))
  } else {
    callback()
  }
}
/**输入内容为数字和小数 */
export async function checkIfNumber(rule: object, value: string, callback: Function) {
  const regp = /^(\-|\+)?\d+(\.\d+)?$/
  if (!value) {
    callback(new Error(i18n.global.t('common.inputInfo')))
  } else if (!regp.test(value) || Number(value) === 0) {
    callback(new Error(i18n.global.t('common.inputNumber')))
  } else {
    callback()
  }
}

// 给价格加入符号作为千分位， 默认使用逗号
export const formatPrice = (number: any, sign: any = ',') => {
  if (number) {
    var parts = number.toString().split('.')
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, sign)
    return parts.join('.')
  } else {
    return ''
  }
}
// 给价格(千分位)去除符号 (,)
export const delComma = (num: any) => {
  if (num === undefined || num === null || num === '') {
    return null
  }
  num = num.toString()
  num = num.replace(/[ ]/g, '') //去除空格
  num = num.replace(/,/gi, '')
  return Number(num)
}
function debounce(fn: Function, delay: number) {
  let timer: any = null
  return function() {
    if (timer) {
      clearTimeout(timer)
      timer = setTimeout(fn, delay)
    } else {
      timer = setTimeout(fn, delay)
    }
  }
}
/**公共校验规则 Element-plus=>Form */
const trigger = ['change', 'blur']
const required = true
const { t } = i18n.global
export const defineRules = {
  /**请选择 */
  selectInfo: [{ required, message: t('common.selectInfo'), trigger }],
  /**请输入 */
  inputInfo: [{ required, message: t('common.inputInfo'), trigger }],
  /**邮箱 */
  email: [{ required, validator: checkemail, trigger }],
  /**数字 */
  number: [{ required, validator: checkIfNumber, trigger }],
  /**自定义校验方法 */
  valid: (validator: any) => [{ required, validator, trigger }],
  /**自定义提示信息 */
  defineMsg: (message: string) => [{ required, message, trigger }],
  /**节流 */
  debounce
}
/**
 * @description 检测文件类型是否是图片
 * @param type 文件类型
 */
export const checkIsImg = (type: string) =>
  type === 'image/jpg' || type === 'image/png' || type === 'image/gif' || type === 'image/jpeg'
