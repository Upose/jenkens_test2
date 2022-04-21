/*
 * @Descripttion:
 * @version:
 * @Author: TJ
 * @Date: 2021-04-25 09:06:53
 * @LastEditors: HYH
 * @LastEditTime: 2021-09-01 10:44:15
 */
// 定义菜单树数据结构
export interface IMenutree {
  // childList:[];
  id: number
  is_enabled: number
  menu_display: number
  menu_display_style: string
  menu_icon: string
  menu_nid: string
  menu_url: null
  name_cn: string
  order_by: number
  parent_id: number
}
