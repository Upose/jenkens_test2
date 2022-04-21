/*
 * @Descripttion:
 * @version:
 * @Author: XJ
 * @Date: 2021-05-06 11:17:19
 * @LastEditors: TJ
 * @LastEditTime: 2022-03-02 09:24:55
 */

import { datetimeNormOne } from '@/utils/dateNorm'
import { IParams, ICustomdata, IMetadata } from '@/@types/httpInterface'
import { useStore } from '@/store'
import { GetterConstants } from '@/store/modules/users/constants'
export default function dataStructure(
	meta_data: IMetadata,
	custom_data: ICustomdata
) {
	const store = useStore()
	let request_time = datetimeNormOne(new Date())
	// 登录和语言id不需要userId
	let user_id = store.getters[GetterConstants.GET_USERID]
	let language_id = store.getters[GetterConstants.GET_LANGUAGE]
	// 时区
	let time_zone = -new Date().getTimezoneOffset() / 60
	let obj = {
		language_id,
		user_id,
		request_time,
		access_sys_code: 'web', //web android ios
		time_zone,
	}
	let params: IParams = {
		meta_data: {},
		custom_data: {},
	}

	params.custom_data = { ...custom_data }
	params.meta_data = { ...meta_data, ...obj } //将页面传入的参数对象和这个参数对象结构放在一起

	return params
}
