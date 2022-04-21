/*
 * @Descripttion:
 * @version:
 * @Author: XJ
 * @Date: 2021-05-13 11:57:26
 * @LastEditors: TJ
 * @LastEditTime: 2022-01-28 15:42:19
 */

export interface ISelection {
	singleSelection: {
		[propName: string]: any
	}
}
export interface IState {
	itemName: string
	tableHeight: string
	defaultActive: string
	typeList: any[]
	addForm: {
		org_name: string
		org_id: string
		object_user: string
	}
	showDrawer: boolean
	showCard: string
	userData: {
		roleList: any[]
		userList: any[]
		role_id: any
		orgList: any[]
		objectUserList: any[]
		defaultProps: {
			children: string
			label: string
		}
	}
	menuData: {
		menuList: any[]
		defaultProps: {
			children: string
			label: string
		}
		role_id: any
		roleList: any[]
		widget_ids: any[] //复选框是数组
		powerList: any[]
		menu_id: string
	}
	orgData: {
		roleList: any[]
		orgList: any[]
		defaultProps: {
			children: string
			label: string
		}
		role_id: any[]
		org_id: null | any
	}
	pagination: {
		page: number
		perpage: number
	}
}
