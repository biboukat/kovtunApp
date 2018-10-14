import React from 'react';
import { View, Text } from 'react-native';
import Cell from './cell';

class Row4 extends React.PureComponent {
  render() {
    return (
      <View style={this.props.style}>
        <Cell
          symbol={''}
        />
        <Cell
          symbol={'0'}
          action={() => this.props.addNumber('0')}
        />
        <Cell
          symbol={'.'}
          action={() => this.props.addNumber('.')}
        />
        <Cell
          symbol={''}
        />
      </View>
    );
  }
}

export default Row4;