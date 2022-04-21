/*
 * @Descripttion:
 * @version:
 * @Author: XJ
 * @Date: 2021-06-18 16:50:23
 * @LastEditors: TJ
 * @LastEditTime: 2022-02-08 17:34:48
 */
import request from '@/http/axios/request'
import { IParams } from '@/@types/httpInterface'

// 不需要传参
export const deliveryinventoryApi = {
	// 出库信息接口：V1/InventoryDelivery/index
	get_index: (params: IParams) =>
		request.post(`/V1/InventoryDelivery/index`, params),
	// 出库信息列表接口：V1/InventoryDelivery/list
	get_list: (params: IParams) =>
		request.post(`/V1/InventoryDelivery/list`, params),
	// 出库信息查询数据接口：V1/InventoryDelivery/view
	get_view: (params: IParams) =>
		request.post(`/V1/InventoryDelivery/view`, params),
	// 出库信息库存管理操作记录接口：V1/InventoryDelivery/log_list
	get_log_list: (params: IParams) =>
		request.post(`/V1/InventoryDelivery/log_list`, params),
	// 出库信息添加卖出搜索接口：V1/InventoryDelivery/add_delivery_search
	get_search: (params: IParams) =>
		request.post(`/V1/InventoryDelivery/add_delivery_search`, params),
	// 出库信息添加接口：V1/InventoryDelivery/add
	get_add: (params: IParams) =>
		request.post(`/V1/InventoryDelivery/add`, params),
	// 出库信息删除接口：V1/InventoryDelivery/del
	get_del: (params: IParams) =>
		request.post(`/V1/InventoryDelivery/del`, params),
	// 生成单号
	get_sale_order_number: (params: IParams) =>
		request.post(`/V1/InventoryOrder/sale_order_number`, params),
	// 出库信息导出接口：V1/InventoryDelivery/export
	get_export: (params: IParams) =>
		request.post(`/V1/InventoryDelivery/export`, params),
	// 出库信息生成接口：V1/InventoryDelivery/outbound_order
	get_outbound_order: (params: IParams) =>
		request.post(`/V1/InventoryDelivery/outbound_order`, params),
	// 开始日期接口：V1/Inventory/start_at
	get_start_at: (params: IParams) =>
		request.post(`/V1/Inventory/start_at`, params),
	// 出库信息开单显示销售单号接口：V1/InventoryDelivery/order_number
	get_delivery_order_number: (params: IParams) =>
		request.post(`/V1/InventoryDelivery/order_number`, params),
}
