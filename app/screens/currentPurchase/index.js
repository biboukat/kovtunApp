import React from 'react';
import { View, Text, Button, StyleSheet, TextInput, ActivityIndicator } from 'react-native';
import Calculator from './calculator';
import { savePurchase } from '~/firebaseStore';

class CurrentPurchase extends React.Component {
  static navigationOptions = ({ navigation }) => (
    {
      title: 'Current purchase',
      headerStyle: {
        backgroundColor: '#fdb800',
      },
      headerTintColor: '#fff',
      headerRight: (
        <Button
          onPress={navigation.getParam('save')}
          title="Save"
          color="black"
        />
      ),
    }
  )

  constructor (props) {
    super(props);
    this.state = {
      total: '',
      current: '',
      currentOperation: '',
      isNewNumber: false,
      showSpinner: false,
    };
    this.reason = '';
  }


  componentDidMount() {
    this.props.navigation.setParams({ save: this.save });
  }

  setSpinner = (val) => {
    this.setState({
      showSpinner: val,
    });
  }

  save = () => {
    this.setSpinner(true);
    savePurchase(this.state.current, this.reason).then((res) => {
      this.setSpinner(false);
      this.props.navigation.goBack();
    }).catch((e) => {
      this.setSpinner(false);
      console.log('bla error', e);
    });
  }

  clean = () => {
    this.setState({ current: '', total: '' });
  }

  doOperation = () => {
    const { currentOperation, total, current } = this.state;
    let totalNum;
    switch (currentOperation) {
      case '+':
        totalNum= (+total + +current) + '';
        break;
      case '-':
        totalNum= (+total - +current) + '';
        break;
      case '/':
        totalNum= (+total / +current) + '';
        break;
      case '*':
        totalNum= (+total * +current) + '';
        break;
    }
    this.setState({ current: totalNum, total: totalNum });
  }

  addOperation = (operation) => {
    const { current, currentOperation } = this.state;
    if (currentOperation.length) {
      this.doOperation();
    } else {
      this.toBuffer();
    }
    this.setState({ currentOperation: operation, isNewNumber: true });
  }
  
  toEqual = () => {
    const { currentOperation } = this.state;
    if (currentOperation.length) {
      this.doOperation();
      this.setState({ currentOperation: '', isNewNumber: true });

    }
  }

  addNumber = (x) => {
    const { current, isNewNumber } = this.state;
    if (isNewNumber) {
      this.setState({
        current: x,
        isNewNumber: false,
      });
    } else {
      this.setState({
        current: current + x,
      });
    }
  }

  deleteSymbol = () => {
    this.setState({
      current: this.state.current.slice(0, -1),
    });
  }

  toBuffer = () => {
    this.setState({
      total: this.state.current,
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <View style={styles.inputsContainer}>
            <Text style={styles.cashText}>Cach</Text>
            <View style={styles.cachContainer}>
              <Text style={styles.cachSumm}>{this.state.current}</Text>
            </View>
          </View>
          <View style={styles.inputsContainer}>
            <Text style={styles.cashText}>Reason</Text>
            <TextInput
              style={styles.reason}
              onChangeText={(text) => {
                this.reason = text;
              }}
              multiline
            />
          </View>
          <Calculator
            clean={this.clean}
            addNumber={this.addNumber}
            deleteSymbol={this.deleteSymbol}
            addOperation={this.addOperation}
            toEqual={this.toEqual}
          />
        </View>
        {this.state.showSpinner && 
        <View style={styles.spinner}>
          <ActivityIndicator size="large" color="black" />
        </View>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  spinner: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputsContainer: {
    marginBottom: 10,
  },
  container: {
    flex: 1, backgroundColor: '#72b1ab', padding: 5,
  },
  reason: {
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#d6d7da',
    padding: 5,
    color: 'white',
    height: 82,
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
    height: 31,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#d6d7da',
    padding: 5,
  },
});

export default CurrentPurchase;