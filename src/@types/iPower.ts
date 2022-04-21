/*
 * @Descripttion:
 * @version:
 * @Author: XJ
 * @Date: 2021-05-13 16:40:11
 * @LastEditors: HYH
 * @LastEditTime: 2021-09-01 10:47:08
 */
export interface IPower {
  menu_id: number
  name: string
  order_by: number
  role_id: number
  widget_id: string
  widget_nid: null
  widget_type: string
}
export interface IValid {
  checkOthers: {
    validatorFun: Function
    fun: Function
    info: string
    num: boolean
  }
}

