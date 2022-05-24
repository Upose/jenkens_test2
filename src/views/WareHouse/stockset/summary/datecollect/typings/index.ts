/*
 * @Descripttion:
 * @version:
 * @Author: XJ
 * @Date: 2021-05-13 11:57:26
 * @LastEditors: TJ
 * @LastEditTime: 2021-12-09 10:04:34
 */

export interface IState {
	searchs: {
		search_value: any
		warehouse: any
		inventory_type: any
		model_number: any
		order_by: number
		date: any
	}
	date: any[]
	commonLists: {
		allArr: any[]
		typeList: any[]
		modelList: any[]
		warehouseList: any[]
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
