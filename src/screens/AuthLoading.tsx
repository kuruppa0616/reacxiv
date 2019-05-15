import React, { memo, useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { Button, FlatList, Text, View } from 'react-native';
import pixivApi from '../api/PixivApi'
import { MAIL, PASSWORD } from 'react-native-dotenv';
import { TopPage } from '../components/TopPage';

const AuthLoading = ((props: any) => {

	const [isLogined, setIsLogined] = useState(false)

	useEffect(() => {
		pixivApi.login(MAIL, PASSWORD).then((res) => {
			setIsLogined(true)
		})
	}, [])

	return (
		<Container>
			{isLogined && <TopPage />}
			<Text>Auth!</Text>
		</Container>
	);
});

const Container = styled.View`
	flex: 1 auto;
	width:100%;
	justify-content: center;
  align-items: center;

`
export default AuthLoading;