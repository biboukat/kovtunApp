import React from 'react';
import {
  ActivityIndicator,
  View,
  Text,
  StyleSheet,
  FlatList,
  SectionList,
  LayoutAnimation,
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
    }
  }

  componentDidMount() {
    this.getByDay(this.props.navigation.getParam('selectedDay'));
  }
  
  getByDay = (date) => {
    const month = moment(date.timestamp).format("MMMM");
    const purchaseHistory = getPurchaseHistoryByDay(date.year, month, date.day);
    purchaseHistory.then((snapshot) => {
      // var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
      
      const result = snapshot.val();
      const data =  result ? Object.values(result) : [];
      const totalPrice = data.reduce((a, b) => a + +b.price, 0);
      const list = [{ title: `${date.day} ${month}`, totalPrice, data}];
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      this.setState({ list, showSpinner: false });
      console.log('bla', list);
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
              item={item}
              index={index}
            />
          )}
          renderSectionHeader={({section: {title, totalPrice}}) => (
            <View style={styles.titleContainer}>
              <Text style={[styles.totalPrice, styles.title]}>{`${totalPrice} UAH`}</Text>
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
  render() {
    const { index, item } = this.props;
    return (
      <View key={index} style={styles.itemContainer}>
        <View style={styles.time}>
          <Text style={[styles.text, styles.timeText]}>{item.time}</Text>
        </View>
        <View style={styles.description}>
          <Text style={[styles.textPrice, styles.text]}>{`${item.price} UAH`}</Text>
          <Text style={[styles.textReason, styles.text]}>{`${item.reason}`}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
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