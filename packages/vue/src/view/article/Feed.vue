<template>
  <div v-if="feed.error" class="article-preview">Error while loading articles.</div>
  <div v-else-if="feed.isLoading" class="article-preview">Loading articles...</div>
  <div v-else-if="!feed.articles.length" class="article-preview">No articles are here... yet.</div>
  <div v-else>
    <ArticlePreview
      v-for="article in feed.articles"
      v-bind:article="article"
      :key="article.slug"
    />
  </div>
</template>

<script>
  import ArticlePreview from './ArticlePreview';

  export default {
    props: ['feed'],
    components: {
      ArticlePreview
    }
  };
</script>
