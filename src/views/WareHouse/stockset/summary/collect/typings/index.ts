/*
 * @Descripttion:
 * @version:
 * @Author: XJ
 * @Date: 2021-05-13 11:57:26
 * @LastEditors: TJ
 * @LastEditTime: 2021-11-10 16:33:01
 */

export interface IState {
	expand_row_keys: any
	searchs: {
		search_value: string
		warehouse: any
		inventory_type: any
		model_number: any
		quantity_warning: any
		order_by: number
		date: any
	}
	date: any[]
	tableHeight: string
	commonLists: {
		allArr: any[]
		typeList: any[]
		modelList: any[]
		warehouseList: any[]
		orderByList: any[]
		orderByFieldList: any[]
	}
	tableData: any[]
	buttonData: any[]
	itemName: string
	// 抽屉
	drawer: {
		showExport: boolean
		showWarning: boolean
	}
	warningDetails: any
}
