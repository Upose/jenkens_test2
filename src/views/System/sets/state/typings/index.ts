/*
 * @Descripttion:
 * @version:
 * @Author: XJ
 * @Date: 2021-05-13 11:57:26
 * @LastEditors: TJ
 * @LastEditTime: 2021-11-10 16:46:39
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
	itemName: string
	tableData: any[]
	buttonData: any[]
	searchValue: string
	pagination: {
		page: number
		perpage: number
		total: number
	}
	addForm: {
		id: string
		name_cn: string
		name_en: string
		name_fr: string
		code: number | null
		order_by: number | null
		pid: number | null
		is_enabled: number | null
	}
	updForm: {
		id: string
		name_cn: string
		name_en: string
		name_fr: string
		code: number | null
		order_by: number | null
		pid: number | null
		is_enabled: number | null
	}
}
