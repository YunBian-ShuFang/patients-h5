import type { CodeType, Patient } from '@/types/user'
import { request, instance } from '@/utils/request'

// 密码登陆
export const loginByPassword = (mobile: string, password: string) => {
  // request<User>('/login/password', 'POST', { mobile, password })
  return instance({
    url: '/login/password',
    method: 'post',
    data: { mobile, password }
  })
}

// 发送验证码
export const sendMobileCode = (mobile: string, type: CodeType) => {
  return instance({
    url: '/code',
    method: 'get',
    params: { mobile, type }
  })
}

// 验证码登陆
export const loginByMobile = (mobile: string, code: string) => {
  return instance({
    url: '/login',
    method: 'post',
    data: { mobile, code }
  })
}

// 获取个人用户信息
export const getUserInfo = () => {
  return instance({
    url: '/patient/myUser'
  })
}

// 获取家庭患者信息列表
export const getPatientList = () => {
  return instance({ url: '/patient/mylist' })
}

// 家庭患者 -- 添加患者
export const addPatient = (patient: Patient) => {
  return instance({
    url: '/patient/add',
    method: 'post',
    data: patient
  })
}

// 家庭患者 -- 编辑患者
export const editPatient = (patient: Patient) => {
  return instance({
    url: '/patient/update',
    method: 'put',
    data: patient
  })
}

// 家庭患者 -- 删除患者信息
export const delPatient = (id: string) => {
  return instance({
    url: `/patient/del/${id}`,
    method: 'delete'
  })
}

// 查询患者详情
export const getPatientDetail = (id: string) => {
  return instance({
    url: `/patient/info/${id}`,
    method: 'get'
  })
}
