/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Head from '../layout/Head';
import type { ArticleSlug } from '../../domain/article';
import { type UserState } from '../../state/user';
import { article, type ArticleState } from '../../state/article';
import Article from './Article';

const { ArticleStatuses } = article;

type Props = {
  articleSlug: ArticleSlug,
  user: $PropertyType<UserState, 'user'>,
  article: $PropertyType<ArticleState, 'article'>,
  comments: $PropertyType<ArticleState, 'comments'>,
  status: $PropertyType<ArticleState, 'status'>,
  loadArticle: typeof article.loadArticle,
  addComment: typeof article.addComment,
  removeComment: typeof article.removeComment,
  unloadArticle: typeof article.unloadArticle
};

class ArticlePage extends Component<Props> {
  componentDidMount() {
    const {
      loadArticle,
      articleSlug,
      article
    } = this.props;

    if(!article) {
      loadArticle(articleSlug);
    }
  }

  componentWillUnmount() {
    this.props.unloadArticle();
  }

  addComment = (commentBody) => {
    const {
      addComment,
      articleSlug
    } = this.props;

    addComment(commentBody, articleSlug);
  }

  removeComment = (comment) => {
    const {
      removeComment,
      articleSlug
    } = this.props;

    removeComment(comment, articleSlug);
  }

  render() {
    const {
      user,
      article, comments,
      status
    } = this.props;

    if(status === ArticleStatuses.FAILED_LOADING || status === ArticleStatuses.REMOVED) {
      return <Redirect to="/" />;
    }

    if(status === ArticleStatuses.LOADING || !article || !user) {
      return null;
    }

    return (
      <div className="article-page">
        <Head title={ article.title } />

        <Article
          user={ user }
          article={ article }
          isRemoving={ status === ArticleStatuses.REMOVING }
          comments={ comments }
          addComment={ this.addComment }
          removeComment={ this.removeComment }
        />
      </div>
    );
  }
}

const mapStateToProps = ({ article, user }, props) => ({
  user: user.user,
  article: article.article,
  comments: article.comments,
  isLoading: article.isLoading,
  status: article.status,
  articleSlug: props.match.params.slug
});

const mapDispatchToProps = {
  loadArticle: article.loadArticle,
  addComment: article.addComment,
  removeComment: article.removeComment,
  unloadArticle: article.unloadArticle
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticlePage);
