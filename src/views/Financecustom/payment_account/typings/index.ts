/*
 * @Descripttion:
 * @version:
 * @Author: XJ
 * @Date: 2021-05-13 11:57:26
 * @LastEditors: TJ
 * @LastEditTime: 2022-03-10 16:56:55
 */
export interface ISelection {
	singleSelection: {
		[propName: string]: any
	}
}

export interface IState {
	commonLists: {
		staffList: any[]
	}
	tableHeight: string
	pagination: {
		page: number
		perpage: number
		total: any
		order_by: any
		search_value: string
		field: any
	}
	itemName: string
	customArgs: {
		common_array: any[]
		table: any
	}
	addForm: {
		name_cn: string
		name_en: string
		name_fr: string
		account: any
	}

	updForm: {
		id: any
		name_cn: string
		name_en: string
		name_fr: string
		account: any
	}
	drawer: {
		showAdd: boolean
		showUpd: boolean
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
