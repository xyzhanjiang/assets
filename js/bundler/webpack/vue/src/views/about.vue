<template>
<div>
  <c-nav></c-nav>
  <section class="hero is-primary">
    <div class="hero-body">
      <p class="title">关于我们</p>
      <p class="subtitle">这是关于页</p>
    </div>
  </section>
</div>
</template>

<script>
import nav from '@/components/nav.vue'

export default {
  components: {
    'c-nav': nav
  }
}
</script>
