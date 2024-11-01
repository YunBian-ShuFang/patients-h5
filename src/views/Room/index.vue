<script setup lang="ts">
// 组件
import RoomStatus from './components/RoomStatus.vue'
import RoomAction from './components/RoomAction.vue'
import RoomMessage from './components/RoomMessage.vue'
// 聊天相关
import { useUserStore } from '@/stores'
import { useRoute } from 'vue-router'
import { io, type Socket } from 'socket.io-client'
import { onMounted, onUnmounted, ref } from 'vue'
import { baseURL } from '@/utils/request'
import type { Message, TimeMessage } from '@/types/room'
import { MsgType } from '@/enums'
const store = useUserStore()
const route = useRoute()

let socket: Socket
onUnmounted(() => {
  socket.close()
})

onMounted(async () => {
  // 建立链接，创建 socket.io 实例
  socket = io(baseURL, {
    auth: {
      token: `Bearer ${store.user?.token}`
    },
    query: {
      orderID: route.query.orderID
    }
  })

  socket.on('connect', () => {
    // 建立连接成功
    console.log('connect')
  })

  socket.on('error', () => {
    // 错误异常消息
    console.log('error')
  })

  socket.on('disconnect', () => {
    // 已经断开连接
    console.log('disconnect')
  })
})

// 接收别人的消息
// chatMsgList 接收聊天记录
const list = ref<Message[]>([])
// 聊天记录
onMounted(async () => {
  socket.on('chatMsgList', ({ data }: { data: TimeMessage[] }) => {
    console.log('聊天记录', data)
    // 这个data是多个时间消息小组对象所组成的数组
    // data = [
    //   // 这里是各个时间快的对象
    //   {
    //     createTime: 20240101,
    //     items: [
    //       '你好',
    //       '中午吃啥'
    //     ]
    //   },
    //   {
    //     createTime: 20240102,
    //     items: [
    //       '你好',
    //       '昨天中午吃了啥'
    //     ]
    //   },
    // ]
    // 我们从中取出第0个来做演示
    // const items = data[0].items;
    // 其实现实当中, 需要全部都拿出来, 进行拼接
    data.forEach((el) => {
      const items = el.items
      list.value.push(...items)
    })
    console.log('聊天记录list', list.value)

    // 准备转换常规消息列表
    // const arr: Message[] = []
    // data.forEach((item, i) => {
    //   arr.push({
    //     msgType: MsgType.Notify,
    //     msg: { content: item.createTime },
    //     createTime: item.createTime,
    //     id: item.createTime
    //   })
    //   arr.push(...item.items)
    // })
    // // 追加到聊天消息列表
    // list.value.unshift(...arr)
  })
})
</script>

<template>
  <div class="room-page">
    <cp-nav-bar title="医生问诊室" />
    <room-status />
    <room-message :list="list" />
    <room-action />
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
