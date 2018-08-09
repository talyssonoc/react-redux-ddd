/* @flow */
import React from 'react';
import ArticlePreview from './ArticlePreview';

type Props = {
  feed: Object
};

const Feed = ({ feed }: Props) => {
  if(feed.isLoading) {
    return <div className="article-preview">Loading articles...</div>;
  }

  if(!feed.articles.length) {
    return <div className="article-preview">No articles are here... yet.</div>;
  }

  return feed.articles.map((article) =>
    <ArticlePreview key={ article.slug } article={ article } />
  );
};

export default Feed;
