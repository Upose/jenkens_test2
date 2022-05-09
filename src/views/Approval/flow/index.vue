<!--
 * @Description: 
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2022-05-09 18:32:10
-->
<template>
  <el-card style="height: 100%;">
    <el-tabs v-model="activeName" type="card" @tab-click="0">
      <el-tab-pane label="流程中心" name="flow_center">
        <el-scrollbar style="height:calc(100vh - 150px);">
          <!-- 流程中心 -->
          <div class="flow-center" v-for="item in flowCenterList">
            <div class="title">{{ item.name }}({{ item.list_app.length }})</div>
            <div class="items">
              <div class="item" v-for="content in item.list_app">
                <el-card shadow="hover" @click="handleJumpUrl(content)" style="cursor: pointer;">
                  <div class="item_name"><i :class="content.img"></i>{{ content.name }}</div>
                </el-card>
              </div>
            </div>
          </div>
        </el-scrollbar>
      </el-tab-pane>
      <el-tab-pane label="发起的流程" name="started_flow">发起的流程</el-tab-pane>
      <el-tab-pane label="审批的流程" name="approval_flow">审批的流程</el-tab-pane>
    </el-tabs>
  </el-card>
</template>
<script lang="ts">
import { IRequest } from '@/@types/httpInterface'
import approvalApi from '@/http/api/approval'
import router from '@/router'
import store from '@/store'
import { GetterConstants, MutationConstants } from '@/store/modules/index/constants'
import dataStructure from '@/utils/dataStructure'
import { defineComponent, onMounted, reactive, toRefs } from 'vue'
export default defineComponent({
  name: '',
  props: {},
  setup() {
    const state = reactive({
      /**默认选中的tab */
      activeName: 'flow_center',
      /**审批中心数据 */
      flowCenterList: [] as any,
      /**（我）发起的流程数据 */
      myFlowList: [] as any,
      /**（我）审批的流程数据 */
      myApproveFlowList: [] as any
    })
    const methods = {
      /**处理跳转 和新建tag */
      handleJumpUrl(item: any) {
        router.push(item.url)
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
          if (tabs.length > 5) {
            //大于五个删除第二个
            tabs.splice(1, 1)
          }
          store.commit(MutationConstants.SET_TABS, tabs)
        }
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
              console.log(custom_data)
            }
          })
          .catch(err => err)
        approvalApi.flow_center
        request.getMyFlow()
        request.getMyApproveFlow()
      },
      /**（我）发起的流程数据 */
      getMyFlow() {},
      /**（我）审批的流程数据 */
      getMyApproveFlow() {},
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
      request.checkPermission()
    })
    return { ...methods, ...toRefs(state) }
  }
})
</script>
<style lang="scss" scoped>
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
