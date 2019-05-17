import React, { memo, useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { withNavigation, NavigationScreenProp } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Illust } from 'pixiv-api-client';
import { PxImage } from '../PxImage';
import pixivApi from '@/api/PixivApi';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { Screens } from '@/constants';


interface Props {
	navigation: NavigationScreenProp<any, any>;
	illust: Illust;
	size: number;
}

const ThumbnailTile = ((props: Props) => {
	const { illust, size, navigation } = props
	const [isBookmarked, setIsBookmarked] = useState(illust.is_bookmarked)

	const _onPressbookmark = () => {
		navigation.navigate("IllustDeteil")
		// const func = isBookmarked ? () => pixivApi.unbookmarkIllust(illust.id) : () => pixivApi.bookmarkIllust(illust.id)
		// func().then(() => {
		// 	setIsBookmarked((isBookmarked) => (
		// 		!isBookmarked
		// 	));
		// })
	}
	return (
		<Container	>
			{/* <TouchableHighlight onPress={() => navigation.navigate('IllustDeteil')}> */}
			<PxImage url={illust.image_urls.square_medium} width={size} height={size} />
			{/* </TouchableHighlight> */}
			<ButoonArea>
				<TouchableArea onPress={_onPressbookmark} >
					<Icon size={23} name="heart" color={isBookmarked ? '#e74c3c' : 'white'} />
				</TouchableArea>
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
	margin-right:10px;
	margin-bottom:5px;
`

const TouchableArea = styled.TouchableWithoutFeedback`
	width:20px;
	height:20px;
	border-width: 1;
  border-radius: 2;
  border-color: #ddd;
  border-bottom-width: 0;
  margin-left: 5;
  margin-right: 5;
  margin-top: 10;
`
export default withNavigation(ThumbnailTile);