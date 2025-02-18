<script setup lang="ts">
// 组件
import RoomStatus from './components/RoomStatus.vue'
import RoomAction from './components/RoomAction.vue'
import RoomMessage from './components/RoomMessage.vue'
// 聊天相关
import { useUserStore } from '@/stores'
import { useRoute } from 'vue-router'
import { io, type Socket } from 'socket.io-client'
import { nextTick, onMounted, onUnmounted, provide, ref } from 'vue'
import { baseURL } from '@/utils/request'
// 类型和枚举
import type { Message, TimeMessages } from '@/types/room'
import { MsgType, OrderType } from '@/enums'
import type { ConsultOrderItem, Image } from '@/types/consult'
// 接口相关
import { getOrderDetailAPI } from '@/services/consult'
import dayjs from 'dayjs'
import { showFailToast } from 'vant'


const store = useUserStore()
const route = useRoute()

// 记录每段消息开始时间,作为下一次请求的开始时间
const time = ref(dayjs().format('YYYY-MM-DD HH:mm:ss'))

const initialMsg = ref(true)

// 连接服务器
const socket = io(baseURL, {
  auth: {
    token: `Bearer ${store.user?.token}`
  },
  query: {
    orderId: route.query.orderId
  }
})

// 建立连接成功
socket.on('connect', () => {
  list.value = []
})

// 接收别人的消息
// chatMsgList 接受聊天记录
const list = ref<Message[]>([])
socket.on('chatMsgList', ({ data }: { data: TimeMessages[] }) => {
  // data 是有多个时间消息小组对象组成的数组
  // data.forEach(el => {
  //   const items = el.items
  //   list.value.push(...items)
  // })
  const arr: Message[] = []
  data.forEach((item, i) => {
    if (i === 0) time.value = item.createTime
    arr.push({
      msgType: MsgType.Notify,
      msg: { content: item.createTime },
      createTime: item.createTime,
      id: item.createTime
    })
    arr.push(...item.items)
  })
  // 追加到聊天消息列表
  list.value.unshift(...arr)

  loading.value = false
  if (!data.length) {
    return showFailToast('没有聊天记录了')
  }
  console.log('接收别人的消息--->', list.value);

  nextTick(() => {
    if (initialMsg.value) {
      window.scrollTo(0, document.body.scrollHeight)
      initialMsg.value = false
    }
  })
})

// 除了接收聊天记录以外，别人给我发的消息还包括，即时通讯
socket.on('receiveChatMsg', (res) => {
  console.log('即时通讯res--->', res);

  list.value.push(res)
  nextTick(() => {
    window.scrollTo(0, document.body.scrollHeight)
  })

})

// 订单状态
// 发请求获取
const consult = ref<ConsultOrderItem>()

provide("consult", consult.value)

const loadDetailData = async () => {
  const res = await getOrderDetailAPI(route.query.orderId as string)
  consult.value = res.data
  console.log('room订单请求--->', consult.value);

}

loadDetailData()

const sendText = (text: string) => {
  // 发送信息
  socket.emit('sendChatMsg', {
    from: store.user?.id,
    to: consult.value?.docInfo?.id,
    msgType: MsgType.MsgText,
    msg: { content: text }
  })
}

const sendImage = (img: Image) => {
  // 发送图片
  socket.emit('sendChatMsg', {
    from: store.user?.id,
    to: consult.value?.docInfo?.id,
    MsgType: MsgType.MsgImage,
    msg: { picture: img }
  })
}

// 下拉刷新
const loading = ref(false)
const onRefresh = () => {
  // 触发下拉
  socket.emit('getChatMsgList', 20, time.value, route.query.orderId)
}

</script>

<template>
  <div class="room-page">
    <cp-nav-bar title="医生问诊室" />
    <room-status :status="consult?.status" :countdown="consult?.countdown" />
    <van-pull-refresh v-model="loading" @refresh="onRefresh">
      <room-message :list="list" />
    </van-pull-refresh>
    <room-action @send-text="sendText" @send-image="sendImage" :disabled="consult?.status !== OrderType.ConsultChat" />
  </div>
</template>

<style lang="scss" scoped>
.room-page {
  padding-top: 90px;
  padding-bottom: 60px;
  min-height: 100vh;
  box-sizing: border-box;
  background-color: var(--cp-bg);

  .van-pull-refresh {
    width: 100%;
    min-height: calc(100vh - 150px);
  }
}
</style>
