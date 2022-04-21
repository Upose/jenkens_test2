/*
 * @Descripttion: 系统管理模块api
 * @version:
 * @Author: TJ
 * @Date: 2021-04-30 14:17:56
 * @LastEditors: TJ
 * @LastEditTime: 2022-03-14 16:45:37
 */
import request from '@/http/axios/request'
import { IParams } from '@/@types/httpInterface'

// 不需要传参
export const paymentApi = {
  // 财务中心付款管理接口：V1/PaymentManagement/index
  get_index: (params: IParams) => request.post(`/V1/PaymentManagement/index`, params),
  //  财务中心付款管理获取接口：V1/PaymentManagement/list
  get_list: (params: IParams) => request.post(`/V1/PaymentManagement/list`, params),
  // 财务中心付款管理添加接口：V1/PaymentManagement/add
  get_add: (params: IParams) => request.post(`/V1/PaymentManagement/add`, params),
  // 财务中心付款管理查询数据接口：V1/PaymentManagement/view
  get_view: (params: IParams) => request.post(`/V1/PaymentManagement/view`, params),
  // 财务中心付款管理修改接口：V1/PaymentManagement/upd
  get_upd: (params: IParams) => request.post(`/V1/PaymentManagement/upd`, params),
  // get_del: (params: IParams) =>
  // 	request.post(`/V1/PaymentManagement/del`, params),
  // 财务中心付款管理详情接口：V1/PaymentManagement/details_list
  get_details_list: (params: IParams) => request.post(`/V1/PaymentManagement/details_list`, params),
  // 财务中心付款管理单据历史接口：V1/PaymentManagement/historical
  get_historical: (params: IParams) => request.post(`/V1/PaymentManagement/historical`, params),
  // 财务中心进货单财务付款ID生成接口：V1/PaymentManagement/config_number
  get_config_number: (params: IParams) =>
    request.post(`/V1/PaymentManagement/config_number`, params),
  // 财务中心付款管理进货单据搜索接口：V1/PaymentManagement/stock_number
  get_stock_number_search: (params: IParams) =>
    request.post(`/V1/PaymentManagement/stock_number`, params),
  // 多图上传接口：V1/PaymentManagement/uploading
  get_uploading: (params: IParams) => request.uploadPost(`/V1/PaymentManagement/uploading`, params),
  // 删除图片接口：V1/PaymentManagement/uploading_del(删除单一图片)
  get_uploading_del: (params: IParams) =>
    request.post(`/V1/PaymentManagement/uploading_del`, params),
  // 财务中心付款管理过账接口：V1/PaymentManagement/post
  get_post: (params: IParams) => request.post(`/V1/PaymentManagement/post`, params),
  // 财务中心付款管理强制修改接口：V1/PaymentManagement/modify_anyway
  get_modify_anyway: (params: IParams) =>
    request.post(`/V1/PaymentManagement/modify_anyway`, params),
  // 财务中心付款管理红冲接口：V1/PaymentManagement/reverse
  get_reverse: (params: IParams) => request.post(`/V1/PaymentManagement/reverse`, params),
  // 财务中心付款管理导出接口：V1/PaymentManagement/export
  get_export: (params: IParams) => request.post(`/V1/PaymentManagement/export`, params),
  // 财务中心付款管理移除接口：V1/PaymentManagement/remove
  get_remove: (params: IParams) => request.post(`/V1/PaymentManagement/remove`, params),
  // ===
  // 金额货币单位接口：V1/Unit/all_list
  get_currency_unit_list: (params: IParams) => request.post(`/V1/Unit/all_list`, params),
  // 供应商接口：V1/InventorySupplier/all_list
  get_supplier_list: (params: IParams) => request.post(`/V1/InventorySupplier/all_list`, params),
  // 库存结算账号所有获取接口：V1/InventoryPaymentAccount/all_list
  get_account_list: (params: IParams) =>
    request.post(`/V1/InventoryPaymentAccount/all_list`, params)
}
