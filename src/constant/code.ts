/*
 * @Descripttion: 状态码定义
 * @version:
 * @Author: TJ
 * @Date: 2021-03-29 15:59:31
 * @LastEditors: HYH
 * @LastEditTime: 2022-05-07 14:11:09
 */

/**成功 */
const CODE_SUCCESS = 200
/**服务器发生错误，用户将无法判断发出的请求是否成功 */
const CODE_ERROR = 500
/**Token信息异常提示 */
const CODE_TOKEN_ABNORMAL = 401
/**Token失效 */
const CODE_TOKEN_VERIFY = 402
/**用户权限不存在 */
const CODE_NOT_PERMISSION = 403
/**表单数据提示 */
const CODE_FORM_TIP = 421
/**操作失败 */
const CODE_HANDLE_DATA = 422
export {
  CODE_SUCCESS,
  CODE_TOKEN_ABNORMAL,
  CODE_TOKEN_VERIFY,
  CODE_FORM_TIP,
  CODE_HANDLE_DATA,
  CODE_ERROR,
  CODE_NOT_PERMISSION
}
