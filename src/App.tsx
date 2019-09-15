import React from 'react';
import { useScreens } from 'react-native-screens';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import { Root } from 'native-base';

import { Screens } from '@/constants';

import { AuthCheck, HomeScreen, Login } from './screens';
import { IllustDetail, UserDetail } from './screens/DetailScreen';

useScreens();

const AuthNavigator = createStackNavigator({
	Login: Login
});

const AppNavigator = createStackNavigator(
	{
		[Screens.Home]: HomeScreen,
		[Screens.IllustDetail]: IllustDetail,
		[Screens.UserDetail]: UserDetail
	},
	{
		initialRouteName: Screens.Home,
		defaultNavigationOptions: () => ({
			headerTransparent: true,
			headerStyle: {
				borderBottomWidth: 0
			}
		})
	}
);

const AppContainer = createAppContainer(
	createSwitchNavigator(
		{
			[Screens.AuthCheck]: AuthCheck,
			[Screens.App]: AppNavigator,
			[Screens.Auth]: AuthNavigator
		},
		{
			initialRouteName: Screens.AuthCheck
		}
	)
);

const App = () => {
	return (
		<Root>
			<AppContainer />
		</Root>
	);
};

export default App;
