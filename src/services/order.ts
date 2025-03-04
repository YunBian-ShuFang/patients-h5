import { instance } from '@/utils/request'

// 查询药品订单预支付信息
export const getMedicineOrderPre = (params: { prescriptionId: string }) => {
  return instance({
    url: '/patient/medicine/order/pre',
    method: 'get',
    params
  })
}

// 获取收货地址列表
export const getAddressList = () => {
  return instance({
    url: '/patient/order/address'
  })
}

// 创建药品订单
export const createMedicineOrder = (data: { id: string; couponId?: string; addressId: string }) => {
  return instance({
    url: '/patient/medicine/order',
    method: 'post',
    data
  })
}

// 获取药品订单详情
export const getMedicineOrderDetail = (id: string) => {
  return instance({
    url: `/patient/medicine/order/detail/${id}`
  })
}

// 查询物流信息
export const getMedicalOrderLogistics = (id: string) => {
  return instance({
    url: `/patient/order/${id}/logistics`,
    method: 'get'
  })
}
