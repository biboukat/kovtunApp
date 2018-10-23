import * as types from '~/shared/actionTypes';
function savedPurchase (state = {}, action) {
  switch (action.type) {
  case types.SAVE_PURCHASE_START:
    return {
      currentPurchase: {
        price: action.price,
        reason: action.reason,
      },
    };
  case types.SAVE_PURCHASE_EDIT_START:
    return {
      editPurchase: {
        price: action.price,
        reason: action.reason,
      },
    };
  default:
    return state;
  }
}

export default savedPurchase;
