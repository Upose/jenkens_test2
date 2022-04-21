<!--
 * @Descripttion: 使用div写的布局
 * @version: 
 * @Author: TJ
 * @Date: 2021-04-07 10:07:16
 * @LastEditors: XJ
 * @LastEditTime: 2022-03-31 15:41:11
-->
<template>
  <div class="layout">
    <div class="container">
      <div class="header">
        <Header />
      </div>
      <div class="inner_container">
        <!--即使不写，也会默认 width="300px" -->
        <div class="aside">
          <el-scrollbar :height="scrollbarMaxHeight">
            <!-- <LeftBar :isCollapse="isCollapse"  :LeftBarMenu="LeftBarMenu" /> -->
            <!-- 左侧自适应宽度，加载时没内容，宽度为零，使用骨架屏过度 -->
            <el-skeleton
              :rows="10"
              animated
              style="width: 200px; height: 100%"
              :loading="!LeftBarMenu.length"
              :throttle="500"
            >
              <!-- <template #template>
                <el-skeleton-item variant="text" style="width: 100%; height: 100%" />
              </template> -->
              <template #default>
                <LeftBar :isCollapse="isCollapse" :LeftBarMenu="LeftBarMenu" />
              </template>
            </el-skeleton>
            <div
              class="switch_trigger"
              :class="!isCollapse ? 'el-icon-arrow-left' : 'el-icon-arrow-right'"
              @click="switchIsCollapse"
            ></div>
          </el-scrollbar>
        </div>
        <div class="main">
          <!-- tabs切换组件 -->
          <Tabs class="tabs"></Tabs>
          <!-- 内容去入口 -->
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, onActivated } from 'vue'
import Header from '@/components/common/Layout/Header.vue'
import LeftBar from '@/components/common/Layout/Leftbar.vue'
import Tabs from '@/components/common/Layout/Tabs.vue'
import { commonApi } from '@/http/api/common'
import dataStructure from '@/utils/dataStructure'
import { IRequest } from '@/@types/httpInterface'
import { IMenutree } from '@/@types/menuInterface'
import { useStore } from '@/store'
import { useRouter } from 'vue-router'
import {
  MutationConstants as indexMutationConstants,
  GetterConstants as indexGetterConstants
} from '@/store/modules/index/constants'
import { GetterConstants } from '@/store/modules/users/constants'
export default defineComponent({
  components: {
    Header,
    LeftBar,
    Tabs
  },
  setup() {
    const store = useStore()
    const Router = useRouter()
    const state = reactive({
      scrollbarMaxHeight: '100%',
      LeftBarMenu: [] as Array<IMenutree>,
      isCollapse: false,
      elAsideWidth: '300px'
    })
    const requests = {
      // 多级菜单
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
    const methods = {
      async switchIsCollapse() {
        state.isCollapse = !state.isCollapse
        // 延迟更新左侧菜单宽度，避免内容还在，宽度过快缩小
        setTimeout(() => {
          state.elAsideWidth = !state.isCollapse ? '300px' : '64px'
        }, 300)
      }
    }
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
.layout {
  width: 100%;
  height: 100%;

  .container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    // min-width: 1920px;
    // min-height: 1080px;
    .header {
      width: 100%;
      height: 45px;
      border-bottom: 1px solid #e6ebf5; //边框占高度
      padding: 0 15px;
      box-sizing: border-box;
    }
    .inner_container {
      box-sizing: border-box;
      width: 100%;
      flex: 1;
      height: 0; //没有会出现滚动条
      display: flex;
      flex-direction: row; //不写会继承
      .aside {
        height: 100%;
        width: fit-content;
        // min-width: 200px;
        // border-right: 1px solid #e6ebf5;
        // background-color: #191a23; //保持el-menu菜单背景和此div背景一致
        .el-scrollbar {
          position: relative;
          .switch_trigger {
            cursor: pointer;
            width: 100%;
            position: absolute;
            bottom: 0;
            color: #fff;
            font-size: 40px;
            background-color: #1f76bb;
            text-align: center;
          }
        }
      }
      .main {
        box-sizing: border-box;
        height: 100%;
        flex: 1;
        width: 0;
        background-color: #f5f7f9;
        padding: 10px;
        padding-top: 0px;
        display: flex;
        flex-direction: column;
        .tabs {
          width: 100%;
          height: 40px;
        }
        .content {
          width: 100%;
          height: 0;
          flex: 1;
        }
      }
    }
  }
}
</style>
