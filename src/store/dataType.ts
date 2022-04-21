/*
 * @Descripttion: 定义全局模块数据模块类型
 * @version: 
 * @Author: TJ
 * @Date: 2021-03-29 08:47:20
 * @LastEditors: TJ
 * @LastEditTime: 2021-03-29 14:17:38
 */
import { IIndexState } from './modules/index'

import { IUsersState } from './modules/users'
export interface IGlobalState {
    users:IUsersState,
    index:IIndexState
}

// export interface IGlobalState2 {
    
// }