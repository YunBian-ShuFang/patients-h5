import type { ConsultType, IllnessTime } from '@/enums'

// 图片列表
export type Image = {
  // 图片ID
  id: string
  // 图片地址
  url: string
}
// 问诊记录
export type Consult = {
  /* 问诊记录ID */
  id: string
  /* 问诊类型 */
  type: ConsultType
  /* 快速问诊类型， 0：普通 1：三甲 */
  illnessType: 0 | 1
  /* 科室ID */
  depId: string
  /* 疾病描述 */
  illnessDesc: string
  /* 疾病持续时间 */
  illnessTime: IllnessTime
  /* 是否就诊过，0：未就诊过，1：就诊过 */
  consultFlag: 0 | 1
  /* 图片数组 */
  pictures: Image[]
  /* 患者ID */
  patientId: string
  /* 优惠券ID */
  couponId: string
}

// 问诊记录-全部可选
export type PartialConsult = Partial<Consult>
// Required 转换为全部必须   Partial 转换问全部可选  两个内置的泛型类型

// 科室
export type SubDep = {
  /* 科室ID */
  id: string
  /* 科室名称 */
  name: string
}

export type TopDep = SubDep & {
  /* 二级科室数组 */
  child: SubDep[]
}

// 从可选问诊单中挑选出表单页面需要的四个类型，如果去多个，用联合类型
export type ConsultIllness = Pick<
  PartialConsult,
  'illnessDesc' | 'illnessTime' | 'consultFlag' | 'pictures'
>
