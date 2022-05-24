/*
 * @Description:
 * @version:
 * @Author: XJ
 * @Date: 2021-05-13 11:57:26
 * @LastEditors: HYH
 * @LastEditTime: 2022-05-24 17:53:54
 */
export interface ISelection {
  singleSelection: {
    [propName: string]: any
  }
}

export interface IState {
  tableHeight: string
  pagination: {
    page: number
    perpage: number
    total: any
    order_by: number
    search_value: string
    field: any
  }
  customArgs: {
    common_array: any[]
    table: any
  }
  commonLists: {
    levelList: any[]
    executorList: any[]
    photoList: any[]
  }
  itemName: string
  addForm: {
    name: string
    level: string
    executor: string
    linkman: any
    photo: any[]
    address: any
    store_name: any
  }
  updForm: {
    id: string
    name: string
    level: string
    executor: string
    // +++
    linkman: any
    photo: any[]
    address: any
    store_name: any
  }

  showAdd: boolean
  showUpd: boolean
  showSortableCustom: boolean
  tableData: any[]
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
