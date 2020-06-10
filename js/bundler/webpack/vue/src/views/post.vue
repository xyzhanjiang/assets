<template>
<div>
  <app-nav></app-nav>
  <div class="container">
    <div class="column is-8 is-offset-2">
      <div class="card article" v-if="post">
        <div class="card-content">
          <div class="media">
            <div class="media-content has-text-centered">
              <p class="title article-title">{{post.title}}</p>
              <div class="tags has-addons level-item">
                <span class="tag is-rounded is-info">@{{post.author}}</span>
                <span class="tag is-rounded">May 10, 2018</span>
              </div>
            </div>
          </div>
          <div class="content article-body">
            <p>{{post.content}}</p>
          </div>
        </div>
      </div>
      <!-- end .article -->

      <div class="box">
        <div class="media">
          <div class="media-left">
            <p class="image is-32x32">
              <img src="http://bulma.io/images/placeholders/128x128.png">
            </p>
          </div>
          <div class="media-content">
            <div class="content">
              <p>Bulma: How do you center a button in a box?</p>
              <p>
                <a href="#">@jsmith</a> replied 34 minutes ago
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</div>
</template>

<script>
import appNav from '@/components/nav.vue'

export default {
  computed: {
    post() {
      return this.$store.state.post
    }
  },
  components: {
    appNav
  },
  created() {
    this.$store.dispatch('post', this.$route.params.id)
  }
}
</script>
