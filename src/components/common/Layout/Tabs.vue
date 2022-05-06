<!--
 * @Descripttion: 
 * @version: 
 * @Author: HYH
 * @Date: 2021-10-25 16:06:14
 * @LastEditors: HYH
 * @LastEditTime: 2022-04-25 10:40:47
-->
<template>
  <div class="tabs">
    <div class="dragList">
      <!-- 
        v-model="$store.state.index.tabs"
			 -->
      <draggable
        v-model="$store.state.index.tabs"
        animation="400"
        item-key="id"
        group="people"
        @end="onEnd"
      >
        <template #item="{ element }">
          <div
            :style="element.isChecked ? 'background: #d9ecff;' : ''"
            class="item"
            @click="handleJumpUrl(element.menu_url)"
          >
            {{ element.name }}
            <!-- 首页不显示关闭 -->
            <i
              @click.stop="handleClosePage(element.menu_url)"
              v-if="element.menu_url !== '/index/service'"
              class="el-icon-close"
            ></i>
          </div>
        </template>
      </draggable>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, onMounted, reactive, ref, toRefs, watch } from 'vue'
import { MutationConstants, GetterConstants } from '@/store/modules/index/constants'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from '@/store'
import draggable from 'vuedraggable'
import router from '@/router'

export default defineComponent({
  components: { draggable },
  setup() {
    const store = useStore()
    const route = useRoute()
    const Router = useRouter()
    const state = reactive({
      tabs: computed(() => {
        return store.getters.GET_TABS
      })
    })
    const methods = {
      /**处理路由跳转 */
      handleJumpUrl(url: string) {
        let tabs = store.getters[GetterConstants.GET_TABS]
        const path = route.path
        for (let item of tabs) {
          item.isChecked = false
        }
        for (let item of tabs) {
          if (item.menu_url === url) {
            item.isChecked = true
            store.commit(MutationConstants.SET_TABS, tabs)
          }
        }
        router.push(url)
      },
      /**处理关闭页面 */
      handleClosePage(url: string) {
        let tabs = store.getters[GetterConstants.GET_TABS]
        for (let i = 0; i < tabs.length; i++) {
          if (tabs[i].menu_url === url) {
            tabs.splice(i, 1)
          }
        }
        tabs[tabs.length - 1].isChecked = true
        router.push(tabs[tabs.length - 1].menu_url)
        store.commit(MutationConstants.SET_TABS, tabs)
      },
      onEnd() {
        store.commit(MutationConstants.SET_TABS, store.getters.GET_TABS)
      }
    }
    onMounted(() => {
      let tabs = store.getters[GetterConstants.GET_TABS]
      const path = route.path
      for (let item of tabs) {
        item.isChecked = false
      }
      for (let item of tabs) {
        if (item.menu_url === path) {
          item.isChecked = true
        }
        store.commit(MutationConstants.SET_TABS, tabs)
      }
    })
    return {
      ...toRefs(state),
      ...methods
    }
  }
})
</script>
<style lang="scss" scoped>
.tabs {
  height: 30px;
  border-bottom: 1px solid #e6e6e6;
}
.item {
  cursor: pointer;
  float: left;
  background: #fff;
  min-width: 50px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  font-size: 14px;
  border-right: 1px solid #e6e6e6;
  padding: 0 10px;
  color: rgb(103, 104, 106);
  i {
    font-size: 13px;
    margin-left: 5px;
    &:hover {
      color: red;
    }
  }
  &:hover {
    background: #d9ecff;
    transition: all 0.5s;
  }
}
.dragList {
  overflow: auto;
}
.dragList .sortable-ghost {
  opacity: 0.5;
}
</style>
