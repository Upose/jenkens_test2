/*
 * @Descripttion:
 * @version:
 * @Author: XJ
 * @Date: 2021-06-18 16:49:42
 * @LastEditors: HYH
 * @LastEditTime: 2022-05-05 14:52:13
 */
export interface ISelection {
  singleSelection: {
    [propName: string]: any
  }
}

export interface IState {
  tableCheck: any
  dialog: {
    dialogVisible: boolean
    language_id: string
  }
  configUrl: any
  tableHeight: string
  pagination: {
    page: number
    perpage: number
    total: null
    order_by: any
    field: any
    search_value: string
    date: any[]
    collator: any
    shipper: any
  }
  itemName: string
  customArgs: {
    common_array: any[]
    table: string
  }
  commonLists: {
    staffList: any[]
    orderByList: any[]
    paymentStatusList: any[]
    buyTypeList: any[]
    collectionTypeList: any[]
    staffList2: any[]
  }
  showAdd: boolean
  showExport: boolean
  showDetail: boolean
  showSortableCustom: boolean
  buttonData: any[]
  tableData: any[]
  statistics: object
}
export interface IValid {
  checkOthers: {
    validatorFun: Function
    fun: Function
    info: string
    num: boolean
  }
}
