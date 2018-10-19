import * as types from '~/shared/actionTypes';

export function savePurchase(args, callback) {
  return {
    type: types.SAVE_PURCHASE,
    args,
    callback,
  };
}

export function editPurchase(args, callback) {
  return {
    type: types.SAVE_PURCHASE,
    args,
    callback,
  };
}