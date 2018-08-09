import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import { AsyncStorage } from 'react-native';
import { middleware, composer, sagaMiddleware } from './middleware';
import initialSaga from '~/sagas';
import rootReducer from './reducers';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};
const initialState = {};

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(
  persistedReducer,
  initialState,
  composer(
    applyMiddleware(...middleware),
  )
);
sagaMiddleware.run(initialSaga);

  declare var module: {
    hot: {
      accept(callback: () => void): void,
    },
  };
  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = rootReducer;
      store.replaceReducer(nextRootReducer);
    });
  }

const persistor = persistStore(store);
export { store, persistor }