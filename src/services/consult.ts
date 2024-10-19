import type { KnowledgeParams } from '@/types/consult'
import { instance } from '@/utils/request'

// 首页-查询推荐/减脂/饮食健康/关注页面--百科文章列表
export const getKnowledgePage = (params: KnowledgeParams) => {
  return instance({
    url: '/patient/home/knowledge',
    method: 'get',
    params
  })
}
