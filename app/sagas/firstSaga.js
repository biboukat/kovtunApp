import { put } from 'redux-saga/effects';

export default function *incrementAsync() {
  yield put({ type: 'INCREMENT' })
}