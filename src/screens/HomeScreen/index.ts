import Top from './Top';
import Recommend from './Recommend';
import New from './New';
import { createBottomTabNavigator } from 'react-navigation';
import { Screens } from '@/constants';

const TabNavigator = createBottomTabNavigator(
	{
		[Screens.Top]: Top,
		[Screens.Recommend]: Recommend,
		[Screens.New]: New
	},
	{
		tabBarOptions: {
			activeTintColor: 'tomato',
			inactiveTintColor: 'gray'
		}
	}
);

export default TabNavigator;
