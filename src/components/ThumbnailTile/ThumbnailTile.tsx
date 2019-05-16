import React, { memo, useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { withNavigation, NavigationScreenProp } from 'react-navigation';

import { Illust } from 'pixiv-api-client';
import { PxImage } from '../Image';
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
		</Container>
	);
});
const Container = styled.View`
	padding: 1px;
`
export default withNavigation(ThumbnailTile);