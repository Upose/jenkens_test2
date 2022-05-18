/*
 * @Description:流程名称
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2022-05-18 15:03:04
 */
/**流程id */
export enum flowTypeId {
  /**销售单 */
  SALE_ORDER = 18,
  /**出库单 */
  WAREHOUSE_OUT = 19,
  /**退货单 */
  GOODS_RETURN = 20,
  /**开票 */
  BILL_OPEN = 21,
  /**退票 */
  BILL_RETURN = 22,
  /**入库 */
  WAREHOUSE_IN = 24,
  /**多收 */
  OVER_CHARGE = 25,
  /**少收 */
  UNDER_CHARGE = 26
}
/**流程名称 */
export enum flowTypeName {
  /**销售单 */
  SALE_ORDER = 'saleOrderDetails',
  /**出库单 */
  WAREHOUSE_OUT = 'warehouseOutDetails',
  /**退货单 */
  GOODS_RETURN = 20,
  /**开票 */
  BILL_OPEN = 21,
  /**退票 */
  BILL_RETURN = 22,
  /**入库 */
  WAREHOUSE_IN = 'warehouseInDetails',
  /**多收 */
  OVER_CHARGE = 'overChargeDetails',
  /**少收 */
  UNDER_CHARGE = 'underChargeDetails'
}
