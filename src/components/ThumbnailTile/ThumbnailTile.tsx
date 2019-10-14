import React, { useMemo } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { useNavigation } from 'react-navigation-hooks';

import { Illust } from 'pixiv-api-client';
import styled from 'styled-components/native';

import { Screens } from '@/constants';

import { BookmarkButton } from '../Button';
import { PxThumbnail } from '../PxImage';

// not working RN0.60(2019/09/07)
// import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

interface Props {
	illust: Illust;
	size: number;
	bookmarkIllust: (illust: Illust) => void;
}

const ThumbnailTile = (props: Props) => {
	const { size, bookmarkIllust } = props;
	const { push } = useNavigation();

	const illustMemo = useMemo(() => props.illust, [props.illust.is_bookmarked]);

	const _onpressIllustDetail = () => {
		push(Screens.AppStacks.Details.IllustDetail, {
			illustId: illustMemo.id
		});
	};

	return (
		<Container>
			<TouchableOpacity onPress={_onpressIllustDetail} activeOpacity={0.8}>
				<PxThumbnail url={illustMemo.image_urls.square_medium} size={size} />
			</TouchableOpacity>
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

export default ThumbnailTile;
