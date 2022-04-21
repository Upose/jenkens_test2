/*
 * @Descripttion:
 * @version:
 * @Author: XJ
 * @Date: 2021-05-13 11:57:26
 * @LastEditors: XJ
 * @LastEditTime: 2022-03-31 13:32:25
 */
export interface ISelection {
  singleSelection: {
    [propName: string]: any
  }
}

export interface IState {
  commonLists: {
    staffList: any[]
    supplierList: any[]
    supplierList2: any[]
    currencyUnitList: any[]
    accountList: any[]
    orderByList: any[]
    currencyUnitList2: any[]
  }
  tableHeight: string
  pagination: {
    page: number
    perpage: number
    total: any
    order_by: any
    search_value: string
    field: any
    date: any[]
    supplier: any
    currency_unit: any
  }
  itemName: string
  customArgs: {
    common_array: any[]
    table: any
  }
  showAdd: boolean
  showUpd: boolean
  showSortableCustom: boolean
  showExport: boolean
  tableData: any[]
  statistics: any
  buttonData: any[]
}
export interface IValid {
  checkOthers: {
    validatorFun: Function
    fun: Function
    info: string
    bool: boolean
  }
}
