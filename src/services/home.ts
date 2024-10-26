import type { FollowType, KnowledgeParams, PageParams } from '@/types/home'
import { instance } from '@/utils/request'

// 首页-查询推荐/减脂/饮食健康/关注页面--百科文章列表
export const getKnowledgePage = (params: KnowledgeParams) => {
  return instance({
    url: '/patient/home/knowledge',
    method: 'get',
    params
  })
}

// 首页-关注的医生列表
export const getDoctorPage = (params: PageParams) => {
  return instance({
    url: '/home/page/doc',
    method: 'get',
    params
  })
}

// 关注-关注操作
export const followOrUnfollow = (id: string, type: FollowType = 'doc') => {
  return instance({
    url: '/like',
    method: 'post',
    data: { id, type }
  })
}
