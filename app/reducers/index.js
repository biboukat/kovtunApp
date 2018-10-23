import { combineReducers } from 'redux';

import savedPurchase from '~/reducers/savedPurchase';
import auth from '~/reducers/auth';

const rootReducer = combineReducers({
  savedPurchase,
  auth,
});

export default rootReducer;