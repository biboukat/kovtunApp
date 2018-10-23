/* @flow */
import React, { Component } from 'react';
import { Text } from 'react-native';
import { store } from '~/store/configureStore';
import { Provider } from 'react-redux';
import createStackNavigator from '~/screens';
import firebase from 'firebase';
import { firebaseInit } from '~/firebaseStore';
import { isLoggedIn } from '~/selectors/auth';

const InitialScreen = createStackNavigator(isLoggedIn(store.getState()));

Text.defaultProps = { allowFontScaling: false };

firebaseInit();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <InitialScreen />
      </Provider>
    );
  }
}

export { firebase };
export default App;