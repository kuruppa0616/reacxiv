import React, { memo, useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { withNavigation, NavigationScreenProp } from 'react-navigation';

import { Illust } from 'pixiv-api-client';
import { PxImage } from '../Image';


interface Props {
	navigation: NavigationScreenProp<any, any>;
	illust: Illust;
}
const ThumbnailTile = ((props: Props) => {
	const { illust } = props
	return (
		<Container	>
			<PxImage url={illust.image_urls.square_medium} width={128} height={128} />
		</Container>
	);
});
const Container = styled.View`
	height:150px;
`
export default withNavigation(ThumbnailTile);