/*
 * @Description: 系统管理模块api
 * @version:
 * @Author: TJ
 * @Date: 2021-04-30 14:17:56
 * @LastEditors: HYH
 * @LastEditTime: 2022-05-27 16:02:10
 */
import request from '@/http/axios/request'
import { IParams } from '@/@types/httpInterface'
export const purchaseApi = {
  // 进货页面页面接口：V1/Stock/index
  get_index: (params: IParams) => request.post(`/V1/Stock/index`, params),
  // 进货页面获取接口：V1/Stock/list
  get_list: (params: IParams) => request.post(`/V1/Stock/list`, params),
  // 修改查询数据接口：V1/Stock/view
  get_view: (params: IParams) => request.post(`/V1/Stock/view`, params),
  // 进货页面添加接口：V1/Stock/add
  get_add: (params: IParams) => request.post(`/V1/Stock/add`, params),
  // 修改移除接口：V1/Stock/inventory_remove
  get_upd_remove: (params: IParams) => request.post(`/V1/Stock/inventory_remove`, params),
  // 修改接口：V1/Stock/upd
  get_upd: (params: IParams) => request.post(`/V1/Stock/upd`, params),
  //  产品等级列表接口：V1/Stock/stock_type_list
  get_stock_type_list: (params: IParams) => request.post(`/V1/Stock/stock_type_list`, params),
  // 追加订单搜索接口：V1/Stock/presell_additional_search
  get_append_search: (params: IParams) =>
    request.post(`/V1/Stock/presell_additional_search`, params),
  //追加接口：V1/Stock/presell_additional(只有进货订单可追加)
  get_append: (params: IParams) => request.post(`/V1/Stock/presell_additional`, params),
  // 转单添加接口：V1/Stock/transfer_of_order(只有进货订单可转单)
  get_switch: (params: IParams) => request.post(`/V1/Stock/transfer_of_order`, params),
  // 付款证明列表接口：V1/Stock/certificate_of_payment_list
  get_certificate_of_payment_list: (params: IParams) =>
    request.post(`/V1/Stock/certificate_of_payment_list`, params),
  // 财务付款证明添加添加接口：V1/Stock/certificate_of_payment_add
  get_certificate_payment_add: (params: IParams) =>
    request.post(`/V1/Stock/certificate_of_payment_add`, params),
  // 多图上传接口：V1/Stock/uploading(类似于头像那样)
  get_uploading: (params: IParams) => request.uploadPost(`/V1/Stock/uploading`, params),
  // 删除图片接口：V1/Stock/uploading_del(删除单一图片)
  get_uploading_del: (params: IParams) => request.post(`/V1/Stock/uploading_del`, params),
  // 进货对应库存接口：V1/Stock/inventory_list
  get_inventory_list: (params: IParams) => request.post(`/V1/Stock/inventory_list`, params),
  // 进货信息导出接口：V1/Stock/export
  get_export: (params: IParams) => request.post(`/V1/Stock/export`, params),
  // 入库接口：V1/Stock/in_warehouse_status
  get_enter_warehouse: (params: IParams) => request.post(`/V1/Stock/in_warehouse_status`, params),
  // ==============================================
  // 库存结算账号所有获取接口：V1/InventoryPaymentAccount/all_list
  get_account_list: (params: IParams) =>
    request.post(`/V1/InventoryPaymentAccount/all_list`, params),
  // 库存单位接口：V1/InventoryUnit/all_list
  get_unit_list: (params: IParams) => request.post(`/V1/InventoryUnit/all_list`, params),
  // 库存类型接口：V1/InventoryType/all_list
  get_type_list: (params: IParams) => request.post(`/V1/InventoryType/all_list`, params),
  // 库存型号接口：V1/InventoryModel/all_list
  get_model_list: (params: IParams) => request.post(`/V1/InventoryModel/all_list`, params),
  // 库存仓库接口：V1/InventoryWarehouse/all_list
  get_warehouse_list: (params: IParams) => request.post(`/V1/InventoryWarehouse/all_list`, params),
  // 金额货币单位接口：V1/Unit/all_list
  get_currency_unit_list: (params: IParams) => request.post(`/V1/Unit/all_list`, params),
  // 供应商接口：V1/InventorySupplier/all_list
  get_supplier_list: (params: IParams) => request.post(`/V1/InventorySupplier/all_list`, params),
  // ===========================
  // 开始日期接口：V1/Inventory/start_at
  // get_start_at: (params: IParams) => request.post(`/V1/Inventory/start_at`, params)

  /**锁定 */
  lock: (params: IParams) => request.post(`/V1/Stock/lock`, params)
}
