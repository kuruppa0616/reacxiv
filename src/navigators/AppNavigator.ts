import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Screens } from '@/constants';

import { AuthCheck, Login } from '@/screens';
import { IllustDetailScreen, UserDetailScreen } from '@/screens/DetailScreen';
import New from '@/screens/HomeScreen/New';
import Recommend from '@/screens/HomeScreen/Recommend';
import HomeScreenTabNavigator from '@/navigators/HomeScreenTabNavigator';

const AppDrawer = createDrawerNavigator({
	Home: HomeScreenTabNavigator,
	NewScreen: New,
	RecommendScreen: Recommend,
});

const AppStack = createStackNavigator(
	{
		[Screens.AppDrawer]: AppDrawer,
		[Screens.IllustDetail]: IllustDetailScreen,
		[Screens.UserDetail]: UserDetailScreen
	},
	{
		initialRouteName: Screens.AppDrawer,
		headerMode: 'none'
	}
);

const AppSwitch = createSwitchNavigator(
	{
		[Screens.AppStack]: AppStack,
		[Screens.AuthCheck]: AuthCheck,
		[Screens.Login]: Login
	},
	{
		initialRouteName: Screens.AuthCheck
	}
);

const AppContainer = createAppContainer(AppSwitch as any);

export default AppContainer;
