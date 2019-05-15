import React, { memo, useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { Button, FlatList, Text, View, Image, Dimensions } from 'react-native';
import pixivApi from '@/api/PixivApi'
import { Illust } from 'pixiv-api-client';
import { ThumbnailTile } from '@/components/ThumbnailTile';

const inititalIllust: Illust[] = [];

const Home = memo(() => {
	const [recommend, setRecommend] = useState(inititalIllust);
	const [nextURL, setNextURL] = useState("");

	useEffect(() => {
		pixivApi.illustRecommended().then((res) => {
			setRecommend(res.illusts);
			setNextURL(res.next_url);
		})
	}, [])

	const _renderItem = ({ item }: { item: Illust }) => (
		<ThumbnailTile illust={item} />
	)

	const _onEndReached = () => {
		pixivApi.requestUrl(nextURL).then((next) => {
			setRecommend((recommend) => (
				recommend.concat(next.illusts)
			));
			setNextURL(next.next_url);
		})
	}

	return (
		<Container>
			<View>
				<FlatList
					data={recommend.slice(0, recommend.length - recommend.length % 3)}
					renderItem={_renderItem}
					keyExtractor={(item) => item.id.toString()}
					numColumns={3}
					onEndReached={_onEndReached}
				/>
			</View>
		</Container>
	);
});

const Container = styled.View`
	flex: 1 ;
	width:100%;
  align-items: center;

`
export default Home;