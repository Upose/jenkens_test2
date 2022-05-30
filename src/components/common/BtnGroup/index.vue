<!--
 * @Description: 公共按钮组件
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2022-05-30 09:34:21
-->
<template>
  <div style="margin-bottom: 5px;text-align:right;">
    <template v-for="item in buttonData" :key="item.widget_id">
      <!-- 普通按钮 -->
      <el-button
        :icon="item.icon"
        v-if="!item.children"
        @click="handleClick(item.widget_id)"
        :disabled="handleBtnDisabled(item.widget_id)"
      >
        {{ item.name }}
      </el-button>
      <!-- 下拉框中包含的按钮 -->
      <el-dropdown v-else style="margin: 0 10px;">
        <el-button plain> {{ item.name }}<i class="el-icon-arrow-down"></i></el-button>
        <template #dropdown>
          <el-dropdown-menu v-for="(content, idx) in item.children" :key="idx">
            <el-dropdown-item @click="handleClick(content.widget_id)">
              {{ content.name }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </template>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, reactive, toRefs } from 'vue'
export default defineComponent({
  name: '',
  emits: ['handleClick', 'handleBtnDisabled'],
  props: {
    buttonData: {
      type: Array,
      default: []
    },
    handleBtnDisabled: {
      type: Function
    }
  },
  setup(props, { emit }) {
    const methods = {
      handleClick(id: string) {
        emit('handleClick', id)
      }
    }
    const state = reactive({
      buttonData: computed(() => props.buttonData) as any,
      handleBtnDisabled: computed(() => props.handleBtnDisabled) as any
    })
    return { ...methods, ...toRefs(state) }
  }
})
</script>
<style lang="scss"></style>
