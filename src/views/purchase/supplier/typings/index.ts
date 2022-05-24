/*
 * @Descripttion:
 * @version:
 * @Author: XJ
 * @Date: 2021-05-13 11:57:26
 * @LastEditors: XJ
 * @LastEditTime: 2022-03-18 15:26:53
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
    order_by: any
    field: any
  }
  itemName: string
  searchValue: string
  commonLists: {
    levelList: any[]
    photoList: any[]
  }
  customArgs: {
    common_array: any[]
    table: any
  }
  addForm: {
    name: string
    level: number | null
    explain: string
    linkman: any
    photo: any[]
    address: any
  }
  updForm: {
    id: string
    name: string
    level: number | null
    explain: string
    linkman: any
    photo: any[]
    address: any
  }
  drawer: {
    showAdd: boolean
    showUpd: boolean
    showSortableCustom: boolean
  }
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
