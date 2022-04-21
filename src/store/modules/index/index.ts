/*
 * @Descripttion: 用户相关信息状态管理
 * @version:
 * @Author: TJ
 * @Date: 2021-03-29 08:43:27
 * @LastEditors: TJ
 * @LastEditTime: 2022-03-15 13:22:35
 */
import {
	GetterConstants,
	MutationConstants,
	ActionConstants,
} from './constants' //枚举出有哪些变量
import { IGlobalState as RootState } from '../../dataType' //接口类型
import {
	Module,
	GetterTree,
	Store as VuxStore,
	CommitOptions,
	MutationTree,
} from 'vuex'

//#定义users state
export type IIndexState = {
	showCustom: boolean
	tabs: any[]
	menus: any[]
}

const state: IIndexState = {
	showCustom: false,
	tabs: [],
	menus: [],
}

//#定义users getters
export type Getters = {
	[GetterConstants.GET_SHOWCUSTOM](state: IIndexState): boolean
	[GetterConstants.GET_TABS](state: IIndexState): any
	[GetterConstants.GET_MENUS](state: IIndexState): any
}

const getters: GetterTree<IIndexState, RootState> & Getters = {
	[GetterConstants.GET_SHOWCUSTOM]: state => state.showCustom,
	[GetterConstants.GET_TABS]: state => state.tabs,
	[GetterConstants.GET_MENUS]: state => state.menus,
}

//#定义users mutations
interface Mutations {
	[MutationConstants.SET_SHOWCUSTOM](state: IIndexState, payload: boolean): void
	[MutationConstants.CLEAR_SHOWCUSTOM](
		state: IIndexState,
		payload: boolean
	): void
	[MutationConstants.SET_TABS](state: IIndexState, payload: any): void
	[MutationConstants.CLEAR_TABS](state: IIndexState, payload: any): void
	[MutationConstants.SET_MENUS](state: IIndexState, payload: any): void
	[MutationConstants.CLEAR_MENUS](state: IIndexState, payload: any): void
}

const mutations: MutationTree<IIndexState> & Mutations = {
	//# 设置showCustom
	[MutationConstants.SET_SHOWCUSTOM](state: IIndexState, payload: boolean) {
		state.showCustom = payload
	},
	//# 清除showCustom
	[MutationConstants.CLEAR_SHOWCUSTOM](state: IIndexState, payload: boolean) {
		state.showCustom = payload
	},
	//# 设置tabs
	[MutationConstants.SET_TABS](state: IIndexState, payload: any) {
		state.tabs = payload
	},
	//# 清除tabs
	[MutationConstants.CLEAR_TABS](state: IIndexState, payload: any) {
		state.tabs = payload
	},
	//# 设置MENUS
	[MutationConstants.SET_MENUS](state: IIndexState, payload: any) {
		state.menus = payload
	},
	//# 清除MENUS
	[MutationConstants.CLEAR_MENUS](state: IIndexState, payload: any) {
		state.menus = payload
	},
}

// #定义 users actions
const actions = {}
export type IndexStore<S = IIndexState> = Omit<
	VuxStore<S>,
	'getters' | 'commit' | 'dispatch'
> & {
	getters: {
		[K in keyof Getters]: ReturnType<Getters[K]>
	}
} & {
	commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
		key: K,
		payload: P,
		options?: CommitOptions
	): ReturnType<Mutations[K]>
}
export const IndexMoudle: Module<IIndexState, RootState> = {
	// namespaced: true,
	state,
	mutations,
	actions,
	getters,
}
