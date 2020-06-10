<template>
<div>
  <app-nav></app-nav>
  <section class="container">
    <div class="column is-8 is-offset-2">
    <div class="content">
      <article class="box" v-for="post in posts">
        <h4><router-link :to="`/posts/${post.id}`">{{post.title}}</router-link></h4>
        <div class="media">
          <div class="media-left">
            <p class="image is-32x32">
              <img src="http://bulma.io/images/placeholders/128x128.png">
            </p>
          </div>
          <div class="media-content">
            <div class="content">
              <p>
                <a href="#">@{{post.author}}</a> replied 34 minutes ago &nbsp;
                <span class="tag">Question</span>
              </p>
            </div>
          </div>
          <div class="media-right">
            <span class="has-text-grey-light">1</span>
          </div>
        </div>
      </article>
    </div>
    </div>
  </section>
</div>
</template>

<script>
import appNav from '@/components/nav.vue'

export default {
  computed: {
    posts() {
      return this.$store.state.posts
    }
  },
  components: {
    appNav
  },
  created() {
    this.$store.dispatch('posts')
  }
}
</script>
