import { createStackNavigator } from 'react-navigation';
import Home from './homeScreen';
import CurrentPurchase from '~/screens/currentPurchase';
import PurchaseHistory from '~/screens/purchaseHistory';
import DisplaingHistory from '~/screens/purchaseHistory/displaingHistory';
import Auth from '~/screens/auth';

export default (isLoggenIn) => {
  return createStackNavigator(
    {
      Home,
      CurrentPurchase,
      PurchaseHistory,
      DisplaingHistory,
      Auth,
    },
    {
      initialRouteName: isLoggenIn ? 'Home' : 'Auth',
    },
  );
};

