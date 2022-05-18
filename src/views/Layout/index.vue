<!--
 * @Descripttion: 使用div写的布局
 * @version: 
 * @Author: TJ
 * @Date: 2021-04-07 10:07:16
 * @LastEditors: HYH
 * @LastEditTime: 2022-05-09 18:38:10
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
          <!-- 内容 -->
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, onActivated, computed } from 'vue'
import Header from '@/components/common/Layout/Header.vue'
import MenuItem from '@/components/common/Layout/MenuItem.vue'
import Tabs from '@/components/common/Layout/Tabs.vue'
import { commonApi } from '@/http/api/common'
import dataStructure from '@/utils/dataStructure'
import { IRequest } from '@/@types/httpInterface'
import { IMenutree } from '@/@types/menuInterface'
import { useStore } from '@/store'
import { useRoute } from 'vue-router'
import {
  MutationConstants as indexMutationConstants,
  GetterConstants as indexGetterConstants
} from '@/store/modules/index/constants'
import { GetterConstants } from '@/store/modules/users/constants'
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
      LeftBarMenu: [] as Array<IMenutree>,
      /**折叠与隐藏 */
      isCollapse: false
    })
    const requests = {
      /**多级菜单 */
      getMenuMultistage() {
        let user_id = store.getters[GetterConstants.GET_USERID]
        const data = dataStructure(
          {},
          {
            user_id,
            menu_id: null //为空则传所有菜单 ,
          }
        )
        commonApi
          .get_menu_multistage(data)
          .then(res => {
            let { status, custom_data } = res as IRequest
            if (status === 200) {
              const { data, flat_data } = custom_data
              // 扁平化数据存起来
              store.commit(indexMutationConstants.SET_MENUS, flat_data)
              let tabs = store.getters[indexGetterConstants.GET_TABS]
              // 没有存过值就给一个初始值
              if (!tabs.length) {
                let { id, name, menu_url } = data[0]
                store.commit(indexMutationConstants.SET_TABS, [
                  { id: id, name, menu_url, isChecked: true }
                ])
              } else {
                let newTabs: any[] = []
                // 同一浏览器切换账号权限不一样，由于vuex会拿到前一个账号的tabs，所以需要过滤。并且更新之前的文字语言类型
                tabs.forEach((item: any) => {
                  let targetItem = flat_data.find((item2: any) => item.id == item2.id)
                  if (!!targetItem) {
                    item.name = targetItem.name
                    newTabs.push(item)
                  }
                })
                store.commit(indexMutationConstants.SET_TABS, newTabs)
              }
              state.LeftBarMenu = data
            }
          })
          .catch(err => err)
      }
    }
    const methods = {}
    onMounted(() => {
      requests.getMenuMultistage()
    })
    onActivated(() => {
      requests.getMenuMultistage()
    })
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
