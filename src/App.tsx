import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { useScreens } from 'react-native-screens';
import { Login, AuthLoading, HomeScreen } from './screens';
import { Screens } from '@/constants';
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
			[Screens.AuthLoading]: AuthLoading,
			[Screens.App]: AppNavigator,
			[Screens.Auth]: AuthNavigator
		},
		{
			initialRouteName: Screens.AuthLoading
		}
	)
);

const App = () => {
	return <AppContainer />;
};

export default App;
