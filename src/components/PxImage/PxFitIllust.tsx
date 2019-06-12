import React, { useState } from 'react';
import { OnLoadEvent } from 'react-native-fast-image';
import PxImage from './PxImage';
import { Device } from '@/constants';

interface Props {
	url: string;
}
const initSize = {
	width: Device.Width,
	height: Device.Height * 0.65
};
const PxFitIllust = (props: Props) => {
	const { url } = props;

	const [size, setSize] = useState(initSize);

	const _onLoad = (event: OnLoadEvent) => {
		const illustWidth = event.nativeEvent.width;
		const illustHeight = event.nativeEvent.height;
		const deviceWidth = Device.Width;
		const limitHeight = Device.Height * 0.65;

		// 画面の横幅に画像の高さを合わせる
		const optimizedHeight = (deviceWidth * illustHeight) / illustWidth;
		setSize({
			width: deviceWidth,
			// 画面高さの7割以上を上限にする
			height: optimizedHeight > limitHeight ? limitHeight : optimizedHeight,
		});
	};
	return <PxImage url={url} width={size.width} height={size.height} onLoad={_onLoad} />;
};

export default PxFitIllust;
