import CpNavBar from '@/components/CpNavBar.vue'
import CpIcon from '@/components/CpIcon.vue'

// 使用 TypeScript 的声明合并功能扩展 Vue 模块
declare module 'vue' {
  //  给 vue  添加全局组件类型，interface 和之前的合并
  interface GlobalComponents {
    // 将 CpNavBar 组件的类型添加到 GlobalComponents 接口中
    CpNavBar: typeof CpNavBar
    CpIcon: typeof CpIcon
  }
}
