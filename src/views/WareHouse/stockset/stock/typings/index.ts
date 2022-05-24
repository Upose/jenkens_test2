/*
 * @Descripttion:
 * @version:
 * @Author: XJ
 * @Date: 2021-05-13 11:57:26
 * @LastEditors: TJ
 * @LastEditTime: 2022-03-10 14:24:05
 */

export interface ISelection {
	singleSelection: {
		[propName: string]: any
	}
}
export interface IState {
	tableData: any[]
	statistics: any
	scrollbarMaxHeight: string
	tabs: {
		activeName: string
	}
	tableHeight: string
	pagination: {
		page: number
		perpage: number
		total: number
		stockId: any
		inventory_type: any
		supplier: any
		inventory_enter_type: any
		search_value: any
		type: any
		order_by: any
		field: any
		product_grade: any
	}
	customArgs: {
		common_array: any[]
		handle_array: any[]
		table: string
	}
	itemName: string
	commonLists: {
		typeList: any[]
		typeList2: any[]
		unitList: any[]
		modelList: any[]
		warehouseList: any[]
		currencyUnitList: any[]
		supplierList2: any[]
		supplierList: any[]
		supplierLoading: boolean
		stockList: any[]
		enterTypeList: any[]
		enterTypeList2: any[]
		orderByList: any[]
		searchFieldList: any[]
		// ++
		minusAdjustTypeList: any[]
		productGradeList: any[]
		productGradeList2: any[]
	}
	showAdd: boolean
	showUpd: boolean
	showDetail: boolean
	showExport: boolean
	showLotDetails: boolean
	showSortableCustom: boolean
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
