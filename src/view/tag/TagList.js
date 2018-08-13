/* @flow */
import React from 'react';

import type { Tag } from '../../domain/tag';

export type Props = {
  tags: Array<Tag>,
  onClickTag: Function,
  tagClassName?: string
};

const TagList = (props: Props) => (
  <div className="tag-list">
    {
      props.tags.map((tag) =>
        <span
          role="button"
          key={ tag }
          className={ `tag-pill tag-default ${props.tagClassName || ''}` }
          onClick={ () => props.onClickTag(tag) }
        >
          { tag }
        </span>
      )
    }
  </div>
);

TagList.defaultProps = {
  onClickTag: () => {}
};

export default TagList;
