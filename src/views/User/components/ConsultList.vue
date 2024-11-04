<script setup lang="ts">
import { ref } from 'vue'
import ConsultItem from './ConsultItem.vue'
import type { ConsultType } from '@/enums'
import type {
  ConsultOrderDetailParams,
  ConsultOrderItem
} from '@/types/consult'
import { getConsultOrderList } from '@/services/consult'

// 问诊类型
const props = defineProps<{ type: ConsultType }>()
// 分页参数
const params = ref<ConsultOrderDetailParams>({
  type: props.type,
  current: 1,
  pageSize: 5
})
// 获取订单列表
const loading = ref(false)
const finished = ref(false)
const list = ref<ConsultOrderItem[]>([])
const onLoad = async () => {
  loading.value = true
  try {
    const res = await getConsultOrderList(params.value)
    console.log('问诊记录订单列表', res)
    list.value.push(...res.data.rows)
    if (params.value.current < res.data.pageTotal) {
      params.value.current++
    } else {
      finished.value = true
    }
  } finally {
    loading.value = false
  }
}

// 过滤已删除的订单
const onDelete = (id: string) => {
  list.value = list.value.filter((item) => item.id !== id)
  if (!list.value.length) onLoad()
}
</script>

<template>
  <div class="consult-list">
    <van-list
      :loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <consult-item
        v-for="item in list"
        :key="item.id"
        :item="item"
        @on-delete="onDelete"
      ></consult-item>
    </van-list>
  </div>
</template>

<style lang="scss" scoped>
.consult-list {
  padding: 10px 15px;
}
</style>
