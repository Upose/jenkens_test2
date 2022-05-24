<!--
 * @Description: 对账
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2022-05-24 18:04:58
-->
<template>
  <div>
    对账
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
