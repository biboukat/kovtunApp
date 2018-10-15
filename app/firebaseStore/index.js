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

function savePurchase (cache, reason) {
  const year = moment().format('YYYY');
  const month = moment().format('MMMM');
  const day = moment().format('D');
  const time = moment().format('h:mm:ss a');

  // const ref = firebase.database().ref('users').
  // orderByChild('email').
  // equalTo('alex@kovtun.com');
  return firebase.database().ref(`users/alex/${year}/${month}/${day}/${time}`).set({
    price: cache,
    reason,
  });
}

export { savePurchase, firebaseInit };