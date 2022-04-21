/*
 * @Descripttion:
 * @version:
 * @Author: XJ
 * @Date: 2021-05-13 11:57:26
 * @LastEditors: TJ
 * @LastEditTime: 2022-03-10 14:26:13
 */
export interface IState {
	commonLists: {
		companyList: any[]
		orderbyList: any[]
		parentIdList: any[]
	}
	drawer: {
		showAdd: boolean
		showUpd: boolean
		showSortableCustom: boolean
	}
	tableHeight: string
	itemName: string
	searchValue: string

	customArgs: {
		common_array: any
		handle_array: any
		table: any
	}
	tableData: any[]
	buttonData: any[]
}

export interface ISelection {
	singleSelection: {
		[propName: string]: any
	}
}
export interface IValid {
	checkOthers: {
		validatorFun: Function
		fun: Function
		info: string
		num: boolean
	}
}
