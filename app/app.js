/* @flow */
import React, { Component } from 'react';
import { StyleSheet, Text} from 'react-native';
import { store, persistor } from './store/configureStore';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import InitialScreen from '~/screens';
import firebase from 'firebase';

export { firebase };
import { firebaseInit } from './firebaseStore';

Text.defaultProps = { allowFontScaling: false };

firebaseInit();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <InitialScreen />
        </PersistGate>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default App;