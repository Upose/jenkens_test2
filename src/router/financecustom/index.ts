/*
 * @Descripttion:
 * @version:
 * @Author: XJ
 * @Date: 2021-06-08 18:27:41
 * @LastEditors: TJ
 * @LastEditTime: 2022-02-25 15:43:40
 */
export const financecustomChild = [
	{
		path: 'payment_account',
		name: 'payment_account',
		component: () => import('@/views/Financecustom/payment_account/index.vue'),
	},
	{
		path: 'payment',
		name: 'payment',
		component: () => import('@/views/Financecustom/payment/index.vue'),
	},
	{
		path: 'receivables',
		name: 'paymereceivablesnt',
		component: () => import('@/views/Financecustom/receivables/index.vue'),
	},
]
