import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

class CurrentPurchase extends React.PureComponent {
  action = () => {
    this.props.action();
  }
  render() {
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={this.action}
      >
        <Text style={styles.text}>{this.props.symbol}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '24%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fdb800',
    height: 40,
    borderRadius: 4,
  },
  text: {
    color: 'white',
  }
});

export default CurrentPurchase;