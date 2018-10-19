import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

//components
import Calendar from './calendar';

class PurchaseHistory extends React.Component {
  static navigationOptions = {
      title: 'Select date',
      headerStyle: {
        backgroundColor: '#fdb800',
      },
      headerTintColor: '#fff',
  }

  constructor(props) {
    super(props);
    this.state = {}
  }

  selectedDay = (day) => {
    this.setState({ selectedDay: day });
  }

  goToDisplaingHistory = () => {
    this.props.navigation.navigate('DisplaingHistory', {
      selectedDay: this.state.selectedDay,
    })
  }

  render() {
    return (
      <View style={{ flex: 1 }}> 
        <ScrollView style={styles.container}>
          <Calendar
            selectedDay={this.selectedDay}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.getButton}
              onPress={this.goToDisplaingHistory}
            >
              <Text style={styles.getButtonText}>Get by day</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  timeText: {
    textAlign: 'right',
  },
  textReason: {
    fontSize: 17,
    marginLeft: 10,
  },
  textPrice: {
    fontWeight: 'bold',
  },
  text: {
    color: 'white',
  },
  description: {
    flexDirection: 'row',
    marginTop: 5,
    alignItems: 'center',
  },
  itemContainer: {
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#d6d7da',
    padding: 5,
    marginTop: 10,
  },
  getButton: {
    backgroundColor: '#fdb800',
    padding: 5,
    width: '45%',
    maxWidth: 200,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  buttonContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  getButtonText: {
    color: 'white',
    fontSize: 18,
  },
  container: {
    flex: 1, backgroundColor: '#72b1ab', padding: 5,
  },
});

export default PurchaseHistory