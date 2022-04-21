/*
 * @Descripttion:
 * @version:
 * @Author: XJ
 * @Date: 2021-05-13 11:57:26
 * @LastEditors: TJ
 * @LastEditTime: 2021-11-10 16:43:25
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
		com_code: string
		com_name: string
		pid: string
		com_sxname: string
		is_enabled: number
		com_name_cn: string
		com_name_en: string
		com_name_fr: string
	}
	updForm: {
		com_code: string
		com_name: string
		pid: string
		com_sxname: string
		is_enabled: number
		com_name_cn: string
		com_name_en: string
		com_name_fr: string
	}
	commonLists: {
		companyList: any[]
	}
	tableData: any[]
	buttonData: any[]
}
