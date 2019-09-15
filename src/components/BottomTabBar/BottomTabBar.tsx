import React from 'react';

import { Button, Footer, FooterTab, Text } from 'native-base';
import { useNavigation } from 'react-navigation-hooks';

const BottomTabBar = () => {
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

export default BottomTabBar;
