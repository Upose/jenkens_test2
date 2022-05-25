<!--
 * @Description: 布局
 * @version: 
 * @Author: TJ
 * @Date: 2021-04-07 10:07:16
 * @LastEditors: HYH
 * @LastEditTime: 2022-05-25 10:37:37
-->
<template>
  <div class="layout">
    <div class="container">
      <div class="header">
        <Header></Header>
      </div>
      <div class="inner_container">
        <!--左侧菜单-->
        <div class="left_menu" :style="!isCollapse ? '' : 'min-width:40px;width:40px'">
          <el-scrollbar>
            <el-menu
              :default-active="leftbarActiveIndex"
              router
              text-color="#333"
              :collapse="isCollapse"
              style="border-right: none;"
            >
              <MenuItem :menuList="LeftBarMenu"></MenuItem>
            </el-menu>
          </el-scrollbar>
          <!-- 底部按钮组 -->
          <div class="left_menu_bottom_btns">
            <div v-if="!isCollapse" class="btns_item">
              <i class="el-icon-message-solid"></i>
            </div>
            <div v-if="!isCollapse" class="btns_item">
              <i class="el-icon-success"></i>
            </div>
            <div v-if="!isCollapse" class="btns_item">
              <i class="el-icon-help"></i>
            </div>
            <!-- 展开 收起 -->
            <div class="btns_item" @click="isCollapse = !isCollapse">
              <i
                class="el-icon-arrow-left"
                :style="
                  isCollapse
                    ? 'transform: rotate(180deg);transition:all 0.5s;'
                    : 'transition:all 0.5s;'
                "
              ></i>
            </div>
          </div>
        </div>
        <div class="main">
          <!-- tabs切换组件 -->
          <Tabs class="tabs"></Tabs>
          <router-view></router-view>

          <!-- 内容展示区域 -->
          <!-- <div class="content-area"></div> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, computed } from 'vue'
import Header from '@/components/common/Layout/Header.vue'
import MenuItem from '@/components/common/Layout/MenuItem.vue'
import Tabs from '@/components/common/Layout/Tabs.vue'
import { useStore } from '@/store'
import { useRoute } from 'vue-router'
export default defineComponent({
  components: {
    Header,
    Tabs,
    MenuItem
  },
  setup() {
    const store = useStore()
    const route = useRoute()
    const state = reactive({
      /**左侧菜单的默认选中项 */
      leftbarActiveIndex: computed(() => {
        return route.path
      }),
      LeftBarMenu: store.getters.GET_MENUS,
      /**折叠与隐藏 */
      isCollapse: false
    })
    const requests = {}
    const methods = {}
    return {
      ...toRefs(state),
      ...requests,
      ...methods
    }
  }
})
</script>

<style lang="scss" scoped>
// 左侧菜单折叠样式
@import '@/assets/css/layout.scss';
</style>
