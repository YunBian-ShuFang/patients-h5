<script setup lang="ts">
  import { getMedicalOrderLogistics } from '@/services/order'
  import type { Logistics } from '@/types/order'
  import { onMounted, ref } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  // 引入地图资源
  import AMapLoader from '@amap/amap-jsapi-loader'

  const router = useRouter()

  // 获取物流信息
  const logistics = ref<Logistics>()
  const route = useRoute()
  onMounted(async () => {
    const res = await getMedicalOrderLogistics(route.params.id as string)
    console.log('物流信息--OrderLogistics->', res)
    logistics.value = res.data

    // 高德地图
    AMapLoader.load({
      key: '183aef9cbde8dce0f8b4331ed8a03945',
      version: '2.0'
    }).then(AMap => {
      // 使用 AMap 初始化地图
      const map = new AMap.Map('map', {
        mapStyle: 'amap://styles/whitesmoke',
        zoom: 12
      })

      AMap.plugin('AMap.Driving', function () {
        const driving = new AMap.Driving({
          map: map,
          showTraffic: false,
          hideMarkers: true
        })

        if (logistics.value?.logisticsInfo && logistics.value.logisticsInfo.length >= 22) {
          const list = [...logistics.value.logisticsInfo]
          // 起点
          const start = list.shift()
          // 终点
          const end = list.pop()
          driving.search(
            [start?.longitude, start?.latitude],
            [end?.longitude, end?.latitude],
            { waypoints: list.map(item => [item.longitude, item.latitude]) },
            () => {
              // 规划完毕
            }
          )
        }
      })
    })
  })

  // 地图相关
  window._AMapSecurityConfig = {
    securityJsCode: '378746d26437d40cc5dff02b9988a486'
  }
</script>

<template>
  <div class="order-logistics-page">
    <div class="map">
      <div class="title">
        <van-icon name="arrow-left" @click="router.back()" />
        <span>{{ logistics?.statusValue }}</span>
        <van-icon name="service" />
      </div>

      <div class="current">
        <p class="status">{{ logistics?.statusValue }} 预计{{ logistics?.estimatedTime }}</p>
        <p class="predict">
          <span>{{ logistics?.name }}</span>
          <span>{{ logistics?.awbNo }}</span>
        </p>
      </div>
    </div>

    <div class="logistics">
      <p class="title">物流详情</p>
      <van-steps direction="vertical" :active="0">
        <van-step v-for="item in logistics?.list" :key="item.id">
          <p class="status">{{ item.statusValue }}</p>
          <p class="content">{{ item.content }}</p>
          <p class="time">{{ item.createTime }}</p>
        </van-step>
      </van-steps>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .order-logistics-page {
    --van-step-icon-size: 18px;
    --van-step-circle-size: 10px;
  }

  #map {
    height: 450px;
    background-color: var(--cp-bg);
    overflow: hidden;
    position: relative;

    .title {
      background-color: #fff;
      height: 46px;
      width: 355px;
      border-radius: 4px;
      display: flex;
      align-items: center;
      padding: 0 15px;
      font-size: 16px;
      position: absolute;
      left: 10px;
      top: 10px;
      box-sizing: border-box;
      box-shadow: 0px 0px 22px 0px rgba(229, 229, 229, 0.5);
      z-index: 999;

      > span {
        flex: 1;
        text-align: center;
      }

      .van-icon {
        font-size: 18px;
        color: #666;
        &:last-child {
          color: var(--cp-primary);
        }
      }
    }

    .current {
      height: 80px;
      width: 355px;
      background-color: #fff;
      border-radius: 4px;
      box-sizing: border-box;
      padding: 15px;
      position: absolute;
      left: 10px;
      bottom: 10px;
      box-shadow: 0px 0px 22px 0px rgba(229, 229, 229, 0.5);
      z-index: 999;

      .status {
        font-size: 15px;
        line-height: 26px;
      }

      .predict {
        color: var(--cp-tip);
        font-size: 13px;
        margin-top: 5px;

        > span {
          padding-right: 10px;
        }
      }
    }
  }

  .logistics {
    padding: 0 10px 20px;

    .title {
      font-size: 16px;
      padding: 15px 5px 5px;
    }

    .van-steps {
      :deep(.van-step) {
        &::after {
          display: none;
        }
      }

      .status {
        font-size: 15px;
        color: var(--cp-text3);
        margin-bottom: 4px;
      }

      .content {
        font-size: 13px;
        color: var(--cp-tip);
        margin-bottom: 4px;
      }

      .time {
        font-size: 13px;
        color: var(--cp-tag);
      }
    }
  }
</style>
