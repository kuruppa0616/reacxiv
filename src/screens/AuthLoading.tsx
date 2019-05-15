import React, { memo, useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { Text } from 'react-native';
import pixivApi from '@/api/PixivApi'
import { MAIL, PASSWORD } from 'react-native-dotenv';
import { withNavigation, NavigationScreenProp } from 'react-navigation';

interface Props {
	navigation: NavigationScreenProp<any, any>;
}

const AuthLoading = ((props: Props) => {

	useEffect(() => {
		pixivApi.login(MAIL, PASSWORD).then(() => {
			props.navigation.navigate('App');
		}).catch(() => {
			props.navigation.navigate('Auth');
		})
	}, [])

	return (
		<Container>
			<Text>認証中</Text>
		</Container>
	);
});

const Container = styled.View`
	flex: 1;
	width:100%;
	justify-content: center;
  align-items: center;

`
export default withNavigation(AuthLoading);


