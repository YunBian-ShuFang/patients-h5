<script setup lang="ts">
  import { createMedicineOrder, getAddressList, getMedicineOrderPre } from '@/services/order'
  import type { AddressItem, OrderPre } from '@/types/order'
  import { onMounted, ref } from 'vue'
  import { useRoute } from 'vue-router'
  // 支付抽屉组件
  import CpPaySheet from '@/components/CpPaySheet.vue'
  import { showToast } from 'vant'

  const route = useRoute()
  // 预支付信息
  const orderPer = ref<OrderPre>()
  const loadOrderPer = async () => {
    const res = await getMedicineOrderPre({
      prescriptionId: route.query.id as string
    })
    orderPer.value = res.data
  }

  // 收货地址
  const address = ref<AddressItem>()
  const loadAddress = async () => {
    const addRes = await getAddressList()
    if (addRes.data.length) {
      const defAddress = addRes.data.find((item: any) => item.isDefault === 0)
      if (defAddress) address.value = defAddress
      else address.value = addRes.data[0]
    }
  }

  onMounted(() => {
    loadOrderPer()
    loadAddress()
  })

  // 生成订单
  const agree = ref(false)
  const loading = ref(false)
  const orderId = ref('')
  const submit = async () => {
    if (!agree.value) return showToast('请同意支付协议')
    if (!address.value?.id) return showToast('请选择收货地址')
    if (!orderPer.value?.id) return showToast('未找到处方')
    // 没有生成订单ID
    if (!orderId.value) {
      try {
        loading.value = true
        const res = await createMedicineOrder({
          id: orderPer.value?.id,
          addressId: address.value?.id,
          couponId: orderPer.value.couponId
        })
        console.log('生成药品订单--orderPay--->', res)

        orderId.value = res.data.id
        loading.value = false
        // 打开支付抽屉
        show.value = true
      } catch (error) {
        loading.value = false
      }
    } else {
      show.value = true
    }
  }
  // 控制抽屉和弹窗
  const show = ref(false)
</script>

<template>
  <div class="order-pay-page" v-if="orderPer && address">
    <cp-nav-bar title="支付药款" />
    <div class="order-address">
      <p class="area">
        <van-icon name="location"></van-icon>
        <span>{{ address.province + address.city + address.county }}</span>
      </p>
      <p class="detail">{{ address.addressDetail }}</p>
      <p>
        {{ address.receiver }}
        {{ address.mobile.replace(/^(d{3})\d+(\d{4})$/, '\$1****\$2') }}
      </p>
    </div>
    <div class="order-medical">
      <div class="header">
        <h3>优医药房</h3>
        <small>优医质保 假一赔十</small>
      </div>
      <div class="item van-hairline--top" v-for="med in orderPer.medicines" :key="med.id">
        <img class="img" :src="med.avatar" alt="" />
        <div class="info">
          <p class="name">
            <span>{{ med.name }}</span>
            <span>x{{ med.quantity }}</span>
          </p>
          <p class="size">
            <van-tag v-if="med.prescriptionFlag === 1">处方药</van-tag>
            <span>{{ med.specs }}</span>
          </p>
          <p class="price">￥{{ med.amount }}</p>
        </div>
        <div class="desc">{{ med.usageDosag }}</div>
      </div>
    </div>
    <div class="order-detail">
      <van-cell-group>
        <van-cell title="药品金额" :value="`￥${orderPer.payment}`"></van-cell>
        <van-cell title="运费" :value="`￥${orderPer.expressFee}`"></van-cell>
        <van-cell title="优惠券" :value="-`￥${orderPer.couponDeduction}`"></van-cell>
        <van-cell title="实付款" :value="`￥${orderPer.actualPayment}`"></van-cell>
      </van-cell-group>
    </div>
    <div class="order-tip">
      <p class="tip">
        由于药品的特殊性，如非错发、漏发药品的情况，药品一经发出
        不得退换，请核对药品信息无误后下单。
      </p>
      <van-checkbox>
        我已同意
        <a href="javascript">支付协议</a>
      </van-checkbox>
    </div>
    <van-submit-bar
      :price="orderPer.actualPayment * 100"
      button-text="立即支付"
      button-type="primary"
      text-align="left"
    ></van-submit-bar>
  </div>

  <dive class="order-pay-page" v-else>
    <cp-nav-bar title="支付药款" />
    <van-skeleton title avatar row="2" style="margin-top: 15px" />
    <van-skeleton title row="4" style="margin-top: 50px" />
    <van-skeleton title row="4" style="margin-top: 50px" />
  </dive>

  <cp-pay-sheet
    v-model:show="show"
    :orderId="orderId"
    :actualPayment="orderPer?.actualPayment ?? 0"
    pay-callback="/order/pay/result"
  />
</template>

<style lang="scss" scoped>
  :deep(.van-nav-bar) {
    background-color: var(--cp-primary);
    .van-nav-bar__arrow,
    .van-nav-bar__title {
      color: #fff;
    }
  }

  :deep(.van-cell) {
    .van-cell__title {
      font-size: 16px;
    }
    .van-cell-value {
      font-size: 16px;
    }
    &.price {
      .van-cell__value {
        font-size: 18px;
        color: var(--cp-price);
      }
    }
  }

  :deep(.van-submit-bar) {
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
    .van-button {
      width: 200px;
    }
  }

  .order-pay-page {
    padding: 26px 0 65px;
  }

  .order-address {
    padding: 15px 15px 0 15px;
    background-color: #fff;
    font-size: 13px;
    .area {
      color: var(--cp-tag);
      margin-bottom: 5px;
      .van-icon-location {
        color: #ff7702;
        font-size: 14px;
      }
    }
    .detail {
      font-size: 17px;
      margin-bottom: 5px;
    }
    &::after {
      content: '';
      display: block;
      height: 12px;
      background-color: var(--cp-bg);
      margin: 0 -15px;
      margin-top: 15px;
    }
  }

  .order-medical {
    background-color: #fff;
    padding: 0 15px;
    .head {
      display: flex;
      height: 54px;
      align-items: center;
      > h3 {
        font-size: 16px;
        font-weight: normal;
      }
      > small {
        font-size: 13px;
        color: var(--cp-tag);
        margin-left: 10px;
      }
    }
    .item {
      display: flex;
      flex-wrap: wrap;
      padding: 15px 0;
      .img {
        width: 80px;
        height: 70px;
        border-radius: 2px;
        overflow: hidden;
      }
      .info {
        padding-left: 15px;
        width: 250px;
        .name {
          display: flex;
          font-size: 15px;
          margin-bottom: 5px;
          > span:first-child {
            width: 200px;
          }
          > span:last-child {
            width: 50px;
            text-align: right;
          }
        }
        .size {
          margin-bottom: 5px;
          .van-tag {
            background-color: var(--cp-primary);
            vertical-align: middle;
          }
          span:not(.van-tag) {
            margin-left: 10px;
            color: var(--cp-tag);
            vertical-align: middle;
          }
        }
        .price {
          font-size: 16px;
          color: #eb5757;
        }
      }
      .desc {
        width: 100%;
        background-color: var(--cp-bg);
        border-radius: 4px;
        margin-top: 10px;
        padding: 4px 10px;
        color: var(--cp-tip);
      }
    }
  }

  .order-tip {
    padding: 0 15px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 10px;
    .tip {
      font-size: 12px;
      color: var(--cp-tip);
      width: 100%;
      &::before {
        content: '*';
        color: var(--cp-price);
        font-size: 14px;
      }
      margin-bottom: 30px;
    }
    .van-checkbox {
      a {
        color: var(--cp-primary);
      }
    }
  }
</style>
