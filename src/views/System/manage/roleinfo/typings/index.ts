/*
 * @Descripttion:
 * @version:
 * @Author: XJ
 * @Date: 2021-05-13 11:57:26
 * @LastEditors: TJ
 * @LastEditTime: 2022-02-18 11:00:09
 */
export interface ISelection {
	singleSelection: {
		[propName: string]: any
	}
}

export interface IState {
	companyList: any[]
	roleExamineList: any[]
	drawer: {
		showAdd: boolean
		showUpd: boolean
		showDetail: boolean
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
		com_code: string
		name_cn: string
		name_en: string
		name_fr: string
		role_remark: string
		is_enabled: any
		examine: any
	}
	updForm: {
		id: number | null
		com_code: string
		name_cn: string
		name_en: string
		name_fr: string
		role_remark: string
		is_enabled: any
		examine: any
	}
	tableData: any[]
	buttonData: any[]
}
