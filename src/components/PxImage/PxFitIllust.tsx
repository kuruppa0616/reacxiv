import React, { useState } from 'react';
import { OnLoadEvent } from 'react-native-fast-image';
import PxImage from './PxImage';
import { Device } from '@/constants';

interface Props {
	url: string;
}
const initSize = {
	width: Device.Width,
	height: Device.Height * 0.7
};
const PxFitIllust = (props: Props) => {
	const { url } = props;

	const [size, setSize] = useState(initSize);

	const _onLoad = (event: OnLoadEvent) => {
		const illustWidth = event.nativeEvent.width;
		const illustHeight = event.nativeEvent.height;
		const deviceWidth = Device.Width;
		const optimizedHeight = (deviceWidth * illustHeight) / illustWidth;

		setSize({
			width: deviceWidth,
			height: optimizedHeight
		});
	};
	return <PxImage url={url} width={size.width} height={size.height} />;
};

export default PxFitIllust;
