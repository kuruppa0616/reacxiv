import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
	BottomTabBar,
	BottomTabBarProps,
	createBottomTabNavigator
} from 'react-navigation-tabs';

import { Screens } from '@/constants';

import New from './New';
import Recommend from './Recommend';
import Top from './Top';

const TabBarComponent = (props: BottomTabBarProps) => <BottomTabBar {...props} />;

const TabNavigator = createBottomTabNavigator(
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
		tabBarComponent: (props: BottomTabBarProps) => (
			<TabBarComponent {...props} style={{ borderTopColor: '#605F60' }} />
		),
		// header非表示
		navigationOptions: () => ({
			header: null
		}),
		defaultNavigationOptions: ({ navigation }) => ({
			tabBarIcon: () => {
				const { routeName } = navigation.state;
				const IconName = getIconByRouteName(routeName);
				return <Icon name={IconName} size={25} />;
			}
		})
	}
);

const getIconByRouteName = (routeName: string) => {
	switch (routeName) {
		case Screens.Top:
			return 'home';
		case Screens.Recommend:
			return 'star';
		default:
			return 'feed';
	}
};

export default TabNavigator;
