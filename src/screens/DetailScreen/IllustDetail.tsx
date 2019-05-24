import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { View, Text } from 'react-native';
import { withNavigation, NavigationScreenProp, ScrollView, FlatList } from 'react-navigation';
import { Illust, ImageUrls, User } from 'pixiv-api-client';
import axios from 'axios';
import HTMLView from 'react-native-htmlview';

import pixivApi from '@/api/PixivApi';
import { PxFitIllust, PxProfileIcon } from '@/components/PxImage';
import { Button, Text as NbText } from 'native-base';
import { FollowButton } from '@/components/FollowButton';


interface Props {
	navigation: NavigationScreenProp<any, any>;
}

const IllustDetail = ((props: Props) => {
	const { navigation } = props;
	const illustIdParam: number = navigation.getParam('id', null);
	const illustParam: Illust | null = navigation.getParam('illust', null);

	const signal = axios.CancelToken.source();
	const [illust, setIllust] = useState(illustParam);

	useEffect(() => {
		//paramでillustオブジェがわたってきたときはそれをそのまま使う		
		if (illust) {
			return
		}

		// TODO:キャンセルできない
		pixivApi.illustDetail(illustIdParam, { cancelToken: signal.token }).then((res) => {
			setIllust(res.illust);
		});
		return () => (
			signal.cancel('component is ummounted')
		);
	}, [illust]);

	const _keyExtractor = (item: ImageUrls) => (
		item.large
	);

	const _renderIllust = ({ item: image_urls }: { item: ImageUrls }) => (
		<PxFitIllust url={image_urls.large} />
	);

	const _renderIllustList = (meta_pages: Illust["meta_pages"]) => {
		const image_urls: ImageUrls[] = meta_pages.map((page) => page.image_urls);
		return (
			<View>
				<FlatList
					data={image_urls}
					renderItem={_renderIllust}
					keyExtractor={_keyExtractor}
				/>
			</View>
		);
	}

	const _renderIllustDetail = (illust: Illust) => (
		<ScrollView>
			<View>
				{illust.page_count === 1 ?
					_renderIllust({ item: illust.image_urls })
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
		</ScrollView>
	);

	const _renderNowLoading = () => (
		<Text>Now Loading</Text>
	)
	return (
		<Container>
			{illust ? _renderIllustDetail(illust) : _renderNowLoading()}
		</Container>
	);
});

const Container = styled.View`
	flex: 1 auto;
	width:100%;
	/* justify-content: center; */
  align-items: center;
`
const UserWrapper = styled.View`
	display:flex;
	flex-direction: row;
	align-items:center;
`;
const UserName = styled.View`
	flex-grow: 3;
	margin-left:10px;
`
const Name = styled.Text`
	font-weight:bold;
`;
const Info = styled.View`
	padding-top:6px;
	padding-left:10px;
	padding-right:10px;
`;
const Detail = styled.View`


`;

const Params = styled.View`
	flex-direction: row;
	align-items:center;
`

const StyledHTMLView = styled(HTMLView)`
	padding-bottom:10;
`;

const Title = styled.Text`
	font-weight:bold;
`;

export default withNavigation(IllustDetail);