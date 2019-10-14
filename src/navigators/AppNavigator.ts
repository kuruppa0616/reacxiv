import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Screens } from '@/constants';

import { AuthCheck, Login } from '@/screens';
import { IllustDetailScreen, UserDetailScreen } from '@/screens/DetailScreen';
import New from '@/screens/HomeScreen/New';
import Recommend from '@/screens/HomeScreen/Recommend';
import HomeScreenTabNavigator from '@/navigators/HomeScreenTabNavigator';
import { IllustViewerScreen } from '@/screens/ViewerScreen';

const AppDrawer = createDrawerNavigator({
	[Screens.AppStacks.AppDrawers.HomeTabs.HomeTab]: HomeScreenTabNavigator,
	NewScreen: New,
	RecommendScreen: Recommend,
});

const AppStack = createStackNavigator(
	{
		[Screens.AppStacks.AppDrawers.AppDrawer]: AppDrawer,
		[Screens.AppStacks.Details.IllustDetail]: IllustDetailScreen,
		[Screens.AppStacks.Details.UserDetail]: UserDetailScreen,
		[Screens.AppStacks.Viewer.IllustViewer]:IllustViewerScreen
	},
	{
		initialRouteName: Screens.AppStacks.AppDrawers.AppDrawer,
		headerMode: 'none'
	}
);

const AppSwitch = createSwitchNavigator(
	{
		[Screens.AppStacks.AppStack]: AppStack,
		[Screens.AuthCheck]: AuthCheck,
		[Screens.Login]: Login
	},
	{
		initialRouteName: Screens.AuthCheck
	}
);

const AppContainer = createAppContainer(AppSwitch as any);

export default AppContainer;
