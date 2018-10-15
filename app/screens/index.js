import { createStackNavigator } from 'react-navigation';
import Home from './homeScreen';
import Details from './detailsScreen';
import CurrentPurchase from './currentPurchase';

export default createStackNavigator(
  {
    Home,
    Details,
    CurrentPurchase,
  },
  {
    initialRouteName: 'Home',
  },
);
