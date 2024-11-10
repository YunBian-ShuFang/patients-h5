<script setup lang="ts">
import {
  createConsultOrder,
  getConsultOrderPayUrl,
  getConsultOrderPre
} from '@/services/consult'
import { getPatientDetail } from '@/services/user'
import { useConsultStore } from '@/stores'
import type { ConsultOrderPreData, PartialConsult } from '@/types/consult'
import type { Patient } from '@/types/user'
import {
  showConfirmDialog,
  showDialog,
  showLoadingToast,
  showToast
} from 'vant'
import { onMounted, ref } from 'vue'
import { onBeforeRouteLeave, useRouter } from 'vue-router'

const store = useConsultStore()

// 获取预支付信息
const payInfo = ref<ConsultOrderPreData>()
const loadData = async () => {
  console.log('consultStore', store.consult)

  const res = await getConsultOrderPre({
    type: store.consult.type,
    illnessType: store.consult.illnessType
  })
  console.log('预订单', res)
  payInfo.value = res.data
  // 设置默认的优惠券
  store.setCoupon(res.data.couponId)
}

// 获取患者信息
const patient = ref<Patient>()
const loadPatient = async () => {
  /* 
    这里的判断是因为Consult类型参数全部变为可选，导致patientId的类型为 string | undefined
    所以esLine会提示类型“string | undefined”的参数不能赋给类型“string”的参数。
    不能将类型“undefined”分配给类型“string”
  */
  if (store.consult.patientId) {
    const res = await getPatientDetail(store.consult.patientId)
    console.log('患者信息', res)
    patient.value = res.data
  }
}
// 定义 Key 类型，它是 PartialConsult 类型的所有键的联合类型
type Key = keyof PartialConsult

// 当组件挂载完成后执行的逻辑
onMounted(() => {
  // 刷新页面，数据是否丢失，否则提示
  // 定义一个有效键的数组，这些键在 store.consult 中需要存在
  const validKeys: Key[] = [
    'type',
    'illnessType',
    'depId',
    'illnessDesc',
    'illnessTime',
    'consultFlag',
    'patientId'
  ]

  // 检查 store.consult 中的每个有效键是否都有值
  const valid = validKeys.every((key) => store.consult[key] !== undefined)

  // 如果有任意一个键的值为 undefined，则显示提示对话框
  if (!valid) {
    return showDialog({
      title: '温馨提示',
      message:
        '问诊信息不完整请重新填写，如有未支付的问诊订单可在问诊记录中继续支付！',
      closeOnPopstate: false // 禁止用户通过浏览器后退按钮关闭对话框
    }).then(() => {
      // 对话框关闭后跳转到主页
      router.push('/')
    })
  }

  // 如果所有信息有效，加载数据和患者信息
  loadData()
  loadPatient()
})

// 是否同意协议的状态
const agree = ref(false)
// 控制支付方式弹窗的显示状态
const show = ref(false)
// 加载状态
const loading = ref(false)
// 储存订单 ID
const orderId = ref('')

// 提交订单的函数
const submit = async () => {
  // 如果用户没有同意支付协议，显示提示
  if (!agree.value) return showToast('请勾选我已同意支付协议')

  // 设置加载状态为 true
  loading.value = true
  // 调用创建咨询订单的 API
  const res = await createConsultOrder(store.consult)
  console.log('订单', res) // 打印订单信息
  // 将订单 ID 存储到 orderId 中
  orderId.value = res.data.id
  loading.value = false // 结束加载状态
  // 清除表单
  store.clear()
  // 打开支付方式选择的抽屉
  show.value = true
}

// 在用户尝试离开当前路由之前执行的逻辑
onBeforeRouteLeave(() => {
  // 检查 orderId 是否有值
  if (orderId.value) {
    // 如果 orderId 存在，阻止路由离开，用户留在当前页面
    return false
  }
  // 如果 orderId 不存在，则允许离开
})

// 获取路由实例
const router = useRouter()

// 关闭支付时的确认对话框
const onClose = async (): Promise<boolean> => {
  try {
    await showConfirmDialog({
      title: '关闭支付',
      message: '取消支付将无法获得医生回复，医生接诊名额有限，是否确认关闭？',
      cancelButtonText: '仍要关闭',
      confirmButtonText: '继续支付'
    })
    return false
  } catch {
    // 用户选择确认关闭，清空订单 ID 并跳转到咨询记录页面
    orderId.value = ''
    router.push('/user/consult')
    return true // 返回 true，表示关闭成功
  }
}

// 立即支付
// const payNow = async () => {
//   if (paymentMethod.value === undefined) return showToast('请选择支付方式')
//   showLoadingToast({ message: '跳转支付', duration: 0 })
//   const res = await getConsultOrderPayUrl({
//     paymentMethod: paymentMethod.value,
//     orderId: orderId.value,
//     payCallback: 'http://localhost:5173/room'
//   })
//   console.log('立即支付', res)
//   window.location.href = res.data.payUrl
// }
</script>

