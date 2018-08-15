/* @flow */
import React from 'react';
import { connect } from 'react-redux';
import { article } from '../../state/article';
import ArticleEditor from './ArticleEditor';

type Props = {
  createArticle: Function
};

const CreateArticlePage = (props: Props) => (
  <ArticleEditor
    onSubmit={ props.createArticle }
  />
);

const mapDispatchToProps = {
  createArticle: article.createArticle
};

export default connect(null, mapDispatchToProps)(CreateArticlePage);
