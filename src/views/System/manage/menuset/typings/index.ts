/*
 * @Descripttion:
 * @version:
 * @Author: XJ
 * @Date: 2021-05-13 11:57:26
 * @LastEditors: TJ
 * @LastEditTime: 2021-11-10 16:36:35
 */
export interface ISelection {
	singleSelection: {
		[propName: string]: any
	}
}

export interface IState {
	tableData: any[]
	drawer: {
		showAdd: boolean
		showUpd: boolean
		showDetail: boolean
	}
	tableHeight: string
	itemName: string
	searchValue: string
	addForm: {
		menu_type: string
		menu_nid: string
		parent_id: string
		name_cn: string
		name_en: string
		name_fr: string
		menu_url: string
		menu_url_actual: string
		menu_display: string
		menu_display_style: string
		menu_icon: string
		order_by: string
		is_enabled: boolean | null
	}
	updForm: {
		id: string
		menu_type: string
		menu_nid: string
		parent_id: string
		name_cn: string
		name_en: string
		name_fr: string
		menu_url: string
		menu_url_actual: string
		menu_display: string
		menu_display_style: string
		menu_icon: string
		order_by: string
		is_enabled: boolean | null
	}
	buttonData: any[]
}
