/*
 * @Descripttion:
 * @version:
 * @Author: XJ
 * @Date: 2021-05-13 11:57:26
 * @LastEditors: TJ
 * @LastEditTime: 2021-12-09 10:06:52
 */

export interface IState {
	searchs: {
		search_value: any
		supplier: any
		inventory_type: any
		order_by: any
		search: any
	}
	date: any[]
	commonLists: {
		allArr: any[]
		typeList: any[]
		supplierList: any[]
	}
	tableHeight: string
	tableData: any[]
	buttonData: any[]
	itemName: string
}
