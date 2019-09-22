import React from 'react';
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout';
import { View, Text } from 'native-base';

const withDrawer = (Children: React.FunctionComponent<object>) =>
	class extends React.Component {
		renderDrawer = () => {
			return (
				<View >
					<Text>I am in the drawer!</Text>
				</View>
			);
		};
		render() {
			return (
				<DrawerLayout
					drawerWidth={250}
					drawerType="front"
					drawerBackgroundColor="#ddd"
					renderNavigationView={this.renderDrawer}
				>
					<Children />
				</DrawerLayout>
			);
		}
	};

export default withDrawer;
