/*
 * @Descripttion:
 * @version:
 * @Author: HYH
 * @Date: 2021-07-07 18:08:11
 * @LastEditors: TJ
 * @LastEditTime: 2022-02-25 14:09:26
 */

// ##获取新token方法
import { IRequest } from '@/@types/httpInterface'
import { commonApi } from '@/http/api/common'
import { getUserId, setUserId, removeUserId } from '@/utils/cookie'
import dataStructure from './dataStructure'
import { useStore } from '@/store'
import { ActionConstants } from '@/store/modules/users/constants'
import router from '@/router'
// export const getNewToken = () => {
// 	const store = useStore()
// 	//#只有token失效才会去读取cookie中的userId，以此判定用户有没有选择30天免登录
// 	let userId = getUserId()
// 	const data = dataStructure({}, { user_id: userId })

// 	return commonApi.auto_login(data).then(res => {
// 		// 取消请求后res可能为 undefined
// 		let { info, status, custom_data } = res as IRequest
// 		if (status === 200) {
// 			store.dispatch(ActionConstants.SET_NEW_TOKEN, custom_data.token)
// 			store.dispatch(ActionConstants.SET_USER_ID, custom_data.user_id)
// 			setUserId(custom_data.user_id) //userId又延期三十天
// 			location.reload()
// 		} else {
// 			router.push('/login')
// 		}
// 	})
// }

// export const getNewToken = () => {
// 	return new Promise((resolve, reject) => {
// 		const store = useStore()
// 		//#只有token失效才会去读取cookie中的userId，以此判定用户有没有选择30天免登录
// 		let userId = getUserId()
// 		const data = dataStructure({}, { user_id: userId })
// 		commonApi.auto_login(data).then(res => {
// 			// 取消请求后res可能为 undefined
// 			let { info, status, custom_data } = res as IRequest
// 			if (status === 200) {
// 				store.dispatch(ActionConstants.SET_NEW_TOKEN, custom_data.token)
// 				store.dispatch(ActionConstants.SET_USER_ID, custom_data.user_id)
// 				setUserId(custom_data.user_id) //userId又延期三十天
// 				resolve(custom_data.token)
// 				// location.reload()
// 			} else {
// 				router.push('/login')
// 			}
// 		})
// 	})
// }

/**
 * token刷新方法，
 * 1、当第一次出现401的时候，立即从api里请求token，并将“异步体”保存为 refreshPromise
 * 2、后续的请求相当于都是给 apiRefreshToken 添加then
 * 3、当token刷新完毕，refreshPromise 应当清空为下次做准备
 */
class refreshToken {
	public refreshPromise: any
	constructor() {
		this.refreshPromise = undefined
	}
	apiRefreshToken() {
		if (!this.refreshPromise) {
			this.refreshPromise = new Promise(resolve => {
				const store = useStore()
				//#只有token失效才会去读取cookie中的userId，以此判定用户有没有选择30天免登录
				let userId = getUserId()
				const data = dataStructure({}, { user_id: userId })
				commonApi.auto_login(data).then(res => {
					// 取消请求后res可能为 undefined
					let { info, status, custom_data } = res as IRequest
					if (status === 200) {
						store.dispatch(ActionConstants.SET_NEW_TOKEN, custom_data.token)
						store.dispatch(ActionConstants.SET_USER_ID, custom_data.user_id)
						setUserId(custom_data.user_id) //userId又延期三十天
						// location.reload()
						this.refreshPromise = undefined
						resolve(custom_data.token)
					} else {
						router.push('/login')
					}
				})
			})
		}
		return this.refreshPromise
	}
	// 是否正在刷新
	refreshIsLoading() {
		return Boolean(this.refreshPromise)
	}
	// 正在刷新时，不是刷新token的请求就等待
	currentUrlIsAutoLogin(url: any) {
		return url !== '/V1/Login/auto_login' && this.refreshIsLoading()
	}
}
export const getNewToken = new refreshToken()
