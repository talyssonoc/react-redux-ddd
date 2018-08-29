/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { editor, type EditorState, type ArticleState } from '../../state/article';
import TagList from '../tag/TagList';
import ErrorMessages from '../error/ErrorMessages';

const { EditorStatuses } = editor;

type Props = {
  article: $PropertyType<EditorState, 'article'>,
  errors: $PropertyType<EditorState, 'errors'>,
  status: $PropertyType<EditorState, 'status'>,
  savedArticle: $PropertyType<ArticleState, 'article'>,
  addTag: typeof editor.addTag,
  removeTag: typeof editor.removeTag,
  resetEditor: typeof editor.resetEditor,
  updateField: typeof editor.updateField,
  onSubmit: ($PropertyType<Props, 'article'>) => *
};

type State = {
  editingTag: string
};

const Keys = {
  ENTER: 'Enter',
  BACKSPACE: 'Backspace'
};

const EventTypes = {
  CHANGE: 'change',
  KEYDOWN: 'keydown'
};

class ArticleEditor extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      editingTag: ''
    };
  }

  componentWillUnmount() {
    this.props.resetEditor();
  }

  handleChange = (fieldName) => (event) => {
    this.props.updateField(fieldName, event.target.value);
  };

  handleTagInputEvent = (event) => {
    const tag = event.target.value;

    if(event.type === EventTypes.CHANGE) {
      return this.setEditingTag(tag);
    }

    if(event.type === EventTypes.KEYDOWN) {
      if(event.key === Keys.ENTER && tag.trim()) {
        event.preventDefault();
        return this.addTag(tag);
      }

      if(event.key === Keys.BACKSPACE && !tag) {
        this.removeLastTag();
      }
    }
  };

  setEditingTag(editingTag) {
    this.setState({ editingTag });
  };

  addTag(tag) {
    this.props.addTag(tag);
    this.setEditingTag('');
  }

  removeLastTag() {
    const { tagList } = this.props.article;

    if(tagList.length) {
      this.props.removeTag(tagList[tagList.length - 1]);
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { article, onSubmit } = this.props;

    onSubmit(article);
  };

  render() {
    const {
      status,
      article,
      removeTag,
      savedArticle,
      errors
    } = this.props;

    const { editingTag } = this.state;

    const isSaving = status === EditorStatuses.SAVING;

    if(status === EditorStatuses.SAVED && savedArticle) {
      return <Redirect to={ `/article/${savedArticle.slug}` } />;
    }

    return (
      <div className="editor-page">
        <div className="container page">
          <div className="row">

            <div className="col-md-10 offset-md-1 col-xs-12">
              <ErrorMessages errors={ errors }/>

              <form onSubmit={ this.handleSubmit }>
                <fieldset>
                  <fieldset className="form-group">
                    <input
                      value={ article.title }
                      onChange={ this.handleChange('title') }
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Article Title"
                      disabled={ isSaving }
                      required
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      value={ article.description }
                      onChange={ this.handleChange('description') }
                      type="text"
                      className="form-control"
                      placeholder="What's this article about?"
                      disabled={ isSaving }
                      required
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <textarea
                      value={ article.body }
                      onChange={ this.handleChange('body') }
                      className="form-control"
                      rows="8"
                      placeholder="Write your article (in markdown)"
                      disabled={ isSaving }
                      required
                    ></textarea>
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      value={ editingTag }
                      onChange={ this.handleTagInputEvent }
                      onKeyDown={ this.handleTagInputEvent }
                      type="text"
                      className="form-control"
                      placeholder="Enter tags"
                      disabled={ isSaving }
                    />
                    <TagList
                      tags={ article.tagList }
                      iconClassName="ion-close"
                      onClickIcon={ removeTag }
                    />
                  </fieldset>
                  <button
                    className="btn btn-lg pull-xs-right btn-primary"
                    type="submit"
                    disabled={ isSaving }
                  >
                    Publish Article
                  </button>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ editor, article }) => ({
  status: editor.status,
  article: editor.article,
  errors: editor.errors,
  savedArticle: article.article
});

const mapDispatchToProps = {
  resetEditor: editor.resetEditor,
  updateField: editor.updateField,
  addTag: editor.addTag,
  removeTag: editor.removeTag
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleEditor);
