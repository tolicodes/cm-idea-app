import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import styled from 'styled-components';

import SignUp from './SignUp';
import LogIn from './LogIn';
import MyIdeas from './MyIdeas';

import Sidebar from './SideBar';

import './App.css';

const PageContainer = styled.div`
  width: calc(100% - 200px);
  margin-left: 200px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default class App extends Component {
  render() {
    return (
      <Router>
        <PageContainer>
          <Sidebar/>
          <Route path="/" exact component={SignUp}/>
          <Route path="/signup" component={SignUp}/>
          <Route path="/login" component={LogIn}/>
          <Route path="/my-ideas" component={MyIdeas}/>
        </PageContainer>
      </Router>
    );
  }
}
