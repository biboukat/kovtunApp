import { takeEvery } from 'redux-saga/effects';

import * as types from '~/shared/actionTypes';
import { savePurchaseNew, savePurchaseEdit } from './savePurchase';

function *mySaga() {
  yield takeEvery(types.SAVE_PURCHASE, (a) => {
    const { args, callback } = a;
    console.log('bla', args, a);
    return args.isEditing ?
      savePurchaseEdit(args, callback) :
      savePurchaseNew(args, callback);
  });
}

export default mySaga;