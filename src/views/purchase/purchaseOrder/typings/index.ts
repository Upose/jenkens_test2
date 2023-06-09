/*
 * @Description:
 * @version:
 * @Author: XJ
 * @Date: 2021-05-13 11:57:26
 * @LastEditors: HYH
 * @LastEditTime: 2022-05-26 18:14:52
 */

export interface ISelection {
  singleSelection: {
    [propName: string]: any
  }
}
export interface IState {
  /**是否显示底部内容 */
  showBotContent: boolean
  tableCheck: any
  /**底部表格默认选中样式 */
  botTableActiveName: string
  tableData: any[]
  statistics: object
  scrollbarMaxHeight: string
  tabs: {
    activeName: string
  }
  tableHeight: string
  pagination: {
    page: number
    perpage: number
    total: number
    order_by: number
    field: any
    supplier: any
    search_value: any
    inventory_enter_type: any
    payment_status: any
    // stock_type: any
    // date: any[]
  }
  customArgs: {
    common_array: any[]
    handle_array: any[]
    table: string
  }
  itemName: string
  commonLists: {
    typeList: any[]
    unitList: any[]
    modelList: any[]
    staffList: any[]
    accountList: any[]
    warehouseList: any[]
    currencyUnitList: any[]
    supplierList: any[]
    enterTypeList: any[]
    supplierList2: any[]
    enterTypeList2: any[]
    paymentStatusList2: any[]
    // stockTypeList2: any[]
    // ++
    // stockTypeList: any[]
    paymentStatusList: any[]
    productGradeList: any[]
    orderByList: any[]
  }
  showAdd: boolean
  showDetail: boolean
  showAppend: boolean
  showFinancial: boolean
  showSortableCustom: boolean
  showExport: boolean
  showUpd: boolean
  showStorage: boolean
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
