/* @flow */
import React from 'react';

import type { Tag } from '../../domain/tag';

export type Props = {
  tags: Array<Tag>,
  onClickTag?: Function,
  tagClassName?: string,
  iconClassName?: string,
  onClickIcon?: Function
};

const TagList = (props: Props) => (
  <div className="tag-list">
    {
      props.tags.map((tag) =>
        <span
          role={ props.onClickTag ? 'button' : null }
          key={ tag }
          className={ `tag-pill tag-default ${props.tagClassName || ''}` }
          onClick={ () => props.onClickTag && props.onClickTag(tag) }
        >
          {
            props.iconClassName && (
              <i
                className={ props.iconClassName }
                onClick={ () => props.onClickIcon && props.onClickIcon(tag) }
              />
            )
          }

          { tag }
        </span>
      )
    }
  </div>
);

export default TagList;
