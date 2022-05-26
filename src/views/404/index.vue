<template>
  <div class="main">
    <div class="img">
      <img src="@/assets/img/404_images/404.png" alt="404" />
    </div>
    <div class="tip">
      抱歉! 请检查您输入的网址是否正确，或点击下面的按钮返回首页。
      <el-button type="text" @click="$router.push('/index/service')">返回首页</el-button>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Page404',
  computed: {
    message() {
      return '当前页面不存在...'
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .img {
    min-width: 200px;
    max-width: 500px;
    overflow: hidden;
    img {
      width: 100%;
      height: auto;
    }
  }
  .tip {
    margin-top: 15px;
    font-size: 14px;
    color: #959292;
    button {
      font-size: 14px;
    }
  }
}
</style>
