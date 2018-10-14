import * as firebase from 'firebase';
import moment from 'moment';

function savePurchase (cache, reason) {
  console.log(cache, reason);
  const year = moment().format('YYYY');
  const month = moment().format('MMMM');
  const day = moment().format('D');
  const time = moment().format('h:mm:ss a');

  // const ref = firebase.database().ref('users').
  // orderByChild('email').
  // equalTo('alex@kovtun.com');
  firebase.database().ref(`users/alex/${year}/${month}/${day}/${time}`).set({
    price: cache,
    reason,
  });
}

export { savePurchase };