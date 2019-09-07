import React from 'react';
import Top from './Top';
import Recommend from './Recommend';
import New from './New';
import { createBottomTabNavigator, BottomTabBar, BottomTabBarProps } from 'react-navigation-tabs';
import { Screens } from '@/constants';
import Icon from 'react-native-vector-icons/FontAwesome';

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
