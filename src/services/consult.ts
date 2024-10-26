import { instance } from '@/utils/request'

// 获取所有科室
export const getAllDep = () => instance({ url: '/dep/all', method: 'get' })
