/* @flow */
import React, { Component } from 'react';
import { StyleSheet, Text, View, AsyncStorage, Button } from 'react-native';
import { persistStore } from 'redux-persist';
import { store, persistor } from './store/configureStore';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

Text.defaultProps = { allowFontScaling: false };

class App extends Component<{}> {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <View style={styles.container}>
            <Text style={styles.welcome}>{store.getState().first.count}</Text>
            <Text style={styles.instructions}>To get started, edit App.js</Text>
            <Text style={styles.instructions}>Hi poc</Text>
            <Button
              title="Change store"
              onPress={() => store.dispatch({type: 'START_SAGA'})}
            />
          </View>
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