/*
 * @Descripttion:
 * @version:
 * @Author: XJ
 * @Date: 2021-05-18 15:37:53
 * @LastEditors: TJ
 * @LastEditTime: 2022-01-28 15:27:43
 */
import request from '@/http/axios/request'
import { IParams } from '@/@types/httpInterface'

// 不需要传参
export const powersetApi = {
	// 权限设置接口：V1/Power/index
	get_index: (params: IParams) => request.post(`/V1/Power/index`, params),
	// 权限设置菜单列表接口：V1/Power/menulist
	get_menulist: (params: IParams) => request.post(`/V1/Power/menulist`, params),
	// 权限设置菜单_角色列表接口：V1/Power/menu_rolelist
	get_menu_rolelist: (params: IParams) =>
		request.post(`/V1/Power/menu_rolelist`, params),
	// 权限设置菜单_角色_权限列表接口：V1/Power/menu_role_powerlist
	get_menu_role_powerlist: (params: IParams) =>
		request.post(`/V1/Power/menu_role_powerlist`, params),
	// 权限设置菜单_修改接口：V1/Power/menu_upd
	get_menu_upd: (params: IParams) => request.post(`/V1/Power/menu_upd`, params),
	// 权限设置机构_角色接口：V1/Power/organization_rolelist
	get_organization_rolelist: (params: IParams) =>
		request.post(`/V1/Power/organization_rolelist`, params),
	//  权限设置机构列表接口：V1/Power/organizationlist
	get_organizationlist: (params: IParams) =>
		request.post(`/V1/Power/organizationlist`, params),
	// 权限设置机构_修改接口：V1/Power/organization_upd
	get_organization_upd: (params: IParams) =>
		request.post(`/V1/Power/organization_upd`, params),
	// 权限设置人员接口：V1/Power/rolelist
	get_rolelist: (params: IParams) => request.post(`/V1/Power/rolelist`, params),
	// 权限设置人员_角色接口：V1/Power/role_object_user
	get_role_object_user: (params: IParams) =>
		request.post(`/V1/Power/role_object_user`, params),
	// 权限设置人员_添加接口：V1/Power/staff_add
	get_staff_add: (params: IParams) =>
		request.post(`/V1/Power/staff_add`, params),
	// 权限设置人员_删除接口：V1/Power/staff_del
	get_staff_del: (params: IParams) =>
		request.post(`/V1/Power/staff_del`, params),
	// 员工信息获取接口：V1/Staff/list
	get_staff_list: (params: IParams) => request.post(`/V1/Staff/list`, params),
	// 权限设置组织机构对应员工接口：V1/Power/organization_staff_list
	get_organization_staff_list: (params: IParams) =>
		request.post(`/V1/Power/organization_staff_list`, params),
}
