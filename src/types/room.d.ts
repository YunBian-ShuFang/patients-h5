import type { MsgType, PrescriptionStatus } from '@/enums'
import type { Consult, Image } from './consult'
import type { Patient } from './user'

// 处方药品信息
export type Medical = {
  /* 药品ID */
  id: string
  /* 药品名称 */
  name: string
  /* 金额 */
  amount: string
  /* 药品图片 */
  avatar: string
  /* 规格信息 */
  specs: string
  /* 用法用量 */
  usageDosag: string
  /* 药品数量 */
  quantity: string
  /* 是否处方， 0：不是，1：是 */
  prescriptionFlag: 0 | 1
}

// 处方信息
export type Prescription = {
  /* 处方ID */
  id: string
  /* 药品订单ID */
  orderId: string
  /* 创建时间 */
  createTime: string
  /* 患者名称 */
  name: string
  /* 问诊记录ID */
  recordId: string
  /* 性别 0：女，1：男 */
  gender: 0 | 1
  /* 性别文字 */
  genderValue: ''
  /* 年龄 */
  age: number
  /* 诊断信息 */
  diagnosis: string
  /* 处方状态 */
  status: PrescriptionStatus
  /* 药品清单 */
  medicines: Medical[]
}

// 评价医生
export type EvaluateDoc = {
  /* 评价主键 */
  id?: string
  /* 评价分数 */
  score?: number
  /* 评价内容 */
  content?: string
  /* 评价时间 */
  createTime?: string
  /* 评价人 */
  creator?: string
}

// 接收对话信息
export type Message = {
  /* 消息ID */
  id: string
  /* 消息类型 */
  msgType: MsgType
  /* 发信人 */
  from?: string
  /* 发信人头像 */
  fromAvatar?: string
  /* 收信人 */
  to?: string
  /* 收信人头像 */
  tiAvatar?: string
  /* 创建时间 */
  createTime: string
  /* 消息主题 */
  msg: {
    /* 文本类型内容 */
    content?: string
    /* 图片对象 */
    picture: Image
    /* 问诊记录，患者信息 */
    consultRecord?: Consult & {
      patientInfo: Patient
    }
    /* 处方信息 */
    prescription?: Prescription
    /* 评价信息 */
    evaluateDoc?: EvaluateDoc
  }
}

// 消息分组列表
export type TimeMessage = {
  /* 分组消息最早时间 */
  createTime: string
  /* 消息数组 */
  items: Message[]
  /* 订单ID */
  orderID: string
  /* 会话ID */
  sid: string
}
