<!--
 * @Description: 
 * @Author: HYH
 * @LastEditors: TJ
 * @LastEditTime: 2022-06-07 16:22:42
-->
<template>
  <el-card style="width: 1360px;height: 100%;margin-top: 3px;">
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

        <!-- 进货单号 -->
        <el-form-item :label="$t('common.purchase_order')" prop="order_number">
          <el-select
            @change="getDetails"
            filterable
            remote
            reserve-keyword
            :remote-method="remoteMethod"
            style="width: 100%;"
            v-model="Form.order_number"
          >
            <el-option
              v-for="item in orderNumList"
              :label="item.order_number"
              :value="item.order_number"
              :key="item.order_number"
            />
          </el-select>
        </el-form-item>
        <el-table border :data="tableData">
          <el-table-column show-overflow-tooltip prop="id" label="ID" />
          <!-- 品质 -->
          <el-table-column show-overflow-tooltip prop="product_grade_name" label="品质" />
          <!-- 类型 -->
          <el-table-column show-overflow-tooltip prop="inventory_type_name" label="类型" />
          <!-- 型号 -->
          <el-table-column show-overflow-tooltip prop="model_number_name" label="型号" />
          <!-- 供应商 -->
          <el-table-column show-overflow-tooltip prop="inventory_supplier_name" label="供应商" />
          <!-- 金额 -->
          <el-table-column show-overflow-tooltip prop="inventory_unit_money" label="金额" />
          <!-- 币种 -->
          <el-table-column show-overflow-tooltip prop="currency_unit_name" label="币种" />
          <!-- 数量 -->
          <el-table-column show-overflow-tooltip prop="number" :label="$t('common.number')" />
          <!-- 货位 -->
          <el-table-column show-overflow-tooltip prop="inventory_location" label="货位" />
        </el-table>
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
import { defineComponent, reactive, toRefs, onMounted, onUnmounted, ref, computed } from 'vue'
import { warehouseLockApi } from '../api'
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
      /**入库审核单列表 */
      orderNumList: [] as any,
      tableData: [] as any,
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
        form.value.validate((valid: boolean) => {
          if (valid) {
            warehouseLockApi
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
      /**获取订单详情 */
      getDetails(id: string) {
        request.getDetailsById(id)
      },
      /**远程搜索 */
      remoteMethod(query: string) {
        state.search_value = query
        request.getList()
      },
      getNewList() {
        request.getList()
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
        warehouseLockApi
          .get_flow_approver_list(data)
          .then(res => {
            console.log(res)

            let { status, custom_data } = res as IRequest
            if (status === 200) {
              console.log(custom_data)
              state.flowApproverList = custom_data.data || []
            }
          })
          .catch(err => err)
      },

      /**(根据入库审核单号)查询进货详情 */
      getDetailsById(search_value: string) {
        const data = dataStructure(
          {},
          {
            search_value
          }
        )
        warehouseLockApi
          .get_details_by_id(data)
          .then(res => {
            let { status, custom_data } = res as IRequest
            if (status === 200) {
              state.tableData = custom_data.data || []
            }
          })
          .catch(err => err)
      },
      getList() {
        const data = dataStructure(
          {},
          {
            search_value: state.search_value
          }
        )
        warehouseLockApi
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
        warehouseLockApi
          .get_department(data)
          .then(res => {
            let { status, custom_data } = res as IRequest
            if (status === 200) {
              state.departmentList = custom_data.data.department || []
              state.getFlowApprovalInfo.tid = custom_data.data.tid
              state.getFlowApprovalInfo.uid = custom_data.data.uid
              state.getFlowApprovalInfo.up_uid = custom_data.data.up_uid
            }
          })
          .catch(err => err)
      }
    }
    onMounted(() => {
      request.getDepartmentList()
      request.getList()
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
