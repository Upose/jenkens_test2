/*
 * @Descripttion: mutation type 变量定义
 * @version:
 * @Author: TJ
 * @Date: 2021-03-29 08:51:08
 * @LastEditors: TJ
 * @LastEditTime: 2022-03-15 13:19:05
 */
// 枚举类型
export enum GetterConstants {
	GET_SHOWCUSTOM = 'GET_SHOWCUSTOM', //存储一级菜单id
	GET_TABS = 'GET_TABS', //多页签
	GET_MENUS = 'GET_MENUS', //多页签
}

export enum MutationConstants {
	SET_SHOWCUSTOM = 'SET_SHOWCUSTOM',
	CLEAR_SHOWCUSTOM = 'CLEAR_SHOWCUSTOM',
	SET_TABS = 'SET_TABS',
	CLEAR_TABS = 'CLEAR_TABS',
	SET_MENUS = 'SET_MENUS',
	CLEAR_MENUS = 'CLEAR_MENUS',
}

export enum ActionConstants {}
