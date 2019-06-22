import React from 'react';
import { Image } from 'react-native';
import PxImage from './PxImage';
import { Device } from '@/constants';

interface Props {
	url: string;
	height: number;
	blurRadius: number;
}

const PxHeader = (props: Props) => {
	const { url, height, blurRadius } = props;

	return (
		<Image
			style={{ width: Device.Width, height: height }}
			source={{
				uri: url,
				headers: {
					'User-Agent': 'PixivIOSApp/7.2.2 (iOS 12.0.1; iPhone8,2)',
					Referer: 'http://www.pixiv.net/'
				}
			}}
			resizeMode={'cover'}
			blurRadius={blurRadius}
		/>
	);
};

export default PxHeader;
