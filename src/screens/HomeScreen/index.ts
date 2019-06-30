import React from 'react';
import Top from './Top';
import Recommend from './Recommend';
import New from './New';
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation';
import { Screens } from '@/constants';

const TabNavigator = createBottomTabNavigator(
	{
		[Screens.Top]: Top,
		[Screens.Recommend]: Recommend,
		[Screens.New]: New,
	},
	{
		tabBarOptions: {
			activeTintColor: 'blue',
			inactiveTintColor: 'gray'
		},
		initialRouteName: Screens.New,
		defaultNavigationOptions: ({ navigation }) => ({}),
		// header非表示
		navigationOptions: () => ({
			header: null
		})
	}
);

export default TabNavigator;
