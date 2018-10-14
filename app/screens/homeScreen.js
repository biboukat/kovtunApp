import React from 'react';
import { View, Text, Button } from 'react-native';

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Spender money</Text>
        <Button
          title="Current purchase"
          onPress={() => this.props.navigation.navigate('CurrentPurchase')}
        />
      </View>
    );
  }
}

export default HomeScreen