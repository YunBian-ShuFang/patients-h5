// 文章信息类型
export type Knowledge = {
  // 文章id
  id: string
  // 文章标题
  title: string
  // 封面地址 []
  coverUrl: string[]
  // 百科关联话题 标签[]
  topics: string[]
  // 标签
  topic: string
  // 收藏数量
  collectionNumber: number
  // 评论数量
  commentNumber: number
  // 创建人姓名
  creatorName: string
  // 创建人头像
  creatorAvatar: string
  // 创建人医院
  creatorHospatalName: string
  // 创建人科室
  creatorDep: string
  // 创建人职称
  creatorTitles: string
  // 是否关注 0未关注 1关注
  likeFlag: number
  // 内容详情
  content: string
  // 创建人id
  creatorId: string
}

// 文章列表
export type KnowledgeList = Knowledge[]

// 文章列表带分页
export type KnowledgePage = {
  pageTotal: number
  total: number
  rows: KnowledgeList
}

// props 类型 recommend推荐，fatReduction减脂，food健康饮食，like关注医生页面文章
export type KnowledgeType = 'like' | 'recommend' | 'fatReduction' | 'food'

// 文章列表查询参数
export type KnowledgeParams = {
  type: KnowledgeType
  current: number
  pageSize: number
}
