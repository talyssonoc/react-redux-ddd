<template>
  <a v-bind:href="authorUrl" v-bind:class="className">
    <slot />
  </a>
</template>

<script>
  export default {
    props: ['author', 'className'],
    computed: {
      authorUrl() {
        return `@${this.author.username}`;
      }
    }
  };
</script>
