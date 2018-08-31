<template>
  <button
    v-bind:class="['btn', 'btn-sm', className, {
      'btn-primary': article.favorited,
      'btn-outline-primary': !article.favorited
    }]"
  >
    <i class="ion-heart"></i> {{ article.favoritesCount }}
  </button>
</template>

<script>
  export default {
    props: ['article', 'className']
  };
</script>
