<!--
 * @Description: 左边侧边栏组件
 * @version: 
 * @Author: TJ
 * @Date: 2021-04-07 09:50:57
 * @LastEditors: HYH
 * @LastEditTime: 2022-05-10 09:26:40
-->
<template>
  <template v-for="item of menuList" :key="item.menuId">
    <el-submenu v-if="item.children.length" :index="item.menu_url" :key="item.menu_url">
      <template #title>
        <i :class="item.menu_icon"></i>
        <span>{{ item.name }}</span>
      </template>
      <!-- 调用子组件，传入需要递归的数据
      判断有无子组件，有的为submenu，且需要继续调用本组件 -->
      <MenuItem :menuList="item.children"></MenuItem>
    </el-submenu>
    <!-- 没有子组件，直接渲染最后一级菜单 -->
    <el-menu-item
      v-else
      :index="item.menu_url"
      :key="item.menu_url + item.menu_url"
      @click="clickMenuItem(item)"
    >
      <i :class="item.menu_icon"></i>
      <template #title>{{ item.name }}</template>
    </el-menu-item>
  </template>
</template>
<script lang="ts">
import { useStore } from '@/store'
import { useRoute } from 'vue-router'
import { defineComponent, onMounted, reactive, toRefs, computed } from 'vue'
import { GetterConstants, MutationConstants } from '@/store/modules/index/constants'
export default defineComponent({
  props: {
    menuList: Array
  },
  setup(props) {
    const route = useRoute()
    const store = useStore()
    const state = reactive({
      menuList: computed(() => {
        return props.menuList as any
      })
    })
    const methods = {
      clickMenuItem(item: any) {
        const { id, name, menu_url } = item
        let tabs = store.getters[GetterConstants.GET_TABS]
        let res = false
        tabs.forEach((el: any) => {
          if (el.id === id) {
            res = true
            el.isChecked = true
          } else {
            el.isChecked = false
          }
        })
        if (!res) {
          // 点击新的菜单
          tabs.push({ id: id, name, menu_url, isChecked: true })
          if (tabs.length > 5) {
            //大于五个删除第二个
            tabs.splice(1, 1)
          }
          store.commit(MutationConstants.SET_TABS, tabs)
        }
      }
    }
    onMounted(() => {})
    return {
      ...toRefs(state),
      ...methods
    }
  }
})
</script>

<style lang="scss">
//
.el-submenu.is-active .el-submenu__title {
  border-bottom-color: #1890ff;
  min-width: 200px;
}
// 左侧菜单 popup
.el-menu--vertical {
  margin-left: -5px;
  .el-menu--vertical {
    .el-menu--popup {
      min-width: 150px;
    }
    .el-menu {
      .el-menu-item {
        height: 27px;
        line-height: 27px;
        font-size: 12px;
      }
    }
  }
  .el-menu--popup {
    min-width: 150px;
  }
  .el-menu {
    .el-menu-item {
      height: 27px;
      line-height: 27px;
      font-size: 12px;
    }
    .el-submenu__title {
      font-size: 13px;
      height: 27px;
      line-height: 27px;
    }
  }
}
</style>
