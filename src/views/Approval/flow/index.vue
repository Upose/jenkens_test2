<!--
 * @Description: 流程
 * @Author: HYH
 * @LastEditors: TJ
 * @LastEditTime: 2022-06-15 16:01:35
-->
<template>
  <el-card style="height: 100%;margin-top: 3px;">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClickTab">
      <el-tab-pane :label="$t('common.processCenter')" name="flow_center">
        <el-scrollbar style="height:calc(100vh - 150px);">
          <!-- 流程中心 -->
          <div class="flow-center" v-for="item in flowCenterList" :key="item.name">
            <div class="title">{{ item.name }}({{ item.list_app.length }})</div>
            <div class="items">
              <div class="item" v-for="content in item.list_app" :key="content.name">
                <el-card shadow="hover" @click="handleJumpUrl(content)" style="cursor: pointer;">
                  <div class="item_name"><i :class="content.img"></i>{{ content.name }}</div>
                </el-card>
              </div>
            </div>
          </div>
        </el-scrollbar>
      </el-tab-pane>
      <el-tab-pane :label="$t('common.aprovalProcess')" name="started_flow">
        <el-form inline>
          <!-- 流程类型 -->
          <el-form-item>
            <el-select
              clearable
              filterable
              @change="getNewList"
              placeholder="流程类型"
              v-model="flowType"
            >
              <el-option
                v-for="item in flowTypeList"
                :key="item.id"
                :value="item.id"
                :label="item.name"
              />
            </el-select>
          </el-form-item>
          <!-- 流程状态 -->
          <el-form-item>
            <el-select
              clearable
              filterable
              @change="getNewList"
              placeholder="流程状态"
              v-model="startFlowStatus"
            >
              <el-option
                v-for="item in flowStatusList"
                :key="item.id"
                :value="item.id"
                :label="item.name"
              />
            </el-select>
          </el-form-item>
          <!-- 搜索 -->
          <el-form-item>
            <el-input v-model="search_value" @input="handleSearch" class="input-with-select">
              <!-- 获取客服 -->
              <template #append>
                <el-button icon="el-icon-search" @click="getNewList"></el-button>
              </template>
            </el-input>
          </el-form-item>
        </el-form>
        <el-table border :data="myFlowList" style="width: 100%;">
          <!-- 流程ID -->
          <el-table-column show-overflow-tooltip prop="flow_id" :label="$t('common.flow_id')" />
          <!-- 公司编码 -->
          <el-table-column show-overflow-tooltip prop="com_code" :label="$t('common.com_code')" />
          <!-- 用户名 -->
          <el-table-column show-overflow-tooltip prop="full_name" :label="$t('common.full_name')" />
          <!-- 流程名称 -->
          <el-table-column
            show-overflow-tooltip
            prop="tid_name"
            :label="$t('common.processName')"
          />
          <!-- 流程标题名称 -->
          <el-table-column
            show-overflow-tooltip
            prop="title_name"
            :label="$t('common.processTitle')"
          />
          <!-- 审核状态 -->
          <el-table-column
            show-overflow-tooltip
            prop="flow_state_name"
            :label="$t('common.status_name')"
          />
          <!-- 创建时间 -->
          <el-table-column
            show-overflow-tooltip
            prop="created_at"
            :label="$t('common.created_at')"
          />
          <!-- 操作 -->
          <el-table-column show-overflow-tooltip :label="$t('common.handle')">
            <template #default="{row}">
              <!-- 审批中才显示撤销 -->
              <el-button
                type="text"
                v-if="row.flow_state === 2 && row.flow_revoke === 0"
                @click="revokeFlow(row.flow_id, row.flow_type)"
                >撤销</el-button
              >
              <el-button type="text" @click="viewFlow(row.flow_id, row.flow_type)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="text-align:right;margin: 5px;">
          <el-pagination
            background
            small
            @current-change="changePage"
            :current-page="page.page"
            :page-size="page.perpage"
            :total="page.totalCount"
            layout="total, prev, pager, next"
            :page-count="5"
            :hide-on-single-page="false"
          >
          </el-pagination>
        </div>
      </el-tab-pane>
      <!-- 审批的流程 -->
      <el-tab-pane :label="$t('common.aprovalProcess')" name="approval_flow">
        <el-form inline>
          <!-- 流程类型 -->
          <el-form-item>
            <el-select
              clearable
              filterable
              @change="getNewList"
              placeholder="流程类型"
              v-model="flowType"
            >
              <el-option
                v-for="item in flowTypeList"
                :key="item.id"
                :value="item.id"
                :label="item.name"
              />
            </el-select>
          </el-form-item>
          <!-- 流程状态 -->
          <el-form-item>
            <el-select
              clearable
              filterable
              @change="getNewList"
              placeholder="流程状态"
              v-model="approvalFlowStatus"
            >
              <el-option
                v-for="item in flowStatusList"
                :key="item.id"
                :value="item.id"
                :label="item.name"
              />
            </el-select>
          </el-form-item>
          <!-- 搜索 -->
          <el-form-item>
            <el-input v-model="search_value" @input="handleSearch" class="input-with-select">
              <!-- 获取客服 -->
              <template #append>
                <el-button icon="el-icon-search" @click="getNewList"></el-button>
              </template>
            </el-input>
          </el-form-item>
        </el-form>
        <el-table border :data="myApproveFlowList" style="width: 100%;">
          <!-- 流程ID -->
          <el-table-column show-overflow-tooltip prop="flow_id" :label="$t('common.flow_id')" />
          <!-- 公司编码 -->
          <el-table-column show-overflow-tooltip prop="com_code" :label="$t('common.com_code')" />
          <!-- 用户名 -->
          <el-table-column show-overflow-tooltip prop="full_name" :label="$t('common.full_name')" />
          <!-- 流程名称 -->
          <el-table-column show-overflow-tooltip prop="tid_name" label="流程名称" />
          <!-- 流程标题名称 -->
          <el-table-column show-overflow-tooltip prop="title_name" label="流程标题名称" />
          <!-- 审核状态 -->
          <el-table-column
            show-overflow-tooltip
            prop="flow_state_name"
            :label="$t('common.status_name')"
          />
          <!-- 创建时间 -->
          <el-table-column
            show-overflow-tooltip
            prop="created_at"
            :label="$t('common.created_at')"
          />
          <!-- 结束日期 -->
          <el-table-column
            show-overflow-tooltip
            prop="approval_time_limit"
            :label="$t('common.end_at')"
          />
          <!-- 操作 -->
          <el-table-column show-overflow-tooltip :label="$t('common.handle')">
            <template #default="{row}">
              <!-- 审批中才显示审批 -->
              <el-button
                type="text"
                v-if="row.flow_state === 2"
                @click="getApprovalDetails(row.flow_id, row.flow_type)"
                >审批</el-button
              >
              <el-button type="text" @click="viewFlow(row.flow_id, row.flow_type)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="text-align:right;margin: 5px;">
          <el-pagination
            background
            small
            @current-change="changePage"
            :current-page="page.page"
            :page-size="page.perpage"
            :total="page.totalCount"
            layout="total, prev, pager, next"
            :page-count="5"
            :hide-on-single-page="false"
          >
          </el-pagination>
        </div>
      </el-tab-pane>
    </el-tabs>
  </el-card>
  <!-- 查看发起的审批详情（抽屉） -->
  <el-drawer v-model="flowDetailsDrawer" size="700px" :title="detailsForm.title_name">
    <el-scrollbar style="padding: 20px;height: calc(100vh - 150px);">
      <component :is="componentName" :form="detailsForm" :operationName="operationName">
        <template #step>
          <div class="flow_step">
            <div class="flow_name">审核流程</div>
            <el-steps
              finish-status="success"
              :space="80"
              direction="vertical"
              :active="detailsForm.approval_record.length - 1"
            >
              <el-step
                v-for="item in detailsForm.approval_record"
                :key="item.flow_state_name"
                :description="item.flow_state_name"
              >
                <template #title>
                  <div class="flow_step_title">
                    <div>{{ item.flow_approval_type_name + ` ${item.full_name}` }}</div>
                    <div>
                      <!-- 审批时间是否超时 -->
                      <div :style="item.past_due !== 0 ? 'color:red' : ''" style="font-size: 13px;">
                        {{ item.approval_time }}
                      </div>
                    </div>
                  </div>
                </template>
                <template #description>
                  <div class="flow_step_description">
                    <!-- 审核状态名称 -->
                    <div class="flow_state_name">
                      {{ item.flow_state_name }}
                    </div>
                    <!-- 审批意见 -->
                    <div class="approval_advice">
                      {{ item.approval_comments }}
                    </div>
                  </div>
                </template>
              </el-step>
            </el-steps>
          </div>
        </template>
      </component>
    </el-scrollbar>
  </el-drawer>
  <!-- 查看详情end -->
  <!-- 审批（抽屉） -->
  <el-drawer v-model="approvalFlowDrawer" size="700px" :title="detailsForm.title_name">
    <el-scrollbar style="padding: 20px;height: calc(100vh - 150px);">
      <!-- 审批详情 -->
      <component
        :is="componentName"
        :form="detailsForm"
        :module_parameters="detailsForm.module_parameters"
        :operationName="operationName"
      >
        <template #step>
          <div class="flow_step">
            <div class="flow_name">审核流程</div>
            <el-steps
              finish-status="success"
              :space="80"
              direction="vertical"
              :active="detailsForm.approval_record.length - 1"
            >
              <el-step
                v-for="item in detailsForm.approval_record"
                :description="item.flow_state_name"
                :key="item.full_name"
              >
                <template #title>
                  <div class="flow_step_title">
                    <div>{{ item.flow_approval_type_name + ` ${item.full_name}` }}</div>
                    <div>
                      <!-- 审批时间是否超时 -->
                      <div :style="item.past_due !== 0 ? 'color:red' : ''" style="font-size: 13px;">
                        {{ item.approval_time }}
                      </div>
                    </div>
                  </div>
                </template>
                <template #description>
                  <div class="flow_step_description">
                    <!-- 审核状态名称 -->
                    <div class="flow_state_name">
                      {{ item.flow_state_name }}
                    </div>
                    <!-- 审批意见 -->
                    <div class="approval_advice">
                      {{ item.approval_comments }}
                    </div>
                  </div>
                </template>
              </el-step>
            </el-steps>
          </div>
        </template>
      </component>
      <!-- 表单验证部分 -->
      <el-form ref="approvalRef" :rules="approvalRule" :model="approvalResultForm">
        <!-- 当is_return_money === 1  && module_parameters === ’REFUND‘ 时候才显示-->
        <template
          v-if="
            detailsForm.item.is_return_money === 1 && detailsForm.module_parameters === 'REFUND'
          "
        >
          <el-form-item label="退款单号" prop="refund_id">
            <el-input v-model="approvalResultForm.refund_id" />
          </el-form-item>
          <el-form-item label="公司名称" prop="company">
            <el-input v-model="approvalResultForm.company" />
          </el-form-item>
          <el-form-item label="账户" prop="account">
            <el-input v-model="approvalResultForm.account" />
          </el-form-item>
          <el-form-item label="开户行" prop="account_openning_address">
            <el-input v-model="approvalResultForm.account_openning_address" />
          </el-form-item>
          <el-form-item :label="$t('common.remark')" prop="explain">
            <el-input v-model="approvalResultForm.explain" />
          </el-form-item>
        </template>
        <!-- 是否同意 -->
        <el-form-item label="是否同意" prop="result_id">
          <el-select
            @change="getNextApprover"
            style="width:100%"
            v-model="approvalResultForm.result_id"
          >
            <el-option
              v-for="item in detailsForm.flow_state"
              :label="item.name"
              :value="item.id"
              :key="item.id"
            />
          </el-select>
        </el-form-item>
        <!-- 审批意见 -->
        <el-form-item label="审批意见" prop="approval_comments">
          <el-input v-model="approvalResultForm.approval_comments" type="textarea" :rows="5" />
        </el-form-item>
        <!-- 下级审批人 （同意才显示） -->
        <el-form-item
          prop="next_approver"
          v-if="approvalResultForm.result_id === 3 && detailsForm.uid !== 0"
          label="下级审批人"
        >
          <el-select style="width:100%" v-model="approvalResultForm.next_approver">
            <el-option
              v-for="item in nextApproverList"
              :label="item.name"
              :value="item.id"
              :key="item.id"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <!-- 审批 -->
      <div style="text-align: right; margin:5px;">
        <el-button
          plain
          :type="approvalResultForm.result_id === 3 ? 'success' : 'info'"
          @click="sureApproval"
          >审批</el-button
        >
      </div>
    </el-scrollbar>
  </el-drawer>
  <!-- 审批（抽屉） -->
