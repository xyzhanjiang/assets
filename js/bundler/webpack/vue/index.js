import './style.css'

import Vue from 'vue'
import VueRouter from 'vue-router'

import appView from './app.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: require('./index.vue').default
    },
    {
      path: '/about',
      component: require('./about.vue').default
    },
  ]
})

new Vue({
  el: '#app',
  router,
  render(h) { return h(appView) }
})
