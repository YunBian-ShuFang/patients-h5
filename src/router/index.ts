import { createRouter, createWebHistory } from 'vue-router'

// createRouter 创建路由实例，===> new VueRouter()
// history 是路由模式，hash模式，history模式
// createWebHistory() 是开启history模块   http://xxx/user
// createWebHashHistory() 是开启hash模式    http://xxx/#/user

// vite 的配置 import.meta.env.BASE_URL 是路由的基准地址，默认是 ’/‘
// https://vitejs.dev/guide/build.html#public-base-path
// 如果将来你部署的域名路径是：http://xxx/my-path/user
// vite.config.ts  添加配置  base: my-path，路由这就会加上 my-path 前缀了

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // 首页布局容器
    {
      path: '/',
      // component: () => import('@/views/Login/index.vue')
      component: () => import('@/views/Layout/index.vue'),
      redirect: '/home',
      children: [
        {
          path: '/home',
          component: () => import('@/views/Home/index.vue')
        },
        {
          path: '/article',
          component: () => import('@/views/Article/index.vue')
        },
        {
          path: '/notify',
          component: () => import('@/views/Notify/index.vue')
        },
        {
          path: '/user',
          component: () => import('@/views/User/index.vue')
        }
      ]
    },
    {
      path: '/login',
      component: () => import('@/views/Login/index.vue')
    },
    {
      path: '/user',
      component: () => import('@/views/Layout/index.vue')
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router
