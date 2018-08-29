/* @flow */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Head from '../layout/Head';
import type { Article, ArticleSlug } from '../../domain/article';
import { type UserState } from '../../state/user';
import { isAuthoredBy } from '../../domain/author';
import { article, editor, type EditorState } from '../../state/article';
import ArticleEditor from './ArticleEditor';

const { EditorStatuses } = editor;

type Props = {
  currentUser: $PropertyType<UserState, 'user'>,
  article: $PropertyType<EditorState, 'article'>,
  status: $PropertyType<EditorState, 'status'>,
  articleSlug: ArticleSlug,
  editArticle: typeof article.editArticle,
  setEditingArticle: typeof editor.setEditingArticle,
  resetEditor: typeof editor.resetEditor
};

class EditArticlePage extends Component<Props> {
  componentDidMount() {
    const { setEditingArticle, articleSlug } = this.props;

    setEditingArticle(articleSlug);
  }

  componentWillUnmout() {
    this.props.resetEditor();
  }

  render() {
    const {
      status,
      article,
      editArticle,
      currentUser
    } = this.props;


    if(status === EditorStatuses.INIT || status === EditorStatuses.LOADING) {
      return null;
    }

    if(status === EditorStatuses.FAILED_LOADING || !isAuthoredBy(((article: any): Article), currentUser)) {
      return <Redirect to="/" />;
    }

    return (
      <Fragment>
        <Head title="Editor" />
        <ArticleEditor
          onSubmit={ editArticle }
        />
      </Fragment>
    );
  }
}

const mapStateToProps = ({ editor, user }, props) => ({
  status: editor.status,
  article: editor.article,
  articleSlug: props.match.params.slug,
  currentUser: user.user
});

const mapDispatchToProps = {
  editArticle: article.editArticle,
  setEditingArticle: editor.setEditingArticle,
  resetEditor: editor.resetEditor
};

export default connect(mapStateToProps, mapDispatchToProps)(EditArticlePage);
