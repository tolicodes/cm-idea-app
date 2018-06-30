import { takeLatest, put, all } from "redux-saga/effects";
import {
  logIn,
  register,
  logOut,
} from "./api";

import {
  SET_LOGGED_IN,
  DO_LOGIN,
  DO_LOGOUT,
  DO_REGISTER
} from './actions';

function forwardTo(location) {
  document.location = location;
}

export function* doLogin(data) {
  const token = yield logIn(data);

  if(token) {
    yield put({
      type: SET_LOGGED_IN,
      payload: true,
    });

    forwardTo('/my-ideas');
  }
}

export function* doRegister(data) {
  const token = yield register(data);

  if (token) {
    yield put({
      type: SET_LOGGED_IN,
      payload: true,
    });

    forwardTo('/my-ideas');
  }
}

export function* doLogOut() {
  const success = yield logOut();

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
