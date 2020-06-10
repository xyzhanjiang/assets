<template>
<nav class="navbar" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item" href="https://bulma.io">
      <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28">
    </a>
    <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>
  <div id="navbarBasicExample" class="navbar-menu">
    <div class="navbar-start">
      <router-link class="navbar-item" to="/">Home</router-link>
    </div>
    <div class="navbar-end">
      <div class="navbar-item has-dropdown is-hoverable" v-if="user">
        <a class="navbar-link">{{user.name}}</a>
        <div class="navbar-dropdown">
          <a class="navbar-item">Logout</a>
        </div>
      </div>
      <div class="navbar-item" v-else>
        <div class="field is-grouped">
          <p class="control">
            <router-link class="button is-small is-info is-outlined" to="/login">
              <span>Login</span>
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</nav>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.state.user
    }
  }
}
</script>
