/* @flow */
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Head from '../layout/Head';
import { article } from '../../state/article';
import ArticleEditor from './ArticleEditor';

type Props = {
  createArticle: typeof article.createArticle
};

const CreateArticlePage = (props: Props) => (
  <Fragment>
    <Head title="Editor" />
    <ArticleEditor
      onSubmit={ props.createArticle }
    />
  </Fragment>
);

const mapDispatchToProps = {
  createArticle: article.createArticle
};

export default connect(null, mapDispatchToProps)(CreateArticlePage);
