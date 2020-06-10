import 'bulma/css/bulma.css'
import '@/css/style.css'

import 'es6-promise/auto'
import axios from 'axios'
import Vue from 'vue'

import router from '@/router'
import store from '@/store'
import appView from '@/app.vue'

new Vue({
  router,
  store,
  render(h) { return h(appView) }
}).$mount('#app')
