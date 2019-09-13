import React, { useEffect } from 'react';
import { Text } from 'react-native';
import { MAIL, PASSWORD } from 'react-native-dotenv';
import { NavigationScreenProp, withNavigation } from 'react-navigation';

import styled from 'styled-components/native';

import pixivApi from '@/api/PixivApi';
import { Screens } from '@/constants';

interface Props {
	navigation: NavigationScreenProp<any, any>;
}

const AuthCheck = (props: Props) => {
	useEffect(() => {
		// pixivApi
		// .login(MAIL, PASSWORD)
		// .then(() => {
		// 	props.navigation.navigate(Screens.App);
		// })
		// .catch(() => {
		// 	props.navigation.navigate(Screens.Auth);
		// });
		props.navigation.navigate(Screens.Auth);
	}, []);

	return (
		<Container>
			<Text>認証中</Text>
		</Container>
	);
};

const Container = styled.View`
	flex: 1;
	width: 100%;
	justify-content: center;
	align-items: center;
`;

export default withNavigation(AuthCheck);
