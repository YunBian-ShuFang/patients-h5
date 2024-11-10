<script setup lang="ts">
import {
  useCancelOrder,
  useDeleteOrder,
  useShowPrescription
} from '@/composable'
import { OrderType } from '@/enums'
import type { ConsultOrderItem } from '@/types/consult'
import { useRouter } from 'vue-router'
import ConsultMore from './ConsultMore.vue'

// 取消问诊订单逻辑
const { loading, cancelConsultOrder } = useCancelOrder()

// 删除问诊订单逻辑
const { loading: delLoading, delConsultOrder } = useDeleteOrder(() => {
  emit('on-delete', props.item.id)
})

// 查看处方
const { showPrescription } = useShowPrescription()

const props = defineProps<{ item: ConsultOrderItem }>()

// 列表操作按钮
// const showPopover = ref(false)
// const actions = computed(() => [
//   { text: '查看处方', disabled: !props.item.prescriptionId },
//   { text: '删除订单' }
// ])
// const onSelect = (action: { text: string }, i: number) => {
//   // 查看处方
//   if (i === 0) {
//     onShowPrescription(props.item.prescriptionId)
//   }
//   // 删除
//   if (i === 1) {
//     delConsultOrder(props.item)
//   }
// }

// 取消订单
// const loading = ref(false)
// const cancelConsultOrder = async (item: ConsultOrderItem) => {
//   loading.value = true
//   try {
//     await cancelOrder(item.id)
//     item.status = OrderType.ConsultCancel
//     item.statusValue = '已取消'
//     showSuccessToast('取消成功')
//   } catch (err) {
//     showFailToast('取消失败')
//   } finally {
//     loading.value = false
//   }
// }

const emit = defineEmits<{ (e: 'on-delete', id: string): void }>()
// 删除订单
// const delLoading = ref(false)
// const delConsultOrder = async (item: ConsultOrderItem) => {
//   delLoading.value = true
//   try {
//     await delOrderAPI(item.id)
//     showSuccessToast('删除成功')
//     emit('on-delete', item.id)
//   } catch (err) {
//     showFailToast('删除失败')
//   } finally {
//     delLoading.value = false
//   }
// }

// 跳转问诊详情
const router = useRouter()
const toDetail = (id: string) => {
  router.push(`/user/consult/${id}`)
}
</script>

<template>
  <div class="consult-item">
    <div class="head van-hairline--bottom">
      <img class="img" src="@/assets/icons/avatar-doctor.svg" alt="" />
      <p>{{ item.docInfo?.name || '暂未分配医生' }}</p>
      <span
        :class="{
          orange: item.status === OrderType.ConsultPay,
          green: item.status === OrderType.ConsultChat
        }"
        >{{ item.statusValue }}</span
      >
    </div>
    <div class="body" @click="toDetail(item.id)">
      <div class="body-row">
        <div class="body-label">病情描述</div>
        <div class="body-value">{{ item.illnessDesc }}</div>
      </div>
      <div class="body-row">
        <div class="body-label">价格</div>
        <div class="body-value">¥ {{ item.payment.toFixed(2) }}</div>
      </div>
      <div class="body-row">
        <div class="body-label">创建时间</div>
        <div class="body-value">{{ item.createTime }}</div>
      </div>
    </div>
    <div class="foot" v-if="item.status === OrderType.ConsultPay">
      <van-button
        class="gray"
        plain
        size="small"
        round
        :loading="loading"
        @click="cancelConsultOrder(item)"
        >取消问诊</van-button
      >
      <van-button
        type="primary"
        plain
        size="small"
        round
        :to="`/user/consult/${item.id}`"
      >
        去支付
      </van-button>
    </div>
    <div class="foot" v-if="item.status === OrderType.ConsultWait">
      <van-button
        class="gray"
        plain
        size="small"
        round
        :loading="loading"
        @click="cancelConsultOrder(item)"
        >取消问诊</van-button
      >
      <van-button
        type="primary"
        plain
        size="small"
        round
        :to="`/room/orderId=${item.id}`"
      >
        继续沟通
      </van-button>
    </div>
    <div class="foot" v-if="item.status === OrderType.ConsultChat">
      <van-button
        v-if="item.prescriptionId"
        class="gray"
        plain
        size="small"
        round
        @click="showPrescription(item)"
      >
        查看处方</van-button
      >
      <van-button
        type="primary"
        plain
        size="small"
        round
        :to="`/room/orderId=${item.id}`"
      >
        继续沟通
      </van-button>
    </div>
    <div class="foot" v-if="item.status === OrderType.ConsultComplete">
      <consult-more
        :disabled="!props.item.prescriptionId"
        @on-delete="delConsultOrder(item)"
        @on-preview="showPrescription(item)"
      ></consult-more>
      <!-- <div class="more">
        <van-popover
          placement="top-start"
          v-model:show="showPopover"
          :actions="actions"
          @select="onSelect"
        >
          <template #reference>更多</template>
        </van-popover>
      </div> -->
      <van-button
        class="gray"
        plain
        size="small"
        round
        :to="`/room/orderId=${item.id}`"
        >问诊记录</van-button
      >
      <van-button
        v-if="!item.evaluateId"
        type="primary"
        plain
        size="small"
        round
        to="/"
      >
        去评价
      </van-button>
      <van-button class="gray" plain size="small" round v-else>
        查看评价
      </van-button>
    </div>
    <div class="foot" v-if="item.status === OrderType.ConsultCancel">
      <van-button
        class="gray"
        plain
        size="small"
        round
        :loading="delLoading"
        @click="delConsultOrder(item!)"
        >删除订单</van-button
      >
      <van-button type="primary" plain size="small" round to="/">
        咨询其他医生
      </van-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.consult-item {
  margin-bottom: 10px;
  border-radius: 4px;
  box-shadow: 0px 0px 22px 0px rgba(245, 245, 245, 0.1);
  background-color: #fff;
  .head {
    display: flex;
    align-items: center;
    height: 50px;
    padding: 0 15px;
    .img {
      width: 20px;
      height: 20px;
    }
    > p {
      flex: 1;
      font-size: 15px;
      padding-left: 10px;
    }
    > span {
      color: var(--cp-tag);
      &.orange {
        color: #f2994a;
      }
      &.green {
        color: var(--cp-primary);
      }
    }
  }
  .body {
    padding: 15px 15px 8px 15px;
    .body-row {
      display: flex;
      margin-bottom: 7px;
    }
    .body-label {
      width: 62px;
      font-size: 13px;
      color: var(--cp-tip);
    }
    .body-value {
      width: 250px;
      &.tip {
        color: var(--cp-tip);
      }
    }
  }
  .foot {
    padding: 0 15px 15px 15px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .van-button {
      margin-left: 10px;
      padding: 0 16px;
      &.gray {
        color: var(--cp-text3);
        background-color: var(--cp-bg);
      }
    }
    .more {
      color: var(--cp-tag);
      flex: 1;
      font-size: 13px;
    }
  }
}
</style>
