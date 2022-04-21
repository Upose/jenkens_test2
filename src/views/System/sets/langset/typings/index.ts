/*
 * @Descripttion:
 * @version:
 * @Author: XJ
 * @Date: 2021-05-13 11:57:26
 * @LastEditors: TJ
 * @LastEditTime: 2021-11-10 16:45:13
 */
export interface ISelection {
	singleSelection: {
		[propName: string]: any
	}
}

export interface IState {
	drawer: {
		showAdd: boolean
		showUpd: boolean
		showDetail: boolean
	}
	tableHeight: string
	itemName: string
	searchValue: string
	addForm: {
		id: string
		name: string
		is_enabled: null
	}
	updForm: {
		id: string
		name: string
		is_enabled: null
	}
	tableData: any[]
	buttonData: any[]
}
