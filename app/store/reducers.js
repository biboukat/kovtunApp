import { combineReducers } from 'redux';

import first from '../reducers/first.js';

const rootReducer = combineReducers({
  first,
});

export default rootReducer;
