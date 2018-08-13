/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import type { User } from '../../domain/user';
import type { Tag } from '../../domain/tag';
import Feed from '../article/Feed';
import PopularTagList from '../article/PopularTagList';
import {
  globalFeed,
  userFeed,
  type FeedState
} from '../../state/article';

const Tabs = {
  USER: 'USER',
  GLOBAL: 'GLOBAL',
  TAG: 'TAG'
};

type Tab = $Keys<typeof Tabs>;

type Props = {
  user: User,
  globalFeed: FeedState,
  userFeed: FeedState,
  loadGlobalFeed: Function,
  loadUserFeed: Function,
  loadTagFeed: Function
};

type State = {
  selectedTab: Tab,
  selectedTag?: ?Tag
};

type WithTabCallbacks = {
  [Tab]: (?Tag) => any
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
    this.withTab(tab, tag, {
      [Tabs.USER]: this.props.loadUserFeed,
      [Tabs.GLOBAL]: this.props.loadGlobalFeed,
      [Tabs.TAG]: () => this.props.loadTagFeed(tag)
    });
  }

  withTab(tab: Tab, tag: ?Tag, callbacks: WithTabCallbacks) {
    return callbacks[tab](tag);
  }

  render() {
    const { user, globalFeed, userFeed } = this.props;
    const { selectedTab, selectedTag } = this.state;
    const currentFeed = this.withTab(selectedTab, null, {
      [Tabs.USER]: () => userFeed,
      [Tabs.GLOBAL]: () => globalFeed,
      [Tabs.TAG]: () => globalFeed
    });

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

              <Feed feed={ currentFeed } />
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

const mapStateToProps = ({ user, globalFeed, userFeed }) => ({
  user,
  globalFeed,
  userFeed
});

const mapDispatchToProps = {
  loadGlobalFeed: globalFeed.loadGlobalFeed,
  loadUserFeed: userFeed.loadUserFeed,
  loadTagFeed: globalFeed.loadTagFeed
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
