// import type { User } from '@/types/user'
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
