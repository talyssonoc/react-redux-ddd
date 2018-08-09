/* @flow */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import classNames from 'classnames';
import Feed from '../article/Feed';
import {
  globalFeed,
  userFeed
} from '../../state/article'

const Tabs = {
  USER: 'USER',
  GLOBAL: 'GLOBAL'
};

type Tab = $Keys<typeof Tabs>;

type Props = {
  user: Object,
  globalFeed: Object,
  userFeed: Object,
  loadGlobalFeed: Function,
  loadUserFeed: Function
};

type State = {
  selectedTab: Tab
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

  handleChangeTab(tab: Tab) {
    this.loadTab(tab);
    this.setState({ selectedTab: tab });
  }

  loadTab(tab: Tab) {
    if(tab === Tabs.USER) {
      return this.props.loadUserFeed();
    }

    this.props.loadGlobalFeed();
  }

  render() {
    const { user, globalFeed, userFeed } = this.props;
    const { selectedTab } = this.state;
    const isUserFeed = selectedTab === Tabs.USER;
    const currentFeed = isUserFeed ? userFeed : globalFeed;

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
                        <Link
                          className={
                            classNames('nav-link', {
                              active: isUserFeed
                            })
                          }
                          to={ `/?feed=${Tabs.USER}` }
                          onClick={ () => this.handleChangeTab(Tabs.USER) }
                        >
                          Your Feed
                        </Link>
                      </li>
                    )
                  }
                  <li className="nav-item">
                    <Link
                      className={
                        classNames('nav-link', {
                          active: !isUserFeed
                        })
                      }
                      to={ `/?feed=${Tabs.GLOBAL}` }
                      onClick={ () => this.handleChangeTab(Tabs.GLOBAL) }
                    >
                      Global Feed
                    </Link>
                  </li>
                </ul>
              </div>

              <Feed feed={ currentFeed } />
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
  loadUserFeed: userFeed.loadUserFeed
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
