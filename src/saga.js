import authSaga from './Auth/saga';
import { all } from "redux-saga/effects";

export default function* rootSaga () {
  yield all([
    authSaga()
  ])
}
