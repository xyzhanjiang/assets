import './style.css'

import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from '@/js/routes'
import appView from '@/pages/app.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes
})

new Vue({
  el: '#app',
  router,
  render(h) { return h(appView) }
})
