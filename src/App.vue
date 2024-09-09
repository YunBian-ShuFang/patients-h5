<script setup lang="ts">
import { Button as VanButton } from 'vant'
import { useUserStore } from './stores'

const store = useUserStore()
</script>

<template>
  <p>{{ store.user }}</p>
  <van-button
    type="primary"
    @click="
      store.setUser({
        id: '1',
        mobile: 15595614402,
        account: '1',
        token: '1',
        avatar: '1'
      })
    "
    >登陆</van-button
  >
  <van-button @click="store.delUser()">退出</van-button>
</template>

<style scoped lang="scss">
a {
  color: var(--cp-primary);
}
</style>
