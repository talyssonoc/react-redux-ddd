/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import TagList from '../tag/TagList';
import type { EditingArticle } from '../../domain/article';
import { editor } from '../../state/article';

type Props = {
  article: EditingArticle,
  resetEditor: Function,
  updateField: Function,
  addTag: Function,
  removeTag: Function
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

  componentDidMount() {
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
      if(event.key === Keys.ENTER && tag) {
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

  removeTag(tag) {
    this.props.removeTag(tag);
  }

  removeLastTag() {
    const { tagList } = this.props.article;

    if(tagList.length) {
      this.removeTag(tagList[tagList.length - 1]);
    }
  }

  render() {
    const { article, removeTag } = this.props;
    const { editingTag } = this.state;

    return (
      <div className="editor-page">
        <div className="container page">
          <div className="row">

            <div className="col-md-10 offset-md-1 col-xs-12">
              <form>
                <fieldset>
                  <fieldset className="form-group">
                    <input
                      value={ article.title }
                      onChange={ this.handleChange('title') }
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Article Title"
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      value={ article.description }
                      onChange={ this.handleChange('description') }
                      type="text"
                      className="form-control"
                      placeholder="What's this article about?"
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <textarea
                      value={ article.body }
                      onChange={ this.handleChange('body') }
                      className="form-control"
                      rows="8"
                      placeholder="Write your article (in markdown)"
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
                    />
                    <TagList
                      tags={ article.tagList }
                      iconClassName="ion-close"
                      onClickIcon={ removeTag }
                    />
                  </fieldset>
                  <button className="btn btn-lg pull-xs-right btn-primary" type="button">
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

const mapStateToProps = ({ editor }) => ({
  article: editor.article
});

const mapDispatchToProps = {
  resetEditor: editor.resetEditor,
  updateField: editor.updateField,
  addTag: editor.addTag,
  removeTag: editor.removeTag
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleEditor);
