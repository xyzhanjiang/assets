<template>
<div>
  <app-nav></app-nav>
  <div class="container">
    <div class="column is-4 is-offset-4">
      <div class="card">
        <div class="card-content content">
          <form @submit.prevent="login" action="#" method="post">
            <h2>Login</h2>
            <div class="field">
              <label class="label">Name</label>
              <div class="control">
                <input class="input" type="text" placeholder="Name" v-model="name">
              </div>
            </div>
            <div class="field">
              <label class="label">Password</label>
              <div class="control">
                <input class="input" type="password" placeholder="Password" v-model="password">
              </div>
            </div>
            <div class="field">
              <div class="control">
                <button class="button is-link" type="submit">Login</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import appNav from '@/components/nav.vue'

export default {
  data() {
    return {
      name: '',
      password: ''
    }
  },
  components: { appNav },
  methods: {
    login() {
      this.$store.dispatch('login', {
        name: this.name,
        password: this.password
      }).then(() => {
        this.$router.push('/')
      })
    }
  }
}
</script>