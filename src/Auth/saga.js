import {
  takeLatest,
  put,
  all,
  select,
  fork,
} from 'redux-saga/effects';

import {
  logIn,
  register,
  logOut,
} from './api';

import {
  handleError,
} from '../api';

import {
  SET_LOGGED_IN,
  DO_LOGIN,
  DO_LOGOUT,
  DO_REGISTER,
} from './actions';

const TOKEN_REFRESH_DELAY = 1000;

const delay = ms => new Promise(res => setTimeout(res, ms));

function forwardTo(location) {
  // eslint-disable-next-line
  history.pushState(null, null, location);
}

function* refreshToken() {
  let loggedIn = true;
  while (loggedIn) {
    yield delay(TOKEN_REFRESH_DELAY);
    loggedIn = yield select(({ auth }) => auth.loggedIn);

    if (loggedIn) {

    }
  }
}

function* doLogin({ data }) {
  const token = yield handleError(() => logIn(data));

  if (token) {
    yield put({
      type: SET_LOGGED_IN,
      payload: true,
    });

    fork(refreshToken());

    forwardTo('/my-ideas');
  }
}

export function* doRegister({ data }) {
  const token = yield handleError(() => register(data));

  if (token) {
    yield put({
      type: SET_LOGGED_IN,
      payload: true,
    });

    localStorage.setItem('jwt', token.jwt);
    localStorage.setItem('refresh_token', token.refresh_token);

    forwardTo('/my-ideas');
  }
}

export function* doLogOut() {
  const success = yield handleError(() => logOut());

  if (success) {
    yield put({
      type: SET_LOGGED_IN,
      payload: false,
    });

    forwardTo('/');
  }
}

export default function* root() {
  yield all([
    yield takeLatest(DO_LOGIN, doLogin),
    yield takeLatest(DO_REGISTER, doRegister),
    yield takeLatest(DO_LOGOUT, doLogOut),
  ]);
}
