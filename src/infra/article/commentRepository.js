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

  async addComment(commentBody, { articleSlug, user }) {
    const comment = {
      body: commentBody
    };

    const { data } = await conduitApiService.authPost(`articles/${articleSlug}/comments`, user, {
      comment
    });

    return this._coerceComment(data.comment);
  },

  removeComment(comment, { articleSlug, user }) {
    return conduitApiService.authDel(
      `articles/${articleSlug}/comments/${comment.id}`,
      user
    );
  },

  _coerceComment(rawComment: any) {
    return {
      ...rawComment,
      createdAt: new Date(rawComment.createdAt)
    };
  }
});
