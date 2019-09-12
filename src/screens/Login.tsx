import React, { useState, useEffect } from 'react';

import { Container, Text, Form, Item, Input, Label, Button, View } from 'native-base';
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
			})
			.catch(() => {
				navigate(Screens.Auth);
			});
	};

	return (
		<StyledContainer>
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
		</StyledContainer>
	);
};

const StyledContainer = styled(Container)`
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
