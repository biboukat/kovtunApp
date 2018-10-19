import React from 'react';
import { View, Text, Button, StyleSheet, TextInput, ActivityIndicator, TouchableOpacity, Keyboard } from 'react-native';
import moment from 'moment';

//Store
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { savePurchase, editPurchase } from '~/actions/purchaseOperation';

import Calculator from './calculator';

class CurrentPurchase extends React.Component {
  static navigationOptions = ({ navigation }) => (
    {
      title: 'Current purchase',
      headerStyle: {
        backgroundColor: '#fdb800',
      },
      headerTintColor: '#fff',
      headerRight: (
        <TouchableOpacity
          style={styles.save}
          onPress={navigation.getParam('save')}
        >
          <Text style={styles.saveBtnText}>Save</Text>
        </TouchableOpacity>
      ),
    }
  )

  constructor (props) {
    super(props);
    const price = this.props.navigation.getParam('price', '');
    const reason = this.props.navigation.getParam('reason', '');
    const time = this.props.navigation.getParam('time', '');
    const isEditing = this.props.navigation.getParam('edit', false);
    const selectedDay = this.props.navigation.getParam('selectedDay', '');
    this.state = {
      total: '',
      price,
      currentOperation: '',
      isNewNumber: false,
      saving: false,
      isEditing,
      selectedDay,
      time,
      reason,
    };
  }


  componentDidMount() {
    this.props.navigation.setParams({ save: this.save });
  }
  
  save = () => {
    this.setState({ saving: true });
    Keyboard.dismiss();
    this.state.isEditing ? 
      this.editPurchase() :
      this.savePurchase();
  }

  savePurchase = () => {
    const { price, isEditing, reason } = this.state;
    this.props.save({ price, reason, isEditing }, this.goBack);
  }
  
  editPurchase = () => {
    const { price, isEditing, time, selectedDay, reason } = this.state;
    const currentDate = moment(selectedDay.timestamp);
    this.props.edit({ price, reason, currentDate, time, isEditing }, this.goBack);
  }

  goBack = () => {
    this.props.navigation.goBack();
  }

  clean = () => {
    this.setState({ price: '', total: '' });
  }

  doOperation = () => {
    const { currentOperation, total, price } = this.state;
    let totalNum;
    switch (currentOperation) {
      case '+':
        totalNum= (+total + +price) + '';
        break;
      case '-':
        totalNum= (+total - +price) + '';
        break;
      case '/':
        totalNum= (+total / +price) + '';
        break;
      case '*':
        totalNum= (+total * +price) + '';
        break;
    }
    this.setState({ price: totalNum, total: totalNum });
  }

  addOperation = (operation) => {
    const { price, currentOperation } = this.state;
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
    const { price, isNewNumber } = this.state;
    if (isNewNumber) {
      this.setState({
        price: x,
        isNewNumber: false,
      });
    } else {
      this.setState({
        price: price + x,
      });
    }
  }

  deleteSymbol = () => {
    this.setState({
      price: this.state.price.slice(0, -1),
    });
  }

  toBuffer = () => {
    this.setState({
      total: this.state.price,
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <View style={styles.inputsContainer}>
            <Text style={styles.cashText}>Cach</Text>
            <View style={styles.cachContainer}>
              <Text style={styles.cachSumm}>{this.state.price}</Text>
            </View>
          </View>
          <View style={styles.inputsContainer}>
            <Text style={styles.cashText}>Reason</Text>
            <TextInput
              style={styles.reason}
              value={this.state.reason}
              onChangeText={(text) => this.setState({ reason: text })}
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
        {this.state.saving && 
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
    fontSize: 19,
    paddingBottom: 10,
    textAlign: 'center'
  },
  cashText: {
    color: 'white', textAlign: 'right', paddingBottom: 5,
  },
  save: {
    marginRight: 5,
    padding: 8,
    borderRadius: 10,
    borderColor: 'white',
    borderWidth: 1,
  },
  saveBtnText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    
  },
  cachContainer: {
    height: 31,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#d6d7da',
    padding: 5,
  },
});

export default connect(
  state => ({
    saving: state.savedPurchase.saving,
  }),
  dispatch => ({
    save: bindActionCreators( savePurchase, dispatch),
    edit: bindActionCreators( editPurchase, dispatch),
  }),
)(CurrentPurchase);