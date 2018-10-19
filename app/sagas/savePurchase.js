import * as types from '~/shared/actionTypes';
import { put, call } from 'redux-saga/effects';
import { savePurchaseFirebase, editPurchaseFirebase } from '~/firebaseStore';

function *savePurchaseNew(args, callback) {
  const { price, reason } = args;
  yield put({ type: types.SAVE_PURCHASE_NEW_START, price, reason });
  const resp = yield call(savePurchaseFirebase, price, reason);
  yield put({ type: types.SAVE_PURCHASE_NEW_END, resp });
  yield call(callback);
}

function *savePurchaseEdit(args, callback) {
  const { price, reason, date, time } = args;
  yield put({ type: types.SAVE_PURCHASE_EDIT_START, args });
  const resp = yield call(editPurchaseFirebase, price, reason, date, time);
  yield put({ type: types.SAVE_PURCHASE_EDIT_END, resp });
  yield call(callback);
}

export { savePurchaseNew, savePurchaseEdit };