</template>
<script lang="ts">
import { IRequest } from '@/@types/httpInterface'
import approvalApi from '@/http/api/approval'
import router from '@/router'
import { useRoute } from 'vue-router'
import store from '@/store'
import { GetterConstants, MutationConstants } from '@/store/modules/index/constants'
import dataStructure from '@/utils/dataStructure'
import { ElMessage, ElMessageBox } from 'element-plus'
import { defineComponent, onMounted, reactive, ref, toRefs } from 'vue'
import { useI18n } from 'vue-i18n'
import { approvalRule, detailsForm, approvalRef, debounce, handleRefreshModuleName } from './index'
import { flowTypeId, flowTypeName } from '@/constant/flowType'
import warehouseInDetails from './components/details/warehouseIn.vue'
import warehouseOutDetails from './components/details/warehouseOut.vue'
import saleOrderDetails from './components/details/saleOrder.vue'
import overChargeDetails from './components/details/overCharge.vue'
import underChargeDetails from './components/details/underCharge.vue'
import billReturnDetails from './components/details/billReturn.vue'
import billOpenDetails from './components/details/billOpen.vue'
import goodsReturnDetails from './components/details/goodsReturn.vue'
import warehouseLockDetails from './components/details/warehouseLock.vue'

export default defineComponent({
  name: '',
  props: {},
  components: {
    warehouseInDetails,
    saleOrderDetails,
    warehouseOutDetails,
    overChargeDetails,
    underChargeDetails,
    billReturnDetails,
    billOpenDetails,
    goodsReturnDetails,
    warehouseLockDetails
  },
  setup() {
    const { t } = useI18n()
    const componentName = ref('')
    const state = reactive({
      /**操作名称 修改还是查看 */
      operationName: '',
      /**(根据流程名称)显示详情 */
      detailsByFlowType: null as any,
      tableCheck: [] as any,
      /**默认选中的tab */
      activeName: 'flow_center',
      /**审批中心数据 */
      flowCenterList: [] as any,
      /**（我）发起的流程数据 */
      myFlowList: [] as any,
      /**（我）审批的流程数据 */
      myApproveFlowList: [] as any,
      /**流程状态列表 */
      flowStatusList: [] as any,
      /**流程状态 */
      flowStatus: 2 as any,
      /**发起的流程状态 */
      startFlowStatus: 2 as any,
      /**审批的流程状态 */
      approvalFlowStatus: 2 as any,
      /**流程类型列表 */
      flowTypeList: [] as any,
      /**流程类型 */
      flowType: '',
      /**搜索内容 */
      search_value: '',
      page: {
        page: 1,
        perpage: 15,
        totalCount: 0
      },
      /**查看发起的审批详情（抽屉） */
      flowDetailsDrawer: false,
      /**审核发起的审批（抽屉） */
      approvalFlowDrawer: false,
      /**审批结果表单 3 同意 4不同意 */
      approvalResultForm: {
        /**审批结果 3 同意 4不同意 */
        result_id: null as any,
        /**审批意见 */
        approval_comments: '',
        /**下级审批人 */
        next_approver: '',
        /**流程类型 */
        flow_type: null as any,
        /**退款单号 */
        refund_id: '',
        /**公司名称 */
        company: '',
        /**账户 */
        account: '',
        /**开户行 */
        account_openning_address: '',
        /**备注 */
        explain: ''
      },
      /**（审批） 下级审批人列表 */
      nextApproverList: [] as any
    })
    const methods = {
      /**根据审核模块id 动态加载所需要的组件 */
      handleComponentName(flow_type: number) {
        // 设置根据流程名称
        switch (flow_type) {
          case flowTypeId.SALE_ORDER:
            componentName.value = flowTypeName.SALE_ORDER
            break
          case flowTypeId.WAREHOUSE_IN:
            componentName.value = flowTypeName.WAREHOUSE_IN
            break
          case flowTypeId.WAREHOUSE_OUT:
            componentName.value = flowTypeName.WAREHOUSE_OUT
            break
          case flowTypeId.OVER_CHARGE:
            componentName.value = flowTypeName.OVER_CHARGE
            break
          case flowTypeId.UNDER_CHARGE:
            componentName.value = flowTypeName.UNDER_CHARGE
            break
          case flowTypeId.BILL_OPEN:
            componentName.value = flowTypeName.BILL_OPEN
            break
          case flowTypeId.BILL_RETURN:
            componentName.value = flowTypeName.BILL_RETURN
            break
          case flowTypeId.GOODS_RETURN:
            componentName.value = flowTypeName.GOODS_RETURN
            break
          case flowTypeId.WAREHOUSE_LOCK:
            componentName.value = flowTypeName.WAREHOUSE_LOCK
            break

          default:
            break
        }
      },
      /**确认审核 */
      sureApproval() {
        let otherData: any = {}
        if (detailsForm.module_parameters) {
          otherData = handleRefreshModuleName(detailsForm)
        }
        const data = dataStructure(
          {},
          {
            tid: detailsForm.tid,
            uid: detailsForm.uid,
            up_uid: detailsForm.up_uid,
            applicant_dept_id: detailsForm.item.applicant_dept_id,
            flow_id: detailsForm.item.flow_id,
            result_id: state.approvalResultForm.result_id,
            approval_comments: state.approvalResultForm.approval_comments,
            next_approver: state.approvalResultForm.next_approver,
            refund_id: state.approvalResultForm.refund_id,
            company: state.approvalResultForm.company,
            account: state.approvalResultForm.account,
            account_openning_address: state.approvalResultForm.account_openning_address,
            explain: state.approvalResultForm.account,
            ...otherData
          }
        )
        const form = approvalRef
        form.value.validate((valid: boolean) => {
          if (valid) {
            approvalApi
              .sure_approval(data, state.approvalResultForm.flow_type)
              .then(res => {
                let { status, info } = res as IRequest
                if (status === 200) {
                  state.approvalFlowDrawer = false
                  ElMessage.success(info)
                  request.getMyApproveFlow()
                }
              })
              .catch(err => err)
          }
        })
      },
      /**获取下级审批人列表 */
      getNextApprover(id: any) {
        if (id == 4) state.approvalResultForm.next_approver = ''
        if (!state.nextApproverList.length && detailsForm.uid !== 0) {
          const data = dataStructure(
            {},
            {
              tid: detailsForm.tid,
              uid: detailsForm.uid,
              applicant_dept_id: detailsForm.item.applicant_dept_id
            }
          )
          approvalApi
            .get_next_approver_list(data)
            .then(res => {
              let { status, custom_data } = res as IRequest
              if (status === 200) {
                state.nextApproverList = custom_data.data || []
              }
            })
            .catch(err => err)
        }
      },
      /**审批(某一条数据)获取详情 */
      getApprovalDetails(get_id: string, flow_type: any) {
        state.operationName = 'edit'
        methods.handleComponentName(flow_type)
        const data = dataStructure({}, { get_id })
        approvalApi
          .get_approval_details(data, flow_type)
          .then(res => {
            let { status, custom_data } = res as IRequest
            if (status === 200) {
              const result = custom_data.data || []
              // 清空数据重新赋值
              Object.keys(detailsForm).forEach((key: any) => {
                detailsForm[key] = ''
              })
              // 字段过多 直接使用Object.keys 赋值给detailsForm
              Object.keys(result).forEach((key: any) => {
                detailsForm[key] = result[key]
              })
              state.approvalFlowDrawer = true
              state.approvalResultForm.flow_type = flow_type
            }
            console.log(detailsForm)
          })
          .catch(err => err)
      },
      //    #分页功能
      changePage(page: number) {
        state.page.page = page
        methods.getNewList()
      },
      /**撤销流程 */
      revokeFlow(get_id: any, flow_type: any) {
        const data = dataStructure({}, { get_id, flow_type })
        // 用户输入的内容校验成功才发起请求
        ElMessageBox.confirm('确认撤销?', t('common.tip'), {
          confirmButtonText: t('common.confirm'),
          cancelButtonText: t('common.cancel'),
          type: 'warning'
        })
          .then(() => {
            approvalApi
              .revoke_flow(data)
              .then(res => {
                let { status, info } = res as IRequest
                if (status === 200) {
                  ElMessage.success(info)
                  request.getMyFlow()
                }
              })
              .catch(err => err)
          })
          .catch(e => e)
      },
      /**查看流程 */
      viewFlow(get_id: any, flow_type: any) {
        state.operationName = 'showDetails'
        methods.handleComponentName(flow_type)
        const data = dataStructure({}, { get_id, flow_type })
        approvalApi
          .view_flow(data)
          .then(res => {
            let { status, custom_data } = res as IRequest
            if (status === 200) {
              const data = custom_data.data || []
              // 清空数据重新赋值
              Object.keys(detailsForm).forEach((key: any) => {
                detailsForm[key] = ''
              })
              // 字段过多 直接使用Object.keys 赋值给detailsForm
              Object.keys(data).forEach((key: any) => {
                detailsForm[key] = data[key]
              })
              state.flowDetailsDrawer = true
              console.log(detailsForm)
            }
          })
          .catch(err => err)
      },
      /**搜索节流 */
      handleSearch: debounce(() => {
        methods.getNewList()
      }, 500),
      getNewList() {
        switch (state.activeName) {
          /**发起的流程 */
          case 'started_flow':
            request.getMyFlow()
            break
          /**审批的流程 */
          case 'approval_flow':
            request.getMyApproveFlow()
            break
          default:
            break
        }
      },
      //    #选择
      choseDataArr(val: any) {
        state.tableCheck = val
      },
      /**处理点击tab */
      handleClickTab(item: any) {
        state.page.page = 1
        state.flowType = ''
        state.search_value = ''
        switch (item.props.name) {
          case 'started_flow':
            request.getMyFlow()
            break
          case 'approval_flow':
            request.getMyApproveFlow()
            break
          default:
            break
        }
      },
      /**处理跳转 和新建tag */
      handleJumpUrl(item: any) {
        const { id, name, url } = item
        let tabs = store.getters[GetterConstants.GET_TABS]
        let res = false
        tabs.forEach((el: any) => {
          if (el.menu_url === url) {
            res = true
            el.isChecked = true
          } else {
            el.isChecked = false
          }
        })
        if (!res) {
          // 点击新的菜单
          tabs.push({ id, name, menu_url: url, isChecked: true })
          if (tabs.length > 8) {
            //大于五个删除第二个
            tabs.splice(1, 1)
          }
          store.commit(MutationConstants.SET_TABS, tabs)
        }
        router.push(item.url)
      }
    }
    const request = {
      /**流程中心数据 */
      getFlowCenter() {
        const data = dataStructure({}, { order_by: 1 })
        approvalApi
          .flow_center(data)
          .then(res => {
            let { status, custom_data } = res as IRequest
            if (status === 200) {
              state.flowCenterList = custom_data.data || []
            }
          })
          .catch(err => err)
        // request.getMyFlow()
        // request.getMyApproveFlow()
      },
      /**（我）发起的流程数据 */
      getMyFlow() {
        const userInfo = JSON.parse(localStorage.getItem('userInfo') as string)
        const data = dataStructure(
          {},
          {
            /**公司ID */
            com_code: userInfo.com_code,
            /**所有流程 */
            search_one: state.flowType,
            /**审批状态 */
            search_two: state.startFlowStatus,
            /**搜索内容 */
            search_value: state.search_value,
            ...state.page
          }
        )
        approvalApi
          .my_flow(data)
          .then(res => {
            let { status, custom_data } = res as IRequest
            if (status === 200) {
              state.myFlowList = custom_data.data || []
              state.flowTypeList = custom_data.flow_app || []
              state.flowStatusList = custom_data.flow_state || []
              state.page.totalCount = custom_data.total
            }
          })

          .catch(err => err)
      },
      /**（我）审批的流程数据 */
      getMyApproveFlow() {
        const data = dataStructure(
          {},
          {
            /**所有流程 */
            search_one: state.flowType,
            /**审批状态 */
            search_two: state.approvalFlowStatus,
            /**搜索内容 */
            search_value: state.search_value,
            ...state.page
          }
        )
        approvalApi
          .my_approve_flow(data)
          .then(res => {
            let { status, custom_data } = res as IRequest
            if (status === 200) {
              state.myApproveFlowList = custom_data.data || []
              state.flowTypeList = custom_data.flow_app || []
              state.flowStatusList = custom_data.flow_state || []
              state.page.totalCount = custom_data.total
            }
          })
          .catch(err => err)
      },
      /**检测权限 */
      checkPermission() {
        const data = dataStructure({ power_url: '/index/approval/flow' }, {})
        approvalApi
          .check_permission(data)
          .then(res => {
            let { status } = res as IRequest
            if (status === 200) {
              request.getFlowCenter()
            }
          })
          .catch(err => err)
        /**获取列表 */
      }
    }
    onMounted(() => {
      const route = useRoute()
      const activeName = (route.query?.activeName as string) || ''
      if (activeName) {
        state.activeName = activeName
        request.getMyFlow()
      }
      request.checkPermission()
    })
    return {
      ...methods,
      ...toRefs(state),
      detailsForm,
      approvalRef,
      approvalRule,
      flowTypeId,
      flowTypeName,
      componentName
    }
  }
})
</script>
<style lang="scss" scoped>
@import '@/assets/css/table.scss';
.flow_step {
  margin: 15px 0;
  .flow_name {
    font-size: 16px;
    font-weight: bold;
    margin: 15px 0;
  }
  &_title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: normal;
  }
  &_description {
    margin-top: 5px;
    .flow_state_name {
      //
    }
    .approval_advice {
      margin: 10px 0;
    }
  }
}
:deep(.el-descriptions__label) {
  width: 150px;
  text-align: center;
}
.flow-center {
  width: 100;
  .title {
    font-size: 16px;
  }
  .items {
    display: flex;
    align-items: center;
    font-size: 14px;
    margin: 20px 0;
    .item {
      margin-right: 10px;
      &:deep(.el-card__body) {
        padding: 15px;
      }
      i {
        font-size: 13px;
        margin-right: 5px;
      }
    }
  }
}
</style>
