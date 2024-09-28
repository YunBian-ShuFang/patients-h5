<script setup lang="ts">
import { loginByPassword } from '@/services/user'
import { useUserStore } from '@/stores'
import { useRoute, useRouter } from 'vue-router'
import { mobileRules, passwordRules } from '@/utils/rules'
import { showToast } from 'vant'
import { ref } from 'vue'

// 密码登陆数据结构
const isAgree = ref(false)
const mobile = ref('13230000002')
const password = ref('abc12345')

const store = useUserStore()
const router = useRouter()
const route = useRoute()
// 表单提交
const login = async () => {
  if (!isAgree.value) {
    showToast('请勾选我已同意')
    return
  }
  // 验证完毕，进行登陆
  const res = await loginByPassword(mobile.value, password.value)
  // 将数据存入仓库
  store.setUser(res.data)
  console.log(res)
  // 尝试从 路由中获取 redirect 参数如果有就跳转
  // if (route.query.redirect) {
  //   router.push(route.query.redirect as string) // 跳转到指定页面
  // } else {
  //   router.push('/') // 跳转到首页
  // }
  router.push((route.query.returnUrl as string) || '/user')
}

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
    <!-- 头部 -->
    <div class="login-head">
      <h3>密码登陆</h3>
      <a href="javascript:;">
        <span>手机验证码登陆</span>
        <van-icon name="arrow"></van-icon>
      </a>
    </div>
    <!-- 表单 -->
    <van-form autocomplete="off" @submit="login">
      <van-field
        v-model="mobile"
        :rules="mobileRules"
        type="tel"
        placeholder="请输入手机号"
      ></van-field>
      <van-field
        v-model="password"
        :rules="passwordRules"
        type="password"
        placeholder="请输入密码"
      ></van-field>
      <div class="cp-cell">
        <van-checkbox v-model="isAgree">
          <span>我已同意</span>
          <a href="javascript:;">用户协议</a>
          <span>及</span>
          <a href="javascript:;">隐私协议</a>
        </van-checkbox>
      </div>
      <div class="cp-cell">
        <van-button round block type="primary" native-type="submit"
          >登 陆</van-button
        >
      </div>
      <div class="cp-cell">
        <a href="javascript:;">忘记密码？</a>
      </div>
    </van-form>
    <!-- 底部 -->
    <div class="login-other">
      <van-divider>第三方登陆</van-divider>
      <div class="icon">
        <img src="@/assets/qq.svg" alt="" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login {
  &-page {
    padding-top: 46px;
  }
  &-head {
    display: flex;
    padding: 30px 30px 50px;
    justify-content: space-between;
    align-items: flex-end;
    line-height: 1;
    h3 {
      font-weight: normal;
      font-size: 24px;
    }
    a {
      font-size: 15px;
    }
  }
  &-other {
    margin-top: 60px;
    padding: 0 30px;
    .icon {
      display: flex;
      justify-content: center;
    }
    img {
      width: 36px;
      height: 36px;
      padding: 4px;
    }
  }
}

.van-form {
  padding: 0 14px;
  .cp-cell {
    height: 52px;
    line-height: 24px;
    padding: 14px 16px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    .van-checkbox {
      a {
        color: var(--cp-primary);
        padding: 0 5px;
      }
    }
  }
  .btn-send {
    color: var(--cp-primary);
    &.active {
      color: rgba(22, 194, 163, 0.5);
    }
  }
}
</style>
