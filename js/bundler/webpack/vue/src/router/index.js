import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('@/views/index.vue')
  },
  {
    path: '/posts/:id',
    component: () => import('@/views/post.vue')
  },
  {
    path: '/login',
    component: () => import('@/views/login.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
