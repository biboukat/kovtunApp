import { takeEvery } from 'redux-saga/effects';
import firstSaga from './firstSaga';

function *mySaga() {
  yield takeEvery('START_SAGA', () => { console.log('blaaah'); });
}

export default mySaga;