/*
 * @Descripttion:
 * @version:
 * @Author: XJ
 * @Date: 2021-05-13 11:57:26
 * @LastEditors: TJ
 * @LastEditTime: 2022-03-10 14:21:34
 */
export interface ISelection {
	singleSelection: {
		[propName: string]: any
	}
}

export interface IState {
	Add: any
	tableHeight: string
	commonLists: {
		warehouseList: any[]
		typeList: any[]
		modelList: any[]
	}
	pagination: {
		page: number
		perpage: number
		total: null | number
		order_by: null | number
		search_value: string
		field: any
	}
	customArgs: {
		common_array: any[]
		table: string
	}
	showUpd: boolean
	showAdd: boolean
	showSortableCustom: boolean
	tableData: never[]
	buttonData: never[]
}
export interface IValid {
	checkOthers: {
		validatorFun: Function
		fun: Function
		info: string
		bool: boolean
	}
}
