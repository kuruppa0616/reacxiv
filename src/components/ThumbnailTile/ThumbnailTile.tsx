import React, { useContext } from 'react';
import styled from 'styled-components/native';
import { withNavigation, NavigationScreenProp } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Text } from 'react-native';

import { Illust } from 'pixiv-api-client';
import { PxThumbnail } from '../PxImage';
import pixivApi from '@/api/PixivApi';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { Screens } from '@/constants';

import { RecommendIllustsStore } from '@/mobx/stores';

interface Props {
	navigation: NavigationScreenProp<any, any>;
	illust: Illust;
	size: number;
}

const ThumbnailTile = (props: Props) => {
	const { illust, size, navigation } = props;
	const isBookmarked = illust.is_bookmarked;
	const store = useContext(RecommendIllustsStore);

	const _onPressbookmark = () => {
		const func = isBookmarked
			? () => pixivApi.unbookmarkIllust(illust.id)
			: () => pixivApi.bookmarkIllust(illust.id);
		func().then(() => {
			store.updateBookmark(illust.id, !isBookmarked);
		});
	};

	const _onpressIllustDetail = () => {
		navigation.navigate(Screens.IllustDetail, { illust: illust });
	};

	return (
		<Container>
			<TouchableHighlight onPress={_onpressIllustDetail}>
				<PxThumbnail url={illust.image_urls.square_medium} size={size} />
			</TouchableHighlight>
			<NumPages>
				<Text>{illust.page_count}</Text>
			</NumPages>
			<ButoonArea>
				<TouchableArea onPress={_onPressbookmark}>
					<Icon
						size={23}
						name="heart"
						color={isBookmarked ? '#e74c3c' : 'white'}
					/>
				</TouchableArea>
			</ButoonArea>
		</Container>
	);
};

const Container = styled.View`
	padding: 0px;
	position: relative;
`;
const NumPages = styled.View`
	position: absolute;
	top: 0%;
	right: 0%;
	margin-right: 10px;
	margin-top: 5px;
`;
const ButoonArea = styled.View`
	position: absolute;
	bottom: 0%;
	right: 0%;
	margin-right: 10px;
	margin-bottom: 5px;
`;

const TouchableArea = styled.TouchableWithoutFeedback`
	width: 20px;
	height: 20px;
	border-width: 1;
	border-radius: 2;
	border-color: #ddd;
	border-bottom-width: 0;
	margin-left: 5;
	margin-right: 5;
	margin-top: 10;
`;
export default withNavigation(ThumbnailTile);
