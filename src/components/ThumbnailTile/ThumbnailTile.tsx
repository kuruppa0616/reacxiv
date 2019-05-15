import React, { memo, useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { Text, Image, StyleSheet } from 'react-native';
import { withNavigation, NavigationScreenProp } from 'react-navigation';
import FastImage from 'react-native-fast-image'

import { Illust } from 'pixiv-api-client';

interface Props {
	navigation: NavigationScreenProp<any, any>;
	illust: Illust;
}
const ThumbnailTile = ((props: Props) => {
	const { illust } = props
	return (
		<Container>
			<FastImage
				style={{ flex: 1, width: 128, height: 128 }}
				source={{
					uri: illust.image_urls.square_medium,
					headers: {
						"User-Agent": "PixivIOSApp/7.2.2 (iOS 12.0.1; iPhone8,2)",
						"Referer": "http://www.pixiv.net/"
					},
					priority: FastImage.priority.normal,
				}}
				resizeMode={FastImage.resizeMode.contain}
			/>
		</Container>
	);
});
const Container = styled.View`
	height:150px;
`
export default withNavigation(ThumbnailTile);