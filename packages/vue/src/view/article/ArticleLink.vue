<template>
  <a v-bind:href="articleUrl" v-bind:class="className">
    <slot />
  </a>
</template>

<script>
  export default {
    props: ['article', 'className'],
    computed: {
      articleUrl() {
        return `/article/${this.article.slug}`;
      }
    }
  };
</script>
