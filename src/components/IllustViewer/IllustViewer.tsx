import React from 'react';

import styled from 'styled-components/native';
import { Content } from 'native-base';
import PhotoView from 'react-native-photo-view-ex';
import { Device, RequestHeader } from '@/constants';
import { StatusBar } from 'react-native';
import Carousel from 'react-native-snap-carousel';

interface Props {
	illustUrls: string[];
}

const IllustViewer = (props: Props) => {
	const { illustUrls } = props;

	const _renderItem = ({ item }: { item: string }) => (
		<PhotoView
			source={{
				uri: item,
				headers: RequestHeader
			}}
			resizeMode="contain"
			minimumZoomScale={1}
			maximumZoomScale={3}
			style={{ width: Device.Width, height: Device.Height }}
		/>
	);

	const _renderBody = (illustUrls: string[]) =>
		illustUrls.length == 1 ? (
			_renderItem({ item: illustUrls[0] })
		) : (
				<Carousel
				layout={'default'}
				data={illustUrls}
				renderItem={_renderItem}
				sliderWidth={Device.Width}
				itemWidth={Device.Height}
			/>
		);

	return (
		<Content>
			<StatusBar
				hidden={true}
				barStyle="light-content"
				translucent={true}
				animated={true}
			/>
			{_renderBody(illustUrls)}
		</Content>
	);
};

export default IllustViewer;
