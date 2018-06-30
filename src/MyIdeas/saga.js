import {
  takeLatest,
  put,
  all,
  select,
  fork,
} from 'redux-saga/effects';

import {
  addIdea,
  deleteIdea,
  updateIdea,
  createIdea,
  handleError,
} from './api';

import {
  DO_DELETE_IDEA,
  DO_UPDATE_IDEA,
  DO_CREATE_IDEA,
} from './actions';

function* doDeleteIdea() {

}

function* doUpdateIdea() {

}

function* doCreateIdea() {

}

export default function* root() {
  yield all([
    yield takeLatest(DO_DELETE_IDEA, doDeleteIdea),
    yield takeLatest(DO_UPDATE_IDEA, doUpdateIdea),
    yield takeLatest(DO_CREATE_IDEA, doCreateIdea),
  ]);
}
