import { firebase } from '~/app';
import moment from 'moment';
import { initAuthFirebase } from './auth';

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
  initAuthFirebase(firebase);
}

function getPurchaseHistoryByDay (year, month, day) {
  return firebase.database().ref(`users/max/${year}/${month}/${day}`).once('value');
}

function savePurchaseFirebase (price, reason, date) {
  const year = moment(date).format('YYYY');
  const month = moment(date).format('M');
  const day = moment(date).format('D');
  const time = moment(date).format('h:mm:ss a');
  return firebase.database().ref(`users/max/${year}/${month}/${day}/${time}`).set({
    price,
    reason,
    time: moment(date)._d.valueOf(),
  });
}

// function getPurchaseHistoryByRange (datesArray) {
//   // console.log('tic');
//   try {
//     var ref = firebase.database().ref(`users/alex/${2018}/${'bla'}`);
//     ref.orderByKey().startAt('15').endAt('22').on('child_added', function(snapshot) {
//       // This will be called exactly two times (unless there are less than two
//       // dinosaurs in the Database).
  
//       // It will also get fired again if one of the first two dinosaurs is
//       // removed from the data set, as a new dinosaur will now be the second
//       // shortest.
//       // console.log(snapshot.key);
//     });
//   } catch (error) {
//     // console.log('error', error);
//   }
// }

export { savePurchaseFirebase, firebaseInit, getPurchaseHistoryByDay };