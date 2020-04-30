import 'normalize.css'
import './style.css'

import 'es6-promise/auto'
import axios from 'axios'
import { createApp } from 'vue'
import { createRouter, createHashHistory } from 'vue-router'

import routes from '@/js/routes'
import appView from '@/pages/app.vue'

// Vue.use(VueRouter)

const router = createRouter({
  history: createHashHistory(),
  routes
})

createApp(appView)
  .use(router)
  .mount('#app')

axios.post('/login')
