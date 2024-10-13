import type { CodeType } from '@/types/user'
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
