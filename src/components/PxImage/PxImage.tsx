import React, { memo, useEffect, useState } from 'react';
import FastImage from 'react-native-fast-image'

import { Illust } from 'pixiv-api-client';
import { StyleSheet } from 'react-native';

interface Props {
	url: string;
	width: number;
	height: number;
}
const PxImage = ((props: Props) => {
	const { url, width, height } = props
	return (
		<FastImage
			style={{ width: width, height: height, padding:3 }}
			source={{
				uri: url,
				headers: {
					"User-Agent": "PixivIOSApp/7.2.2 (iOS 12.0.1; iPhone8,2)",
					"Referer": "http://www.pixiv.net/"
				},
				priority: FastImage.priority.normal,
			}}
			resizeMode={FastImage.resizeMode.contain}
		/>
	);
});

export default PxImage;