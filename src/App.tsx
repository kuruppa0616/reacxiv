import React from 'react';
import {
	createStackNavigator,
	createAppContainer,
	createSwitchNavigator
} from 'react-navigation';

import { Login, AuthLoading, HomeScreen } from './screens';
import { Screens } from '@/constants';
import { IllustDetail } from './screens/DetailScreen';

const AuthNavigator = createStackNavigator({
	Login: Login
});

const AppNavigator = createStackNavigator(
	{
		[Screens.Home]: HomeScreen,
		[Screens.IllustDetail]: IllustDetail
	},
	{
		initialRouteName: Screens.Home
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
