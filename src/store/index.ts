/*
 * @Descripttion: 数据管理模块入口
 * @version:
 * @Author: TJ
 * @Date: 2021-03-26 14:48:19
 * @LastEditors: TJ
 * @LastEditTime: 2022-03-15 13:23:53
 */
import { createLogger, createStore } from 'vuex'
import { IGlobalState } from './dataType'
import createPersistedState from 'vuex-persistedstate'
import { UserStore, UsersMoudle } from './modules/users'

import { IndexStore, IndexMoudle } from './modules/index'
//# 注册store类型
export type Store = UserStore<Pick<IGlobalState, 'users'>> &
	IndexStore<Pick<IGlobalState, 'index'>>

//# 数据持久化
const dataPlugins = createPersistedState({
	// storage: window.sessionStorage,
	// 跨页面存localStorage
	storage: window.localStorage,
	paths: [
		'users.token',
		'users.userId',
		'users.language',
		'index.showCustom',
		'index.tabs',
		'index.menus',
	],
})

export const store = createStore({
	// plugins: process.env.NODE_ENV === "production" ? [] : [createLogger()],
	modules: {
		users: UsersMoudle,
		index: IndexMoudle,
	},
	plugins: [dataPlugins],
})

export function useStore(): Store {
	return store as Store
}

export default store
