import React, { useContext, useMemo } from 'react';
import styled from 'styled-components/native';
import { View, Text } from 'native-base';
import { withNavigation, NavigationScreenProp, FlatList } from 'react-navigation';
import { observer } from 'mobx-react-lite';
import HTMLView from 'react-native-htmlview';
import { Illust, ImageUrls } from 'pixiv-api-client';
import useBookmark from '@/hooks/useBookmark';

import { PxFitIllust, PxProfileIcon } from '@/components/PxImage';
import { FollowButton, FloatingBookmarkButton } from '@/components/Button';
import { GlobalIllustsStore } from '@/mobx/stores';
import { denormalize } from 'normalizr';
import { illustsSchema } from '@/mobx/schema';
import IllustMeta from '@/components/IllustMeta';
import IllustTags from '@/components/IllustTags';
import useFollow from '@/hooks/useFollow';
import { JpText, JpCaptionText } from '@/components/JpText';

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
	console.log(illustMemo.caption);

	const _renderIllustDetail = (illust: Illust) => (
		<View>
			<ScrollWrapper>
				<View>
					{illust.page_count === 1
						? _renderIllust({ item: illust.image_urls })
						: _renderIllustList(illust.meta_pages)}
				</View>
				<Info>
					<Title size={18} weight={'bold'}>
						{illust.title}
					</Title>
					<UserWrapper>
						<PxProfileIcon url={illust.user.profile_image_urls.medium} size={40} />
						<UserNameWrapper>
							<JpText size={12}>{illust.user.name}</JpText>
							<JpText size={10}>{illust.user.account}</JpText>
						</UserNameWrapper>
						<FollowButton user={illust.user} followFunc={followUser} />
					</UserWrapper>
					<StyledHTMLView
						value={`<html><body>${illust.caption}</body></html>`}
						TextComponent={JpCaptionText}
						RootComponent={View}
					/>
					<IllustMeta illust={illust} />
					<IllustTags illust={illust} />
				</Info>
			</ScrollWrapper>
			<FloatingArea>
				<FloatingBookmarkButton illust={illust} bookmarkFunc={bookmarkIllust} />
			</FloatingArea>
		</View>
	);

	const _renderNowLoading = () => <JpText>Now Loading</JpText>;

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
const UserWrapper = styled(View)`
	display: flex;
	flex-direction: row;
	align-items: center;
	margin: 2px 0px;
`;
const UserNameWrapper = styled(View)`
	flex-grow: 3;
	margin-left: 10px;
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

const StyledHTMLView = styled(HTMLView)`
	padding-bottom: 10;
	margin: 2px 0px;
`;

const Title = styled(JpText)`
	font-weight: bold;
`;
export default withNavigation(IllustDetail);
