import React from 'react';
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout';
import { View, Text } from 'native-base';

const withDrawer = (
	Children: React.ComponentType<any>
): React.ComponentType<any> => () => {
	const renderDrawer = () => {
		return (
			<View>
				<Text>I am in the drawer!</Text>
			</View>
		);
	};
	return (
		<DrawerLayout
			drawerWidth={250}
			drawerType="front"
			drawerBackgroundColor="#ddd"
			renderNavigationView={renderDrawer}
		>
			<Children />
		</DrawerLayout>
	);
};

export default withDrawer;
