<template>
  <div class="article-preview">
    <div class="article-meta">
      <AuthorLink v-bind:author="article.author">
        <AuthorImage v-bind:author="article.author" />
      </AuthorLink>
      <div class="info">
        <AuthorLink v-bind:author="article.author" className="author">
          {{ article.author.username }}
        </AuthorLink>
        <span class="date">
          <FormattedDate v-bind:date="article.createdAt" />
        </span>
      </div>
      <NarrowFavoriteButton
        v-bind:article="article"
        className="pull-xs-right"
      />
    </div>
    <ArticleLink
      v-bind:article="article"
      className="preview-link"
    >
      <h1>{{ article.title }}</h1>
      <p>
        {{ article.description }}
      </p>
      <span>Read more...</span>
      <TagList
        as="ul"
        v-bind:tags="article.tagList"
        tagClassName="tag-outline"
      />
    </ArticleLink>
  </div>
</template>

<script>
  import ArticleLink from './ArticleLink';
  import NarrowFavoriteButton from './NarrowFavoriteButton';
  import AuthorLink from '../author/AuthorLink';
  import AuthorImage from '../author/AuthorImage';
  import FormattedDate from '../date/FormattedDate';
  import TagList from '../tag/TagList';

  export default {
    props: ['article'],
    components: {
      ArticleLink,
      AuthorLink,
      AuthorImage,
      FormattedDate,
      NarrowFavoriteButton,
      TagList
    }
  };
</script>
