import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Screens } from '@/constants';

import { AuthCheck, HomeScreen, Login } from '@/screens';
import { IllustDetail, UserDetail } from '@/screens/DetailScreen';
import { CustomDrawer } from '@/components/Drawer';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

const AppDrawer = createDrawerNavigator(
	{
		Home: HomeScreen,
	},
	{
		unmountInactiveRoutes: true,
		contentComponent: CustomDrawer
	}
);

const AppStack = createStackNavigator(
	{
		[Screens.AppDrawer]: AppDrawer,
		[Screens.IllustDetail]: IllustDetail,
		[Screens.UserDetail]: UserDetail
	},
	{
		initialRouteName: Screens.AppDrawer,
		defaultNavigationOptions: () => ({
			headerTransparent: true,
			headerStyle: {
				borderBottomWidth: 0
			}
		})
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

// RN0.61だとスワイプが認識されないのでHOCで囲む
const AppContainer = gestureHandlerRootHOC(createAppContainer(AppSwitch as any));

export default AppContainer;
