import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

import IdeaPoolIcon from '../assets/IdeaPool_icon.png';


const CONTAINER_WIDTH = 200 - (37) * 2;

const SidebarContainer = styled.div`
  width: ${CONTAINER_WIDTH}px;
  height: 100%;
  position: fixed;
  background: #00A843;
  padding: 37px;

  display: flex;
  flex-direction: column;

  top: 0;
  left: 0;

  justify-content: flex-start;
  align-items: center;
`;

const SidebarItem = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  margin-bottom: 81px;
`;

const Icon = styled.img`
  width: 64px;
  height: 64px;
  margin-bottom: 13px;
`;

const Label = styled.div`
  font-size: 16px;
  color: #FFFFFF;
`;

const SidebarLink = styled(Link)`
  font-size: 16px;
  color: rgba(42,56,66,0.65);
  text-decoration: none;
`;

export default class Sidebar extends Component {
  renderUserItem() {
    const { user } = this.props || {};
    const {
      profilePicture,
      name,
    } = user || {};

    return (
      <SidebarItem to="/logout">
        <Icon src={profilePicture}/>

        <Label>
          {name}
        </Label>

        <SidebarLink to="/logout">Log out</SidebarLink>
      </SidebarItem>
    );
  }

  render() {
    const { user } = this.props || {};

    return (
      <SidebarContainer>
        <SidebarItem to="/my-ideas">
          <Icon src={IdeaPoolIcon} />
          <Label>
            The Idea Pool
          </Label>
        </SidebarItem>

        {
          user
          ? this.renderUser()
          : null
        }
      </SidebarContainer>
    );
  }
}
