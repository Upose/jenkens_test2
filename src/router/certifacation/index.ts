/*
 * @Description:审批
 * @version:
 * @Author: XJ
 * @Date: 2021-06-08 18:20:36
 * @LastEditors: HYH
 * @LastEditTime: 2022-05-25 10:41:51
 */
export const certifacation = [
  // 开票相关
  {
    path: 'bill',
    name: 'Bill',
    component: () => import('@/views/Certifacation/bill/index.vue'),
    children: [
      // 开票
      {
        path: 'billOpen',
        name: 'BillOpen',
        component: () => import('@/views/Certifacation/bill/billOpen/index.vue')
      },
      // 退票
      {
        path: 'billReturn',
        name: 'BillReturn',
        component: () => import('@/views/Certifacation/bill/billReturn/index.vue')
      }
    ]
  },
  // 仓库（出库 入库相关）
  {
    path: 'warehouse',
    name: 'warehouse',
    component: () => import('@/views/Certifacation/warehouse/index.vue'),
    children: [
      // 入库
      {
        path: 'warehouseIn',
        name: 'WarehouseIn',
        component: () => import('@/views/Certifacation/warehouse/warehouseIn/index.vue')
      },
      // 出库
      {
        path: 'warehouseOut',
        name: 'WarehouseOut',
        component: () => import('@/views/Certifacation/warehouse/warehouseOut/index.vue')
      }
    ]
  },
  // 销售审核（销售单审核 多收审核 少收审核）
  {
    path: 'sale',
    name: 'sale',
    component: () => import('@/views/Certifacation/sale/index.vue'),
    children: [
      // 销售单审核
      {
        path: 'saleOrder',
        name: 'saleOrder',
        component: () => import('@/views/Certifacation/sale/saleOrder/index.vue')
      },
      // 多收审核
      {
        path: 'overCharge',
        name: 'OverCharge',
        component: () => import('@/views/Certifacation/sale/overCharge/index.vue')
      },
      // 少收审核
      {
        path: 'underCharge',
        name: 'UnderCharge',
        component: () => import('@/views/Certifacation/sale/underCharge/index.vue')
      }
    ]
  },
  // 退货 审核
  {
    path: 'goodsReturn',
    name: 'GoodsReturn',
    component: () => import('@/views/Certifacation/goodsReturn/index.vue'),
    children: [
      // 退货单审核
      {
        path: 'returnOrder',
        name: 'ReturnOrder',
        component: () => import('@/views/Certifacation/goodsReturn/returnOrder/index.vue')
      }
    ]
  }
]
