<!--
 * @Description: 销售单
 * @Author: HYH
 * @LastEditors: TJ
 * @LastEditTime: 2022-06-06 18:54:21
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
        <!--出库单号 -->
        <el-form-item :label="$t('common.delivery_order_number')" prop="delivery_order_number">
          <el-select
            filterable
            remote
            reserve-keyword
            :remote-method="remoteMethod"
            style="width: 100%;"
            v-model="Form.delivery_order_number"
            @change="getSaleList"
          >
            <el-option
              v-for="item in orderNumList"
              :label="item.delivery_order_number"
              :value="item.delivery_order_number"
              :key="item.delivery_order_number"
            />
          </el-select>
        </el-form-item>
        <el-table border :data="tableData">
          <el-table-column show-overflow-tooltip prop="id" label="销售单号" />
          <!-- 数量 -->
          <el-table-column show-overflow-tooltip prop="payment_status_name" label="付款状态" />
        </el-table>
        <!-- 收款状态 -->
        <el-form-item label="收款状态" prop="order_collection">
          <el-select style="width: 100%;" v-model="Form.order_collection">
            <el-option
              v-for="item in statusArr"
              :label="item.name"
              :value="item.id"
              :key="item.id"
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
import { defineComponent, reactive, toRefs, onMounted, ref, computed } from 'vue'
import { warehouseOutApi } from '../api'
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
      flowApproverList: [] as any,
      // 销售单列表
      tableData: [],
      statusArr: [
        { id: 1, name: '收款销售' },
        { id: 2, name: '欠款销售' }
      ]
    })
    const methods = {
      /**流程审批 */
      submit() {
        const userInfo = JSON.parse(localStorage.getItem('userInfo') as string)
        const data = dataStructure(
          {},
          {
            /**公司编码 */
            com_code: userInfo.com_code,
            ...Form,
            ...state.getFlowApprovalInfo
          }
        )
        const form = formRef
        console.log(data)

        form.value.validate((valid: boolean) => {
          if (valid) {
            warehouseOutApi
              .submit_approval(data)
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
      /** 出库单对应销售单列表 */
      getSaleList() {
        request.getOutboundOrder()
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
        warehouseOutApi
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
        warehouseOutApi
          .get_list(data)
          .then(res => {
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
        warehouseOutApi
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
      },
      /**查询出库单列表 */
      getOutboundOrder() {
        const data = dataStructure({}, { search_value: Form.delivery_order_number })
        warehouseOutApi.outbound_order_salelist(data).then(res => {
          const { status, custom_data } = res as IRequest
          if (status === 200) {
            console.log(custom_data)
            state.tableData = custom_data.data
          }
        })
      }
    }
    onMounted(() => {
      request.getDepartmentList()
      // request.getOutboundOrder()
    })
    onMounted(() => {
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
