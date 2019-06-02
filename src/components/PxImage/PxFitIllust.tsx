import React, { useState } from 'react';
import { OnLoadEvent } from 'react-native-fast-image';
import PxImage from './PxImage';
import { Device } from '@/constants';

interface Props {
	url: string;
}
const initSize = {
	width: 500,
	height: 200
};
const PxFitIllust = (props: Props) => {
	const { url } = props;

	const [size, setSize] = useState(initSize);

	const _onLoad = (event: OnLoadEvent) => {
		const illustWidth = event.nativeEvent.width;
		const illustHeight = event.nativeEvent.height;
		const deviceWidth = Device.Width;
		console.log(illustHeight);


		// 画像の高さがn px以上の場合

		// const optimizedWidth =
		// 	illustWidth > deviceWidth ? deviceWidth : illustWidth;
		const optimizedHeight = (deviceWidth * illustHeight) / illustWidth;

		setSize({
			width: deviceWidth,
			height: optimizedHeight
		});
	};
	return <PxImage url={url} width={size.width} height={size.height} onLoad={_onLoad} />;
};

export default PxFitIllust;
