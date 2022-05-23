<!--
 * @Description: 退货单
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2022-05-23 15:32:15
-->
<template>
  <el-card style="width: 700px;height: 100%;">
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
        <!-- 是否退款 -->
        <el-form-item label="是否退款" prop="is_return_money">
          <el-select style="width: 100%;" v-model="Form.is_return_money">
            <el-option label="是" :value="1" />
            <el-option label="否" :value="0" />
          </el-select>
        </el-form-item>
        <!-- 出库状态 -->
        <el-form-item :label="$t('common.is_delivery')" prop="type">
          <el-select @change="getNewList" style="width: 100%;" v-model="Form.type">
            <el-option label="未出库" :value="1" />
            <el-option label="已出库" :value="2" />
          </el-select>
        </el-form-item>
        <!-- 客户名称 -->
        <el-form-item :label="$t('common.buy_user')" prop="buy_user">
          <el-select filterable @change="getNewList" style="width: 100%;" v-model="Form.buy_user">
            <el-option
              v-for="item in customerList"
              :label="item.client_name"
              :value="item.id"
              :key="item.id"
            />
          </el-select>
        </el-form-item>
        <!-- 货币单位 -->
        <el-form-item filterable :label="$t('common.currency_unit_name')" prop="currency_unit">
          <el-select @change="getNewList" style="width: 100%;" v-model="Form.currency_unit">
            <el-option
              v-for="item in moneyUnitList"
              :label="item.name"
              :value="item.id"
              :key="item.id"
            />
          </el-select>
        </el-form-item>
        <!-- 销售单/出库单 -->
        <el-form-item label="销售单/出库单" prop="order_number">
          <el-select
            filterable
            remote
            reserve-keyword
            style="width: 100%;"
            @change="getOrderDetails"
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
        <el-table
          ref="multipleTableRef"
          @selection-change="choseDataArr"
          :data="tableData"
          stripe
          style="width: 100%"
        >
          <el-table-column type="selection" />
          <el-table-column prop="id" label="ID" />
          <!--数量  -->
          <el-table-column prop="handle_number" :label="$t('common.number')" />
          <!-- 调整数量 -->
          <el-table-column :label="$t('common.inventory_number')">
            <template #default="{row}">
              <el-input
                :disabled="Form.type === 2"
                @input="checkValue(row)"
                v-model.number="row.num"
              />
            </template>
          </el-table-column>
          <!-- 单价 -->
          <el-table-column prop="sale_unit_money" :label="$t('common.sale_unit_money')" />
          <!-- 预计金额 -->
          <el-table-column prop="sale_money" label="预计金额" />
          <!-- 实际金额 -->
          <el-table-column label="实际金额">
            <template #default="{row}">
              <el-input @blur="checkReturnValue(row)" v-model="row.real_return_money" />
            </template>
          </el-table-column>
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
import { defineComponent, reactive, toRefs, onMounted, ref, computed } from 'vue'
import { returnOrderApi } from '../api'
import dataStructure from '@/utils/dataStructure'
import { IRequest } from '@/@types/httpInterface'
import { ElMessage } from 'element-plus'
import { formRef, Form, Rule } from './index'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  name: '',
  props: {},
  setup() {
    const { t } = useI18n()
    const state = reactive({
      /**查询参数 */
      search_value: '',
      /**部门列表 */
      departmentList: [] as any,
      tableCheck: [] as any,
      tableData: [] as any,
      /**货币单位列表 */
      moneyUnitList: [] as any,
      /**客户列表 */
      customerList: [] as any,
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
      /**检测最终的输入数据是否合法 */
      lastCheck() {
        let tableCheck = JSON.parse(JSON.stringify(state.tableCheck))
        for (let i = 0; i < tableCheck.length; i++) {
          if (!tableCheck[i].num || !tableCheck[i].real_return_money) {
            tableCheck.splice(i, 1)
          }
        }
        // 计算总的退货/退款数量 预计退款金额 实际退款金额
        Form.num = 0
        Form.real_return_money = 0
        Form.return_money = 0
        let target = []
        for (const item of tableCheck) {
          // 计算总的退货/退款数量 预计退款金额 实际退款金额
          Form.num += Number(item.num)
          Form.real_return_money += Number(item.real_return_money)
          Form.return_money += Number(item.sale_money)
          let obj = {
            inventory_id: item.inventory_id, //库存单号
            num: Number(item.num), //退货数量
            unit_money: item.sale_unit_money, //单价
            return_money: item.sale_money, //预计金额
            real_return_money: item.real_return_money, //实际金额       用户填写 和预计金额没有任何关系
            status: 1 //状态
          }
          target.push(obj)
        }
        return target
      },
      /**检测输入的值是否合法 */
      checkValue(row: any) {
        //在选择出库状态为已出库的时候 不能修改数量
        // if (Form.type === 2) {
        //   ElMessage.warning('已出库不能修改数量')
        //   row.num = Number(row.handle_number)
        //   return
        // }
        //大于零的正则
        const regp = /^[1-9]*[1-9][0-9]*$/
        if (!regp.test(row.num)) {
          row.num = null
          row.sale_money = null
          row.real_return_money = null
        } else {
          // 判断调整数量是否大于原本的数量
          if (row.num > Number(row.handle_number)) {
            row.num = null
            row.sale_money = null
            row.real_return_money = null
            return ElMessage.warning(`${t('common.not_greater_than')}${row.handle_number}`)
          }
          row.sale_money = Number(row.num) * Number(row.sale_unit_money)
          row.real_return_money = Number(row.num) * Number(row.sale_unit_money)
        }
      },
      /**检测实际金额 */
      checkReturnValue(row: any) {
        //大于零 可以为小数（两位）
        const regp = /^[\+\-]?(0|[1-9]\d{0,11}|0\.\d{1,2}|[1-9]\d{0,11}\.\d{1,2})$/
        if (!regp.test(row.real_return_money.toString())) row.real_return_money = null
      },

      choseDataArr(row: any) {
        state.tableCheck = row
      },
      /**获取（销售单/出库单）明细*/
      getOrderDetails() {
        const data = dataStructure(
          {},
          {
            search_value: Form.order_number, //销售/出库单号
            type: Form.type, //1 未出库  2 已出库
            buy_user: Form.buy_user, //客户ID
            currency_unit: Form.currency_unit //币种
          }
        )
        returnOrderApi
          .get_order_details(data)
          .then(res => {
            let { status, custom_data } = res as IRequest
            if (status === 200) {
              state.tableData = custom_data?.data || []
              for (const item of state.tableData) {
                item.num = item.handle_number
                item.real_return_money = item.sale_money
              }
            }
          })
          .catch(err => err)
      },
      /**流程审批 */
      submit() {
        const tableData = methods.lastCheck()
        const userInfo = JSON.parse(localStorage.getItem('userInfo') as string)
        const Data = dataStructure(
          {},
          {
            /**公司编码 */
            com_code: userInfo.com_code,
            ...Form,
            ...state.getFlowApprovalInfo,
            data: tableData
          }
        )
        console.log(Data)
        const form = formRef
        form.value.validate((valid: boolean) => {
          if (valid) {
            // 检测是否选择了销售数据
            if (state.tableCheck.length === 0) return ElMessage.warning('请选择数据')
            returnOrderApi
              .submit_approval(Data)
              .then(res => {
                let { status, info } = res as IRequest
                if (status === 200) {
                  ElMessage.success(info)
                  // 重置选中的信息
                  Object.keys(Form).forEach((key: any) => {
                    ;(Form as any)[key] = ''
                  })
                  state.tableData = []
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
        returnOrderApi
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
            search_value: Form.search_value,
            type: Form.type, //1 未出库  2 已出库
            buy_user: Form.buy_user, //客户ID
            currency_unit: Form.currency_unit //币种
          }
        )
        returnOrderApi
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
        returnOrderApi
          .get_department(data)
          .then(res => {
            let { status, custom_data } = res as IRequest
            if (status === 200) {
              state.departmentList = custom_data.data.department || []
              state.getFlowApprovalInfo.tid = custom_data.data.tid
              state.getFlowApprovalInfo.uid = custom_data.data.uid
              state.getFlowApprovalInfo.up_uid = custom_data.data.up_uid
              // request.getOrderNumList()
            }
          })
          .catch(err => err)
      },
      /**生成退款单 */
      generate_return_money_no() {
        const data = dataStructure({}, {})
        returnOrderApi
          .generate_return_money_no(data)
          .then(res => {
            let { status, custom_data } = res as IRequest
            if (status === 200) {
              Form.refund_id = custom_data.data
            }
          })
          .catch(err => err)
      },
      /**生成退货单 */
      generate_return_order_no() {
        const data = dataStructure({}, {})
        returnOrderApi
          .generate_return_order_no(data)
          .then(res => {
            let { status, custom_data } = res as IRequest
            if (status === 200) {
              Form.return_order_number = custom_data.data
            }
          })
          .catch(err => err)
      },
      /**获取货币单位 */
      getMoneyUnitList() {
        const data = dataStructure({}, {})
        returnOrderApi
          .get_money_unit_list(data)
          .then(res => {
            let { status, custom_data } = res as IRequest
            if (status === 200) {
              state.moneyUnitList = custom_data
            }
          })
          .catch(err => err)
      },
      /**搜索客户列表 */
      getCustomerList() {
        const data = dataStructure({}, {})
        returnOrderApi
          .search_customer_list(data)
          .then(res => {
            let { status, custom_data } = res as IRequest
            if (status === 200) {
              state.customerList = custom_data
            }
          })
          .catch(err => err)
      }
    }
    onMounted(() => {
      request.getDepartmentList()
      request.generate_return_money_no()
      request.generate_return_order_no()
      request.getMoneyUnitList()
      request.getCustomerList()
    })
    return { ...methods, ...toRefs(state), formRef, Rule, Form }
  }
})
</script>
<style lang="scss" scoped>
@import '@/assets/css/table.scss';
</style>
