/*
 * @Descripttion: 自定义列接口提交时后端定义的用于区分页面的table字段,mitt通信事件名也用这个
 * @version:
 * @Author: HYH
 * @Date: 2021-08-31 19:27:45
 * @LastEditors: TJ
 * @LastEditTime: 2022-03-04 17:26:50
 */
export const CUSTOM_TABLES = {
	// ##=========功能模块/仓库管理
	// 库存信息
	INVENTORY: 'inventory',
	// 销售信息
	INVENTORY_ORDER: 'inventory_order',
	// 出库信息
	INVENTORY_DELIVERY: 'inventory_delivery',
	// 库存单位
	INVENTORY_UNIT: 'inventory_unit',
	// 进货信息

	STOCK_STATISTICS: 'stock_statistics',
	// 库存盘点
	INVENTORY_INFORMATION: 'inventory_information',
	// 库存预警
	INVENTORY_ALERT: 'inventory_alert',
	// 库存型号
	INVENTORY_MODEL: 'inventory_model',
	// 库存用户信息
	INVENTORY_CLIENT: 'inventory_client',
	// 库存品名
	INVENTORY_TYPE: 'inventory_type',
	// 库存仓库
	INVENTORY_WAREHOUSE: 'inventory_warehouse',
	// 库存供应商
	INVENTORY_SUPPLIER: 'inventory_supplier',
	// 付款账号
	INVENTORY_PAYMENT_ACCOUNT: 'inventory_payment_account',
	// ##===========人事中心/行政审批
	// 流程类型
	FLOW_TYPE: 'flow_type',
	// 流程配置
	FLOW: 'flow',
	// 流程关联
	RELEVANCE: 'relevance',
	// 处理类型
	DISPOSE_TYPE: 'dispose_type',
	// 具体流程配置
	IDIOGRAPHIC_FLOW: 'idiographic_flow',
	// ##===========人事中心/员工管理
	WORK_TIME_TABLE: 'work_time_table',
	// 员工信息
	STAFF: 'staff',
	// 组织机构
	ORGANIZATION: 'organization',
	// ##==========系统管理/系统配置
	POSITION: 'position',
	// #===========财务中心
	// 付款管理
	PAYMENT_MANAGEMENT: 'payment_management',
	// 收款管理
	RECEIVABLES_MANAGEMENT: 'receivables_management',
}
