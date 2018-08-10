/* @flow */
import type { User } from '../../domain/user';
import type { Feed, Article, ArticleRepository } from '../../domain/article';
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

  _coerceArticle(rawArticle: any) {
    return {
      ...rawArticle,
      createdAt: new Date(rawArticle.createdAt)
    };
  }
});
