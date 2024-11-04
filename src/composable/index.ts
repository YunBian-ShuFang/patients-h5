import { getPrescriptionPicAPI } from '@/services/consult'
import { followOrUnfollow } from '@/services/home'
import type { FollowType } from '@/types/home'
import { showImagePreview } from 'vant'
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
  const onShowPrescription = async (id?: string) => {
    if (id) {
      const res = await getPrescriptionPicAPI(id)
      showImagePreview([res.data.url])
    }
  }
  return { onShowPrescription }
}
