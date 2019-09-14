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
	Row,
} from 'native-base';
import styled from 'styled-components/native';
import pixivApi from '@/api/PixivApi';
import { useNavigation } from 'react-navigation-hooks';
import { Screens } from '@/constants';


import { MAIL, PASSWORD } from 'react-native-dotenv';
import SInfo from 'react-native-sensitive-info';

const Login = () => {
	const [username, setUsername] = useState<string>(MAIL);
	const [password, setPassword] = useState<string>(PASSWORD);
	const [isKeepLogin, setIsKeepLogin] = useState<boolean>(false);
	const { navigate } = useNavigation();

	const onLogin = async () => {
		pixivApi
			.login(username, password)
			.then(async () => {
				navigate(Screens.App);

				if (isKeepLogin) {
					SInfo.setItem('username', username, {});
					SInfo.setItem('password', password, {});
				} else {
					SInfo.deleteItem('username', {});
					SInfo.deleteItem('password', {});
				}

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
`
export default Login;
