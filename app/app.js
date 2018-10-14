/* @flow */
import React, { Component } from 'react';
import { StyleSheet, Text, View, AsyncStorage, NativeModules } from 'react-native';
import { persistStore } from 'redux-persist';
import { store, persistor } from './store/configureStore';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import InitialScreen from '~/screens';
import * as firebase from 'firebase';

Text.defaultProps = { allowFontScaling: false };

const config = {
  apiKey: "AIzaSyD5crgaKzkZyORAal51F9p-MZnkJErSZAc",
  authDomain: "kovtun-88fbe.firebaseapp.com",
  databaseURL: "https://kovtun-88fbe.firebaseio.com",
  projectId: "kovtun-88fbe",
  storageBucket: "kovtun-88fbe.appspot.com",
  messagingSenderId: "482556730535"
};
firebase.initializeApp(config);

class App extends Component<{}> {
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