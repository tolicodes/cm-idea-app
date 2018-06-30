import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';
import autoBind from 'react-autobind';

import IdeaPoolIcon from '../assets/IdeaPool_icon.png';

import {
  doLogout,
} from '../Auth/actions';

const CONTAINER_WIDTH = 200 - (37) * 2;

const SidebarContainer = styled.div`
  width: ${CONTAINER_WIDTH}px;
  height: 100%;
  position: fixed;
  background: #00A843;
  padding: 0 37px;

  display: flex;
  flex-direction: column;

  top: 0;
  left: 0;

  justify-content: flex-start;
  align-items: center;
`;

const SidebarItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  text-decoration: none;
  padding-bottom: 41px;
  padding-top: 37px;
`;

const User = styled(SidebarItem)`
  border-top: 1px solid rgba(255,255,255,0.20);
`;

const Icon = styled.img`
  width: 64px;
  height: 64px;
  margin-bottom: 13px;
  border-radius: 32px;
`;

const Label = styled.div`
  text-align: center;
  font-size: 16px;
  color: #FFFFFF;
`;

const SidebarLink = styled(Link)`
  font-size: 16px;
  color: rgba(42,56,66,0.65);
  text-decoration: none;
  margin-top: 9px;
`;

class Sidebar extends Component {
  constructor() {
    super();
    autoBind(this);
  }

  onClickLogout() {
    const { doLogout } = this.props;
    doLogout();
  }

  renderUser() {
    const { user } = this.props || {};
    const {
      avatar_url,
      name,
    } = user || {};

    return (
      <User>
        <Icon src={avatar_url} />

        <Label>
          {name}
        </Label>

        <SidebarLink to="/login" onClick={this.onClickLogout}>
          Log out
        </SidebarLink>
      </User>
    );
  }

  render() {
    const { loggedIn } = this.props || {};

    return (
      <SidebarContainer>
        <SidebarItem to="/my-ideas">
          <Icon src={IdeaPoolIcon} />
          <Label>
            The Idea Pool
          </Label>
        </SidebarItem>

        {
          loggedIn
            ? this.renderUser()
            : null
        }
      </SidebarContainer>
    );
  }
}

export default connect(
  ({ auth: { user, loggedIn } }) => ({
    user,
    loggedIn,
  }),
  dispatch => bindActionCreators({
    doLogout,
  }, dispatch),
)(Sidebar);
