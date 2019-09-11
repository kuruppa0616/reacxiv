import React, { useState, useEffect } from 'react';

import styled from 'styled-components/native';
import { View, Header, Content, Form, Item, Input, Label } from 'native-base';

const Login = (props: any) => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	useEffect(() => {
		console.log(username, password);
	}, [username, password]);

	return (
		<View>
			<Form>
				<Item stackedLabel={true}>
					<Label>Username</Label>
					<Input value={username} onChangeText={setUsername} />
				</Item>
				<Item stackedLabel={true} last={true}>
					<Label>Password</Label>
					<Input value={password} onChangeText={setPassword} secureTextEntry={true} />
				</Item>
			</Form>
		</View>
	);
};

export default Login;
