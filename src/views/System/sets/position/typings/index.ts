/*
 * @Descripttion:
 * @version:
 * @Author: XJ
 * @Date: 2021-05-13 11:57:26
 * @LastEditors: TJ
 * @LastEditTime: 2022-03-10 14:24:45
 */
export interface ISelection {
	singleSelection: {
		[propName: string]: any
	}
}

export interface IState {
	tableHeight: string
	pagination: {
		order_by: null | number
		search_value: any
	}
	commonLists: {
		companyList: any[]
		staffList: any[]
		selectedPositionList: any[]
	}
	itemName: string
	customArgs: {
		common_array: any[]
		table: string
	}
	addForm: {
		name_cn: any
		name_en: any
		name_fr: any
		com_code: any
		parent_id: any
	}
	updForm: {
		id: any
		name_cn: any
		name_en: any
		name_fr: any
		com_code: any
		parent_id: any
	}
	userForm: {
		id: any
		user_id: any
		selectedData: any[]
	}
	drawer: {
		showAdd: boolean
		showUpd: boolean
		showUser: boolean
		showSortableCustom: boolean
	}
	tableData: any[]
	buttonData: any[]
}
