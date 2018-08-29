/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import Head from '../layout/Head';
import { isSame } from '../../domain/author';
import { type UserState } from '../../state/user';
import { loadAuthor, type AuthorState } from '../../state/author';
import { feed, type FeedState } from '../../state/article';
import Feed from '../article/Feed';
import FollowButton from './FollowButton';
import EditProfileButton from '../settings/EditProfileButton';
import AuthorImage from './AuthorImage';

const Tabs = {
  ARTICLES: 'ARTICLES',
  FAVORITES: 'FAVORITES'
};

type Tab = $Keys<typeof Tabs>;

type Props = {
  authorUsername: string,
  user: $PropertyType<UserState, 'user'>,
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
    this.loadAuthorAndArticles();
  }

  componentDidUpdate(prevProps) {
    if(prevProps.authorUsername === this.props.authorUsername) {
      return;
    }

    this.setState({
      selectedTab: Tabs.ARTICLES
    });

    this.loadAuthorAndArticles();
  }

  loadAuthorAndArticles() {
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
      feed,
      user
    } = this.props;

    const {
      selectedTab
    } = this.state;

    return (
      <div className="profile-page">
        <Head title={ author ? `@${ author.username }` : '' } />

        <div className="user-info">
          <div className="container">
            <div className="row">
              {
                author && (
                  <div className="col-xs-12 col-md-10 offset-md-1">
                    <AuthorImage author={ author } className="user-img" />
                    <h4>{ author.username }</h4>
                    <p>
                      { author.bio }
                    </p>
                    {
                      isSame(user, author)
                        ? <EditProfileButton className="action-btn" />
                        : <FollowButton author={ author } className='action-btn' />
                    }
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

const mapStateToProps = ({ user, author, feed }, props) => ({
  user: user.user,
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
