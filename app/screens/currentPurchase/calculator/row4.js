import React from 'react';
import { View, Text } from 'react-native';
import Cell from './cell';

class Row4 extends React.PureComponent {
  render() {
    return (
      <View style={this.props.style}>
        <Cell
          symbol={'1'}
          action={() => this.props.addNumber('1')}
        />
        <Cell
          symbol={'2'}
          action={() => this.props.addNumber('2')}
        />
        <Cell
          symbol={'3'}
          action={() => this.props.addNumber('3')}
        />
        <Cell
          symbol={'='}
          action={this.props.toEqual}
        />
      </View>
    );
  }
}

export default Row4;