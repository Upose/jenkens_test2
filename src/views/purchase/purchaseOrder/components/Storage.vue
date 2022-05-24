<!--
 * @Descripttion: 
 * @Author: XJ
 * @LastEditors: XJ
-->
<template>
  <el-drawer :title="$t(`common.storage`)" :size="768" v-model="showStorage">
    <div class="box-card tableFormStyle ">
      <div class="box-form">
        <el-table border :key="Math.random()" :data="tableData" height="500" highlight-current-row>
          <el-table-column show-overflow-tooltip prop="id" :label="$t('common.purchase_order')">
          </el-table-column>
          <el-table-column show-overflow-tooltip prop="number" :label="$t('common.number')">
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="inventory_enter_type"
            :label="$t('common.inventory_enter_type_name')"
          >
            <template #default="scope">
              <el-switch
                :active-value="1"
                :inactive-value="0"
                v-model="scope.row.inventory_enter_type"
                :disabled="scope.row.init_inventory_enter_type === 1"
              ></el-switch>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="box-button">
        <el-button @click="onSubmitAppend" type="success" plain>{{
          $t('common.submit')
        }}</el-button>
      </div>
    </div>
  </el-drawer>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { purchaseApi } from '@/http/api/othcustom/stockset/purchase'
import { IRequest } from '@/@types/httpInterface'
import dataStructure from '@/utils/dataStructure'
import { useI18n } from 'vue-i18n'
import { ElMessageBox, ElMessage } from 'element-plus'
interface IState {
  tableData: any[]
  id: any
  commonLists: any
  showStorage: boolean
}
export default defineComponent({
  props: {
    commonLists: {
      type: Object
    },
    showStorage: {
      type: Boolean,
      default: false
    }
  },
  emits: ['reset'],
  setup(props, ctx) {
    const { t } = useI18n()
    const state: IState = reactive({
      tableData: [],
      id: '',
      commonLists: props.commonLists,
      showStorage: props.showStorage
    })
    const requests = {
      getAppendSearch(id: any) {
        const data = dataStructure({}, { id }) //id:进货单号
        purchaseApi
          .get_append_search(data)
          .then(res => {
            let { status, custom_data } = res as IRequest
            if (status === 200) {
              state.tableData = []
              const { inventory, stock } = custom_data
              inventory.forEach((item: any) => {
                // row为表格显示数据
                let row = {
                  number: item.number,
                  id: item.id,
                  inventory_enter_type: item.inventory_enter_type,
                  init_inventory_enter_type: item.inventory_enter_type
                }
                state.tableData.push(row)
              })
            }
          })
          .catch(err => err)
      },
      // 入库接口
      getEnterWarehouse() {
        let newData = state.tableData.map((item: any) => {
          return {
            number: item.number,
            id: item.id,
            inventory_enter_type: item.inventory_enter_type
          }
        })
        const data = dataStructure(
          { power_url: 'V1/Stock/in_warehouse_status' },
          {
            id: state.id,
            data: newData
          }
        )
        purchaseApi
          .get_enter_warehouse(data)
          .then(res => {
            let { status, custom_data, info } = res as IRequest
            if (status === 200) {
              ctx.emit('reset', 'in_warehouse_status')
              ElMessage({
                type: 'success',
                message: info
              })
            }
          })
          .catch(err => err)
      }
    }
    const methods = {
      onSubmitAppend() {
        ElMessageBox.confirm(t('common.tip'), {
          confirmButtonText: t('common.confirm'),
          cancelButtonText: t('common.cancel'),
          type: 'warning'
        })
          .then(() => {
            requests.getEnterWarehouse()
          })
          .catch(() => {
            ElMessage({
              type: 'info',
              message: t('common.cancelSubmit')
            })
          })
      }
    }
    return {
      ...toRefs(state),
      ...requests,
      ...methods
    }
  }
})
</script>

<style lang="scss">
@import '@/assets/css/page-common-draw.scss'; //页面基础布局样式一
@import '@/assets/css/element-common-style.scss';
</style>
