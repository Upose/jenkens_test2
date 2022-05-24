<!--
 * @Description: 
 * @version: 
 * @Author: HYH
 * @Date: 2021-10-25 16:06:14
 * @LastEditors: HYH
 * @LastEditTime: 2022-05-24 15:50:25
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
      <!-- <MoreButton></MoreButton> -->
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
