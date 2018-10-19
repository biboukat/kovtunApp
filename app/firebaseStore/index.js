import { firebase } from '../app.js';
import moment from 'moment';

const config = {
  apiKey: 'AIzaSyD5crgaKzkZyORAal51F9p-MZnkJErSZAc',
  authDomain: 'kovtun-88fbe.firebaseapp.com',
  databaseURL: 'https://kovtun-88fbe.firebaseio.com',
  projectId: 'kovtun-88fbe',
  storageBucket: 'kovtun-88fbe.appspot.com',
  messagingSenderId: '482556730535',
};
function firebaseInit () {
  firebase.initializeApp(config);
}

function savePurchase (price, reason) {
  const year = moment().format('YYYY');
  const month = moment().format('M');
  const day = moment().format('D');
  const time = moment().format('h:mm:ss a');

  // const ref = firebase.database().ref('users').
  // orderByChild('email').
  // equalTo('alex@kovtun.com')`
  return firebase.database().ref(`users/alex/${year}/${month}/${day}/${time}`).set({
    price,
    reason,
    time,
  });
}

function getPurchaseHistoryByRange (datesArray) {
  console.log('tic');
  try {
    var ref = firebase.database().ref(`users/alex/${2018}/${'bla'}`);
    ref.orderByKey().startAt('15').endAt('22').on('child_added', function(snapshot) {
      // This will be called exactly two times (unless there are less than two
      // dinosaurs in the Database).
  
      // It will also get fired again if one of the first two dinosaurs is
      // removed from the data set, as a new dinosaur will now be the second
      // shortest.
      console.log(snapshot.key);
    });
  } catch (error) {
    console.log('error', error);
  }
}

function getPurchaseHistoryByDay (year, month, day) {
  // const res = firebase.database().ref(`users/alex/${year}/${month}`).startAt(15).once('value');
  // res.then((bla) => {
  //   console.log('bla ', bla.val());
  // });
  return firebase.database().ref(`users/alex/${year}/${month}/${day}`).once('value');
}

export { savePurchase, firebaseInit, getPurchaseHistoryByDay, getPurchaseHistoryByRange };