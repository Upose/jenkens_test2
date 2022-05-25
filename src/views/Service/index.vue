<!--
 * @Description: 
 * @version: 
 * @Author: TJ
 * @Date: 2021-04-25 09:06:53
 * @LastEditors: HYH
 * @LastEditTime: 2022-05-25 15:46:40
-->
<template>
  <div class="service">
    <div>
      welcome!
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue'
import { MutationConstants, GetterConstants } from '@/store/modules/index/constants'
import { useStore } from '@/store'
export default defineComponent({
  setup() {
    const store = useStore()
    const state = reactive({})
    const methods = {
      changeIsChecked() {
        let tabs = store.getters[GetterConstants.GET_TABS]
        // 排除当前页面是直接给的初始值情况
        if (tabs.length == 1) return
        tabs.forEach((item: any) => {
          if (item.isChecked) item.isChecked = false
          if (item.menu_url == '/index/service') item.isChecked = true
        })
        store.commit(MutationConstants.SET_TABS, tabs)
      }
    }
    onMounted(() => {
      methods.changeIsChecked()
    })
    return {
      ...toRefs(state),
      methods
    }
  }
})
</script>

<style lang="scss" scoped>
.service {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
}
</style>
