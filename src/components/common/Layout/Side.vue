<!--
 * @Descripttion: 
 * @version: 
 * @Author: TJ
 * @Date: 2021-04-27 14:39:46
 * @LastEditors: XJ
 * @LastEditTime: 2022-03-31 15:04:21
-->

<template>
  <!-- 递归子菜单 -->
  <!-- :class="{ menu_class: isCollapse && item.parent_id === 0 }" -->
  <div
    class="side"
    v-for="(item, index) of LeftBarMenu"
    :key="index"
    :class="{
      big_menu_class: isCollapse && item.parent_id === 0,
      small_menu_class: !isCollapse && item.parent_id === 0
    }"
  >
    <!-- 判断有无子组件，有的为submenu，且需要继续调用本组件 -->
    <el-submenu v-if="item.children.length" :index="item.menu_url">
      <template #title>
        <i v-show="!(isCollapse && item.parent_id === 0)" :class="item.menu_icon"></i>
        <i
          v-show="isCollapse && item.parent_id === 0"
          :class="item.menu_icon"
          style="font-size:25px"
        ></i>
        <span v-show="!(isCollapse && item.parent_id === 0)">{{
          item.menu_icon ? item.name : `&nbsp;&nbsp;${item.name}`
        }}</span>
      </template>
      <!-- 调用子组件，传入需要递归的数据 -->
      <Side :LeftBarMenu="item.children"></Side>
    </el-submenu>
    <!-- 没有子组件，直接渲染最后一级菜单 -->
    <!-- :route="{ path: item.menu_url, query: { name: item.name } }" -->
    <el-menu-item v-else :index="item.menu_url" @click="clickMenuItem(item)">
      <i v-show="!(isCollapse && item.parent_id === 0)" :class="item.menu_icon"></i>
      <i
        v-show="isCollapse && item.parent_id === 0"
        :class="item.menu_icon"
        style="font-size:25px"
      ></i>
      <template #title>
        <span v-show="!(isCollapse && item.parent_id === 0)">
          {{ item.menu_icon ? item.name : `&nbsp;&nbsp;${item.name}` }}
        </span>
      </template>
      <!-- 第三级有子集，/index/system/sets,第三级时添加两个空格 -->
    </el-menu-item>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, ref, toRefs } from 'vue'
import { MutationConstants, GetterConstants } from '@/store/modules/index/constants'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from '@/store'
import { ElMessage } from 'element-plus'
export default defineComponent({
  name: 'Side', //递归迭代时需要调用自身name
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
    const store = useStore()
    const route = useRoute()
    const Router = useRouter() as any
    const state = reactive({
      LeftBarMenu: computed(() => props.LeftBarMenu)
    })
    const methods = {
      clickMenuItem(item: any) {
        const { id, name, menu_url } = item
        let tabs: any[] = store.getters[GetterConstants.GET_TABS]
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
        // else {
        // 	// 重复点击没有变化
        // 	store.commit(MutationConstants.SET_TABS, tabs)
        // }
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

<style lang="scss" scoped>
@import '@/assets/css/table.scss';
@import '@/assets/css/element-common-style.scss';

.big_menu_class {
  :deep(.el-submenu__title) {
    height: 50px;
    line-height: 50px;
  }
  :deep(.el-menu-item) {
    height: 50px;
    line-height: 50px;
  }
}
.small_menu_class {
  :deep(.el-submenu__title) {
    font-size: 13px;
    // height: 35px;
    // line-height: 35px;
    //# 菜单宽度随内容改变时：主动设置内容区与右侧图标间隔
    span {
      padding-right: 25px;
    }
  }
  :deep(.el-menu-item) {
    height: 35px;
    line-height: 35px;
    font-size: 13px;
  }
}
</style>
