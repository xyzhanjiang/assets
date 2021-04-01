import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "m" */'@/views/index.vue')
  },
  {
    path: '/posts/:id',
    component: () => import(/* webpackChunkName: "m" */'@/views/post.vue')
  },
  {
    path: '/login',
    component: () => import(/* webpackChunkName: "m" */'@/views/login.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
