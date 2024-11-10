import CpNavBar from '@/components/CpNavBar.vue'
import CpIcon from '@/components/CpIcon.vue'
import type CpRadioBtn from '@/components/CpRadioBtn.vue'
import type CpPaySheet from '@/components/CpPaySheet.vue'

// 使用 TypeScript 的声明合并功能扩展 Vue 模块
declare module 'vue' {
  //  给 vue  添加全局组件类型，interface 和之前的合并
  interface GlobalComponents {
    // 将 CpNavBar 组件的类型添加到 GlobalComponents 接口中
    /* 导航栏组件 */
    CpNavBar: typeof CpNavBar
    /* icon组件 */
    CpIcon: typeof CpIcon
    /* 单选框组件 */
    CpRadioBtn: typeof CpRadioBtn
    /* 支付弹窗组件 */
    CpPaySheet: typeof CpPaySheet
  }
}
