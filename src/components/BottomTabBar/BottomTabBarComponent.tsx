import React from 'react';
import { useNavigation } from 'react-navigation-hooks';

import { Button, Footer, FooterTab, Text } from 'native-base';
import { BottomTabBarProps } from 'react-navigation-tabs/lib/typescript/src/types';

const BottomTabBarComponent = (props: BottomTabBarProps) => {
	const { navigate } = useNavigation();
	const _onPress = (route: string) => () => navigate(route);
	return (
		<Footer>
			<FooterTab>
				<Button onPress={_onPress('Home')}>
					<Text uppercase={false}>Home</Text>
				</Button>
				<Button onPress={_onPress('Recommend')}>
					<Text uppercase={false}>Reccomend</Text>
				</Button>
				<Button onPress={_onPress('New')}>
					<Text uppercase={false}>New</Text>
				</Button>
				<Button>
					<Text uppercase={false}>Ranking</Text>
				</Button>
			</FooterTab>
		</Footer>
	);
};

export default BottomTabBarComponent;
