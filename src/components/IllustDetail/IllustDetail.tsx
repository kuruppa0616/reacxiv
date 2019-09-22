import React from 'react';
import { human } from 'react-native-typography';
import { FlatList } from 'react-navigation';

import { Content, Text, View } from 'native-base';
import { Illust, ImageUrls } from 'pixiv-api-client';
import styled from 'styled-components/native';

import { BookmarkButton } from '@/components/Button';
import {
	IllustCaption,
	IllustMeta,
	IllustTags,
	RelatedIllusts,
	UserProfileBar
} from '@/components/IllustDetail';
import { PxFitIllust } from '@/components/PxImage';
import { IllustActions } from '@/hooks/useIllustDetail';

interface IllustDetailProps {
	illust: Illust;
	illustActions: IllustActions;
}

const IllustDetail = (props: IllustDetailProps) => {
	const { illust, illustActions } = props;

	const _keyExtractor = (item: ImageUrls) => item.large;
	const _renderIllust = ({ item: image_urls }: { item: ImageUrls }) => (
		<PxFitIllust url={image_urls.large} />
	);

	const _renderIllustList = (meta_pages: Illust['meta_pages']) => {
		const image_urls: ImageUrls[] = meta_pages.map(page => page.image_urls);
		return (
			<FlatList
				data={image_urls}
				renderItem={_renderIllust}
				keyExtractor={_keyExtractor}
			/>
		);
	};

	return (
		<View>
			<View>
				{illust.page_count === 1
					? _renderIllust({ item: illust.image_urls })
					: _renderIllustList(illust.meta_pages)}
			</View>
			<Info>
				<TitleText>{illust.title}</TitleText>
				<BookmarkButton
					illust={illust}
					size={25}
					bookmarkFunc={illustActions.bookmarkIllust}
				/>
				<IllustCaption text={illust.caption} />
				<IllustMeta illust={illust} />
				<IllustTags illust={illust} />
				<UserProfileBar illust={illust} followUser={illustActions.followUser} />
			</Info>
			<RelatedIllusts illust={illust} />
		</View>
	);
};

const Info = styled(View)`
	padding-top: 6px;
	padding-left: 10px;
	padding-right: 10px;
`;

const TitleText = styled(Text)`
	${human.title2Object as any};
	font-weight: bold;
	padding-top: 5px;
	padding-bottom: 5px;
`;

export default IllustDetail;
