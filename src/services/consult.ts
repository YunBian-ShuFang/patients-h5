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
