import React, { memo, useEffect, useState } from 'react';
import { NavigationScreenProp, withNavigation } from 'react-navigation';

import { Button, Footer, FooterTab, Text } from 'native-base';

interface Props {
	navigation: NavigationScreenProp<any, any>;
}

const BottomTabBar = (props: Props) => {
	const { navigation } = props;
	const _onPress = (route: string) => () => navigation.navigate(route);
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

export default withNavigation(BottomTabBar);
