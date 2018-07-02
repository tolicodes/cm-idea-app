import {
  takeLatest,
  put,
  all,
  select,
} from 'redux-saga/effects';

import { push } from 'connected-react-router';

import {
  logIn,
  register,
  logOut,
  refreshToken,
  getMe,
} from './api';

import {
  handleError,
} from '../api';

import {
  SET_LOGGED_IN,
  DO_LOGIN,
  DO_LOGOUT,
  DO_REGISTER,
  setMe,
  setLoggedIn,
} from './actions';

// 10 seconds
const TOKEN_REFRESH_DELAY = 10000;

const delay = ms => new Promise(res => setTimeout(res, ms));

function* forwardTo(location) {
  yield put(push(location));
}

function* onInitialize() {
  const { pathname } = yield select(state => state.router.location);

  if (!getRefreshToken()) {
    if (!['/signup', '/login', '/'].includes(pathname)) {
      yield forwardTo('/login');
    }
  } else {
    if(yield refreshTokenOnce()) {
      yield put(setLoggedIn(true));

      if(pathname === '/') {
        yield forwardTo('/my-ideas');
      }
    }
  }
}

function getRefreshToken() {
  return localStorage.getItem('refresh_token');
}

function* getPathname() {
  yield select(state => state.router.location.pathname);
}

function* refreshTokenOnce() {
  const token = yield refreshToken(getRefreshToken());

  if (token) {
    yield setTokens(token);
    return true;
  } else {
    yield unsetTokens(token);
    return false;
  }
}

function* getLoggedIn(){
  return yield select(({ auth: { loggedIn } }) => loggedIn);
}

function* doIntervalRefreshToken({ loggedIn }) {
  if (!loggedIn) return;

  while (true) {
    yield delay(TOKEN_REFRESH_DELAY);

    if((!getRefreshToken())) {
      yield unsetTokens();
      return;
    } else {
      yield refreshTokenOnce();
    }
  }
}

function* setTokens({ jwt, refresh_token }) {
  if(jwt) localStorage.setItem('jwt', jwt);
  if(refresh_token) localStorage.setItem('refresh_token', refresh_token);

  if (!(yield getLoggedIn())) {
    yield put(setLoggedIn(true));
  }
}

function* unsetTokens() {
  localStorage.removeItem('jwt');
  localStorage.removeItem('refresh_token');

  yield put(setLoggedIn(false));

  if (getPathname() !== '/login') {
    yield forwardTo('/login');
  }
}

function* doLogin({ data }) {
  const token = yield handleError(() => logIn(data));

  if (token) {
    yield setTokens(token);
    yield forwardTo('/my-ideas');
  }
}

export function* doRegister({ data }) {
  const token = yield handleError(() => register(data));

  if (token) {
    yield setTokens(token);
    yield forwardTo('/my-ideas');
  }
}

export function* doLogout() {
  const success = yield handleError(() => logOut(getRefreshToken()));

  if (success) {
    yield unsetTokens();
  }
}

export function* doGetMe({ loggedIn }) {
  if(!loggedIn) return;

  const user = yield handleError(() => getMe());

  if (user) {
    yield put(setMe(user));
  }
}

export default function* root() {
  yield all([
    onInitialize(),
    yield takeLatest(SET_LOGGED_IN, doIntervalRefreshToken),
    yield takeLatest(SET_LOGGED_IN, doGetMe),
    yield takeLatest(DO_LOGIN, doLogin),
    yield takeLatest(DO_REGISTER, doRegister),
    yield takeLatest(DO_LOGOUT, doLogout),
  ]);
}
