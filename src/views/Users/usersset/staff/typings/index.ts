/*
 * @Descripttion:
 * @version:
 * @Author: XJ
 * @Date: 2021-05-13 11:57:26
 * @LastEditors: TJ
 * @LastEditTime: 2022-03-10 14:26:33
 */
export interface ISelection {
	singleSelection: {
		[propName: string]: any
	}
}

export interface IState {
	configUrl: string | undefined
	commonLists: {
		jobStatusList: any[]
		languageList: any[]
		companyList: any[]
		powerList: any[]
		roleList: any[]
	}
	scrollbarMaxHeight: string
	tableHeight: string
	pagination: {
		page: number
		perpage: number
		total: number
		order_by: any
		field: any
	}
	itemName: string
	searchValue: string
	customArgs: {
		common_array: any[]
		handle_array: any[]
		table: string
	}
	drawer: {
		showAdd: boolean
		showUpd: boolean
		showDetail: boolean
		showSortableCustom: boolean
	}
	tableData: any[]
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
