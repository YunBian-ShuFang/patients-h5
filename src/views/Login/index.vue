<script setup lang="ts">
  import { loginByMobile, loginByPassword, sendMobileCode } from '@/services/user'
  import { useUserStore } from '@/stores'
  import { useRoute, useRouter } from 'vue-router'
  import { mobileRules, passwordRules, codeRules } from '@/utils/rules'
  import { showSuccessToast, showToast, type FormInstance } from 'vant'
  import { onUnmounted, ref } from 'vue'

  const store = useUserStore()
  const router = useRouter()
  const route = useRoute()

  // 密码登陆数据结构
  const isAgree = ref(true)
  const mobile = ref('13230000077')
  const password = ref('abc12345')
  // 控制密码是否显示
  const show = ref(false)
  // 短信验证登陆
  const code = ref('')

  // 发送验证码
  const form = ref<FormInstance>()
  const time = ref(0)
  let timeId: number
  const send = async () => {
    // 倒计时time的值大于0，不能发送验证码
    if (time.value > 0) return
    // 验证不通过报错，阻止程序继续执行
    await form.value?.validate('mobile')
    await sendMobileCode(mobile.value, 'login')
    showSuccessToast('发送成功')
    time.value = 60
    // 倒计时
    clearInterval(timeId)
    timeId = window.setInterval(() => {
      time.value--
      if (time.value <= 0) window.clearInterval(timeId)
    }, 1000)
  }

  // 在组件卸载时，使用 clearInterval 清除定时器，避免可能的内存泄漏或意外操作
  onUnmounted(() => {
    window.clearInterval(timeId)
  })

  // 表单提交
  const login = async () => {
    if (!isAgree.value) {
      showToast('请勾选我已同意')
      return
    }
    // 验证完毕，进行登陆
    const res = isPass.value
      ? await loginByPassword(mobile.value, password.value)
      : await loginByMobile(mobile.value, code.value)
    // 将数据存入仓库
    store.setUser(res.data)
    console.log(res)
    // 尝试从 路由中获取 redirect 参数如果有就跳转
    // if (route.query.redirect) {
    //   router.push(route.query.redirect as string) // 跳转到指定页面
    // } else {
    //   router.push('/') // 跳转到首页
    // }
    // 如果有回跳地址就进行回跳，没有跳转到个人中心，replace目的 a => login  => b  变成 a => b
    router.push((route.query.returnUrl as string) || '/user')
    showSuccessToast('登陆成功')
  }

  const isPass = ref(true)

  const handleRightClick = () => {
    alert('右侧按钮被点击了！')
  }
</script>

<template>
  <div class="login-page">
    <cp-nav-bar title="登陆" rightText="注册" @click-right="handleRightClick"></cp-nav-bar>
    <!-- 头部 -->
    <div class="login-head">
      <h3>{{ isPass ? '密码登陆' : '手机验证码登陆' }}</h3>
      <a href="javascript:;" @click="isPass = !isPass">
        <span>{{ !isPass ? '密码登陆' : '手机验证码登陆' }}</span>
        <van-icon name="arrow"></van-icon>
      </a>
    </div>
    <!-- 表单 -->
    <van-form autocomplete="off" @submit="login">
      <van-field
        v-model="mobile"
        name="mobile"
        :rules="mobileRules"
        type="tel"
        placeholder="请输入手机号"
      ></van-field>
      <van-field
        v-if="isPass"
        v-model="password"
        :rules="passwordRules"
        :type="show ? 'text' : 'password'"
        placeholder="请输入密码"
      >
        <template #button>
          <cp-icon @click="show = !show" :name="`login-eye-${show ? 'on' : 'off'}`"></cp-icon>
        </template>
      </van-field>
      <van-field v-else :rules="codeRules" v-model="code" placeholder="请输入短信验证码">
        <template #button>
          <span class="btn-send" :class="{ active: time > 0 }" @click="send">
            {{ time > 0 ? `${time}s后再次发送` : '发送验证码' }}
          </span>
        </template>
      </van-field>
      <div class="cp-cell">
        <van-checkbox v-model="isAgree">
          <span>我已同意</span>
          <a href="javascript:;">用户协议</a>
          <span>及</span>
          <a href="javascript:;">隐私协议</a>
        </van-checkbox>
      </div>
      <div class="cp-cell">
        <van-button round block type="primary" native-type="submit">登 陆</van-button>
      </div>
      <div class="cp-cell">
        <a href="javascript:;">忘记密码？</a>
      </div>
    </van-form>
    <!-- 底部 -->
    <div class="login-other">
      <van-divider>第三方登陆</van-divider>
      <div class="icon">
        <img src="@/assets/icons/qq.svg" alt="" />
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
