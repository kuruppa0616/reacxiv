import React, { useState } from 'react';

import {
	Container,
	Text,
	Item,
	Input,
	Label,
	Button,
	View,
	Content,
	Toast,
	Switch,
	Row
} from 'native-base';
import styled from 'styled-components/native';
import pixivApi from '@/api/PixivApi';
import { useNavigation } from 'react-navigation-hooks';
import { Screens } from '@/constants';

import { MAIL, PASSWORD } from 'react-native-dotenv';
import { useCredential } from '@/hooks';

const Login = () => {
	const [username, setUsername] = useState<string>(MAIL);
	const [password, setPassword] = useState<string>(PASSWORD);
	const [isKeepLogin, setIsKeepLogin] = useState<boolean>(false);
	const [credential] = useCredential();
	const { navigate } = useNavigation();

	const onLogin = async () => {
		pixivApi
			.login(username, password)
			.then(async () => {
				navigate(Screens.App);

				if (isKeepLogin) {
					await credential.set(username, password);
				} else {
					await credential.reset();
				}

				Toast.show({
					text: 'login success!',
					buttonText: 'OK',
					type: 'success'
				});
			})
			.catch((err: Error) => {
				Toast.show({
					text: err.message,
					buttonText: 'OK',
					type: 'danger',
					duration: 4000
				});
			});
	};

	const onIsKeepLogin = (val: boolean) => setIsKeepLogin(val);

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
						<KeepLoginSwitcher>
							<Switch value={isKeepLogin} onValueChange={onIsKeepLogin} />
							<Text>Keep login</Text>
						</KeepLoginSwitcher>
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

const KeepLoginSwitcher = styled(Row)`
	padding-bottom: 5px;
`;
export default Login;
