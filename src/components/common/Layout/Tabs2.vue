<!--
 * @Description: 
 * @version: 
 * @Author: HYH
 * @Date: 2021-10-25 16:06:14
 * @LastEditors: HYH
 * @LastEditTime: 2022-05-20 09:07:31
-->
<template>
  <div class="tabs_content">
    <el-tabs v-model="editableTabsValue" type="card" @tab-remove="closeTag" class="tabs_tags ">
      <el-tab-pane
        v-for="(item, index) in $store.state.index.tabs"
        :key="index"
        :label="item.name"
        :name="item.id"
        :closable="index === 0 ? false : true"
      >
        <!-- {{ item.content }} -->
      </el-tab-pane>
    </el-tabs>
    <div class="bottom_arrows">
      <!-- style="float:right" -->
      <el-dropdown class="close_btn" @command="dropdownClick">
        <el-button class="el-dropdown-link">
          <i class="el-icon-arrow-down"></i>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="left">关闭左侧</el-dropdown-item>
            <el-dropdown-item command="right">关闭右侧</el-dropdown-item>
            <el-dropdown-item command="other">关闭其他</el-dropdown-item>
            <el-dropdown-item command="all">全部关闭</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, ref, toRefs, watch } from 'vue'
import { MutationConstants, GetterConstants } from '@/store/modules/index/constants'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from '@/store'
import { commonApi } from '@/http/api/common'
import dataStructure from '@/utils/dataStructure'
import { IRequest } from '@/@types/httpInterface'
interface IState {
  showArrow: boolean
  tabs: any[]
  editableTabsValue: any
}
export default defineComponent({
  setup() {
    const store = useStore()
    const route = useRoute()
    const Router = useRouter()
    const state: IState = reactive({
      showArrow: true,
      tabs: store.getters[GetterConstants.GET_TABS],
      editableTabsValue: ''
    })

    watch(
      () => state.tabs,
      (newValue, oldValue) => {
        let tabs = state.tabs
        let checkedIndex = tabs.findIndex((el: any) => el.isChecked === true)
        state.editableTabsValue = tabs[checkedIndex].id
      },
      {
        deep: true //深度监听
      }
    )
    watch(
      () => state.editableTabsValue,
      (newValue, oldValue) => {
        methods.clickTag(newValue)
      }
    )
    const requests = {
      // 或取小窗口
      getButteryHatch() {
        const data = dataStructure({}, {})
        commonApi
          .get_buttery_hatch(data)
          .then(res => {
            let { status, custom_data } = res as IRequest
            if (status === 200) {
              if (!custom_data.data) {
                state.tabs = []
                Router.push('/index/service')
              }
              state.tabs = custom_data.data
            }
          })
          .catch(err => err)
      },
      // 修改小窗口
      getButteryHatchUpd() {
        const data = dataStructure({}, { all_array: [] })
        commonApi
          .get_buttery_hatch_upd(data)
          .then(res => {
            let { status, custom_data } = res as IRequest
            if (status === 200) {
            }
          })
          .catch(err => err)
      }
    }
    const methods = {
      /**
			 *  id: 1
					isChecked: false
					menu_url: "/index/service"
					name: "服务中心"
			 */
      // 点击标签跳转
      clickTag(id: any) {
        let tabs = store.getters[GetterConstants.GET_TABS]
        let targetIndex = tabs.findIndex((el: any) => el.id === id)
        Router.push(tabs[targetIndex].menu_url)
        tabs.forEach((el: any) => {
          if (el.id === id) {
            el.isChecked = true
          } else {
            el.isChecked = false
          }
        })
        store.commit(MutationConstants.SET_TABS, tabs)
      },
      // 关闭标签
      closeTag(id: any) {
        let tabs = store.getters[GetterConstants.GET_TABS]
        let closeIndex = tabs.findIndex((el: any) => el.id === id)
        let checkedIndex = tabs.findIndex((el: any) => el.isChecked === true)
        // 当要关闭和当前选中是同一个，需特殊处理；否则直接删除无影响
        if (closeIndex === checkedIndex) {
          // 需要关闭的是最后一个时
          if (closeIndex === tabs.length - 1) {
            tabs[closeIndex - 1].isChecked = true
            state.editableTabsValue = tabs[closeIndex - 1].id
            Router.push(tabs[closeIndex - 1].menu_url)
          }
          // 需要关闭的是中间一个时
          else {
            tabs[closeIndex + 1].isChecked = true
            state.editableTabsValue = tabs[closeIndex + 1].id
            Router.push(tabs[closeIndex + 1].menu_url)
          }
        }
        tabs.splice(closeIndex, 1)
        store.commit(MutationConstants.SET_TABS, tabs)
      },
      // 右侧下拉菜单批量删除
      dropdownClick(command: string) {
        let tabs = store.getters[GetterConstants.GET_TABS]
        let checkedIndex = tabs.findIndex((el: any) => el.isChecked === true)
        switch (command) {
          case 'left':
            tabs.splice(1, checkedIndex - 1)
            break
          case 'right':
            tabs.splice(checkedIndex + 1, tabs.length - checkedIndex - 1)
            break
          case 'all':
            tabs.splice(1, tabs.length - 1)
            state.editableTabsValue = tabs[0].id
            tabs[0].isChecked = true
            Router.push(tabs[0].menu_url)
            break
          case 'other':
            tabs.splice(checkedIndex + 1, tabs.length - checkedIndex - 1)
            tabs.splice(1, checkedIndex - 1)
            break
          default:
            break
        }
        store.commit(MutationConstants.SET_TABS, tabs)
      }
    }
    onMounted(() => {
      // 初始化
      let tabs = store.getters[GetterConstants.GET_TABS]
      if (tabs.length) {
        let checkedIndex = tabs.findIndex((el: any) => el.isChecked === true)
        state.editableTabsValue = tabs[checkedIndex].id
        Router.push(tabs[checkedIndex].menu_url)
      }
      // requests.getButteryHatch()
    })
    return {
      ...toRefs(state),
      ...methods
    }
  }
})
</script>
<style lang="scss" scoped>
@import '@/assets/css/element-common-style.scss';
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}

.tabs_content {
  width: 100%;
  height: 100%;
  display: flex;

  .tabs_tags {
    height: 100%;
    width: 0;
    flex: 1;
  }
  .bottom_arrows {
    height: 100%;
    width: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}
</style>
