<script setup lang="ts">
const handleRightClick = () => {
  alert('右侧按钮被点击了！')
}
</script>

<template>
  <div class="login-page">
    <cp-nav-bar
      title="登陆"
      rightText="注册"
      @click-right="handleRightClick"
    ></cp-nav-bar>
  </div>
</template>

<style lang="scss" scoped></style>
