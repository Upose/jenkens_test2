/*
 * @Descripttion:router跳转时，有时需要更新tabs，
 * @Author: TJ
 * @LastEditors: TJ
 * @LastEditTime: 2022-03-15 14:20:34
 */
import {
	MutationConstants as indexMutationConstants,
	GetterConstants as indexGetterConstants,
} from '@/store/modules/index/constants'
import { useStore } from '@/store'
export function updateTabs(url: any) {
	const store = useStore()
	let tabs = store.getters[indexGetterConstants.GET_TABS]
	let menus = store.getters[indexGetterConstants.GET_MENUS]
	let target_menu = menus.find((item: any) => item?.menu_url === url)
	if (!target_menu) return
	const { id, name, menu_url } = target_menu
	let res = false
	tabs.forEach((el: any) => {
		if (el.id === id) {
			res = true
			el.isChecked = true
		} else {
			el.isChecked = false
		}
	})
	if (!res) {
		// 点击新的菜单
		tabs.push({ id: id, name, menu_url, isChecked: true })
		if (tabs.length > 5) {
			//大于五个删除第二个
			tabs.splice(1, 1)
		}
		store.commit(indexMutationConstants.SET_TABS, tabs)
	}
}
