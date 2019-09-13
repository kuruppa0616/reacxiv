import React, { useState } from 'react';

import { Container, Text, Item, Input, Label, Button, View, Content, Toast } from 'native-base';
import styled from 'styled-components/native';
import pixivApi from '@/api/PixivApi';
import { useNavigation } from 'react-navigation-hooks';
import { Screens } from '@/constants';

const Login = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const { navigate } = useNavigation();

	const onLogin = () => {
		pixivApi
			.login(username, password)
			.then(() => {
				navigate(Screens.App);
				Toast.show({
					text: 'login success!',
					buttonText: 'OK',
					type: 'success',
					duration: 3000
				});
			})
			.catch((err: Error) => {
				Toast.show({
					text: err.message,
					buttonText: 'OK',
					type: 'warning',
					duration: 5000
				});
			});
	};

	return (
		<Container>
			<Content>
				<FormBody>
					<FormItem>
						<Item floatingLabel={true}>
							<Label>Username</Label>
							<Input value={username} onChangeText={setUsername} />
						</Item>
					</FormItem>
					<FormItem>
						<Item floatingLabel={true}>
							<Label>Password</Label>
							<Input value={password} onChangeText={setPassword} secureTextEntry={true} />
						</Item>
					</FormItem>
					<FormItem>
						<LoginButton onPress={onLogin}>
							<Text>Login</Text>
						</LoginButton>
					</FormItem>
				</FormBody>
			</Content>
		</Container>
	);
};

const FormBody = styled(View)`
	margin: 0 auto;
	width: 80%;
`;

const FormItem = styled(View)`
	margin-top: 20px;
`;

const LoginButton = styled(Button)`
	display: flex;
	justify-content: center;
`;

export default Login;
