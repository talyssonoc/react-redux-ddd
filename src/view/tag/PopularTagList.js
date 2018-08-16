/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  loadPopularTags,
  type PopularTagsState
} from '../../state/tag';
import TagList, { type Props as TagListProps } from './TagList';

type Props = TagListProps & {
  loadPopularTags: Function,
  isLoading: $PropertyType<PopularTagsState, 'isLoading'>,
  error: $PropertyType<PopularTagsState, 'error'>
};

class PopularTagList extends Component<Props> {
  componentDidMount() {
    this.props.loadPopularTags();
  }

  render() {
    const { isLoading, tags, error } = this.props;

    if(isLoading) {
      return 'Loading tags...';
    }

    if(error) {
      return 'Error while loading tags.';
    }

    return <TagList tags={ tags } {...this.props} />;
  }
}

const mapStateToProps = ({ popularTags }) => ({
  tags: popularTags.tags,
  isLoading: popularTags.isLoading,
  error: popularTags.error
});

const mapDispatchToProps = {
  loadPopularTags
};

export default connect(mapStateToProps, mapDispatchToProps)(PopularTagList);
