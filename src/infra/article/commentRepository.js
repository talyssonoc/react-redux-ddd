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

  async add(comment, { articleSlug, currentUser }) {
    const { data } = await conduitApiService.authPost(
      `articles/${articleSlug}/comments`, currentUser,
      { comment }
    );

    return this._coerceComment(data.comment);
  },

  remove(comment, { articleSlug, currentUser }) {
    return conduitApiService.authDel(
      `articles/${articleSlug}/comments/${comment.id}`,
      currentUser
    );
  },

  _coerceComment(rawComment: any) {
    return {
      ...rawComment,
      createdAt: new Date(rawComment.createdAt)
    };
  }
});
