/* @flow */
import type { CommentRepository } from '../../domain/article';
import typeof * as ConduitApiService from '../conduit/conduitApiService';

type Dependencies = {
  conduitApiService: ConduitApiService
};

export default ({ conduitApiService }: Dependencies): CommentRepository => ({
  async fromArticle(slug) {
    const { data } = await conduitApiService.get(`articles/${slug}/comments`);

    return data.comments.map(this._coerceComment);
  },

  _coerceComment(rawComment: any) {
    return {
      ...rawComment,
      createdAt: new Date(rawComment.createdAt)
    };
  }
});
