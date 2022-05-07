<!--
 * @Descripttion: 
 * @version: 
 * @Author: XJ
 * @Date: 2021-07-26 09:18:24
 * @LastEditors: HYH
 * @LastEditTime: 2022-05-07 14:49:05
-->
<!--  -->
<template>
  <div class="content">
    <div class="img_cont">
      <img src="@/assets/img/common/no_access.png" alt="" />
    </div>
    <div class="tips">
      抱歉,您暂无权限查看该页面!
      <el-button type="text" @click="$router.push('/index')">返回首页</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue'
export default defineComponent({
  name: '',
  props: {},
  setup() {
    const state = reactive({})
    const methods = {}
    return { ...methods, ...toRefs(state) }
  }
})
</script>
<style lang="scss" scoped>
.content {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .img_cont {
  }
  .tips {
    font-size: 16px;
    .el-button--text {
      font-size: 16px;
    }
  }
}
</style>
