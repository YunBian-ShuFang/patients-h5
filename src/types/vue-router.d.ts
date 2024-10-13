import 'vue-router'

declare module 'vue-router' {
  // 扩展 元信息类型
  interface RouterMeta {
    // 标题
    title?: string
  }
}
