import React from 'react';

import styled from 'styled-components/native';
import { Content } from 'native-base';
import ImageViewer from 'react-native-image-zoom-viewer';
import PhotoView from 'react-native-photo-view-ex';
import { Device, RequestHeader } from '@/constants';
import { StatusBar } from 'react-native';

interface Props {
	illustUrls: string[];
}

const IllustViewer = (props: Props) => {
	const { illustUrls } = props;
	return (
		<Content>
			<StatusBar
				hidden={true}
				barStyle="light-content"
				translucent={true}
				animated={true}
			/>
			<PhotoView
				source={{
					uri: illustUrls[0],
					headers: RequestHeader
				}}
				resizeMode="contain"
				minimumZoomScale={1}
				maximumZoomScale={3}
				style={{ width: Device.Width, height: Device.Height }}
			/>
		</Content>
	);
};

export default IllustViewer;
