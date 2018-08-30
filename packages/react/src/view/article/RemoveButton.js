/* @ flow */
import React from 'react';
import { connect } from 'react-redux';
import { type Article } from '@rw-ddd/core/domain/article';
import { article } from '../../state/article';

type Props = {
  article: Article,
  isRemoving: bool,
  removeArticle: typeof article.removeArticle
};

const RemoveButton = ({ article, removeArticle, isRemoving }: Props) => (
  <button
    disabled={ isRemoving }
    onClick={ () => removeArticle(article) }
    className="btn btn-sm btn-outline-danger"
  >
    <i className="ion-trash-a"></i>
    &nbsp;
    Delete Article
  </button>
);

const mapDispatchToProps = {
  removeArticle: article.removeArticle
};

export default connect(null, mapDispatchToProps)(RemoveButton);
