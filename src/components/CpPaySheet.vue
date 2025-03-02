<!-- 支付抽屉组件 -->
<script setup lang="ts">
  import { getConsultOrderPayUrl } from '@/services/consult'
  import { showLoadingToast, showToast } from 'vant'
  import { ref } from 'vue'

  // 定义组件的 props 类型
  const prop = defineProps<{
    orderId: string // 订单ID
    actualPayment: number // 实际支付金额
    onClose?: () => void // 可选的关闭回调函数
    show: boolean // 控制支付抽屉是否显示
    payCallback: string // 设置回跳地址
  }>()

  // 定义事件的 emit 类型
  const emit = defineEmits<{
    (e: 'update:show', value: boolean): void // 触发 'update:show' 事件，更新父组件的 show 状态
  }>()

  // 存储用户选择的支付方式，0 表示微信支付，1 表示支付宝支付
  const paymentMethod = ref<0 | 1>()

  // 跳转到支付页面的函数
  const payNow = async () => {
    // 如果支付方式未选择，则提示用户选择支付方式
    if (paymentMethod.value === undefined) return showToast('请选择支付方式')

    // 显示加载中的提示
    showLoadingToast({ message: '跳转支付', duration: 0 })

    // 调用服务获取支付链接
    const res = await getConsultOrderPayUrl({
      orderId: prop.orderId, // 订单ID
      paymentMethod: paymentMethod.value, // 用户选择的支付方式
      payCallback: 'http://localhost:5173' + prop.payCallback // 支付完成后的回调地址
    })

    // 跳转到支付页面
    window.location.href = res.data.payUrl
  }
</script>

<template>
  <!-- 支付方式弹窗 -->
  <van-action-sheet
    :show="show"
    @update:show="emit('update:show', $event)"
    title="选择支付方式"
    :close-on-popstate="false"
    :closeable="false"
    :before-close="onClose"
  >
    <div class="pay-type">
      <p class="amount">￥{{ actualPayment.toFixed(2) }}</p>
      <van-cell-group>
        <!-- 微信 -->
        <van-cell title="微信支付" @click="paymentMethod = 0">
          <template #icon><cp-icon name="consult-wechat"></cp-icon></template>
          <template #extra>
            <van-checkbox :checked="paymentMethod === 0" />
          </template>
        </van-cell>
        <!-- 支付宝 -->
        <van-cell title="支付宝支付" @click="paymentMethod = 1">
          <template #icon><cp-icon name="consult-alipay"></cp-icon></template>
          <template #extra>
            <van-checkbox :checked="paymentMethod === 1" />
          </template>
        </van-cell>
      </van-cell-group>
      <div class="btn">
        <van-button type="primary" round block @click="payNow">立即支付</van-button>
      </div>
    </div>
  </van-action-sheet>
</template>

<style lang="scss" scoped>
  .pay-type {
    .amount {
      padding: 20px;
      text-align: center;
      font-size: 16px;
      font-weight: bold;
    }
    .btn {
      padding: 15px;
    }
    .van-cell {
      align-items: center;
      .cp-icon {
        margin-right: 10px;
        font-size: 18px;
      }
      .van-checkbox :deep(.van-checkbox__icon) {
        font-size: 16px;
      }
    }
  }
</style>
