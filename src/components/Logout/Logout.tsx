import React, { useState } from 'react';
import { Text, Container, Content, View, Button, Toast } from 'native-base';
import styled from 'styled-components/native';
import pixivApi from '@/api/PixivApi';
import { Screens } from '@/constants';
import { useCredential } from '@/hooks';
import { useNavigation } from 'react-navigation-hooks';

const Logout = () => {
	const [] = useState(false);
	const [credential] = useCredential();
	const { navigate } = useNavigation();

	const onLogout = () => {
		pixivApi.logout().then(async() => {
			await credential.reset();
			navigate(Screens.Login);
			Toast.show({
				text: 'logout success!',
				buttonText: 'OK',
				type: 'success'
			});
		})
	}
	return (
		<Container>
			<CenteringContent>
				<Text>Confirm Logout?</Text>
				<Button onPress={onLogout} danger={true}>
					<Text>Logout</Text>
				</Button>
			</CenteringContent>
		</Container>
	);
};

const CenteringContent = styled(View)`
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export default Logout;
