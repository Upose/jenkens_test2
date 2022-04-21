<!--
 * @Descripttion: 左边侧边栏组件
 * @version: 
 * @Author: TJ
 * @Date: 2021-04-07 09:50:57
 * @LastEditors: XJ
 * @LastEditTime: 2022-03-31 15:07:19
-->
<template>
  <div class="left_bar">
    <!-- background-color="#191A23"
				text-color="#fff"
				active-text-color="#ffd04b" -->
    <el-menu
      :unique-opened="true"
      :collapse="isCollapse"
      :default-active="leftbarActiveIndex"
      :router="true"
      collapse-transition
    >
      <!-- 调用子组件，传入需要递归的数据 -->
      <Side :isCollapse="isCollapse" :LeftBarMenu="LeftBarMenu"></Side>
    </el-menu>
    <div class="switch_trigger"></div>
  </div>
</template>
<script lang="ts">
import Side from '@/components/common/Layout/Side.vue'
import { useRoute } from 'vue-router'
import { defineComponent, reactive, toRefs, computed } from 'vue'

export default defineComponent({
  components: {
    Side
  },
  props: {
    isCollapse: {
      type: Boolean,
      default: false
    },
    LeftBarMenu: {
      type: Array,
      default: []
    }
  },
  setup(props) {
    const route = useRoute()
    const state = reactive({
      LeftBarMenu: computed(() => props.LeftBarMenu),
      leftbarActiveIndex: computed(() => {
        return route.path
      })
    })
    return {
      ...toRefs(state),
      route
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/css/table.scss';
@import '@/assets/css/element-common-style.scss';

.left_bar {
  width: 100%;
  height: 100%;
  position: relative;
  .switch_trigger {
    width: 100%;
    position: absolute;
    bottom: 0;
  }
}
</style>
