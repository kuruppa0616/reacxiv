import React from 'react';
import { useScreens } from 'react-native-screens';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {
	createDrawerNavigator,
	DrawerContentComponentProps,
	DrawerNavigatorItems
} from 'react-navigation-drawer';

import {
	Root,
	Container,
	Content,
	Body,
	Header,
	Left,
	Button,
	Icon,
	Title,
	Right
} from 'native-base';

import { Screens } from '@/constants';

import { AuthCheck, HomeScreen, Login } from './screens';
import { IllustDetail, UserDetail } from './screens/DetailScreen';
import { useNavigation } from 'react-navigation-hooks';

useScreens();

const AuthStack = createStackNavigator({
	Login: Login
});

const AppStack = createStackNavigator(
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

const CustomDrawerContentComponent = (props: DrawerContentComponentProps) => {
	const nav = useNavigation();
	const onButton = () => {
		nav.toggleDrawer();
	};

	return (
		<Container>
			<Content>
				<Header>
					<Left>
						<Button onPress={onButton} transparent={true}>
							<Icon name="arrow-back" />
						</Button>
					</Left>
					<Body>
						<Title>Menu</Title>
					</Body>
					<Right />
				</Header>
				<DrawerNavigatorItems {...props} />
			</Content>
		</Container>
	);
};

const AppDrawer = createDrawerNavigator(
	{
		AppStack: AppStack,
		AuthStack: AuthStack
	},
	{
		unmountInactiveRoutes: true,
		contentComponent: CustomDrawerContentComponent
	}
);

const AppSwitch: any = createSwitchNavigator({
	[Screens.AuthCheck]: AuthCheck,
	[Screens.App]: AppDrawer,
	[Screens.Auth]: AuthStack
});

const AppContainer = createAppContainer(AppSwitch);

const App = () => {
	return (
		<Root>
			<AppContainer />
		</Root>
	);
};

export default App;
