<!--
 * @Description: 退票
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2022-05-26 10:59:04
-->
<template>
  <el-card style="width: 600px;height: 100%;margin-top: 3px;">
    <el-scrollbar style="height: calc(100vh - 140px);">
      <el-form ref="formRef" :model="Form" :rules="Rule">
        <!-- 部门 -->
        <el-form-item label="部门" prop="applicant_dept_id">
          <el-select
            @change="getFlowApproverList"
            style="width: 100%;"
            v-model="Form.applicant_dept_id"
          >
            <el-option
              v-for="item in departmentList"
              :label="item.name"
              :value="item.id"
              :key="item.id"
            />
          </el-select>
        </el-form-item>
        <!-- 未红冲开票单号 -->
        <el-form-item label="未红冲开票单号" prop="invoice_order_number">
          <el-select
            filterable
            remote
            multiple
            reserve-keyword
            :remote-method="remoteMethod"
            style="width: 100%;"
            v-model="Form.invoice_order_number"
          >
            <el-option
              v-for="item in orderNumList"
              :label="item.invoice_order_number"
              :value="item.invoice_order_number"
              :key="item.invoice_order_number"
            />
          </el-select>
        </el-form-item>
        <!-- 原因 -->
        <el-form-item :label="$t('common.reason')">
          <el-input type="textarea" :rows="5" v-model="Form.explain" />
        </el-form-item>
        <!-- 下级审批人 -->
        <el-form-item label="下级审批人" prop="next_approver">
          <el-select style="width: 100%;" v-model="Form.next_approver">
            <el-option
              v-for="item in flowApproverList"
              :label="item.name"
              :value="item.id"
              :key="item.id"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <!-- 提交 -->
      <el-button type="primary" @click="submit" plain>{{ $t('common.submit') }}</el-button>
    </el-scrollbar>
  </el-card>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted, ref, computed, onUnmounted } from 'vue'
import { billReturnApi } from '../api'
import dataStructure from '@/utils/dataStructure'
import { IRequest } from '@/@types/httpInterface'
import { ElMessage } from 'element-plus'
import { formRef, Form, Rule } from './index'
import router from '@/router'
export default defineComponent({
  name: '',
  props: {},
  setup() {
    const state = reactive({
      /**查询参数 */
      search_value: '',
      /**部门列表 */
      departmentList: [] as any,
      /**审核单列表 */
      orderNumList: [] as any,
      /**获取流程审批人相关 */
      getFlowApprovalInfo: {
        tid: null as any,
        uid: null as any,
        applicant_dept_id: null as any,
        up_uid: null as any
      },
      /**流程审批人列表 */
      flowApproverList: [] as any
    })
    const methods = {
      /**流程审批 */
      submit() {
        //  生成退货单号
        const data = dataStructure({}, {})
        billReturnApi
          .generate_no(data)
          .then(res => {
            let { status, custom_data } = res as IRequest
            if (status === 200) {
              const invoice_return_order_number = custom_data.data
              const userInfo = JSON.parse(localStorage.getItem('userInfo') as string)
              let arr = []
              for (const item of Form.invoice_order_number) {
                let obj = {
                  invoice_order_number: item
                }
                arr.push(obj)
              }
              const Data = dataStructure(
                {},
                {
                  /**公司编码 */
                  com_code: userInfo.com_code,
                  ...Form,
                  ...state.getFlowApprovalInfo,
                  invoice_return_order_number,
                  data: arr
                }
              )

              const form = formRef
              form.value.validate((valid: boolean) => {
                if (valid) {
                  billReturnApi
                    .submit_approval(Data)
                    .then(res => {
                      let { status, info } = res as IRequest
                      if (status === 200) {
                        ElMessage.success(info)
                        router.push({
                          path: '/index/approval/flow',
                          query: {
                            activeName: 'started_flow'
                          }
                        })
                      }
                    })
                    .catch(err => err)
                }
              })
            }
          })
          .catch(err => err)
      },
      /**获取流程审批人列表 */
      getFlowApproverList(id: string) {
        state.getFlowApprovalInfo.applicant_dept_id = id
        request.getFlowApproverList()
      },

      /**远程搜索 */
      remoteMethod(query: string) {
        state.search_value = query
        request.getOrderNumList()
      },
      getNewList() {
        request.getOrderNumList()
      }
    }
    const request = {
      /**获取流程审批人列表（创建） */
      getFlowApproverList() {
        const data = dataStructure(
          {},
          {
            ...state.getFlowApprovalInfo
          }
        )
        billReturnApi
          .get_flow_approver_list(data)
          .then(res => {
            let { status, custom_data } = res as IRequest
            if (status === 200) {
              state.flowApproverList = custom_data.data || []
            }
          })
          .catch(err => err)
      },

      /**获取订单号列表 */
      getOrderNumList() {
        const data = dataStructure(
          {},
          {
            search_value: state.search_value
          }
        )
        billReturnApi
          .get_list(data)
          .then(res => {
            console.log(res)

            let { status, custom_data } = res as IRequest
            if (status === 200) {
              state.orderNumList = custom_data.data || []
            }
          })
          .catch(err => err)
      },
      /**查询部门 */
      getDepartmentList() {
        const data = dataStructure({}, {})
        billReturnApi
          .get_department(data)
          .then(res => {
            let { status, custom_data } = res as IRequest
            if (status === 200) {
              state.departmentList = custom_data.data.department || []
              state.getFlowApprovalInfo.tid = custom_data.data.tid
              state.getFlowApprovalInfo.uid = custom_data.data.uid
              state.getFlowApprovalInfo.up_uid = custom_data.data.up_uid
              request.getOrderNumList()
            }
          })
          .catch(err => err)
      }
    }
    onMounted(() => {
      request.getDepartmentList()
    })
    onUnmounted(() => {
      Object.keys(Form).forEach((key: string) => {
        ;(Form as any)[key] = ''
      })
    })
    return { ...methods, ...toRefs(state), formRef, Rule, Form }
  }
})
</script>
<style lang="scss" scoped>
@import '@/assets/css/table.scss';
</style>
