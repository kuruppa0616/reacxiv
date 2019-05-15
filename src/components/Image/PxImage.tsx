import React, { memo, useEffect, useState } from 'react';
import FastImage from 'react-native-fast-image'

import { Illust } from 'pixiv-api-client';

interface Props {
	url: string;
	width: number;
	height: number;
}
const PxImage = ((props: Props) => {
	const { url, width, height } = props
	return (
		<FastImage
			style={{ flex: 1, width: width, height: height }}
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