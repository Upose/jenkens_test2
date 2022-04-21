/*
 * @Descripttion: 系统管理模块api
 * @version:
 * @Author: TJ
 * @Date: 2021-04-30 14:17:56
 * @LastEditors: TJ
 * @LastEditTime: 2022-03-14 16:46:21
 */
import request from '@/http/axios/request'
import { IParams } from '@/@types/httpInterface'

// 不需要传参
export const receivablesApi = {
  //财务中心收款管理接口：V1/ReceivablesManagement/index
  get_index: (params: IParams) => request.post(`/V1/ReceivablesManagement/index`, params),
  //  财务中心收款管理获取接口：V1/ReceivablesManagement/list
  get_list: (params: IParams) => request.post(`/V1/ReceivablesManagement/list`, params),
  // 财务中心收款管理添加接口：V1/ReceivablesManagement/add
  get_add: (params: IParams) => request.post(`/V1/ReceivablesManagement/add`, params),
  //  财务中心收款管理查询数据接口：V1/ReceivablesManagement/view
  get_view: (params: IParams) => request.post(`/V1/ReceivablesManagement/view`, params),
  // 财务中心收款管理修改接口：V1/ReceivablesManagement/upd
  get_upd: (params: IParams) => request.post(`/V1/ReceivablesManagement/upd`, params),
  // get_del: (params: IParams) =>
  // 	request.post(`/V1/ReceivablesManagement/del`, params),
  //  财务中心收款管理详情接口：V1/ReceivablesManagement/details_list
  get_details_list: (params: IParams) =>
    request.post(`/V1/ReceivablesManagement/details_list`, params),
  //  财务中心收款管理单据历史接口：V1/ReceivablesManagement/historical
  get_historical: (params: IParams) => request.post(`/V1/ReceivablesManagement/historical`, params),
  // 财务中心进货单财务收款ID生成接口：V1/ReceivablesManagement/config_number
  get_config_number: (params: IParams) =>
    request.post(`/V1/ReceivablesManagement/config_number`, params),
  // 财务中心收款管理进货单据搜索接口：V1/ReceivablesManagement/order_number
  get_stock_number_search: (params: IParams) =>
    request.post(`/V1/ReceivablesManagement/order_number`, params),
  // 多图上传接口：V1/ReceivablesManagement/uploading
  get_uploading: (params: IParams) =>
    request.uploadPost(`/V1/ReceivablesManagement/uploading`, params),
  // 删除图片接口：V1/ReceivablesManagement/uploading_del
  get_uploading_del: (params: IParams) =>
    request.post(`/V1/ReceivablesManagement/uploading_del`, params),
  // 财务中心收款管理过账接口：V1/ReceivablesManagement/post
  get_post: (params: IParams) => request.post(`/V1/ReceivablesManagement/post`, params),
  // 财务中心收款管理强制修改接口：V1/ReceivablesManagement/modify_anyway
  get_modify_anyway: (params: IParams) =>
    request.post(`/V1/ReceivablesManagement/modify_anyway`, params),
  //  财务中心收款管理红冲接口：V1/ReceivablesManagement/reverse
  get_reverse: (params: IParams) => request.post(`/V1/ReceivablesManagement/reverse`, params),
  // 财务中心收款管理导出接口：V1/ReceivablesManagement/export
  get_export: (params: IParams) => request.post(`/V1/ReceivablesManagement/export`, params),
  // 财务中心收款管理移除接口：V1/ReceivablesManagement/remove
  get_remove: (params: IParams) => request.post(`/V1/ReceivablesManagement/remove`, params),
  // ===
  // 金额货币单位接口：V1/Unit/all_list
  get_currency_unit_list: (params: IParams) => request.post(`/V1/Unit/all_list`, params),
  // 供应商接口：V1/InventorySupplier/all_list
  get_supplier_list: (params: IParams) => request.post(`/V1/InventorySupplier/all_list`, params),
  // 库存结算账号所有获取接口：V1/InventoryPaymentAccount/all_list
  get_account_list: (params: IParams) =>
    request.post(`/V1/InventoryPaymentAccount/all_list`, params),
  // 获取客户名称接口：V1/InventoryClient/customer_name
  get_customer_name: (params: IParams) => request.post(`/V1/InventoryClient/customer_name`, params),
  // 销售信息收款类型接口：V1/InventoryOrder/collection_type
  get_collection_type: (params: IParams) =>
    request.post(`/V1/InventoryOrder/collection_type`, params)
}
