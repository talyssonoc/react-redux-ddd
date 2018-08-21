/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { loadAuthor, type AuthorState } from '../../state/author';
import { feed, type FeedState } from '../../state/article';
import Feed from '../article/Feed';

const Tabs = {
  ARTICLES: 'ARTICLES',
  FAVORITES: 'FAVORITES'
};

type Tab = $Keys<typeof Tabs>;

type Props = {
  authorUsername: string,
  author: $PropertyType<AuthorState, 'author'>,
  feed: FeedState,
  loadAuthor: typeof loadAuthor,
  loadAuthorFeed: typeof feed.loadAuthorFeed,
  loadAuthorFavoritesFeed: typeof feed.loadAuthorFavoritesFeed
};

type State = {
  selectedTab: Tab
};

class AuthorPage extends Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      selectedTab: Tabs.ARTICLES
    };
  }

  componentDidMount() {
    const {
      authorUsername,
      loadAuthor
    } = this.props;

    const {
      selectedTab
    } = this.state;

    loadAuthor(authorUsername);

    this.loadTab(selectedTab);
  }

  loadTab(selectedTab: Tab) {
    const {
      loadAuthorFeed,
      loadAuthorFavoritesFeed,
      authorUsername
    } = this.props;

    switch(selectedTab) {
      case Tabs.FAVORITES:
        return loadAuthorFavoritesFeed(authorUsername);
      case Tabs.ARTICLES:
      default:
        return loadAuthorFeed(authorUsername);
    }
  }

  handleChangeTab(tab: Tab) {
    this.loadTab(tab);
    this.setState({ selectedTab: tab });
  }

  render() {
    const {
      author,
      feed
    } = this.props;

    const {
      selectedTab
    } = this.state;

    return (
      <div className="profile-page">

        <div className="user-info">
          <div className="container">
            <div className="row">
              {
                author && (
                  <div className="col-xs-12 col-md-10 offset-md-1">
                    <img
                      src={ author.image }
                      alt={ author.username }
                      className="user-img"
                    />
                    <h4>{ author.username }</h4>
                    <p>
                      { author.bio }
                    </p>
                    <button className="btn btn-sm btn-outline-secondary action-btn">
                      <i className="ion-plus-round"></i>
                      &nbsp;
                      Follow { author.username }
                    </button>
                  </div>
                )
              }
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">

            <div className="col-xs-12 col-md-10 offset-md-1">
              <div className="articles-toggle">
                <ul className="nav nav-pills outline-active">
                  <li className="nav-item">
                    <span
                      role="button"
                      className={
                        classNames('nav-link', {
                          active: selectedTab === Tabs.ARTICLES
                        })
                      }
                      onClick={ () => this.handleChangeTab(Tabs.ARTICLES) }
                    >
                      My Articles
                    </span>
                  </li>
                  <li className="nav-item">
                    <span
                      role="button"
                      className={
                        classNames('nav-link', {
                          active: selectedTab === Tabs.FAVORITES
                        })
                      }
                      onClick={ () => this.handleChangeTab(Tabs.FAVORITES) }
                    >
                      Favorited Articles
                    </span>
                  </li>
                </ul>
              </div>

              <Feed feed={ feed } />
            </div>

          </div>
        </div>

      </div>
    );
  }
}

const mapStateToProps = ({ author, feed }, props) => ({
  feed,
  author: author.author,
  authorUsername: props.match.params.username
});

const mapDispatchToProps = {
  loadAuthor,
  loadAuthorFeed: feed.loadAuthorFeed,
  loadAuthorFavoritesFeed: feed.loadAuthorFavoritesFeed
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthorPage);
