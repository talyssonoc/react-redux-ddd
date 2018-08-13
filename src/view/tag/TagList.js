/* @flow */
import React from 'react';

import type { Tag } from '../../domain/tag';

export type Props = {
  tags: Array<Tag>,
  onClickTag: Function
};

const TagList = (props: Props) => (
  <div className="tag-list">
    {
      props.tags.map((tag) =>
        <span
          role="button"
          key={ tag }
          className="tag-pill tag-default"
          onClick={ () => props.onClickTag(tag) }
        >
          { tag }
        </span>
      )
    }
  </div>
);

export default TagList;
