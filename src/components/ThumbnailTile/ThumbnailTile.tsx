import React, { useMemo } from 'react';
import styled from 'styled-components/native';
import { withNavigation, NavigationScreenProp } from 'react-navigation';
import { Text } from 'react-native';

import { Illust } from 'pixiv-api-client';
import { PxThumbnail } from '../PxImage';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { Screens } from '@/constants';
import { BookmarkButton } from '../Button';

interface Props {
	navigation: NavigationScreenProp<any, any>;
	illust: Illust;
	size: number;
	bookmarkIllust: (illust: Illust) => void;
}

const ThumbnailTile = (props: Props) => {
	const { size, navigation, bookmarkIllust } = props;

	const illustMemo = useMemo(() => props.illust, [props.illust.is_bookmarked])

	const _onpressIllustDetail = () => {
		navigation.push(Screens.IllustDetail, {
			illustId: illustMemo.id
		});
	};

	return (
		<Container>
			<TouchableHighlight onPress={_onpressIllustDetail}>
				<PxThumbnail url={illustMemo.image_urls.square_medium} size={size} />
			</TouchableHighlight>
			<NumPages>
				<Text>{illustMemo.page_count}</Text>
			</NumPages>
			<ButoonArea>
				<BookmarkButton illust={illustMemo} size={24} bookmarkFunc={bookmarkIllust} />
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

export default withNavigation(ThumbnailTile);
