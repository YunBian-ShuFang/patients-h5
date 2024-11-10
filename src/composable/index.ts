import { OrderType } from '@/enums'
import {
  cancelOrder,
  delOrderAPI,
  getPrescriptionPicAPI
} from '@/services/consult'
import { followOrUnfollow } from '@/services/home'
import type { ConsultOrderItem } from '@/types/consult'
import type { FollowType } from '@/types/home'
import { showFailToast, showImagePreview, showSuccessToast } from 'vant'
import { ref } from 'vue'

/* 关注功能封装 */
export const useFollow = (type: FollowType = 'doc') => {
  const loading = ref(false)
  const follow = async (item: { id: string; likeFlag: 0 | 1 }) => {
    loading.value = true
    try {
      await followOrUnfollow(item.id, type)
      item.likeFlag = item.likeFlag === 1 ? 0 : 1
    } finally {
      loading.value = false
    }
  }
  return { loading, follow }
}

/* 查看处方功能封装 */
export const useShowPrescription = () => {
  const showPrescription = async (item: ConsultOrderItem) => {
    if (item.prescriptionId) {
      const res = await getPrescriptionPicAPI(item.prescriptionId)
      showImagePreview([res.data.url])
    }
  }
  return { showPrescription }
}

/* 取消问诊订单逻辑封装 */
export const useCancelOrder = () => {
  const loading = ref(false)
  const cancelConsultOrder = async (item: ConsultOrderItem) => {
    try {
      loading.value = true
      await cancelOrder(item.id)
      item.status = OrderType.ConsultCancel
      item.statusValue = '已取消'
      showSuccessToast('取消成功')
    } catch (err) {
      showFailToast('取消失败')
    } finally {
      loading.value = false
    }
  }
  return { loading, cancelConsultOrder }
}

/* 删除问诊订单逻辑封装 */
export const useDeleteOrder = (cb: () => void) => {
  const loading = ref(false)
  const delConsultOrder = async (item: ConsultOrderItem) => {
    try {
      loading.value = true
      await delOrderAPI(item.id)
      showSuccessToast('删除成功')
      cb && cb()
    } catch (err) {
      showFailToast('删除失败')
    } finally {
      loading.value = false
    }
  }
  return { loading, delConsultOrder }
}
