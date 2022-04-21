/*
 * @Descripttion:
 * @version:
 * @Author: XJ
 * @Date: 2021-06-18 16:49:42
 * @LastEditors: XJ
 * @LastEditTime: 2022-04-02 13:19:13
 */
export interface ISelection {
  singleSelection: {
    [propName: string]: any
  }
}

export interface IState {
  statistics: object
  dialog: {
    dialogVisible: boolean
    language_id: string
  }
  tableHeight: string
  pagination: {
    date: any[]
    page: any
    perpage: any
    total: any
    search_value: any
    order_by: any
    company: any
    buy_user: any
    field: any
    payment_status: any
  }
  itemName: string
  customArgs: {
    common_array: any[]
    handle_array: any[]
    table: string
  }
  commonLists: {
    customerList: any[]
    customerList2: any[]
    staffList: any[]
    companyList: any[]
    companyList2: any[]
    companyLoading: boolean
    currencyUnitList: any[]
    paymentStatusList: any[]
    buyTypeList: any[]
    collectionTypeList: any[]
    buyTypeList2: any[]
    paymentStatusList2: any[]
    productGradeList: any[]
    accountList: any[]
  }

  showAdd: boolean
  showUpd: boolean
  showDetail: boolean
  showExport: boolean
  showSwitch: boolean
  showAppend: boolean
  showSortableCustom: boolean
  showReturn: boolean
  showFinancial: boolean
  showAdjust: boolean
  buttonData: any[]
  tableData: any[]
}
export interface IValid {
  checkOthers: {
    validatorFun: Function
    fun: Function
    info: string
    num: boolean
  }
}
