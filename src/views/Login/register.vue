<script setup lang="ts">
  import { registerApi, sendMobileCode } from '@/services/user'
  import { useUserStore } from '@/stores'
  import { codeRules, mobileRules, passwordRules } from '@/utils/rules'
  import { showSuccessToast, showToast, type FormInstance } from 'vant'
  import { onUnmounted, ref } from 'vue'
  import { useRoute, useRouter } from 'vue-router'

  const store = useUserStore()
  const router = useRouter()
  const route = useRoute()

  // 注册数据结构
  const isAgree = ref(false)
  const mobile = ref('')
  const password = ref('')
  const code = ref('')
  // 控制密码是否显示
  const show = ref(false)

  // 发送验证码
  const form = ref<FormInstance>()
  const time = ref(0)
  let timeId: number
  const send = async () => {
    // 倒计时time的值大于0，不能点击发送
    if (time.value > 0) return
    // 验证不通过，阻止程序继续执行
    await form.value?.validate('mobile')
    await sendMobileCode(mobile.value, 'register')
    showSuccessToast('发送成功')
    time.value = 60
    // 倒计时
    clearInterval(timeId)
    timeId = window.setInterval(() => {
      time.value--
      if (time.value <= 0) window.clearInterval(timeId)
    }, 1000)
  }

  onUnmounted(() => {
    window.clearInterval(timeId)
  })

  // 注册
  const register = async () => {
    if (!isAgree.value) {
      showToast('请勾选我已同意')
      return
    }
    const res = await registerApi(mobile.value, code.value, password.value)
    console.log('register注册---->', res)
    router.push('/login')
    showSuccessToast('注册成功')
  }

  const handleRightClick = () => {
    router.push('/login')
  }
</script>

<template>
  <div class="register-page">
    <cp-nav-bar title="注册" right-text="登录" @click-right="handleRightClick" />

    <van-form autocomplete="off" @submit="register">
      <van-field
        v-model="mobile"
        name="mobile"
        :rules="mobileRules"
        type="tel"
        placeholder="请输入手机号"
      ></van-field>
      <van-field :rules="codeRules" v-model="code" placeholder="请输入短信验证码">
        <template #button>
          <span class="btn-send" :class="{ active: time > 0 }" @click="send">
            {{ time > 0 ? `${time}s后再次发送` : '发送验证码' }}
          </span>
        </template>
      </van-field>
      <van-field
        v-model="password"
        :rules="passwordRules"
        :type="show ? 'text' : 'password'"
        placeholder="请输入密码，8~20位数字、字母或符号"
      >
        <template #button>
          <cp-icon @click="show = !show" :name="`login-eye-${show ? 'on' : 'off'}`"></cp-icon>
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
        <van-button round block type="primary" native-type="submit">注册</van-button>
      </div>
    </van-form>
    <!-- 底部 -->
    <div class="register-other">
      <van-divider>第三方登陆</van-divider>
      <div class="icon">
        <img src="@/assets/icons/qq.svg" alt="" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .register {
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
