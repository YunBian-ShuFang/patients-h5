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


const store = useUserStore()
const route = useRoute()

// 连接服务器
const socket = io(baseURL, {
  auth: {
    token: `Bearer ${store.user?.token}`
  },
  query: {
    orderId: route.query.orderId
  }
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
  console.log('接收别人的消息--->', list.value);

  nextTick(() => {
    window.scrollTo(0, document.body.scrollHeight)
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

// let socket: Socket
// onUnmounted(() => {
//   socket.close()
// })

// // onMounted(async () => {
// //   // 建立链接，创建 socket.io 实例
// //   // socket = io(baseURL, {
// //   //   auth: {
// //   //     token: `Bearer ${store.user?.token}`
// //   //   },
// //   //   query: {
// //   //     orderID: route.query.orderID
// //   //   }
// //   // })

// //   // socket.on('connect', () => {
// //   //   // 建立连接成功
// //   //   console.log('connect')
// //   // })

// //   // socket.on('error', () => {
// //   //   // 错误异常消息
// //   //   console.log('error')
// //   // })

// //   // socket.on('disconnect', () => {
// //   //   // 已经断开连接
// //   //   console.log('disconnect')
// //   // })
// // })

// // 接收别人的消息
// // chatMsgList 接收聊天记录
// const list = ref<Message[]>([])
// // 聊天记录
// onMounted(async () => {
//   console.log('测试baseURL---->', baseURL);

//   // 建立链接，创建 socket.io 实例
//   socket = io(baseURL, {
//     auth: {
//       token: `Bearer ${store.user?.token}`
//     },
//     query: {
//       orderID: route.query.orderID
//     }
//   })

//   // 监听连接成功
//   socket.on('connect', () => {
//     console.log('Socket successfully connected!--成功');
//   });

//   // 监听连接错误
//   socket.on('connect_error', (error) => {
//     console.error('Socket connection failed--失败:', error);
//   });

//   // 监听断开连接
//   socket.on('disconnect', () => {
//     console.log('Socket disconnected!--断开连接');
//   });

//   // 监听聊天消息
//   socket.on('chatMsgList', ({ data }: { data: TimeMessages[] }) => {
//     console.log('收到聊天记录:', data);  // 输出收到的数据
//     if (!data || data.length === 0) {
//       console.log('没有收到聊天记录');
//     } else {
//       data.forEach((el) => {
//         const items = el.items;
//         console.log('处理的聊天消息:', items);  // 输出每次处理的聊天消息
//         list.value.push(...items);
//       });
//     }

//     // console.log('聊天记录1--->', data)
//     // // 这个data是多个时间消息小组对象所组成的数组
//     // // data = [
//     // //   // 这里是各个时间快的对象
//     // //   {
//     // //     createTime: 20240101,
//     // //     items: [
//     // //       '你好',
//     // //       '中午吃啥'
//     // //     ]
//     // //   },
//     // //   {
//     // //     createTime: 20240102,
//     // //     items: [
//     // //       '你好',
//     // //       '昨天中午吃了啥'
//     // //     ]
//     // //   },
//     // // ]
//     // // 我们从中取出第0个来做演示
//     // // const items = data[0].items;
//     // // 其实现实当中, 需要全部都拿出来, 进行拼接
//     // data.forEach((el) => {
//     //   const items = el.items
//     //   list.value.push(...items)
//     // })
//     // console.log('聊天记录list', list.value)

//     // 准备转换常规消息列表
//     const arr: Message[] = []
//     data.forEach((item, i) => {
//       arr.push({
//         msgType: MsgType.Notify,
//         msg: { content: item.createTime },
//         createTime: item.createTime,
//         id: item.createTime
//       })
//       arr.push(...item.items)
//     })
//     // 追加到聊天消息列表
//     list.value.unshift(...arr)
//   })

//   // 接受消息
//   socket.on('receiveChatMsg', async (event) => {
//     list.value.push(event)
//     console.log('接受消息--->', list.value);

//     await nextTick()
//     window.scrollTo(0, document.body.scrollHeight)
//   })
// })

// // 订单状态
// const consult = ref<ConsultOrderItem>()
// onMounted(async () => {
//   const res = await getOrderDetailAPI(route.query.orderId as string)
//   console.log('订单状态', res)
//   consult.value = res.data
// })

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

</script>

<template>
  <div class="room-page">
    <cp-nav-bar title="医生问诊室" />
    <room-status :status="consult?.status" :countdown="consult?.countdown" />
    <room-message :list="list" />
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
