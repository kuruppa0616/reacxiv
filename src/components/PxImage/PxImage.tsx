import React, { memo, useEffect, useState } from 'react';
import FastImage, { ImageStyle, OnLoadEvent } from 'react-native-fast-image'
import { StyleProp, StyleSheet } from 'react-native';

interface Props {
	url: string;
	width: number;
	height: number;
	style?: StyleProp<ImageStyle>
	onLoad?(event: OnLoadEvent): void
}

const PxImage = ((props: Props) => {
	const { url, width, height, style, onLoad } = props
	return (
		<FastImage
			style={[{ width: width, height: height }, style]}
			source={{
				uri: url,
				headers: {
					"User-Agent": "PixivIOSApp/7.2.2 (iOS 12.0.1; iPhone8,2)",
					"Referer": "http://www.pixiv.net/"
				},
				priority: FastImage.priority.normal,
			}}
			onLoad={onLoad}
			resizeMode={FastImage.resizeMode.contain}
		/>
	);
});

export default PxImage;