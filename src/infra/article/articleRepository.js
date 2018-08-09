export default ({ conduitApiService }) => ({
  async fromGlobalFeed() {
    const { data } = await conduitApiService.get('articles');

    return {
      ...data,
      articles: data.articles.map(this._coerceArticle)
    };
  },

 async fromUserFeed(user) {
    const { data } = await conduitApiService.get('articles/feed', {
      headers: {
        Authorization: `Token ${user.token}`
      }
    });

    return {
      ...data,
      articles: data.articles.map(this._coerceArticle)
    };
  },

  _coerceArticle(rawArticle) {
    return {
      ...rawArticle,
      createdAt: new Date(rawArticle.createdAt)
    };
  }
});
