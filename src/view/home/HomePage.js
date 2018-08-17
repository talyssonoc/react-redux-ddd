/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import Feed from '../article/Feed';
import PopularTagList from '../tag/PopularTagList';
import type { Tag } from '../../domain/tag';
import type { UserState } from '../../state/user';
import {
  feed,
  type FeedState
} from '../../state/article';

const Tabs = {
  USER: 'USER',
  GLOBAL: 'GLOBAL',
  TAG: 'TAG'
};

type Tab = $Keys<typeof Tabs>;

type Props = {
  user: UserState,
  feed: FeedState,
  loadGlobalFeed: typeof feed.loadGlobalFeed,
  loadUserFeed: typeof feed.loadUserFeed,
  loadTagFeed: typeof feed.loadTagFeed
};

type State = {
  selectedTab: Tab,
  selectedTag?: ?Tag
};

class HomePage extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      selectedTab: props.user ? Tabs.USER : Tabs.GLOBAL
    };
  }

  componentDidMount() {
    this.loadTab(this.state.selectedTab);
  }

  handleChangeTab(tab: Tab, tag: ?Tag = null) {
    this.loadTab(tab, tag);

    this.setState({
      selectedTab: tab,
      selectedTag: tag
    });
  }

  loadTab(tab: Tab, tag: ?Tag) {
    switch(tab) {
      case Tabs.USER:
        return this.props.loadUserFeed();
      case Tabs.TAG:
        return this.props.loadTagFeed(((tag: any): Tag))
      case Tabs.GLOBAL:
      default:
        return this.props.loadGlobalFeed();
    }
  }

  render() {
    const { user, feed } = this.props;
    const { selectedTab, selectedTag } = this.state;

    return (
      <div className="home-page">
        {
          !user && (
            <div className="banner">
              <div className="container">
                <h1 className="logo-font">conduit</h1>
                <p>A place to share your knowledge.</p>
              </div>
            </div>
          )
        }

        <div className="container page">
          <div className="row">
            <div className="col-md-9">
              <div className="feed-toggle">
                <ul className="nav nav-pills outline-active">
                  {
                    user && (
                      <li className="nav-item">
                        <span
                          role="button"
                          className={
                            classNames('nav-link', {
                              active: selectedTab === Tabs.USER
                            })
                          }
                          onClick={ () => this.handleChangeTab(Tabs.USER) }
                        >
                          Your Feed
                        </span>
                      </li>
                    )
                  }
                  <li className="nav-item">
                    <span
                      role="button"
                      className={
                        classNames('nav-link', {
                          active: selectedTab === Tabs.GLOBAL
                        })
                      }
                      onClick={ () => this.handleChangeTab(Tabs.GLOBAL) }
                    >
                      Global Feed
                    </span>
                  </li>

                  {
                    selectedTag && (
                      <li className="nav-item">
                        <span
                          role="button"
                          className="nav-link active"
                        >
                          <i className="ion-pound" /> { selectedTag }
                        </span>
                      </li>
                    )
                  }
                </ul>
              </div>

              <Feed feed={ feed } />
            </div>

            <div className="col-md-3">
              <div className="sidebar">
                <p>Popular Tags</p>

                <PopularTagList
                  onClickTag={ (tag) => this.handleChangeTab(Tabs.TAG, tag) }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ user, feed }) => ({
  user,
  feed
});

const mapDispatchToProps = {
  loadGlobalFeed: feed.loadGlobalFeed,
  loadUserFeed: feed.loadUserFeed,
  loadTagFeed: feed.loadTagFeed
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
