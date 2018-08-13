/* @flow */
import type { ArticleRepository } from '../../domain/article';
import typeof * as ConduitApiService from '../conduit/conduitApiService';

type Dependencies = {
  conduitApiService: ConduitApiService
};

export default ({ conduitApiService }: Dependencies): ArticleRepository => ({
  async fromGlobalFeed() {
    const { data } = await conduitApiService.get('articles');

    return {
      ...data,
      articles: data.articles.map(this._coerceArticle)
    };
  },

 async fromUserFeed(user) {
    const { data } = await conduitApiService.authGet('articles/feed', user);

    return {
      ...data,
      articles: data.articles.map(this._coerceArticle)
    };
  },

  async fromTagFeed(tag) {
    const { data } = await conduitApiService.get('articles', {
      params: { tag }
    });

    return {
      ...data,
      articles: data.articles.map(this._coerceArticle)
    };
  },

  _coerceArticle(rawArticle: any) {
    return {
      ...rawArticle,
      createdAt: new Date(rawArticle.createdAt)
    };
  }
});
