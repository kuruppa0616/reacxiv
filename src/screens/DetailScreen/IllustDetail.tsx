import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { Text, View } from 'react-native';
import { withNavigation, NavigationScreenProp } from 'react-navigation';
import { Illust } from 'pixiv-api-client';
import FastImage from 'react-native-fast-image';
import axios, { AxiosError } from 'axios';

import pixivApi from '@/api/PixivApi';
import { PxImage, PxFitIllust } from '@/components/PxImage';


interface Props {
	navigation: NavigationScreenProp<any, any>;
}

let initIllust: Illust | null = null;

const IllustDetail = ((props: Props) => {
	const { navigation } = props;
	const illustId: number = navigation.getParam('id', 0)

	const signal = axios.CancelToken.source();
	const [illust, setIllust] = useState(initIllust)

	useEffect(() => {

		// キャンセルできない
		pixivApi.illustDetail(illustId, { cancelToken: signal.token }).then((res) => {
			setIllust(res.illust);
		});
		return () => (
			signal.cancel('component is ummounted')
		)
	}, [illust])

	const _renderIllustDetail = (illust: Illust) => {
		console.log(illust);
		// https://github.com/DylanVann/react-native-fast-image/issues/77
		// https://github.com/alphasp/pxview/blob/master/src/components/PXCacheImage.js#L79
		// 画像サイズをいい感じに
		return (
			<View>
				<PxFitIllust url={illust.image_urls.large}></PxFitIllust>
			</View>
		)
	}

	const _renderNowLoading = () => (
		<Text>Now Loading</Text>
	)
	return (
		<Container>
			{illust ? _renderIllustDetail(illust) : _renderNowLoading()}
		</Container>
	);
});

const Container = styled.View`
	flex: 1 auto;
	width:100%;
	/* justify-content: center; */
  align-items: center;
`
export default withNavigation(IllustDetail);