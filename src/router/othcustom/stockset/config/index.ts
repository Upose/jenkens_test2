/*
 * @Descripttion:
 * @version:
 * @Author: XJ
 * @Date: 2021-06-08 18:27:41
 * @LastEditors: TJ
 * @LastEditTime: 2022-02-25 15:46:12
 */
export const configChild = [
	{
		path: 'invtype',
		name: 'invtype',

		component: () =>
			import('@/views/Othcustom/stockset/config/invtype/index.vue'),
	},
	{
		path: 'invunit',
		name: 'invunit',

		component: () =>
			import('@/views/Othcustom/stockset/config/invunit/index.vue'),
	},
	{
		path: 'invmodel',
		name: 'invmodel',

		component: () =>
			import('@/views/Othcustom/stockset/config/invmodel/index.vue'),
	},
	{
		path: 'warehouse',
		name: 'warehouse',

		component: () =>
			import('@/views/Othcustom/stockset/config/warehouse/index.vue'),
	},
	{
		path: 'supplier',
		name: 'supplier',

		component: () =>
			import('@/views/Othcustom/stockset/config/supplier/index.vue'),
	},
	{
		path: 'alert',
		name: 'alert',

		component: () =>
			import('@/views/Othcustom/stockset/config/alert/index.vue'),
	},
]
