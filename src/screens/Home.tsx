import React, { memo, useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { Button, FlatList, Text, View } from 'react-native';
import PixivApi from 'pixiv-api-client';
import { MAIL, PASSWORD } from 'react-native-dotenv';
const pixiv = new PixivApi();

const Home = memo((props: any) => {

	const [token, setToken] = useState("")

	useEffect(() => {
		console.log("called");
		pixiv.login(MAIL, PASSWORD).then((res) => {
			pixiv.searchIllust("ライネス").then((json) => {
				console.log(JSON.stringify(json));
			})
			setToken(res.access_token);
		})
	}, [])

	return (
		<Container>
			<Text>{token}</Text>
		</Container>
	);
});

const Container = styled.View`
	flex: 1 auto;
	width:100%;
`
export default Home;