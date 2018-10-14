import React from 'react';
import { View, Text } from 'react-native';
import Cell from './cell';

class Row1 extends React.PureComponent {
  render() {
    return (
      <View style={this.props.style}>
        <Cell
          symbol={'AC'}
          action={this.props.clean}
        />
        <Cell
          symbol={'<'}
          action={this.props.deleteSymbol}
        />
        <Cell
          symbol={'/'}
          action={() => this.props.addOperation('/')}
        />
        <Cell
          symbol={'*'}
          action={() => this.props.addOperation('*')}
        />
      </View>
    );
  }
}

export default Row1;