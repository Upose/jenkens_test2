/*
 * @Descripttion: 系统管理模块api
 * @version:
 * @Author: TJ
 * @Date: 2021-04-30 14:17:56
 * @LastEditors: TJ
 * @LastEditTime: 2022-02-18 10:46:48
 */
import request from '@/http/axios/request'
import { IParams } from '@/@types/httpInterface'

// 不需要传参
export const roleinfoApi = {
	// 角色页面接口：V1/Role/index
	get_index: (params: IParams) => request.post(`/V1/Role/index`, params),
	// 数据获取接口：V1/Role/list
	get_list: (params: IParams) => request.post(`/V1/Role/list`, params),
	//  角色添加接口：V1/Role/add
	get_add: (params: IParams) => request.post(`/V1/Role/add`, params),
	// 角色修改接口：V1/Role/upd
	get_upd: (params: IParams) => request.post(`/V1/Role/upd`, params),
	// 角色删除接口：V1/Role/del
	get_del: (params: IParams) => request.post(`/V1/Role/del`, params),
	// 角色修改查询数据接口：V1/Role/view
	get_view: (params: IParams) => request.post(`/V1/Role/view`, params),
	// 2.16 公司获取接口：V1/Company/list
	get_company_list: (params: IParams) =>
		request.post(`/V1/Company/list`, params),
	//  角色可查看接口获取接口：V1/Role/role_examine
	get_role_examine: (params: IParams) =>
		request.post(`/V1/Role/role_examine`, params),
}
