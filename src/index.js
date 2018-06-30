import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import styled from 'styled-components';

import { Route, Switch } from 'react-router';
import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware, ConnectedRouter } from 'connected-react-router';

import registerServiceWorker from './registerServiceWorker';

import './main.css';

import reducer from './reducer';
import saga from './saga';

import SignUp from './Auth/components/SignUp';
import LogIn from './Auth/components/LogIn';
import MyIdeas from './MyIdeas';
import Sidebar from './Sidebar';

const PageContainer = styled.div`
  width: calc(100% - 200px);
  margin-left: 200px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// eslint-disable-next-line
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const history = createBrowserHistory();

// mount it on the Store
const store = createStore(
  connectRouter(history)(reducer),
  {},
  composeEnhancers(
    applyMiddleware(
      sagaMiddleware,
      routerMiddleware(history),
    ),
  ),
);

// then run the saga
sagaMiddleware.run(saga);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <PageContainer>
        <Sidebar />

        <Switch>
          <Route path="/" exact component={SignUp} />
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={LogIn} />
          <Route path="/my-ideas" component={MyIdeas} />
        </Switch>
      </PageContainer>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
