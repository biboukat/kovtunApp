import React from 'react';
import {
  ActivityIndicator,
  View,
  Text,
  StyleSheet,
  FlatList,
  SectionList,
  LayoutAnimation,
  TouchableOpacity,
} from "react-native";
import { getPurchaseHistoryByDay } from '~/firebaseStore';
import moment from 'moment';

class DisplaingHistory extends React.Component {
  static navigationOptions = {
      title: 'Purchase History',
      headerStyle: {
        backgroundColor: '#fdb800',
      },
      headerTintColor: '#fff',
  }

  constructor(props) {
    super(props);
    this.state = {
      list: [],
      showSpinner: true,
      selectedDay: this.props.navigation.getParam('selectedDay'),
    }
  }

  componentDidMount() {
    this.getByDay(this.props.navigation.getParam('selectedDay'));
  }
  
  getByDay = (date) => {
    const monthFullName = moment(date.timestamp).format('MMMM')
    const purchaseHistory = getPurchaseHistoryByDay(date.year, date.month, date.day);
    purchaseHistory.then((snapshot) => {
      const result = snapshot.val();
      const data =  result ? Object.values(result) : [];
      const totalPrice = data.reduce((a, b) => a + +b.price, 0);
      const list = [{ title: `${date.day} ${monthFullName}`, totalPrice, data}];
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      this.setState({ list, showSpinner: false });
    }).catch((e) => {
      this.setState({ showSpinner: false });
      console.log('bla e', e);
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <SectionList
          renderItem={({item, index, section}) => (
            <ItemElement
              navigation={this.props.navigation}
              item={item}
              index={index}
              selectedDay={this.state.selectedDay}
            />
          )}
          renderSectionHeader={({section: {title, totalPrice}}) => (
            <View style={styles.titleContainer}>
              <Text style={[styles.totalPrice, styles.title]}>{`${(+totalPrice).toFixed(2)} UAH`}</Text>
              <Text style={styles.title}>{title}</Text>
            </View>
          )}
          sections={this.state.list}
          keyExtractor={(item, index) => item + index}
        />
        {this.state.showSpinner &&
        <View style={styles.spinner}>
          <ActivityIndicator size="large" color="black" />
        </View>}
      </View>
    );
  }
}

class ItemElement extends React.PureComponent {
  goToEdit = () => {
    const { item: { price, reason, time }} = this.props;
    this.props.navigation.navigate('CurrentPurchase', {
      price,
      reason,
      time,
      edit: true,
    })
  }

  render() {
    const { index, item } = this.props;
    const time = moment(item.time).format('h:mm:ss a');
    return (
      <TouchableOpacity
        onPress={this.goToEdit}
      >
        <View key={index} style={styles.itemContainer}>
          <View style={styles.timePrice}>
            <Text style={[styles.textPrice, styles.text]}>{`${(+item.price).toFixed(2)} UAH`}</Text>
            <Text style={[styles.text, styles.timeText]}>{time}</Text>
          </View>
          <View style={styles.description}>
            <Text style={[styles.textReason, styles.text]}>{`${item.reason}`}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#bfb8b8',
    borderRadius: 4,
    padding: 5,
  },
  timePrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeText: {
    textAlign: 'right',
  },
  textReason: {
    fontSize: 17,
    marginLeft: 10,
    flex: 1,
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
  title: {
    color: 'white',
    fontSize: 21,
    textAlign: 'right',
  },
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
  container: {
    flex: 1, backgroundColor: '#72b1ab', padding: 5,
  },
});

export default DisplaingHistory