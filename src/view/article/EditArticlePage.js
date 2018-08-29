/* @flow */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Head from '../layout/Head';
import type { ArticleSlug } from '../../domain/article';
import { article, editor, type EditorState } from '../../state/article';
import ArticleEditor from './ArticleEditor';

const { EditorStatuses } = editor;

type Props = {
  status: $PropertyType<EditorState, 'status'>,
  articleSlug: ArticleSlug,
  editArticle: typeof article.editArticle,
  setEditingArticle: typeof editor.setEditingArticle
};

class EditArticlePage extends Component<Props> {
  componentDidMount() {
    const { setEditingArticle, articleSlug } = this.props;

    setEditingArticle(articleSlug);
  }

  render() {
    const {
      status,
      editArticle
    } = this.props;

    if(status === EditorStatuses.FAILED_LOADING) {
      return <Redirect to="/" />;
    }

    if(status === EditorStatuses.INIT || status === EditorStatuses.LOADING) {
      return null;
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

const mapStateToProps = ({ editor }, props) => ({
  status: editor.status,
  articleSlug: props.match.params.slug
});

const mapDispatchToProps = {
  editArticle: article.editArticle,
  setEditingArticle: editor.setEditingArticle
};

export default connect(mapStateToProps, mapDispatchToProps)(EditArticlePage);
