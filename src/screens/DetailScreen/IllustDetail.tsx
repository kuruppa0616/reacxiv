import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { View, Text } from 'react-native';
import {
	withNavigation,
	NavigationScreenProp,
	ScrollView,
	FlatList
} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Illust, ImageUrls } from 'pixiv-api-client';
import HTMLView from 'react-native-htmlview';

import { PxFitIllust, PxProfileIcon } from '@/components/PxImage';
import { FollowButton } from '@/components/FollowButton';
import { observer } from 'mobx-react-lite';

interface Props {
	navigation: NavigationScreenProp<any, any>;
}

const IllustDetail = observer((props: Props) => {
	const { navigation } = props;
	const illustId: number = navigation.state.params.illustId;

	const _keyExtractor = (item: ImageUrls) => item.large;

	const _onPressBookmark = (illust: Illust) => {
		return () => console.log();
	};

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
		<ScrollView>
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
					<TouchableArea onPress={_onPressBookmark(illust)}>
						<Icon
							size={23}
							name="heart"
							color={illust.is_bookmarked ? '#e74c3c' : 'gray'}
						/>
					</TouchableArea>
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

	const _renderNowLoading = () => <Text>Now Loading</Text>;
	return (
		<Container>{illust ? _renderIllustDetail(illust) : _renderNowLoading()}</Container>
	);
});

const Container = styled.View`
	flex: 1 auto;
	width: 100%;
	/* justify-content: center; */
	align-items: center;
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

export default withNavigation(IllustDetail);
