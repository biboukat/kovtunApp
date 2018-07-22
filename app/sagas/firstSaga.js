import { put } from 'redux-saga/effects';

export default function *incrementAsync() {
  console.log('saga');
  yield put({ type: 'INCREMENT' })
}