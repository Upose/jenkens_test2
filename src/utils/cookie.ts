/*
 * @Descripttion:  设置cookie
 * @version:
 * @Author: TJ
 * @Date: 2021-03-26 14:41:19
 * @LastEditors: HYH
 * @LastEditTime: 2021-09-13 14:44:09
 */
import Keys from '@/constant/key'
import Cookies from 'js-cookie'
import { dateRange } from './dateRange'

// 语言id
export const setLanguage = (language: string) =>
  Cookies.set(Keys.languageKey, language)
export const getLanguage = () => Cookies.get(Keys.languageKey)
export const removeLanguage = () => Cookies.remove(Keys.languageKey)
// 处理userId
export const setUserId = (userId: string) =>
  Cookies.set(Keys.userId, userId, { expires: dateRange(30) })
// export const setShortUserId = (userId: string) =>
//   Cookies.set(Keys.userId, userId)
export const getUserId = () => Cookies.get(Keys.userId)
export const removeUserId = () => Cookies.remove(Keys.userId)

// // 处理token
// export const setToken = (token: string) =>
//   Cookies.set(Keys.token, token, { expires: dateRange(30) })
// export const setShortToken = (token: string) => Cookies.set(Keys.token, token)
// export const getToken = () => Cookies.get(Keys.token)
// export const removeToken = () => Cookies.remove(Keys.token)

// // 30天免登录
// export const setNoLogin = (noLogin: string) =>
//   Cookies.set(Keys.noLogin, noLogin, { expires: dateRange(30) })
// export const getNoLogin = () => Cookies.get(Keys.noLogin)
// export const removeNoLogin = () => Cookies.remove(Keys.noLogin)

// // 用户信息，账号密码
// export const setUserInfo = (userInfo: object) =>
//   Cookies.set(Keys.userInfo, userInfo)
// export const getUserInfo = () => Cookies.get(Keys.userInfo)
// export const removeUserInfo = () => Cookies.remove(Keys.userInfo)
