import React, { useContext, useMemo } from 'react';
import styled from 'styled-components/native';
import { View, Text } from 'native-base';
import { human } from 'react-native-typography';
import { withNavigation, NavigationScreenProp, FlatList } from 'react-navigation';
import { observer } from 'mobx-react-lite';
import { Illust, ImageUrls } from 'pixiv-api-client';
import { denormalize } from 'normalizr';

import useBookmark from '@/hooks/useBookmark';
import { PxFitIllust } from '@/components/PxImage';
import { FloatingBookmarkButton } from '@/components/Button';
import { GlobalIllustsStore } from '@/mobx/stores';
import { illustsSchema } from '@/mobx/schema';
import {
	IllustMeta,
	IllustTags,
	IllustCaption,
	RelatedIllusts,
	UserProfileBar
} from '@/components/IllustDetail';
import useFollow from '@/hooks/useFollow';

interface Props {
	navigation: NavigationScreenProp<any, any>;
}

const IllustDetail = observer((props: Props) => {
	const { navigation } = props;
	const illustId: number = navigation.state.params.illustId;
	const store = useContext(GlobalIllustsStore);
	const [bookmarkIllust] = useBookmark(store);
	const [followUser] = useFollow(store);

	const illustMemo = useMemo(() => {
		const illusts: Illust[] = denormalize([illustId], illustsSchema, store.entities);
		return illusts[0];
	}, [store.illusts, store.users, illustId]);

	const _keyExtractor = (item: ImageUrls) => item.large;

	const _renderIllust = ({ item: image_urls }: { item: ImageUrls }) => (
		<PxFitIllust url={image_urls.large} />
	);

	const _renderIllustList = (meta_pages: Illust['meta_pages']) => {
		const image_urls: ImageUrls[] = meta_pages.map(page => page.image_urls);
		return (
			<View>
				<FlatList
					data={image_urls}
					renderItem={_renderIllust}
					keyExtractor={_keyExtractor}
				/>
			</View>
		);
	};
	const _renderIllustDetail = (illust: Illust) => (
		<View>
			<ScrollWrapper nestedScrollEnabled={true}>
				<View>
					<View>
						{illust.page_count === 1
							? _renderIllust({ item: illust.image_urls })
							: _renderIllustList(illust.meta_pages)}
					</View>
					<Info>
						<TitleText>{illust.title}</TitleText>
						<UserProfileBar illust={illustMemo} followUser={followUser} />
						<IllustCaption illust={illust} />
						<IllustMeta illust={illust} />
						<IllustTags illust={illust} />
					</Info>
				</View>
				<RelatedIllusts illust={illustMemo} />
			</ScrollWrapper>
			<FloatingArea>
				<FloatingBookmarkButton illust={illust} bookmarkFunc={bookmarkIllust} />
			</FloatingArea>
		</View>
	);

	const _renderNowLoading = () => <Text>Now Loading</Text>;

	return (
		<Container>
			{illustMemo ? _renderIllustDetail(illustMemo) : _renderNowLoading()}
		</Container>
	);
});

const Container = styled(View)`
	flex: 1 auto;
	width: 100%;
	align-items: center;
`;

const ScrollWrapper = styled.ScrollView`
	position: relative;
	height: 100%;
`;

const Info = styled(View)`
	padding-top: 6px;
	padding-left: 15px;
	padding-right: 15px;
`;

const FloatingArea = styled(View)`
	position: absolute;
	bottom: 0%;
	right: 0%;
	margin-right: 40px;
	margin-bottom: 30px;
`;

const TitleText = styled(Text)`
	${human.title3Object as any};
	line-height: ${(human.title3Object.fontSize as number) * 1.5};
	font-weight: bold;
`;

export default withNavigation(IllustDetail);
