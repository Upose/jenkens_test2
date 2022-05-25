<!--
 * @Description: 后台管理系统平台表格组件
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2022-05-25 15:12:41
-->
<template>
  <div class="qh_backend_table">
    <!-------------------------------------表格头部-------------------------------------------->
    <div class="qh_backend_table_header">
      <!-- select line 一行筛选框（过多的时候显示） -->
      <div class="select_line">
        <slot name="selectLine" />
      </div>
      <!-- 相关操作 搜索  增删改查按钮 筛选框 -->
      <div class="operations">
        <!-- 左侧有筛选 搜索等等 -->
        <div class="operations_left">
          <slot name="search"> </slot>
        </div>
        <!-- 右侧有不同功能的按钮 (增删改查)CURD-->
        <div class="operations_right">
          <slot name="CURD"> </slot>
        </div>
      </div>
    </div>
    <!-------------------------------------表格展示区-------------------------------------------->
    <div class="qh_backend_table_content">
      <!-- 表格插槽 -->
      <slot name="content"></slot>
    </div>
    <!-------------------------------------分页部分-------------------------------------------->
    <div class="qh_backend_table_pagination">
      <slot name="pagination"></slot>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
export default defineComponent({
  name: 'QhTable',
  setup() {}
})
</script>
<style lang="scss" scoped>
.qh_backend_table {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(100vh - 150px);

  &_header {
    .select_line {
    }
    .operations {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 5px;
      &_left {
        display: flex;
        max-width: 70%;
        form {
          margin-bottom: -20px;
        }
      }
      &_right {
        // min-width: 300px;
        // max-width: 580px;
      }
    }
  }
  &_content {
    // height: calc(100vh - 250px);
    // overflow: scroll;
    // overflow-x: hidden;
    /* 滚动条 */
    // &::-webkit-scrollbar {
    //   width: 5px;
    // }
    // &::-webkit-scrollbar-track {
    //   background-color: #eee;
    //   -webkit-border-radius: 2em;
    //   -moz-border-radius: 2em;
    //   border-radius: 2em;
    // }
    // &::-webkit-scrollbar-thumb {
    //   background-color: #ccc;
    //   -webkit-border-radius: 2em;
    //   -moz-border-radius: 2em;
    //   border-radius: 2em;
    // }
    // &::-webkit-scrollbar {
    //   display: block;
    // }
  }
  &_pagination {
    text-align: right;
    margin-top: 20px;
  }
}
</style>
