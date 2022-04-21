/*
 * @Descripttion:
 * @version:
 * @Author: XJ
 * @Date: 2021-05-13 11:57:26
 * @LastEditors: TJ
 * @LastEditTime: 2021-12-13 10:48:55
 */
export interface ISelection {
	singleSelection: {
		[propName: string]: any
	}
}

export interface IState {
	companyList: any[]
	drawer: {
		showAdd: boolean
		showUpd: boolean
	}
	tableHeight: string
	itemName: string
	searchValue: string
	pagination: {
		page: number
		perpage: number
		total: number
	}
	addForm: {
		all_array: any[]
		table: string
		all_field: string
	}
	updForm: {
		id: string
		all_array: any[]
		table: string
		all_field: string
	}
	tableData: any[]
	buttonData: any[]
}
