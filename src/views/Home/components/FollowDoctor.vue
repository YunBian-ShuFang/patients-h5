<script setup lang="ts">
import { onMounted, ref } from 'vue'
import DoctorCard from './DoctorCard.vue'
import { useWindowSize } from '@vueuse/core'
import type { DoctorList } from '@/types/home'
import { getDoctorPage } from '@/services/home'

// 响应式的页面宽度
const { width } = useWindowSize()

const list = ref<DoctorList>()
const loadData = async () => {
  const res = await getDoctorPage({ current: 1, pageSize: 5 })
  console.log('关注医生', res)
  list.value = res.data.rows
}

onMounted(() => {
  loadData()
})
</script>

<template>
  <div class="follow-doctor">
    <div class="head">
      <p class="title">推荐关注</p>
      <a href="javascript:;">
        查看更多<i class="van-icon van-icon-arrow"></i>
      </a>
    </div>
    <div class="body">
      <!-- swipe 组件 -->
      <!-- 根据比例算出当前屏幕该有的轮播宽度 -->
      <van-swipe
        :width="(150 / 375) * width"
        :show-indicators="false"
        :loop="false"
      >
        <van-swipe-item v-for="item in list" :key="item.id">
          <doctor-card :item="item"></doctor-card>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.follow-doctor {
  background-color: var(--cp-bg);
  height: 250px;
  .head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 45px;
    padding: 0 15px;
    font-size: 13px;
    > a {
      color: var(--cp-tip);
    }
  }
  .body {
    width: 100%;
    overflow: hidden;
  }
}
</style>
