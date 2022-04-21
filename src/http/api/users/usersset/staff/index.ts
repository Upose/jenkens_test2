/*
 * @Descripttion: 系统管理模块api
 * @version:
 * @Author: TJ
 * @Date: 2021-04-30 14:17:56
 * @LastEditors: TJ
 * @LastEditTime: 2022-01-28 13:48:41
 */
import request from '@/http/axios/request'
import { IParams } from '@/@types/httpInterface'

// 不需要传参

export const staffApi = {
	// =============================主接口
	// 员工信息页面接口：V1/Staff/index
	get_index: (params: IParams) => request.post(`/V1/Staff/index`, params),
	// 员工信息获取接口：V1/Staff/list
	get_list: (params: IParams) => request.post(`/V1/Staff/list`, params),
	//  员工信息添加接口：V1/Staff/add
	get_add: (params: IParams) => request.post(`/V1/Staff/add`, params),
	// 员工信息查询数据接口：V1/Staff/view
	get_view: (params: IParams) => request.post(`/V1/Staff/view`, params),
	// 员工信息修改接口：V1/Staff/upd
	get_upd: (params: IParams) => request.post(`/V1/Staff/upd`, params),
	// 员工信息删除接口：V1/Staff/del
	get_del: (params: IParams) => request.post(`/V1/Staff/del`, params),
	// =============================其他页面接口
	//多语言获取接口：V1/Language/list
	get_language_list: (params: IParams) =>
		request.post(`/V1/Language/list`, params),
	// 2.16 公司获取接口：V1/Company/list
	get_company_list: (params: IParams) =>
		request.post(`/V1/Company/list`, params),
	// 用户管理删除接口：V1/User/del
	get_user_del: (params: IParams) => request.post(`/V1/User/del`, params),
	// 员工头像上传接口接口：V1/Staff/uploading
	get_uploading: (params: IParams) =>
		request.uploadPost(`/V1/Staff/uploading`, params),
	// 用户_组织机构获取接口：V1/StaffOrganization/view
	get_staffOrganization_view: (params: IParams) =>
		request.post(`/V1/StaffOrganization/view`, params),
	// 对应公司角色获取接口：V1/Role/role_list
	get_role_list: (params: IParams) =>
		request.post(`/V1/Role/role_list`, params),
}
