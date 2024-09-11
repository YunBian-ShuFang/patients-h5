<script setup lang="ts">
// import { Button as VanButton } from 'vant'
// import { useUserStore } from './stores'
// import { request } from '@/utils/request'
// import type { User } from './types/user'

// // 测试，请求拦截器，是否携带token，响应拦截器401拦截到登陆地址
// const getUserInfo = async () => {
//   const res = await request('/patient/myUser')
//   console.log(res)
// }
// // 测试，响应拦截器,出现非10000的情况，和返回玻璃后的数据
// const store = useUserStore()
// const login = async () => {
//   const res = await request<User>('/login/password', 'post', {
//     mobile: '13211112222',
//     // 密码 abc123456 测试：出现非10000的情况
//     password: 'abc123456'
//   })
//   store.setUser(res.data)
// }
</script>

<template>
  <!-- <van-button type="primary" @click="getUserInfo">获取个人信息</van-button>
  <van-button type="primary" @click="login">登陆</van-button> -->
  <router-view></router-view>
</template>

<style scoped lang="scss">
a {
  color: var(--cp-primary);
}
</style>
