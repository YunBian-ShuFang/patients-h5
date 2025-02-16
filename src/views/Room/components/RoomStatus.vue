<script setup lang="ts">
import { OrderType } from '@/enums'
import { getOrderDetailAPI } from '@/services/consult';
import type { ConsultOrderItem } from '@/types/consult';
import { type Socket } from 'socket.io-client';
import { onMounted, ref, defineProps, onUnmounted } from 'vue';
import { useRoute } from 'vue-router' //导入 useRoute

const route = useRoute() //获取当前路由对象

const { status, countdown = 0 } = defineProps<{
  status?: OrderType
  countdown?: number
}>()

const consult = ref<ConsultOrderItem>()

var socket: Socket // 定义socket变量

onMounted(async () => {

  // 订单状态 在onMounted中注册
  socket.on('statusChange', async () => {
    const res = await getOrderDetailAPI(route.query.orderId as string)
    console.log('问诊状态-订单详情--->', res);

    consult.value = res.data

  })
})
</script>

<template>
  <!-- 状态栏组件 -->
  <div class="room-status">
    <div class="wait" v-if="status === OrderType.ConsultWait">
      已通知意思尽快接诊，24小时内医生未回复将自动退款
    </div>
    <div class="chat" v-if="status === OrderType.ConsultChat">
      <span>咨询中</span>
      <span>
        剩余时间：<van-count-down :time="countdown * 1000"></van-count-down>
      </span>
    </div>
    <div class="end" v-if="
      status === OrderType.ConsultComplete ||
      status === OrderType.ConsultCancel
    ">
      <van-icon name="passed" /> 已结束
    </div>
  </div>
</template>

<style lang="scss" scoped>
.room-status {
  position: fixed;
  left: 0;
  top: 46px;
  height: 44px;
  width: 100%;
  background-color: #fff;
  font-size: 13px;
  z-index: 1;

  .wait {
    padding: 0 15px;
    background-color: var(--cp-plain);
    height: 100%;
    line-height: 44px;
    text-align: center;
    color: var(--cp-primary);
  }

  .chat {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 15px;

    span {
      &:first-child {
        color: var(--cp-primary);
      }

      &:last-child {
        color: var(--cp-text2);
        width: 130px;

        .van-count-down {
          display: inline;
        }
      }
    }
  }

  .end {
    display: flex;
    align-items: center;
    height: 44px;
    padding: 0 15px;
    font-weight: 500;

    .van-icon {
      font-size: 14px;
      margin-right: 4px;
      position: relative;
      top: 1px;
    }
  }
}
</style>
