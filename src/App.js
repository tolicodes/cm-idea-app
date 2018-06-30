import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import styled from 'styled-components';

import MainCSS from './main.css';

import SignUp from './Auth/components/SignUp';
import LogIn from './Auth/components/LogIn';
import MyIdeas from './MyIdeas/';
import Sidebar from './Sidebar';

const PageContainer = styled.div`
  width: calc(100% - 200px);
  margin-left: 200px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function App () {
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
