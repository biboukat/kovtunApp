import React from 'react';
import { View, Text } from 'react-native';
import Cell from './cell';

class Row3 extends React.PureComponent {
  render() {
    return (
      <View style={this.props.style}>
        <Cell
          symbol={'4'}
          action={() => this.props.addNumber('4')}
        />
        <Cell
          symbol={'5'}
          action={() => this.props.addNumber('5')}
        />
        <Cell
          symbol={'6'}
          action={() => this.props.addNumber('6')}
        />
        <Cell
          symbol={'-'}
          action={() => this.props.addOperation('-')}
        />
      </View>
    );
  }
}

export default Row3;