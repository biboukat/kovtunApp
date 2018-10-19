import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Row1 from './row1';
import Row2 from './row2';
import Row3 from './row3';
import Row4 from './row4';
import Row5 from './row5';
class Calculator extends React.PureComponent {
  render() {
    console.log('bla render calculator, it is bad');
    return (
      <View style={styles.container}>
        <Row1
          style={styles.row}
          clean={this.props.clean}
          deleteSymbol={this.props.deleteSymbol}
          addOperation={this.props.addOperation}
        />
        <Row2
          style={styles.row}
          addNumber={this.props.addNumber}
          addOperation={this.props.addOperation}
        />
        <Row3
          style={styles.row}
          addNumber={this.props.addNumber}
          addOperation={this.props.addOperation}
        />
        <Row4
          style={styles.row}
          addNumber={this.props.addNumber}
          toEqual={this.props.toEqual}
        />
        <Row5
          style={styles.row}
          addNumber={this.props.addNumber}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    marginBottom: 5,
  },
  cachSumm: {
    color: 'white',
  },
  title: {
    color: 'white',
    // fontWeight: 'bold',
    fontSize: 19,
    paddingBottom: 10,
    textAlign: 'center'
  },
  cashText: {
    color: 'white', textAlign: 'right', paddingBottom: 5,
  },
  cachContainer: {
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#d6d7da',
    padding: 5,
  },
  // title: {
  //   fontSize: 19,
  //   fontWeight: 'bold',
  // },
  activeTitle: {
    color: 'red',
  },
});

export default Calculator;