/*
 * @Descripttion: mutation type 变量定义
 * @version:
 * @Author: TJ
 * @Date: 2021-03-29 08:51:08
 * @LastEditors: HYH
 * @LastEditTime: 2021-09-13 14:17:41
 */
// 枚举类型
export enum GetterConstants {
  GET_LANGUAGE = 'GET_LANGUAGE',
  GET_TOKEN = 'GET_TOKEN',
  GET_USERID = 'GET_USERID',
//   GET_NOLOGIN = 'GET_NOLOGIN',
//   GET_USERINFO = 'GET_USERINFO',
}

export enum MutationConstants {
  SET_LANGUAGE = 'SET_LANGUAGE',
  CLEAR_LANGUAGE = 'CLEAR_LANGUAGE',
  SET_TOKEN = 'SET_TOKEN',
  CLEAR_TOKEN = 'CLEAR_TOKEN',
  SET_USERID = 'SET_USERID',
  CLEAR_USERID = 'CLEAR_USERID',
//   SET_NOLOGIN = 'SET_NOLOGIN',
//   CLEAR_NOLOGIN = 'CLEAR_NOLOGIN',
//   SET_USERINFO = 'SET_USERINFO',
//   CLEAR_USERINFO = 'CLEAR_USERINFO',
}

export enum ActionConstants {
  CHANGE_LANGUAGE = 'CHANGE_LANGUAGE',
  SET_NEW_TOKEN = 'SET_NEW_TOKEN',
  SET_USER_ID = 'SET_USER_ID',
}
