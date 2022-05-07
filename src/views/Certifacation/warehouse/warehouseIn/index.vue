<!--
 * @Descripttion: 
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2022-05-07 18:26:05
-->
<template>
  <div>
    <el-card style="width: 480px;">
      <el-scrollbar style="height: calc(100vh - 110px);">
        <el-form>
          <!-- 部门 -->
          <el-form-item label="部门">
            <el-select style="width: 100%;" v-model="department">
              <el-option
                v-for="item in departmentList"
                :label="item.name"
                :value="item.id"
                :key="item.id"
              />
            </el-select>
          </el-form-item>
          <!-- 搜索 -->
          <!-- <el-form-item label="搜索">
            <el-input v-model="search_value">
              <template #append>
                <el-button @click="getNewList" icon="el-icon-search"></el-button> </template
            ></el-input>
          </el-form-item> -->
          <!-- 单号 -->
          <el-form-item label="单号">
            <el-select
              filterable
              remote
              reserve-keyword
              :remote-method="remoteMethod"
              style="width: 100%;"
              v-model="search_value"
            >
              <el-option
                v-for="item in tableDate"
                :label="item.order_number"
                :value="item.order_number"
                :key="item.order_number"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </el-scrollbar>
    </el-card>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue'
import warehouseApi from './api'
import dataStructure from '@/utils/dataStructure'
import { IRequest } from '@/@types/httpInterface'
export default defineComponent({
  name: '',
  props: {},
  setup() {
    const state = reactive({
      tableDate: [] as any,
      department: '',
      /**部门列表 */
      departmentList: [] as any,
      /**查询参数 */
      search_value: ''
    })
    const methods = {
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
      getList() {
        const data = dataStructure(
          {},
          {
            search_value: state.search_value
          }
        )
        warehouseApi
          .get_list(data)
          .then(res => {
            let { status, custom_data } = res as IRequest
            if (status === 200) {
              state.tableDate = custom_data.data || []
              console.log(res)
            }
          })
          .catch(err => err)
      },
      /**查询部门 */
      getDepartmentList() {
        const data = dataStructure({}, {})
        warehouseApi
          .get_department(data)
          .then(res => {
            let { status, custom_data } = res as IRequest
            if (status === 200) {
              state.departmentList = custom_data.data.department || []
            }
          })
          .catch(err => err)
      }
    }
    onMounted(() => {
      request.getDepartmentList()
      request.getList()
    })
    return { ...methods, ...toRefs(state) }
  }
})
</script>
<style lang="scss"></style>
