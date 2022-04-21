/*
 * @Descripttion:
 * @version:
 * @Author: XJ
 * @Date: 2021-05-13 11:57:26
 * @LastEditors: TJ
 * @LastEditTime: 2022-03-10 14:26:40
 */

export interface ISelection {
	singleSelection: {
		[propName: string]: any
	}
}
export interface IState {
	tableData: any[]
	tableHeight: string
	pagination: {
		page: number
		perpage: number
		total: number
		order_by: number
		search_value: any
		field: any
	}
	customArgs: {
		common_array: any[]
		handle_array: any[]
		table: string
	}
	itemName: string
	commonLists: {
		companyList: any[]
	}
	drawer: {
		showAdd: boolean
		showUpd: boolean
		showDetail: boolean
		showSortableCustom: boolean
	}
	buttonData: any[]
}
export interface IValid {
	checkOthers: {
		validatorFun: Function
		fun: Function
		info: string
		bool: boolean
	}
}
