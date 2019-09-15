import React, { useEffect } from 'react';
import { Text } from 'react-native';
import { useNavigation } from 'react-navigation-hooks';

import { Container, Content, Toast } from 'native-base';
import styled from 'styled-components/native';

import pixivApi from '@/api/PixivApi';
import { Screens } from '@/constants';
import { useCredential } from '@/hooks';

const AuthCheck = () => {
	const [credential] = useCredential();
	const { navigate } = useNavigation();
	useEffect(() => {
		(async () => {
			// ログイン情報取得
			const { username, password } = await credential.get();

			// ログイン情報が保持されていないときはログインページに飛ばす
			if (!username && !password) {
				navigate(Screens.Auth);
				return;
			}

			pixivApi
				.login(username, password)
				.then(() => {
					navigate(Screens.App);
					Toast.show({
						text: 'login success!',
						buttonText: 'OK',
						type: 'success'
					});
				})
				.catch(async (err: Error) => {
					await credential.reset();
					navigate(Screens.Auth);
					Toast.show({
						text: err.message,
						buttonText: 'OK',
						type: 'danger',
						duration: 4000
					});
				});
		})();
	}, []);

	return (
		<StyledContainer>
			<Content>
				<Text>認証中</Text>
			</Content>
		</StyledContainer>
	);
};

const StyledContainer = styled(Container)`
	flex: 1;
	width: 100%;
	justify-content: center;
	align-items: center;
`;

export default AuthCheck;
