/*
 * @Descripttion:
 * @version:
 * @Author: XJ
 * @Date: 2021-05-13 11:57:26
 * @LastEditors: TJ
 * @LastEditTime: 2021-11-10 16:42:52
 */
export interface IState {
	drawer: {
		showAdd: boolean
		showUpd: boolean
		showDetail: boolean
	}
	tableHeight: string
	pagination: {
		page: number
		perpage: number
		total: number
	}
	itemName: string
	searchValue: string

	commonLists: {
		widgetIdList: any[]
		showList: any[]
		menuIdList: any[]
		defaultProps: {
			children: string
			label: string
		}
	}

	addForm: {
		widget_id: string
		menu_id: number | null
		menu_name: string
		widget_nid: number | null
		name_cn: string
		name_en: string
		name_fr: string
		widget_type: number | null
		order_by: number | null
	}

	updForm: {
		menu_name: string
		widget_id: string
		menu_id: number | null
		widget_nid: number | null
		name_cn: string
		name_en: string
		name_fr: string
		widget_type: number | null
		order_by: number | null
	}

	tableData: any[]
	buttonData: any[]
}

export interface ISelection {
	singleSelection: {
		[propName: string]: any
	}
}
