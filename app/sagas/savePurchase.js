import * as types from '~/shared/actionTypes';
import { put, call } from 'redux-saga/effects';
import { savePurchaseFirebase } from '~/firebaseStore';

function *savePurchase(args, callback) {
  const { price, reason, date } = args;
  yield put({ type: types.SAVE_PURCHASE_START, price, reason });
  const resp = yield call(savePurchaseFirebase, price, reason, date);
  yield put({ type: types.SAVE_PURCHASE_END, resp });
  if (callback) {
    yield call(callback);
  }
}

export { savePurchase };