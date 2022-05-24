/*
 * @Descripttion:
 * @version:
 * @Author: XJ
 * @Date: 2021-05-13 11:57:26
 * @LastEditors: HYH
 * @LastEditTime: 2022-05-07 10:37:13
 */
export interface ISelection {
  singleSelection: {
    [propName: string]: any
  }
}
export interface IState {
  commonLists: {
    minusAdjustTypeList: any[]
    productGradeList: any[]
    modelList: any[]
    typeList: any[]
    allPurchaseList: any[]
    allSalesList: any[]
    allOutboundList: any[]
    /**仓库 */
    wareHouseList: any[]
  }
  tableHeight: string
  pagination: {
    page: number
    perpage: number
    total: any
    order_by: any
    field: any
  }
  customArgs: {
    common_array: any[]
    table: string
    // showCustom: boolean
  }
  addForm: {
    inventory_type: any
    model_number: any
    number: any
    sale_number: any
    inventory_number: any
    adjust_type: any
    reason: any
    product_grade: any
    adjust_product_grade: any
    inventory_id: any
    // 其他不必传辅助字段
    minus_adjust_type: any
    stock: any
  }
  showAdd: boolean
  showEdit: boolean
  showPurchase: boolean
  showSales: boolean
  showOutbound: boolean
  showSortableCustom: boolean
  showQuantity: boolean
  tableData: any[]
  buttonData: any[]
}
export interface IValid {
  checkOthers: {
    validatorFun: Function
    fun: Function
    info: string
    num: boolean
  }
}
