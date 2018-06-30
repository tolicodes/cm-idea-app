import {
  takeLatest,
  put,
  all,
} from 'redux-saga/effects';

import {
  getIdeas,
  deleteIdea,
  updateIdea,
  createIdea,
} from './api';

import {
  handleError,
} from '../api';

import {
  DO_DELETE_IDEA,
  DO_UPDATE_IDEA,
  DO_CREATE_IDEA,
  removeIdea,
  afterCreateIdea,
  setIdeas,
  editIdea,
} from './actions';

import {
  SET_LOGGED_IN,
} from '../Auth/actions';

function* doGetIdeas({ loggedIn }) {
  if (!loggedIn) return;

  const ideas = yield handleError(() => getIdeas());

  if (ideas) {
    yield put(setIdeas(ideas));
  }
}

function* doDeleteIdea({ id }) {
  const success = yield handleError(() => deleteIdea(id));

  if (success) {
    yield put(removeIdea(id));
  }
}

function* doUpdateIdea({ id, data }) {
  const success = yield handleError(() => updateIdea(id, data));

  if (success) {
    yield put(editIdea(id, false));
  }
}

function* doCreateIdea({ uuid, data }) {
  const createdIdea = yield handleError(() => createIdea(data));

  if (createdIdea) {
    yield put(afterCreateIdea({
      uuid,
      id: createdIdea.id,
      ...data,
    }));
  }
}

export default function* root() {
  yield all([
    yield takeLatest(DO_DELETE_IDEA, doDeleteIdea),
    yield takeLatest(DO_UPDATE_IDEA, doUpdateIdea),
    yield takeLatest(DO_CREATE_IDEA, doCreateIdea),
    yield takeLatest(SET_LOGGED_IN, doGetIdeas),
  ]);
}
