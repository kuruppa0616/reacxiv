import React, { memo, useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { withNavigation, NavigationScreenProp } from 'react-navigation';
import { Button, Icon } from 'native-base';

import { Illust } from 'pixiv-api-client';
import { PxImage } from '../PxImage';
import { Text } from 'react-native';


interface Props {
	navigation: NavigationScreenProp<any, any>;
	illust: Illust;
	size: number;
}
const ThumbnailTile = ((props: Props) => {
	const { illust, size } = props
	return (
		<Container	>
			<PxImage url={illust.image_urls.square_medium} width={size} height={size} />
			<ButoonArea>
			</ButoonArea>
		</Container>
	);
});

const Container = styled.View`
	padding: 0px;
	position: relative;
`
const ButoonArea = styled.View`
	position: absolute;
	bottom:0%;
	right:0%;
`
export default withNavigation(ThumbnailTile);