<template>
  <div class="consult-pay-page">
    <cp-nav-bar title="支付" />
    <!-- 费用信息 -->
    <div class="pay-info">
      <p class="title">图文问诊 {{ payInfo?.payment }} 元</p>
      <img class="img" src="@/assets/icons/avatar-doctor.svg" alt="" />
      <p class="desc">
        <span>极速问诊</span>
        <span>自动分配医生</span>
      </p>
    </div>
    <!-- 折扣 -->
    <van-cell-group>
      <van-cell
        title="优惠券"
        :value="`-¥${payInfo?.couponDeduction}`"
      ></van-cell>
      <van-cell
        title="积分抵扣"
        :value="`-¥${payInfo?.pointDeduction}`"
      ></van-cell>
      <van-cell
        title="实付款"
        :value="`¥${payInfo?.actualPayment}`"
        class="pay-price"
      ></van-cell>
    </van-cell-group>
    <div class="pay-space"></div>
    <!-- 患者信息 -->
    <van-cell-group>
      <van-cell
        title="患者信息"
        :value="`${patient?.name} | ${patient?.genderValue} | ${patient?.age}岁`"
      ></van-cell>
      <van-cell title="病情描述" :label="store.consult.illnessDesc"></van-cell>
    </van-cell-group>
    <div class="pay-schema">
      <van-checkbox v-model="agree"
        >我已同意 <span class="text">支付协议</span></van-checkbox
      >
    </div>
    <!-- 底部支付按钮 -->
    <!-- 这里默认以分为单位来储存支付数据 -->
    <van-submit-bar
      button-type="primary"
      :price="payInfo ? payInfo.actualPayment * 100 : 0"
      button-text="立即支付"
      text-align="left"
      @click="submit"
      :loading="loading"
    ></van-submit-bar>

    <!-- 支付选项 -->
    <cp-pay-sheet
      v-model:show="show"
      :order-id="orderId"
      :actual-payment="payInfo?.actualPayment ?? 0"
      :onClose="onClose"
    ></cp-pay-sheet>
    <!-- <van-action-sheet
      v-model:show="show"
      title="选择支付"
      :close-on-popstate="false"
      :closeable="false"
      @close="onClose"
    >
      <div class="pay-type">
        <p class="amount">￥{{ payInfo?.actualPayment.toFixed(2) }}</p>
        <van-cell-group>
          <van-cell title="微信支付" @click="paymentMethod = 0">
            <template #icon><cp-icon name="consult-wechat"></cp-icon></template>
            <template #extra>
              <van-checkbox :checked="paymentMethod === 0" />
            </template>
          </van-cell>
          <van-cell title="支付宝支付" @click="paymentMethod = 1">
            <template #icon><cp-icon name="consult-alipay"></cp-icon></template>
            <template #extra>
              <van-checkbox :checked="paymentMethod === 1" />
            </template>
          </van-cell>
        </van-cell-group>
        <div class="btn">
          <van-button type="primary" round block @click="payNow">
            立即支付
          </van-button>
        </div>
      </div>
    </van-action-sheet> -->
  </div>
</template>

<style lang="scss" scoped>
.consult-pay-page {
  padding: 46px 0 50px 0;
}
.pay-info {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 15px;
  .title {
    width: 100%;
    font-size: 16px;
    margin-bottom: 10px;
  }
  .img {
    width: 38px;
    height: 38px;
    margin-right: 10px;
    border-radius: 4px;
    overflow: hidden;
  }
  .desc {
    flex: 1;
    > span {
      display: block;
      color: var(--cp-tag);
      &:first-child {
        font-size: 16px;
        color: var(--cp-text2);
      }
    }
  }
}
.pay-price {
  ::v-deep() {
    .van-cell__title {
      font-size: 16px;
    }
    .van-cell__value {
      font-size: 16px;
      color: var(--cp-price);
    }
  }
}
.pay-space {
  height: 12px;
  background-color: var(--cp-bg);
}
.pay-schema {
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  .text {
    color: var(--cp-primary);
  }
}
::v-deep() {
  .van-submit-bar__button {
    font-weight: normal;
    width: 160px;
  }
}
// .pay-type {
//   .amount {
//     padding: 20px;
//     text-align: center;
//     font-size: 16px;
//     font-weight: bold;
//   }
//   .btn {
//     padding: 15px;
//   }
//   .van-cell {
//     align-items: center;
//     .cp-icon {
//       margin-right: 10px;
//       font-size: 18px;
//     }
//     .van-checkbox :deep(.van-checkbox__icon) {
//       font-size: 16px;
//     }
//   }
// }
</style>
