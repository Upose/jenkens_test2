/*
 * @Descripttion:
 * @version:
 * @Author: XJ
 * @Date: 2021-05-13 11:57:26
 * @LastEditors: TJ
 * @LastEditTime: 2021-11-10 16:32:43
 */
export interface IState {
	searchs: {
		currency_unit: any
		search_value: any
		warehouse: any
		inventory_type: any
		model_number: any
		order_by: number
		inventory_supplier: any
		date: any
	}
	date: any[]
	commonLists: {
		allArr: any[]
		typeList: any[]
		modelList: any[]
		supplierList: any[]
		warehouseList: any[]
		currencyUnitList: any[]
		orderByList: any[]
		orderByFieldList: any[]
	}
	tableHeight: string
	tableData: any[]
	buttonData: any[]
	itemName: string
	// 抽屉
	drawer: {
		showExport: boolean
	}
}
