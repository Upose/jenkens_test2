<!--
 * @Description: 
 * @version: 
 * @Author: HYH
 * @Date: 2021-10-25 16:06:14
 * @LastEditors: TJ
 * @LastEditTime: 2022-06-08 16:34:39
-->
<template>
  <div class="tabs-box">
    <div class="tabs-menu">
      <el-tabs v-model="activeName" type="card" @tab-click="tabClick" @tab-remove="removeTab">
        <el-tab-pane
          v-for="item in tabs"
          :key="item.menu_url"
          :label="item.name"
          :name="item.menu_url"
          :closable="item.menu_url !== homePath"
        >
          <template #label>
            {{ item.name }}
          </template>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="select">
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          操作<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <template #dropdown>
          <!-- 关闭当前 -->
          <el-dropdown-menu>
            <el-dropdown-item @click="closeCurrentTab">关闭当前页面</el-dropdown-item>
            <!-- 关闭其他 -->
            <el-dropdown-item @click="closeOtherTab">关闭其他</el-dropdown-item>
            <!-- 关闭全部 -->
            <el-dropdown-item @click="closeAllTab">关闭全部</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, onMounted, reactive, ref, toRefs, watch } from 'vue'
import { MutationConstants, GetterConstants } from '@/store/modules/index/constants'
import { useRoute } from 'vue-router'
import { useStore } from '@/store'
import draggable from 'vuedraggable'
import router from '@/router'
export default defineComponent({
  components: { draggable },
  setup() {
    const store = useStore()
    const route = useRoute()
    const state = reactive({
      /**首页路由 */
      homePath: '/index/service',
      activeName: '/index/service',
      tabs: computed(() => {
        return store.getters.GET_TABS
      })
    })
    // 监听路由的变化（防止后退前进不变化 tabsMenuValue）
    watch(
      () => route.path,
      () => {
        let params = {
          path: route.path
        }
        state.activeName = params.path
      }
    )
    const methods = {
      /**关闭当前tab */
      closeCurrentTab() {
        const tabs = state.tabs
        for (let i = 0; i < tabs.length; i++) {
          if (route.path === state.homePath) return
          if (tabs[i].menu_url === route.path) {
            tabs.splice(i, 1)
          }
        }
        const item = tabs[tabs.length - 1]
        item.isChecked = true
        router.push(item.menu_url)
        state.activeName = item.menu_url
        store.commit(MutationConstants.SET_TABS, tabs)
      },
      closeOtherTab() {
        let leftTabs = []
        const tabs = state.tabs
        for (let i = 0; i < tabs.length; i++) {
          if (tabs[i].menu_url === route.path) {
            leftTabs.push(tabs[i])
          }
          if (tabs[i].menu_url === state.homePath) {
            leftTabs.push(tabs[i])
          }
        }
        store.commit(MutationConstants.SET_TABS, leftTabs)
      },
      closeAllTab() {
        const tabs = state.tabs
        tabs.splice(1, tabs.length - 1)
        const item = tabs[0]
        item.isChecked = true
        router.push(item.menu_url)
        state.activeName = item.menu_url
        store.commit(MutationConstants.SET_TABS, tabs)
      },
      tabClick: (tabItem: any) => {
        let path = tabItem.props.name as string
        router.push(path)
      },
      removeTab: (path: string) => {
        const tabs = state.tabs
        for (let i = 0; i < tabs.length; i++) {
          if (tabs[i].menu_url === path) {
            tabs.splice(i, 1)
          }
        }
        const item = tabs[tabs.length - 1]
        item.isChecked = true
        router.push(item.menu_url)
        state.activeName = item.menu_url
        store.commit(MutationConstants.SET_TABS, tabs)
      }
    }
    onMounted(() => {
      state.activeName = route.path
    })
    return {
      ...toRefs(state),
      ...methods
    }
  }
})
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
