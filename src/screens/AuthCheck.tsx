import React, { useEffect } from 'react';
import { Text } from 'react-native';
import { NavigationScreenProp, withNavigation } from 'react-navigation';

import styled from 'styled-components/native';

import pixivApi from '@/api/PixivApi';
import { Screens } from '@/constants';
import { useCredential } from '@/hooks';

interface Props {
	navigation: NavigationScreenProp<any, any>;
}

const AuthCheck = (props: Props) => {
	const [credential] = useCredential();
	useEffect(() => {
		(async () => {
			// ログイン情報取得
			const { username, password } = await credential.get();

			// ログイン情報が保持されていないときはログインページに飛ばす
			if (!username && !password) {
				props.navigation.navigate(Screens.Auth);
				return;
			}

			pixivApi
				.login(username, password)
				.then(() => {
					props.navigation.navigate(Screens.App);
				})
				.catch(async () => {
					await credential.reset();
					props.navigation.navigate(Screens.Auth);
				});
		})();
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
