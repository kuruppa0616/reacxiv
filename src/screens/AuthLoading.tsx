import React, { memo, useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { Button, FlatList, Text, View } from 'react-native';
import pixivApi from '../api/PixivApi'
import { MAIL, PASSWORD } from 'react-native-dotenv';
import { TopPage } from '../components/TopPage';
import { withNavigation, NavigationScreenProp } from 'react-navigation';

interface Props {
	navigation: NavigationScreenProp<any, any>;
}

const AuthLoading = ((props: Props) => {

	// useEffect(() => {
	// 	})
	// }, [])

	return (
		<Container>
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
export default withNavigation(AuthLoading);


