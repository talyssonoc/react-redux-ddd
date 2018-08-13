/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Markdown from 'react-markdown';
import { type User } from '../../domain/user';
import { type Article as ArticleType, type ArticleSlug } from '../../domain/article';
import { article } from '../../state/article';
import TagList from '../tag/TagList';
import ArticleMeta from './ArticleMeta';

type Props = {
  user: ?User,
  articleSlug: ArticleSlug,
  article: ?ArticleType,
  isLoading: bool,
  loadArticle: (ArticleSlug) => void
};

class Article extends Component<Props> {
  componentDidMount() {
    this.props.loadArticle(this.props.articleSlug);
  }

  render() {
    const { user, article, isLoading } = this.props;

    if(isLoading || !article) {
      return null;
    }

    return (
      <div className="article-page">

        <div className="banner">
          <div className="container">
            <h1>{ article.title }</h1>

            <ArticleMeta article={ article } currentUser={ user } />
          </div>
        </div>

        <div className="container page">
          <div className="row article-content">
            <div className="col-md-12">
              <Markdown source={ article.body } />
              <TagList
                tags={ article.tagList }
                tagClassName="tag-outline"
              />
            </div>
          </div>

          <hr />

          <div className="article-actions">
            <ArticleMeta article={ article } currentUser={ user } />
          </div>

          { /*
            <div className="row">

              <div className="col-xs-12 col-md-8 offset-md-2">

                <form className="card comment-form">
                  <div className="card-block">
                    <textarea className="form-control" placeholder="Write a comment..." rows="3"></textarea>
                  </div>
                  <div className="card-footer">
                    <img src="http://i.imgur.com/Qr71crq.jpg" className="comment-author-img" />
                    <button className="btn btn-sm btn-primary">
                     Post Comment
                    </button>
                  </div>
                </form>

                <div className="card">
                  <div className="card-block">
                    <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                  </div>
                  <div className="card-footer">
                    <a href="" className="comment-author">
                      <img src="http://i.imgur.com/Qr71crq.jpg" className="comment-author-img" />
                    </a>
                    &nbsp;
                    <a href="" className="comment-author">Jacob Schmidt</a>
                    <span className="date-posted">Dec 29th</span>
                  </div>
                </div>

                <div className="card">
                  <div className="card-block">
                    <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                  </div>
                  <div className="card-footer">
                    <a href="" className="comment-author">
                      <img src="http://i.imgur.com/Qr71crq.jpg" className="comment-author-img" />
                    </a>
                    &nbsp;
                    <a href="" className="comment-author">Jacob Schmidt</a>
                    <span className="date-posted">Dec 29th</span>
                    <span className="mod-options">
                      <i className="ion-edit"></i>
                      <i className="ion-trash-a"></i>
                    </span>
                  </div>
                </div>

              </div>

            </div>
          */ }
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ article, user }, props) => ({
  user,
  article: article.article,
  isLoading: article.isLoading,
  articleSlug: props.match.params.slug
});

const mapDispatchToProps = {
  loadArticle: article.loadArticle
};

export default connect(mapStateToProps, mapDispatchToProps)(Article);
