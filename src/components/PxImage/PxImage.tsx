import React from 'react';
import { StyleProp } from 'react-native';
import FastImage, { ImageStyle, OnLoadEvent } from 'react-native-fast-image';
import { RequestHeader } from '@/constants';

interface Props {
	url: string;
	width: number;
	height: number;
	style?: StyleProp<ImageStyle>;
	onLoad?(event: OnLoadEvent): void;
	resizeMode?: FastImage.ResizeMode;
}

const PxImage = (props: Props) => {
	const { url, width, height, style, onLoad, resizeMode } = props;
	return (
		<FastImage
			style={[{ width: width, height: height }, style]}
			source={{
				uri: url,
				headers: RequestHeader,
				priority: FastImage.priority.normal
			}}
			onLoad={onLoad}
			resizeMode={resizeMode ? resizeMode : FastImage.resizeMode.contain}
		/>
	);
};

export default PxImage;
