import { createStackNavigator } from 'react-navigation';
import HomeScreen from './homeScreen';
import DetailsScreen from './detailsScreen';

export default createStackNavigator(
  {
    Home: HomeScreen,
    Details: DetailsScreen,
  },
  {
    initialRouteName: 'Home',
  },
);
