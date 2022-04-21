/*
 * @Descripttion:
 * @version:
 * @Author: HYH
 * @Date: 2021-08-09 11:43:11
 * @LastEditors: RD
 * @LastEditTime: 2021-10-29 11:38:36
 */

export const summaryChild = [
	{
		path: 'collect',
		name: 'collect',

		component: () =>
			import('@/views/Othcustom/stockset/summary/collect/index.vue'),
	},
	{
		path: 'date_collect',
		name: 'datecollect',

		component: () =>
			import('@/views/Othcustom/stockset/summary/datecollect/index.vue'),
	},
	{
		path: 'amount_collect',
		name: 'amount_collect',

		component: () =>
			import('@/views/Othcustom/stockset/summary/amountcollect/index.vue'),
	},
	{
		path: 'models_collect',
		name: 'models_collect',

		component: () =>
			import('@/views/Othcustom/stockset/summary/modelscollect/index.vue'),
	},
]
