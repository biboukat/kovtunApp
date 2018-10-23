import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

class Auth extends React.Component {
  static navigationOptions = {
    // header: null,
    headerStyle: {
      backgroundColor: '#72b1ab',
    },
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Auth</Text>
        <TouchableOpacity
            style={styles.button}
            onPress={() => {}}
          >
            <Text style={styles.buttonText}>Auth by phone</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={styles.button}
            onPress={() => {}}
          >
          <Text style={styles.buttonText}>Auth by google</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#72b1ab',
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#fdb800',
    padding: 5,
    width: '45%',
    maxWidth: 200,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default Auth