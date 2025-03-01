<script setup lang="ts">
  // 组件引入
  import RoomStatus from './components/RoomStatus.vue' // 订单状态组件
  import RoomAction from './components/RoomAction.vue' // 发送消息组件
  import RoomMessage from './components/RoomMessage.vue' // 显示聊天记录组件

  // 聊天相关
  import { useUserStore } from '@/stores' // 引入用户 store
  import { useRoute } from 'vue-router' // 引入路由信息
  import { io, type Socket } from 'socket.io-client' // 引入 socket.io 用于实时通信
  import { nextTick, onMounted, onUnmounted, provide, ref } from 'vue' // 引入 Vue 相关 API
  import { baseURL } from '@/utils/request' // 引入基本的请求地址配置

  // 类型和枚举
  import type { Message, TimeMessages } from '@/types/room' // 引入消息类型
  import { MsgType, OrderType } from '@/enums' // 引入消息类型和订单状态枚举
  import type { ConsultOrderItem, Image } from '@/types/consult' // 引入咨询订单类型和图片类型

  // 接口相关
  import { getOrderDetailAPI } from '@/services/consult' // 获取订单详情的 API
  import dayjs from 'dayjs' // 用于日期格式化
  import { showFailToast } from 'vant' // 引入提示组件

  // 获取用户信息的 store
  const store = useUserStore()
  const route = useRoute()

  // 记录消息的开始时间，用于下一次请求获取消息时的时间参数
  const time = ref(dayjs().format('YYYY-MM-DD HH:mm:ss'))

  // 初次加载时判断是否是初始消息
  const initialMsg = ref(true)

  /**
   * 聊天消息相关
   * chatMsgList: 接收聊天记录
   * sendChatMsg: 发送消息
   * receiveChatMsg: 接收消息
   * updateMsgStatus: 标记消息已读
   * getChatMsgList: 获取聊天记录
   * statusChange: 接收订单状态变化
   */

  // 建立与服务器的 socket 连接
  const socket = io(baseURL, {
    auth: {
      token: `Bearer ${store.user?.token}` // 用用户的 token 进行认证
    },
    query: {
      orderId: route.query.orderId // 传递当前的订单 ID
    }
  })

  // 连接成功时的回调
  socket.on('connect', () => {
    list.value = [] // 重置消息列表
  })

  // 接收聊天记录
  // chatMsgList 接收时间和消息数据
  const list = ref<Message[]>([]) // 聊天消息列表
  socket.on('chatMsgList', ({ data }: { data: TimeMessages[] }) => {
    const arr: Message[] = [] // 用来存储处理后的消息
    data.forEach((item, i) => {
      if (i === 0) time.value = item.createTime // 设置初始时间为第一段消息的时间
      arr.push({
        msgType: MsgType.Notify, // 类型为通知
        msg: { content: item.createTime }, // 显示时间戳
        createTime: item.createTime,
        id: item.createTime
      })
      arr.push(...item.items) // 合并消息项
    })
    // 追加到聊天消息列表
    list.value.unshift(...arr)

    loading.value = false
    if (!data.length) {
      return showFailToast('没有聊天记录了') // 如果没有记录则弹出提示
    }

    nextTick(() => {
      // 第一次加载时滚动到底部，并发送已读状态
      if (initialMsg.value) {
        socket.emit('updateMsgStatus', arr[arr.length - 1].id) // 标记消息已读
        window.scrollTo(0, document.body.scrollHeight) // 滚动到底部
        initialMsg.value = false // 标记为非初始消息
      }
    })
  })

  // 接收即时聊天消息
  socket.on('receiveChatMsg', async res => {
    list.value.push(res) // 添加新的消息到消息列表
    await nextTick()
    socket.emit('updateMsgStatus', res.id) // 标记新消息为已读
    window.scrollTo(0, document.body.scrollHeight) // 滚动到底部
  })

  // 获取订单详情
  const consult = ref<ConsultOrderItem>()

  provide('consult', consult.value) // 将订单数据提供给后代组件

  // 加载订单的详细信息
  const loadDetailData = async () => {
    const res = await getOrderDetailAPI(route.query.orderId as string)
    consult.value = res.data
    console.log('room订单请求--->', consult.value)
  }

  loadDetailData() // 调用函数获取订单详情
  // 这里注意发请求的数据, 一开始拿到结果就定死了,
  // 现在需要监听 websocket 通知的状态改变时间, 重新渲染吗
  socket.on('statusChange', () => {
    loadDetailData()
  })

  // 发送文本消息
  const sendText = (text: string) => {
    socket.emit('sendChatMsg', {
      from: store.user?.id, // 发送者 ID
      to: consult.value?.docInfo?.id, // 接收者 ID
      msgType: MsgType.MsgText, // 消息类型
      msg: { content: text } // 消息内容
    })
    console.log('烦死了--文字发送', list.value)
  }

  // 发送图片消息
  const sendImage = (img: Image) => {
    const message = {
      from: store.user?.id,
      to: consult.value?.docInfo?.id,
      msgType: MsgType.MsgImage, // 确保是图片类型
      msg: { picture: img } // 图片内容
    }
    console.log('发送的消息:', message) // 调试输出
    socket.emit('sendChatMsg', message)
    // socket.emit('sendChatMsg', {
    //   from: store.user?.id,
    //   to: consult.value?.docInfo?.id,
    //   MsgType: MsgType.MsgImage, // 图片消息类型
    //   msg: { picture: img } // 图片内容
    // })
    console.log('烦死了--图片发送', list.value)
  }

  // 下拉刷新
  const loading = ref(false) // 控制下拉刷新状态
  const onRefresh = () => {
    // 触发下拉刷新时，获取新的聊天记录
    socket.emit('getChatMsgList', 20, time.value, route.query.orderId)
    console.log('烦死了--下拉刷新', list.value)
  }

  // 注入订单信息
  provide('consult', consult.value)

  // 评价成功-修改消息
  const completeEva = (score: number) => {
    const item = list.value.find(item => item.msgType === MsgType.CardEvaForm)
    if (item) {
      item.msg.evaluateDoc = { score }
      item.msgType = MsgType.CardEva
    }
  }
  provide('completeEva', completeEva)
</script>

<template>
  <div class="room-page">
    <cp-nav-bar title="医生问诊室" />
    <room-status :status="consult?.status" :countdown="consult?.countdown" />
    <van-pull-refresh v-model="loading" @refresh="onRefresh">
      <room-message :list="list" />
    </van-pull-refresh>
    <room-action
      @send-text="sendText"
      @send-image="sendImage"
      :disabled="consult?.status !== OrderType.ConsultChat"
    />
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
