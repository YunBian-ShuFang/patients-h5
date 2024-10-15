// 用户信息
export type User = {
  /* token 令牌 */
  token: string
  /* 用户 ID */
  id: string
  /* 用户名称 */
  account: string
  /* 手机号 */
  mobile: number
  /* 头像 */
  avatar: string
}

// 短信验证码类型，登录|注册|修改手机号|忘记密码|绑定手机号
export type CodeType =
  | 'login'
  | 'register'
  | 'changeMobile'
  | 'forgetPassword'
  | 'bindMobile'

// 个人信息
/* 扩展 
  Pink 用于从一个类型中选择特定的属性，创建一个新类型。语法如下：
  Pink<T, K>
  T是要选择属性的类型
  K是要从T中选择的属性键的联合类型

  Omit 用于从一个类型中排除特定的属性，创建一个新类型。语法如下：
  Omit<T, K>
  T是要排除属性的类型
  K是要从T中排除的属性键的联合类型
*/
type OmitUser = Omit<User, 'token'>
export type UserInfo = OmitUser & {
  // 关注数量
  likeNumber: number
  // 收藏数量
  collectionNumber: number
  // 我的总积分
  score: number
  // 我的优惠券数量
  couponNumber: number
  orderInfo: {
    // 待付款
    paidNumber: number
    // 待发货
    receivedNumber: number
    // 待收货
    shippedNumber: number
    // 已完成
    finishedNumber: number
  }
}

// 家庭档案 -- 患者信息
export type Patient = {
  // 患者名称
  name: string
  // 患者身份证
  idCard: string
  // 是否设置为默认患者 0不是默认 1是默认患者
  defaultFlag: number
  // 性别 1男 0女
  gender: number
  // 性别值
  genderValue?: string
  // 年龄
  age?: number
  id?: string
}

// 家庭档案 -- 患者信息列表
export type PatientList = Patient[]
