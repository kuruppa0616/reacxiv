import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { Text } from 'react-native';
import { withNavigation, NavigationScreenProp } from 'react-navigation';
import { Illust } from 'pixiv-api-client';
import pixivApi from '@/api/PixivApi';

interface Props {
	navigation: NavigationScreenProp<any, any>;
}

const initIllust: Illust | null = null;

const IllustDetail = ((props: Props) => {
	const { navigation } = props;
	const illustId: number = navigation.getParam('id', 0)

	const [illust, setIllust] = useState(initIllust)

	useEffect(() => {
		pixivApi.illustDetail(illustId).then((res) => {
			console.log(res);
		})
	}, [illust])
	return (
		<Container>
			<Text>{illustId}'s Deteil</Text>
		</Container>
	);
});

const Container = styled.View`
	flex: 1 auto;
	width:100%;
	justify-content: center;
  align-items: center;
`
export default withNavigation(IllustDetail);