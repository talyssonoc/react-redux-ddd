/* @flow */
import React from 'react';

import type { Tag } from '@rw-ddd/core/domain/tag';

export type Props = {
  as?: string,
  tags: Array<Tag>,
  onClickTag?: (Tag) => *,
  tagClassName?: string,
  iconClassName?: string,
  onClickIcon?: (Tag) => *
};

const TagList = (props: Props) => {
  const ListComponent = props.as || 'div';
  const ItemComponent = ListComponent === 'ul' ? 'li' : 'span';

  return (
    <ListComponent className="tag-list">
      {
        props.tags.map((tag) =>
          <ItemComponent
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
          </ItemComponent>
        )
      }
    </ListComponent>
  );
};

export default TagList;
