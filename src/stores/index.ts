import { createPinia } from 'pinia'
// 导入 pinia 持久化插件 -- pnpm i pinia-plugin-persistedstate
import persist from 'pinia-plugin-persistedstate'

// 创建 pinia 实例
const pinia = createPinia()
// 使用 pinia 插件
pinia.use(persist)
// 到处 pinia 实例，给 main 使用
export default pinia
// 统一导出
export * from './modules/user'
