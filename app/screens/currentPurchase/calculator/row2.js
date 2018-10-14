import React from 'react';
import { View, Text } from 'react-native';
import Cell from './cell';

class Row2 extends React.PureComponent {
  render() {
    return (
      <View style={this.props.style}>
        <Cell
          symbol={'7'}
          action={() => this.props.addNumber('7')}
        />
        <Cell
          symbol={'8'}
          action={() => this.props.addNumber('8')}
        />
        <Cell
          symbol={'9'}
          action={() => this.props.addNumber('9')}
        />
        <Cell
          symbol={'+'}
          action={() => this.props.addOperation('+')}
        />
      </View>
    );
  }
}

export default Row2;