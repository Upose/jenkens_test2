/*
 * @Descripttion:
 * @version:
 * @Author: XJ
 * @Date: 2021-05-13 11:57:26
 * @LastEditors: TJ
 * @LastEditTime: 2022-03-10 14:21:47
 */
export interface ISelection {
	singleSelection: {
		[propName: string]: any
	}
}

export interface IState {
	tableHeight: any
	itemName: any
	commonLists: {
		typeList: any[]
		typeList2: any[]
	}
	pagination: {
		page: number
		perpage: number
		total: any
		inventory_type_id: any
		field: any
		order_by: any
	}
	customArgs: {
		common_array: any[]
		table: any
	}
	addForm: {
		inventory_type_id: any
		name: any
		explain: any
	}
	updForm: {
		id: any
		name: any
		explain: any
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
