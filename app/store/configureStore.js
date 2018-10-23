import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import { createOffline } from '@redux-offline/redux-offline';
import { composeWithDevTools } from 'redux-devtools-extension';
import offlineConfig from '@redux-offline/redux-offline/lib/defaults';
import * as reducers from '~/reducers';
import initialSaga from '~/sagas';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';

const logger = createLogger({});

const sagaMiddleware = createSagaMiddleware();
const rootReducer = combineReducers(reducers);

let immutableStateInvariant;
if (window.__DEV__) { // eslint-disable-line no-underscore-dangle
  immutableStateInvariant = require('redux-immutable-state-invariant').default(); // eslint-disable-line import/no-extraneous-dependencies
}

const middlewareList = window.__DEV__ // eslint-disable-line no-underscore-dangle
  ? [sagaMiddleware, immutableStateInvariant, logger]
  : [sagaMiddleware];
// const middlewareList = [
//   /* other middleware here */
//   sagaMiddleware
// ];

const {
  middleware: offlineMiddleware,
  enhanceReducer,
  enhanceStore
} = createOffline(offlineConfig);
const middleware = applyMiddleware(...middlewareList, offlineMiddleware);

const composer = window.__DEV__ // eslint-disable-line no-underscore-dangle
  ? composeWithDevTools
  : compose;

const store = createStore(enhanceReducer(rootReducer), composer(enhanceStore, middleware));
sagaMiddleware.run(initialSaga);
export { store };