<!--
 * @Descripttion: 
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2022-05-07 16:56:37
-->
<template>
  <div>
    出库
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
export default defineComponent({
  name: '',
  props: {},
  setup() {
    const methods = {}
    const state = reactive({})
    return { ...methods, ...toRefs(state) }
  }
})
</script>
<style lang="scss"></style>