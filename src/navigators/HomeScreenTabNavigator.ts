import { createBottomTabNavigator } from 'react-navigation-tabs';

import { Screens } from '@/constants';

import New from '@/screens/HomeScreen/New';
import Recommend from '@/screens/HomeScreen/Recommend';
import Top from '@/screens/HomeScreen/Top';
import { TabBarIcon } from '@/components/BottomTabBar';

const HomeScreenTabNavigator = createBottomTabNavigator(
	{
		[Screens.Top]: Top,
		[Screens.Recommend]: Recommend,
		[Screens.New]: New
	},
	{
		tabBarOptions: {
			activeTintColor: 'blue',
			inactiveTintColor: 'gray'
		},
		initialRouteName: Screens.New,
		// header非表示
		navigationOptions: () => ({
			header: null
		}),
		defaultNavigationOptions: ({ navigation }) => ({
			tabBarIcon: TabBarIcon({ navigation })
		})
	}
);

export default HomeScreenTabNavigator;
