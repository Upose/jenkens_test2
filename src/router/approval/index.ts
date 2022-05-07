/*
 * @Descripttion:审批
 * @version:
 * @Author: XJ
 * @Date: 2021-06-08 18:20:36
 * @LastEditors: HYH
 * @LastEditTime: 2022-05-07 13:46:53
 */
export const approval = [
  // 流程审批
  {
    path: 'flow',
    name: 'Flow',
    component: () => import('@/views/Approval/flow/index.vue')
  }
]
