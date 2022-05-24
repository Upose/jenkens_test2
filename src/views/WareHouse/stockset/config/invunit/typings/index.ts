/*
 * @Descripttion:
 * @version:
 * @Author: XJ
 * @Date: 2021-05-13 11:57:26
 * @LastEditors: TJ
 * @LastEditTime: 2022-03-10 14:22:06
 */
export interface ISelection {
	singleSelection: {
		[propName: string]: any
	}
}

export interface IState {
	tableHeight: string
	pagination: {
		page: number
		perpage: number
		total: null | number
		order_by: null | number
		search_value: string
		field: any
	}
	itemName: string
	customArgs: {
		common_array: any[]
		table: string
	}
	addForm: {
		name_cn: string
		name_en: string
		name_fr: string
	}
	updForm: {
		id: number | null
		name_cn: string
		name_en: string
		name_fr: string
	}
	drawer: {
		showAdd: boolean
		showUpd: boolean
		showSortableCustom: boolean
	}
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
