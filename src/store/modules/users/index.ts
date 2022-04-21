/*
 * @Descripttion: 用户相关信息状态管理
 * @version:
 * @Author: TJ
 * @Date: 2021-03-29 08:43:27
 * @LastEditors: TJ
 * @LastEditTime: 2022-02-14 09:48:20
 */
import {
	GetterConstants,
	MutationConstants,
	ActionConstants,
} from './constants' //枚举出有哪些变量
import { getLocale } from '@/locales'
import { IGlobalState as RootState } from '../../dataType' //接口类型
import {
	Module,
	GetterTree,
	Store as VuxStore,
	CommitOptions,
	MutationTree,
	ActionTree,
	ActionContext,
	DispatchOptions,
} from 'vuex'
import { setLanguage, removeLanguage } from '@/utils/cookie'
//#定义users state
export type IUsersState = {
	language: string
	token: string
	userId: string
	// noLogin: string
	// userInfo:any
}

const state: IUsersState = {
	language: getLocale(), //初始化
	token: '',
	userId: '',
	// noLogin: '',
	// userInfo:null
}

//#定义users getters
export type Getters = {
	[GetterConstants.GET_LANGUAGE](state: IUsersState): string
	[GetterConstants.GET_TOKEN](state: IUsersState): string
	[GetterConstants.GET_USERID](state: IUsersState): string
	// [GetterConstants.GET_NOLOGIN](state: IUsersState): string
	// [GetterConstants.GET_USERINFO](state: IUsersState): string
}

const getters: GetterTree<IUsersState, RootState> & Getters = {
	[GetterConstants.GET_LANGUAGE]: state => state.language,
	[GetterConstants.GET_TOKEN]: state => state.token,
	[GetterConstants.GET_USERID]: state => state.userId,
	// [GetterConstants.GET_NOLOGIN]: (state) => state.noLogin,
	// [GetterConstants.GET_USERINFO]: (state) => state.userInfo,
}

//#定义users mutations
interface Mutations {
	[MutationConstants.SET_LANGUAGE](state: IUsersState, payload: any): void
	[MutationConstants.CLEAR_LANGUAGE](state: IUsersState, payload: string): void
	[MutationConstants.SET_TOKEN](state: IUsersState, payload: string): void
	[MutationConstants.CLEAR_TOKEN](state: IUsersState, payload: string): void
	[MutationConstants.SET_USERID](state: IUsersState, payload: string): void
	[MutationConstants.CLEAR_USERID](state: IUsersState, payload: string): void

	// [MutationConstants.SET_NOLOGIN](state: IUsersState, payload: string): void
	// [MutationConstants.CLEAR_NOLOGIN](state: IUsersState, payload: string): void
	// [MutationConstants.SET_USERINFO](state: IUsersState, payload: string): void
	// [MutationConstants.CLEAR_USERINFO](state: IUsersState, payload: string): void
}

const mutations: MutationTree<IUsersState> & Mutations = {
	//[函数类型]
	//# 设置语言
	[MutationConstants.SET_LANGUAGE](state: IUsersState, payload: any) {
		state.language = payload
		//将语言同时也存入cookie
		setLanguage(payload)
	},
	//# 清除语言
	[MutationConstants.CLEAR_LANGUAGE](state: IUsersState, payload: string) {
		state.language = payload
		//将cookie里面的语言同时清除
		removeLanguage()
	},

	//#设置token
	[MutationConstants.SET_TOKEN](state: IUsersState, payload: string) {
		state.token = payload
	},
	//# 清除token
	[MutationConstants.CLEAR_TOKEN](state: IUsersState, payload: string) {
		state.token = payload
	},
	//# 设置userId
	[MutationConstants.SET_USERID](state: IUsersState, payload: string) {
		state.userId = payload
	},
	//# 清楚userId
	[MutationConstants.CLEAR_USERID](state: IUsersState, payload: string) {
		state.userId = payload
	},
	// //# 设置noLogin
	// [MutationConstants.SET_NOLOGIN](state: IUsersState, payload: string) {
	//   state.noLogin = payload
	// },
	// //# 清除noLogin
	// [MutationConstants.CLEAR_NOLOGIN](state: IUsersState, payload: string) {
	//   state.noLogin = payload
	// },
	// //# 设置用户信息
	// [MutationConstants.SET_USERINFO](state: IUsersState, payload: string) {
	//   state.userInfo = payload
	// },
	// //# 清除用户信息
	// [MutationConstants.CLEAR_USERINFO](state: IUsersState, payload: string) {
	//   state.userInfo = payload
	// },
}

// #定义 users actions 结合 mutations commit方法类型
type AugmentedActionContext = {
	commit<K extends keyof Mutations>(
		key: K,
		payload: Parameters<Mutations[K]>[1]
	): ReturnType<Mutations[K]>
} & Omit<ActionContext<IUsersState, RootState>, 'commit'>

// #定义 users actions
interface Actions {
	[ActionConstants.SET_NEW_TOKEN](
		{ commit }: AugmentedActionContext,
		payload: string
	): void
	[ActionConstants.SET_USER_ID](
		{ commit }: AugmentedActionContext,
		payload: string
	): void
}

export const actions: ActionTree<IUsersState, RootState> & Actions = {
	[ActionConstants.SET_NEW_TOKEN](
		{ commit }: AugmentedActionContext,
		payload: string
	) {
		commit(MutationConstants.SET_TOKEN, payload)
	},
	[ActionConstants.SET_USER_ID](
		{ commit }: AugmentedActionContext,
		payload: string
	) {
		commit(MutationConstants.SET_USERID, payload)
	},
}

export type UserStore<S = IUsersState> = Omit<
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
} & {
	dispatch<K extends keyof Actions>(
		key: K,
		payload: Parameters<Actions[K]>[1],
		options?: DispatchOptions
	): ReturnType<Actions[K]>
}
export const UsersMoudle: Module<IUsersState, RootState> = {
	// namespaced: true,
	state,
	mutations,
	actions,
	getters,
}
