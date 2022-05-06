/*
 * @Descripttion:
 * @version:
 * @Author: XJ
 * @Date: 2021-06-18 16:50:23
 * @LastEditors: HYH
 * @LastEditTime: 2022-04-22 09:19:43
 */
import request from '@/http/axios/request'
import { IParams } from '@/@types/httpInterface'

// 不需要传参
/**销售相关Api */
export const saleinventoryApi = {
  // 销售信息接口：V1/InventoryOrder/index
  get_index: (params: IParams) => request.post(`/V1/InventoryOrder/index`, params),
  // 销售信息列表接口：V1/InventoryOrder/list
  get_list: (params: IParams) => request.post(`/V1/InventoryOrder/list`, params),
  // 销售信息查询数据接口：V1/InventoryOrder/view
  get_view: (params: IParams) => request.post(`/V1/InventoryOrder/view`, params),
  // 销售信息库存管理操作记录接口：V1/InventoryOrder/log_list
  get_sale_log_list: (params: IParams) => request.post(`/V1/InventoryOrder/log_list`, params),
  // 销售信息对应出库信息接口：V1/InventoryOrder/delivery_list
  get_delivery_log_list: (params: IParams) =>
    request.post(`/V1/InventoryOrder/delivery_list`, params),
  // 销售信息添加卖出搜索接口：V1/InventoryOrder/add_sale_search
  get_sale_search: (params: IParams) => request.post(`/V1/InventoryOrder/add_sale_search`, params),
  // 销售信息添加接口：V1/InventoryOrder/add
  get_add: (params: IParams) => request.post(`/V1/InventoryOrder/add`, params),
  // 销售信息财务付款证明添加接口：V1/InventoryOrder/certificate_of_payment_add
  get_financial: (params: IParams) =>
    request.post(`/V1/InventoryOrder/certificate_of_payment_add`, params),
  // 销售信息删除接口：V1/InventoryOrder/del
  get_del: (params: IParams) => request.post(`/V1/InventoryOrder/del`, params),
  // 销售信息修改接口：V1/InventoryOrder/upd
  get_upd: (params: IParams) => request.post(`/V1/InventoryOrder/upd`, params),
  // 销售信息收款类型接口：V1/InventoryOrder/collection_type
  get_collection_type: (params: IParams) =>
    request.post(`/V1/InventoryOrder/collection_type`, params),
  // 销售信息生成卖出单号接口：V1/InventoryOrder/sale_order_number
  get_sale_order_number: (params: IParams) =>
    request.post(`/V1/InventoryOrder/sale_order_number`, params),
  //  预售追加订单搜索接口：V1/InventoryOrder/presell_additional_search
  get_append_search: (params: IParams) =>
    request.post(`/V1/InventoryOrder/presell_additional_search`, params),
  // 预售追加接口：V1/InventoryOrder/presell_additional
  get_append: (params: IParams) => request.post(`/V1/InventoryOrder/presell_additional`, params),
  // 预售转单订单搜索接口：V1/InventoryOrder/transfer_of_order_search
  get_switch_search: (params: IParams) =>
    request.post(`/V1/InventoryOrder/transfer_of_order_search`, params),
  // 预售转单添加接口：V1/InventoryOrder/transfer_of_order
  get_switch: (params: IParams) => request.post(`/V1/InventoryOrder/transfer_of_order`, params),
  // 销售信息导出接口：V1/InventoryOrder/export
  get_export: (params: IParams) => request.post(`/V1/InventoryOrder/export`, params),
  // 销售信息销售联接口：V1/InventoryOrder/sales_of_al
  get_sales_of_al: (params: IParams) => request.post(`/V1/InventoryOrder/sales_of_al`, params),
  // 销售信息客户联接口：V1/InventoryOrder/customers_al
  get_customers_al: (params: IParams) => request.post(`/V1/InventoryOrder/customers_al`, params),
  // 金额货币单位接口：V1/Unit/all_list
  get_currency_unit_list: (params: IParams) => request.post(`/V1/Unit/all_list`, params),
  // 公司获取接口：V1/Company/list
  get_company_list: (params: IParams) => request.post(`/V1/Company/list`, params),
  // 获取客户名称接口：V1/InventoryClient/customer_name
  get_customer_name: (params: IParams) => request.post(`/V1/InventoryClient/customer_name`, params),
  // 库存付款账号所有获取接口：V1/InventoryPaymentAccount/all_list
  get_account_list: (params: IParams) =>
    request.post(`/V1/InventoryPaymentAccount/all_list`, params),
  // +++
  //  产品等级列表接口：V1/Stock/stock_type_list
  get_stock_type_list: (params: IParams) => request.post(`/V1/Stock/stock_type_list`, params),

  // 销售信息退货搜索接口：V1/InventoryOrder/sales_return_search
  get_sales_return_search: (params: IParams) =>
    request.post(`/V1/InventoryOrder/sales_return_search`, params),
  // 销售信息退货操作接口：V1/InventoryOrder/sales_return
  get_return: (params: IParams) => request.post(`/V1/InventoryOrder/sales_return`, params),
  // 销售信息退货记录接口：V1/InventoryOrder/sales_return_list
  get_sales_return_list: (params: IParams) =>
    request.post(`/V1/InventoryOrder/sales_return_list`, params),
  // ## 财务抽屉图片相关
  // 付款证明列表接口：V1/InventoryOrder/certificate_of_payment_list
  get_certificate_payment_list: (params: IParams) =>
    request.post(`/V1/InventoryOrder/certificate_of_payment_list`, params),
  // 删除图片接口：V1/InventoryOrder/uploading_del
  get_uploading_del: (params: IParams) => request.post(`/V1/InventoryOrder/uploading_del`, params),
  // 多图上传接口：V1/InventoryOrder/uploading
  get_uploading: (params: IParams) => request.uploadPost(`/V1/InventoryOrder/uploading`, params),
  // #金额调整抽屉
  // 销售信息金额调整列表接口：V1/InventoryOrder/adjust_amount_of_money_list
  get_adjust_sale_money_list: (params: IParams) =>
    request.post(`/V1/InventoryOrder/adjust_amount_of_money_list`, params),
  // 销售信息金额调整接口：V1/InventoryOrder/adjust_amount_of_money
  get_adjust_sale_money: (params: IParams) =>
    request.post(`/V1/InventoryOrder/adjust_amount_of_money`, params)
}
