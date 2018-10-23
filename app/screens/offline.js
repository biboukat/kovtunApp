import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';


//Store
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { saveOffLine } from '~/actions/purchaseOperation';

class Offline extends React.Component {

  savePurchase = () => {
    this.props.saveOffLine();
    // this.props.save({ price, reason, isEditing }, this.goBack);
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>{`busy: ${this.props.busy}`}</Text>
        <Text>{`lastTransaction: ${this.props.lastTransaction}`}</Text>
        <Text>{`online: ${this.props.online}`}</Text>
        <Text>{`retryCount: ${this.props.retryCount}`}</Text>
        <Text>{`retryScheduled: ${this.props.retryScheduled}`}</Text>
        <Text>{`outbox: ${this.props.outbox.length}`}</Text>
        <TouchableOpacity
          onPress={this.savePurchase}
        >
          <View>
            <Text>New action</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}


export default connect(
  state => ({
    busy: state.offline.busy,
    lastTransaction: state.offline.lastTransaction,
    online: state.offline.online,
    retryCount: state.offline.retryCount,
    retryScheduled: state.offline.retryScheduled,
    outbox: state.offline.outbox,

  }),
  dispatch => ({
    saveOffLine: bindActionCreators( saveOffLine, dispatch),
  }),
)(Offline);