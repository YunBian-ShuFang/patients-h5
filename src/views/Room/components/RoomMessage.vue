<script setup lang="ts">
  import { MsgType, PrescriptionStatus, type IllnessTime } from '@/enums'
  import { flagOptions, timeOptions } from '@/services/constants'
  import type { Image } from '@/types/consult'
  import type { Message, Prescription } from '@/types/room'
  import { showImagePreview, showToast } from 'vant'
  import dayjs from 'dayjs'
  import { useUserStore } from '@/stores'
  import { getPrescriptionPicAPI } from '@/services/consult'

  import { useRouter } from 'vue-router'
  // 评价组件
  import EvaluateCard from './EvaluateCard.vue'

  const store = useUserStore()

  // 预览病情图片
  // const previewImg = (pictures?: Image[]) => {
  //   if (pictures && pictures.length) {
  //     showImagePreview(pictures.map(item => item.url))
  //   }
  // }
  const previewImg = (urls: string[]) => {
    if (!urls.length) return
    showImagePreview({
      images: urls,
      closeable: true,
      closeIcon: 'close',
      overlayStyle: {
        backgroundColor: 'rgba(0,0,0,0.7)'
      }
    })
  }

  defineProps<{ list: Message[] }>()

  const getIllnessTimeText = (time: IllnessTime) =>
    timeOptions.find(item => item.value === time)?.label

  const getConsultFlagText = (flag: 0 | 1) => flagOptions.find(item => item.value === flag)?.label

  // 格式化时间
  const formatTime = (time: string) => dayjs(time).format('HH:mm')

  // 查看处方
  const showPrescription = async (id?: string) => {
    if (id) {
      const res = await getPrescriptionPicAPI(id)
      console.log('查看处方--->', res)

      showImagePreview([res.data.url])
    }
  }

  // 购买药品--跳转
  const router = useRouter()
  const buy = (pre?: Prescription) => {
    if (pre) {
      if (pre.status === PrescriptionStatus.Invalid) return showToast('处方已失效')
      if (pre.status === PrescriptionStatus.NotPayment && !pre.orderId) {
        return router.push(`/order/pay?id=${pre.id}`)
      }
      router.push(`/order/${pre.orderId}`)
    }
  }
</script>

<template>
  <div v-for="{ msgType, msg, createTime, from, id, fromAvatar } in list" :key="id">
    <!-- 消息卡片组件 -->
    <!-- 病情描述 患者卡片 -->
    <div class="msg msg-illness" v-if="msgType === MsgType.CardPat">
      <div class="patient van-hairline--bottom">
        <p>
          {{ msg.consultRecord?.patientInfo.name }}
          {{ msg.consultRecord?.patientInfo.genderValue }}
          {{ msg.consultRecord?.patientInfo.age }}岁
        </p>
        <p>
          {{ getIllnessTimeText(msg.consultRecord!.illnessTime) }} |
          {{ getConsultFlagText(msg.consultRecord!.consultFlag) }}
        </p>
      </div>
      <van-row>
        <van-col span="6">病情描述</van-col>
        <van-col span="18">{{ msg.consultRecord?.illnessDesc }}</van-col>
        <van-col span="6">图片</van-col>
        <van-col
          span="18"
          @click="previewImg(msg.consultRecord?.pictures?.map(pic => pic.url) || [])"
        >
          点击查看
        </van-col>
      </van-row>
    </div>
    <!-- 通知-通用 -->
    <div class="msg msg-tip" v-if="msgType === 31">
      <div class="content">
        <span>{{ msg.content }}</span>
      </div>
    </div>
    <!-- 通知-温馨提示 -->
    <div class="msg msg-tip" v-if="msgType === MsgType.NotifyTip">
      <div class="content">
        <span class="green">温馨提示：</span>
        <span>{{ msg.content }}</span>
      </div>
    </div>
    <!-- 通知-结束 -->
    <div class="msg msg-tip msg-tip-cancel" v-if="msgType === MsgType.NotifyCancel">
      <div class="content">
        <span>{{ msg.content }}</span>
      </div>
    </div>
    <!-- 发送文字 -->
    <div class="msg msg-to" v-if="msgType === MsgType.MsgText && store.user?.id === from">
      <div class="content">
        <div class="time">{{ formatTime(createTime) }}</div>
        <div class="pao">{{ msg.content }}</div>
      </div>
      <van-image :src="store.user?.avatar" />
    </div>
    <!-- 发送图片 -->
    <div class="msg msg-to" v-if="msgType === MsgType.MsgImage && store.user?.id === from">
      <div class="content">
        <div class="time">{{ formatTime(createTime) }}</div>
        <van-image
          fit="contain"
          :src="msg.picture?.url"
          @click="previewImg(msg.picture ? [msg.picture?.url] : [])"
        />
      </div>
      <van-image :src="store.user?.avatar" />
    </div>
    <!-- 接收文字 -->
    <div class="msg msg-from" v-if="msgType === MsgType.MsgText && store.user?.id !== from">
      <van-image :src="fromAvatar" />
      <div class="content">
        <div class="time">{{ formatTime(createTime) }}</div>
        <div class="pao">{{ msg.content }}</div>
      </div>
    </div>
    <!-- 接收图片 -->
    <div class="msg msg-from" v-if="msgType === MsgType.MsgImage && store.user?.id !== from">
      <van-image :src="fromAvatar" />
      <div class="content">
        <div class="time">{{ formatTime(createTime) }}</div>
        <van-image
          fit="contain"
          :src="msg.picture?.url"
          @click="previewImg(msg.picture ? [msg.picture?.url] : [])"
        />
      </div>
    </div>
    <!-- 处方卡片 -->
    <div class="msg msg-recipe" v-if="msgType === MsgType.CardPre">
      <div class="content">
        <div class="head van-hairline--bottom">
          <div class="head-tit">
            <h3>电子处方</h3>
            <p @click="showPrescription(msg.prescription?.id)">
              原始处方
              <van-icon name="arrow"></van-icon>
            </p>
          </div>
          <p>
            {{ msg.prescription?.name }}
            {{ msg.prescription?.genderValue }}
            {{ msg.prescription?.age }}岁
            {{ msg.prescription?.diagnosis }}
          </p>
          <p>开方时间：{{ msg.prescription?.createTime }}</p>
        </div>
        <div class="body">
          <div class="body-item" v-for="med in msg.prescription?.medicines" :key="med.id">
            <div class="durg">
              <p>{{ med.name }} {{ med.specs }}</p>
              <p>{{ med.usageDosag }}</p>
            </div>
            <div class="num">x1</div>
          </div>
        </div>
        <div class="foot">
          <span @click="buy(msg.prescription)">购买药品</span>
        </div>
      </div>
    </div>
    <!-- 评价卡片 -->
    <div
      class="msg msg-comment"
      v-if="msgType === MsgType.CardEva || msgType === MsgType.CardEvaForm"
    >
      <evaluate-card :evaluateDoc="msg.evaluateDoc" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import '@/styles/room.scss';
</style>
