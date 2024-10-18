import router from '@/router'
import { useUserStore } from '@/stores'
import axios, { AxiosError, type Method } from 'axios'
import { showToast } from 'vant'

export const baseURL = 'https://consult-api.itheima.net/'
// 创建 axios 实例，基础配置
const instance = axios.create({
  baseURL,
  timeout: 10000
})

// 请求拦截器，携带token
instance.interceptors.request.use(
  (config) => {
    const store = useUserStore()
    if (store.user?.token && config.headers) {
      config.headers['Authorization'] = `Bearer ${store.user?.token}`
    }
    return config
  },
  (err) => Promise.reject(err)
)

// 响应拦截器，剥离无效数据，401拦截
instance.interceptors.response.use(
  (res) => {
    // 后台约定，响应成功，但是 code 不是10000，是业务逻辑失败
    if (res.data?.code !== 10000) {
      showToast(res.data?.message || '业务失败')
      return Promise.reject(res.data)
    }
    // 业务逻辑成功，返回响应数据，作为 axios 成功的结果
    return res.data
  },
  (err) => {
    console.log('err', err)

    if (err.response?.status === 401) {
      // 删除用户信息
      const store = useUserStore()
      store.delUser()
      // 跳转登陆，带上接口失败所在页面的地址，登陆完成后回跳使用
      router.push({
        path: '/login',
        query: { returnUrl: router.currentRoute.value.fullPath }
      })
    }
    return Promise.reject(err)
  }
)

type Data<T> = {
  code: number
  message: string
  data: T
}
// 请求工具函数
const request = <T>(
  url: string,
  method: Method = 'get',
  submitData?: object
) => {
  return instance.request<T, Data<T>>({
    url,
    method,
    [method.toUpperCase() === 'get' ? 'params' : 'data']: submitData
  })
}

export { instance, request }
