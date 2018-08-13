/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  loadPopularTags
} from '../../state/tag';
import TagList, { type Props as TagListProps } from './TagList';

type Props = TagListProps & {
  loadPopularTags: Function,
  isLoading: bool
};

class PopularTagList extends Component<Props> {
  componentDidMount() {
    this.props.loadPopularTags();
  }

  render() {
    const { isLoading, tags } = this.props;

    if(isLoading) {
      return 'Loading tags...';
    }

    return <TagList tags={ tags } {...this.props} />;
  }
}

const mapStateToProps = ({ popularTags }) => ({
  tags: popularTags.tags,
  isLoading: popularTags.isLoading
});

const mapDispatchToProps = {
  loadPopularTags
};

export default connect(mapStateToProps, mapDispatchToProps)(PopularTagList);
