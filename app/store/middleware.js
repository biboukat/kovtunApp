import { compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

const logger = createLogger({});
const sagaMiddleware = createSagaMiddleware();

let immutableStateInvariant;
if (window.__DEV__) { // eslint-disable-line no-underscore-dangle
  immutableStateInvariant = require('redux-immutable-state-invariant').default(); // eslint-disable-line import/no-extraneous-dependencies
}
const middleware = window.__DEV__ // eslint-disable-line no-underscore-dangle
  ? [sagaMiddleware, immutableStateInvariant, logger]
  : [sagaMiddleware];

const composer = window.__DEV__ // eslint-disable-line no-underscore-dangle
  ? composeWithDevTools
  : compose;

export { middleware, composer, sagaMiddleware };
