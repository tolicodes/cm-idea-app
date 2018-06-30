import { all } from 'redux-saga/effects';
import authSaga from './Auth/saga';
import myIdeasSaga from './MyIdeas/saga';

export default function* rootSaga() {
  yield all([
    myIdeasSaga(),
    authSaga(),
  ]);
}
