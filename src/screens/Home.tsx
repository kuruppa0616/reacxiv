import React, { memo, useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { Button, FlatList, Text, View, Image, Dimensions } from 'react-native';
import pixivApi from '@/api/PixivApi';
import { Illust } from 'pixiv-api-client';
import { ThumbnailTile } from '@/components/ThumbnailTile';

const inititalIllust: Illust[] = [];
const NUM_COLUMNS = 3;
const { width: SCREEN_WIDTH } = Dimensions.get('window');

const Home = memo(() => {
	const [recommend, setRecommend] = useState(inititalIllust);
	const [nextURL, setNextURL] = useState("");
	const [isRefreshing,setIsRefreshing] = useState(false);

	useEffect(() => {
		pixivApi.illustRecommended().then((res) => {
			setRecommend(res.illusts);
			setNextURL(res.next_url);
		})
	}, []);

	const _renderItem = ({ item }: { item: Illust }) => (
		<ThumbnailTile illust={item} size={SCREEN_WIDTH / NUM_COLUMNS} />
	);

	const _keyExtractor = (item: Illust) => (
		item.id.toString()
	);

	const _onEndReached = () => {
		pixivApi.requestUrl(nextURL).then((next) => {
			setRecommend((recommend) => (
				recommend.concat(next.illusts)
			));
			setNextURL(next.next_url);
		})
	}

	const _onRefresh = () => {
		setIsRefreshing(true);
		pixivApi.illustRecommended().then((res) => {
			setRecommend(res.illusts);
			setNextURL(res.next_url);
			setIsRefreshing(false);		
		})
	}

	return (
		<Container>
				<FlatList
					data={recommend.slice(0, recommend.length - recommend.length % 3)}
					renderItem={_renderItem}
					keyExtractor={_keyExtractor}
					numColumns={NUM_COLUMNS}
					onEndReached={_onEndReached}
					onEndReachedThreshold={0.4}
					onRefresh={_onRefresh}
					refreshing={isRefreshing}
				/>
		</Container>
	);
});

const Container = styled.View`
	flex: 1 ;
	width:100%;
  align-items: center;

`
export default Home;