import type { ConsultOrderPreParams, PartialConsult } from '@/types/consult'
import { instance } from '@/utils/request'

// 获取所有科室
export const getAllDep = () => instance({ url: '/dep/all', method: 'get' })

// 上传图片
export const uploadImage = (file: File) => {
  const fd = new FormData()
  fd.append('file', file)
  return instance({
    url: '/upload',
    method: 'post',
    data: fd
  })
}

// 问诊-支付页面-拉取预支付订单信息
export const getConsultOrderPre = (params: ConsultOrderPreParams) => {
  return instance({
    url: '/patient/consult/order/pre',
    method: 'get',
    params
  })
}

// 生成订单
export const createConsultOrder = (data: PartialConsult) => {
  return instance({
    url: '/patient/consult/order',
    method: 'post',
    data
  })
}

// 根据订单号, 生成支付参数接口
/** 请求支付地址接口的参数类型 */
export type PayUrlParams = {
  paymentMethod: 0 | 1
  orderId: string
  payCallback: string
}

// 获取支付地址   0:微信  1:支付宝
export const getConsultOrderPayUrl = (data: PayUrlParams) => {
  return instance({
    url: '/patient/consult/pay',
    method: 'post',
    data
  })
}

// 获取订单详情
export const getOrderDetailAPI = (orderID: string) => {
  return instance({
    url: '/patient/consult/order/detail',
    method: 'get',
    params: { orderID }
  })
}
