<template>
  <img
    v-if="author.image"
    v-bind:src="author.image"
    v-bind:alt="author.username"
  />
</template>

<script>
  export default {
    props: ['author']
  };
</script>
