/*
 * @Descripttion: 系统管理模块api
 * @version:
 * @Author: TJ
 * @Date: 2021-04-30 14:17:56
 * @LastEditors: RD
 * @LastEditTime: 2021-10-27 10:50:42
 */
import request from '@/http/axios/request'
import { IParams } from '@/@types/httpInterface'

// 不需要传参
export const paymentAccountApi = {
	get_index: (params: IParams) =>
		request.post(`/V1/InventoryPaymentAccount/index`, params),
	get_list: (params: IParams) =>
		request.post(`/V1/InventoryPaymentAccount/list`, params),
	get_add: (params: IParams) =>
		request.post(`/V1/InventoryPaymentAccount/add`, params),
	get_view: (params: IParams) =>
		request.post(`/V1/InventoryPaymentAccount/view`, params),
	get_upd: (params: IParams) =>
		request.post(`/V1/InventoryPaymentAccount/upd`, params),
	get_del: (params: IParams) =>
		request.post(`/V1/InventoryPaymentAccount/del`, params),
}
