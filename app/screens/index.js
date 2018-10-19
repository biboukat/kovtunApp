import { createStackNavigator } from 'react-navigation';
import Home from './homeScreen';
import Details from './detailsScreen';
import CurrentPurchase from '~/screens/currentPurchase';
import PurchaseHistory from '~/screens/purchaseHistory';
import DisplaingHistory from '~/screens/purchaseHistory/displaingHistory';

export default createStackNavigator(
  {
    Home,
    Details,
    CurrentPurchase,
    PurchaseHistory,
    DisplaingHistory,
  },
  {
    initialRouteName: 'Home',
  },
);
