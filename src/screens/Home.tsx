import React, { memo, useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { Button, FlatList, Text, View } from 'react-native';
import pixivApi from '../api/PixivApi'
import { MAIL, PASSWORD } from 'react-native-dotenv';
import { TopPage } from '../components/TopPage';

const Home = ((props: any) => {
	return (
		<Container>
			<Text>ログイン中</Text>
		</Container>
	);
});

const Container = styled.View`
	flex: 1 auto;
	width:100%;
	justify-content: center;
  align-items: center;

`
export default Home;