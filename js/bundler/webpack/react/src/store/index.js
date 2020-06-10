import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    posts: [],
    post: null
  },
  mutations: {
    user(state, user) {
      state.user = user
    },
    posts(state, posts) {
      state.posts.splice(0)
      state.posts.push(...posts)
    },
    post(state, post) {
      state.post = post
    }
  },
  actions: {
    login({ commit }, user) {
      return axios.post('/login', user).then(({data}) => {
        commit('user', {
          name: user.name,
          token: data.token
        })
      })
    },
    posts({ commit }) {
      return axios.get('/api/posts').then(({data}) => {
        commit('posts', data)
      })
    },
    post({ commit }, id) {
      return axios.get(`/api/posts/${id}`).then(({data}) => {
        commit('post', data)
      })
    }
  }
})
