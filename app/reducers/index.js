import { combineReducers } from 'redux';

import savedPurchase from '~/reducers/savedPurchase';

const rootReducer = combineReducers({
  savedPurchase,
});

export default rootReducer;