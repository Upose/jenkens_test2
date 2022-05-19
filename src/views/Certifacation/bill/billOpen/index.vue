<!--
 * @Description: 多收
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2022-05-19 10:11:54
-->
<template>
  <el-card style="width: 600px;height: 100%;">
    <el-scrollbar style="height: calc(100vh - 120px);">
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
        <!-- 生成方式 -->
        <el-form-item label="生成方式" prop="is_invoice">
          <el-select @change="generateOrderNum" style="width: 100%;" v-model="Form.is_invoice">
            <el-option label="自动" :value="1" />
            <el-option label="手动" :value="0" />
          </el-select>
        </el-form-item>
        <!-- 发票类型 -->
        <el-form-item label="发票类型" prop="is_paper">
          <el-select style="width: 100%;" v-model="Form.is_paper">
            <el-option label="纸质发票" :value="1" />
            <el-option label="电子发票" :value="0" />
          </el-select>
        </el-form-item>
        <!-- 开票类型 -->
        <el-form-item label="开票类型" prop="invoice_type">
          <el-select style="width: 100%;" filterable v-model="Form.invoice_type">
            <el-option
              v-for="item in billTypeList"
              :label="item.name"
              :value="item.id"
              :key="item.id"
            />
          </el-select>
        </el-form-item>

        <!-- 开票所在国家 -->
        <el-form-item label="开票所在国家" prop="area">
          <el-select style="width: 100%;" v-model="Form.area">
            <el-option
              v-for="item in countryList"
              :label="item.name"
              :value="item.id"
              :key="item.id"
            />
          </el-select>
        </el-form-item>
        <!-- 开票单号 -->
        <el-form-item label="开票单号" prop="invoice_order_number">
          <el-input v-model="Form.invoice_order_number" />
        </el-form-item>
        <!-- 收款单号  -->
        <el-form-item
          :label="$t('common.collection_order_number')"
          prop="inventory_order_payment_record_id"
        >
          <el-select
            @change="getSaleOrderListById"
            style="width: 100%;"
            v-model="Form.inventory_order_payment_record_id"
          >
            <el-option
              v-for="item in getMoneyList"
              :label="item.order_number"
              :value="item.order_number"
              :key="item.order_number"
            />
          </el-select>
        </el-form-item>
        <!-- 销售单号  -->
        <el-form-item :label="$t('common.inventory_order_id')" prop="inventory_order_id">
          <el-select
            @change="getSaleOrderDetails"
            style="width: 100%;"
            v-model="Form.inventory_order_id"
            multiple
          >
            <el-option
              v-for="item in saleOrderList"
              :label="item.order_number"
              :value="item.order_number"
              :key="item.order_number"
            />
          </el-select>
        </el-form-item>
        <el-table
          ref="multipleTableRef"
          @selection-change="choseDataArr"
          :data="tableData"
          stripe
          style="width: 100%"
        >
          <el-table-column type="selection" />
          <el-table-column prop="id" label="ID" />
          <el-table-column prop="handle_number" :label="$t('common.sale_number')" width="180" />
          <el-table-column prop="sale_money" :label="$t('common.money')" />
        </el-table>
        <!-- 税号-->
        <el-form-item label="税号" prop="ein">
          <el-input v-model="Form.ein" />
        </el-form-item>
        <!-- 金额-->
        <el-form-item :label="$t('common.money')" prop="ein">
          <el-input v-model="Form.invoice_money" />
        </el-form-item>
        <!-- 公司-->
        <el-form-item label="公司" prop="company">
          <el-input v-model="Form.company" />
        </el-form-item>
        <!-- 地址-->
        <el-form-item :label="$t('common.address')" prop="address">
          <el-input v-model="Form.address" />
        </el-form-item>
        <!-- 电话-->
        <el-form-item :label="$t('common.phone')" prop="buy_photo">
          <el-input v-model="Form.buy_photo" />
        </el-form-item>
        <!-- 邮箱-->
        <el-form-item :label="$t('common.email')" prop="buy_mail">
          <el-input v-model="Form.buy_mail" />
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
import { billOpenApi } from '../api'
import dataStructure from '@/utils/dataStructure'
import { IRequest } from '@/@types/httpInterface'
import { ElMessage } from 'element-plus'
import { formRef, Form, Rule, multipleTableRef } from './index'
import { commonApi } from '@/http/api/common'
export default defineComponent({
  name: '',
  props: {},
  setup() {
    const state = reactive({
      tableData: [] as any,
      tableCheck: [] as any,
      /**查询参数 */
      search_value: '',
      /**部门列表 */
      departmentList: [] as any,
      /**收款单列表 */
      getMoneyList: [] as any,
      /**开票类型列表 */
      billTypeList: [] as any,
      /**国家列表 */
      countryList: [] as any,
      /**销售单列表 */
      saleOrderList: [] as any,
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
      choseDataArr(row: any) {
        // console.log(multipleTableRef.value)
        state.tableCheck = row
        const arr = state.tableCheck.map((item: any) => {
          return item.id
        })
        const data = dataStructure(
          {},
          {
            sale_order_number: Form.inventory_order_id, //销售单号
            data: arr //销售id
          }
        )
        billOpenApi
          .checkSaleOrderStatus(data)
          .then(res => {
            console.log(res)
            let { status, custom_data } = res as IRequest
            if (status === 200) {
            }
          })
          .catch(err => err)
      },
      /**根据收款单号查询销售单号 */
      getSaleOrderListById(id: any) {
        Form.inventory_order_id = ''
        const data = dataStructure({}, { search_value: id })
        billOpenApi
          .get_sale_order_list(data)
          .then(res => {
            let { status, custom_data } = res as IRequest
            if (status === 200) {
              state.saleOrderList = custom_data.data || []
            }
          })
          .catch(err => err)
      },
      /**查询销售单详情 */
      getSaleOrderDetails(id: any) {
        const data = dataStructure({}, { search_value: id })
        billOpenApi
          .get_sale_order_details(data)
          .then(res => {
            console.log(res)
            let { status, custom_data } = res as IRequest
            if (status === 200) {
              state.tableData = custom_data.data || []
            }
          })
          .catch(err => err)
      },
      /**生成开票单号 */
      generateOrderNum(type: any) {
        // 自动生成
        if (type === 1) {
          const data = dataStructure({}, {})
          billOpenApi
            .auto_generate_order_num(data)
            .then(res => {
              let { status, custom_data } = res as IRequest
              if (status === 200) {
                Form.invoice_order_number = custom_data.data
              }
            })
            .catch(err => err)
        } else {
          Form.invoice_order_number = ''
        }
      },
      /**流程审批 */
      submit() {
        const userInfo = JSON.parse(localStorage.getItem('userInfo') as string)
        // let invoice_money = 0
        // for (const item of state.tableCheck) {
        //   invoice_money += Number(item.sale_money)
        // }
        const data = dataStructure(
          {},
          {
            /**公司编码 */
            com_code: userInfo.com_code,
            ...Form,
            ...state.getFlowApprovalInfo,
            data: state.tableCheck
            // invoice_money: invoice_money
          }
        )
        const form = formRef
        form.value.validate((valid: boolean) => {
          if (valid) {
            console.log(data)
            billOpenApi
              .submit_approval(data)
              .then(res => {
                let { status, info } = res as IRequest
                if (status === 200) {
                  ElMessage.success(info)
                  // 重置选中的信息
                  Form.applicant_dept_id = ''
                  Form.invoice_order_number = ''
                  Form.next_approver = ''
                  Form.explain = ''
                  request.getGetMoneyList()
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
        request.getGetMoneyList()
      }
    }
    const request = {
      /**查询国家列表 */
      getCountryList() {
        const data = dataStructure({}, {})
        commonApi
          .get_country_list(data)
          .then(res => {
            let { status, custom_data } = res as IRequest
            if (status === 200) {
              state.countryList = custom_data.data || []
            }
          })
          .catch(err => err)
      },
      /**查询开票类型 */
      getBillTypeList() {
        const data = dataStructure({}, {})
        billOpenApi
          .get_bill_type(data)
          .then(res => {
            let { status, custom_data } = res as IRequest
            if (status === 200) {
              state.billTypeList = custom_data.data || []
            }
          })
          .catch(err => err)
      },
      /**获取流程审批人列表（创建） */
      getFlowApproverList() {
        const data = dataStructure(
          {},
          {
            ...state.getFlowApprovalInfo
          }
        )
        billOpenApi
          .get_flow_approver_list(data)
          .then(res => {
            let { status, custom_data } = res as IRequest
            if (status === 200) {
              state.flowApproverList = custom_data.data || []
            }
          })
          .catch(err => err)
      },

      /**获取收款单号列表 */
      getGetMoneyList() {
        const data = dataStructure(
          {},
          {
            search_value: state.search_value
          }
        )
        billOpenApi
          .get_list(data)
          .then(res => {
            let { status, custom_data } = res as IRequest
            if (status === 200) {
              state.getMoneyList = custom_data.data || []
            }
          })
          .catch(err => err)
      },
      /**查询部门 */
      getDepartmentList() {
        const data = dataStructure({}, {})
        billOpenApi
          .get_department(data)
          .then(res => {
            let { status, custom_data } = res as IRequest
            if (status === 200) {
              state.departmentList = custom_data.data.department || []
              state.getFlowApprovalInfo.tid = custom_data.data.tid
              state.getFlowApprovalInfo.uid = custom_data.data.uid
              state.getFlowApprovalInfo.up_uid = custom_data.data.up_uid
              request.getGetMoneyList()
            }
          })
          .catch(err => err)
      }
    }
    onMounted(() => {
      request.getDepartmentList()
      request.getBillTypeList()
      request.getCountryList()
    })
    return { ...methods, ...toRefs(state), formRef, multipleTableRef, Rule, Form }
  }
})
</script>
<style lang="scss" scoped>
@import '@/assets/css/table.scss';
</style>
