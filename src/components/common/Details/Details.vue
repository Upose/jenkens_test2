<!--
 * @Description: 
 * @version: 
 * @Author: XJ
 * @Date: 2021-07-19 11:24:57
 * @LastEditors: HYH
 * @LastEditTime: 2022-05-26 16:41:11
-->
<!--  -->
<template>
  <el-drawer :title="$t(`common.detail`)" :size="576" v-model="showDetail">
    <div class="box-card formStyle desLabel">
      <div class="box-form " v-if="all_array.length">
        <el-descriptions :title="$t('common.base_info')" :column="1">
          <template v-for="(item, index) in all_array" :key="index">
            <el-descriptions-item
              align="right"
              :width="200"
              v-if="
                !handle_array.includes(item.label) &&
                  item.label !== 'is_enabled' &&
                  item.label !== 'photo'
              "
              :label="$t(`common.${item.label}`) + ':'"
              >{{ singleSelection[item.label] }}</el-descriptions-item
            >
            <!-- 是否启用特殊处理，渲染成el-switch -->
            <el-descriptions-item
              align="right"
              :width="200"
              v-if="item.label === 'is_enabled'"
              :label="$t(`common.is_enabled`)"
            >
              <el-switch
                :active-value="1"
                :inactive-value="0"
                v-model="singleSelection.is_enabled"
                disabled
              ></el-switch>
            </el-descriptions-item>
            <el-descriptions-item
              align="right"
              :width="200"
              v-if="item.label === 'photo'"
              :label="$t(`common.photo`)"
            >
              <div style="height:20px;line-height:20px;display:inline-block;">
                <img
                  style="width:20px;height:20px;"
                  :src="configUrl + singleSelection.photo"
                  alt="#"
                />
              </div>
            </el-descriptions-item>
          </template>
        </el-descriptions>

        <el-descriptions :title="$t('common.handle_info')" :column="1">
          <template v-for="(item, index) in all_array" :key="index">
            <el-descriptions-item
              v-if="handle_array.includes(item.label)"
              :label="$t(`common.${item.label}`) + ':'"
              >{{ singleSelection[item.label] }}</el-descriptions-item
            >
          </template>
        </el-descriptions>
      </div>
    </div>
  </el-drawer>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue'
import dataStructure from '@/utils/dataStructure'
import { commonApi } from '@/http/api/common'
import { IRequest } from '@/@types/httpInterface'
export default defineComponent({
  props: {
    table: {
      type: String,
      default: ''
    },
    common_array: {
      type: Array,
      default: []
    },
    singleSelection: {
      type: Object,
      default: {}
    },
    handle_array: {
      type: Array,
      default: []
    },
    showDetail: {
      type: Boolean,
      default: false
    }
  },
  setup(props, ctx) {
    const state = reactive({
      configUrl: process.env.VUE_APP_QIHONG_URL,
      all_array: [],
      showDetail: props.showDetail
    })
    const requests = {
      getCustom() {
        const data = dataStructure(
          { power_url: 'V1/Public/the_custom_column' },
          {
            table: props.table
          }
        )
        commonApi
          .get_custom(data)
          .then(res => {
            let { status, custom_data, info } = res as IRequest
            if (status === 200) {
              state.all_array = custom_data.data.all_array
            }
          })
          .catch(err => err)
      }
    }
    onMounted(() => {
      requests.getCustom()
    })
    return {
      ...toRefs(state),
      ...requests
    }
  }
})
</script>
<style lang="scss" scoped>
@import '@/assets/css/element-common-style.scss';
.box-card {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .box-form {
    padding: 20px;
    box-sizing: border-box;
    height: 100%;
    width: 100%;
    overflow: auto;
    // 必须要有下面这个，在element专有样式里
    // 抽屉body超出滚动条
    // :deep(.el-drawer__body) {
    //   overflow: auto;
    // }
  }
  .box-button {
    box-sizing: border-box;
    height: 50px;
    width: 100%;
    text-align: right;
    border-top: 1px solid #dfe6ec;
    padding: 10px 20px;
  }
}
</style>
