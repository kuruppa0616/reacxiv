import React, { useState, useEffect, useContext, useMemo } from 'react';
import styled from 'styled-components/native';
import { View, Text } from 'react-native';
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

interface Props {
	navigation: NavigationScreenProp<any, any>;
}

const IllustDetail = observer((props: Props) => {
	const { navigation } = props;
	const illustId: number = navigation.state.params.illustId;
	const store = useContext(GlobalIllustsStore);
	const [bookmarkIllust] = useBookmark(store);

	const illustMemo = useMemo(()=>{		
		const illusts: Illust[] = denormalize([illustId], illustsSchema, store.entities);
		return illusts[0]
	},[store.illusts[illustId].is_bookmarked,illustId])

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
			<ScrollWrapper>
				<View>
					{illust.page_count === 1
						? _renderIllust({ item: illust.image_urls })
						: _renderIllustList(illust.meta_pages)}
				</View>
				<Info>
					<UserWrapper>
						<PxProfileIcon url={illust.user.profile_image_urls.medium} size={40} />
						<UserName>
							<Name>{illust.user.name}</Name>
							<Text>{illust.user.account}</Text>
						</UserName>
						<FollowButton user={illust.user} />
					</UserWrapper>
					<Detail>
						<Title>{illust.title}</Title>
						<StyledHTMLView value={`<html><body>${illust.caption}</body></html>`} />
						<Params>
							<Text>{illust.create_date}</Text>
							<Text>{illust.total_view}</Text>
							<Text>{illust.total_bookmarks}</Text>
						</Params>
						<Text>{illust.tags.map(val => val.name).join(' ')}</Text>
					</Detail>
				</Info>
			</ScrollWrapper>
			<FloatingArea>
				<FloatingBookmarkButton illust={illust} bookmarkFunc={bookmarkIllust} />
			</FloatingArea>
		</View>
	);

	const _renderNowLoading = () => <Text>Now Loading</Text>;

	return (
		<Container>{illustMemo ? _renderIllustDetail(illustMemo) : _renderNowLoading()}</Container>
	);
});

const Container = styled.View`
	flex: 1 auto;
	width: 100%;
	align-items: center;
`;

const ScrollWrapper = styled.ScrollView`
	position: relative;
	height: 100%;
`;
const UserWrapper = styled.View`
	display: flex;
	flex-direction: row;
	align-items: center;
`;
const UserName = styled.View`
	flex-grow: 3;
	margin-left: 10px;
`;
const Name = styled.Text`
	font-weight: bold;
`;
const Info = styled.View`
	padding-top: 6px;
	padding-left: 10px;
	padding-right: 10px;
`;
const Detail = styled.View``;

const FloatingArea = styled.View`
	position: absolute;
	bottom: 0%;
	right: 0%;
	margin-right: 40px;
	margin-bottom: 30px;
`;

const Params = styled.View`
	flex-direction: row;
	align-items: center;
`;

const StyledHTMLView = styled(HTMLView)`
	padding-bottom: 10;
`;

const Title = styled.Text`
	font-weight: bold;
`;

export default withNavigation(IllustDetail);
