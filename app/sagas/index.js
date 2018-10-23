import { takeEvery } from 'redux-saga/effects';

import * as types from '~/shared/actionTypes';
import { savePurchase } from './savePurchase';

function *mySaga() {
  yield takeEvery(types.SAVE_PURCHASE, (a) => {
    const { args, callback } = a;
    return savePurchase(args, callback);
  });
}

export default mySaga;