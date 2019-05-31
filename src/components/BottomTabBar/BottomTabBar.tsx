import React, { memo, useEffect, useState } from 'react';
import { Footer, FooterTab, Button, Text } from 'native-base';
import { NavigationScreenProp, withNavigation } from 'react-navigation';

interface Props {
	navigation: NavigationScreenProp<any, any>;
}

const BottomTabBar = (props: Props) => {
	const { navigation } = props;
	return (
		<Footer>
			<FooterTab>
				<Button onPress={() => navigation.navigate('Home')}>
					<Text uppercase={false}>Home</Text>
				</Button>
				<Button onPress={() => navigation.navigate('Recommend')}>
					<Text uppercase={false}>Reccomend</Text>
				</Button>
				<Button onPress={() => navigation.navigate('New')}>
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
