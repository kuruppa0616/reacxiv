import React, { memo, useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { Button, FlatList, Text, View, Image, Dimensions } from 'react-native';
import pixivApi from '@/api/PixivApi'
import { Illust } from 'pixiv-api-client';
import { ThumbnailTile } from '@/components/ThumbnailTile';

const inititalIllust: Illust[] = [];
const Home = ((props: any) => {
	const [recommend, setRecommend] = useState(inititalIllust);

	useEffect(() => {
		console.log("おはよう");
		pixivApi.illustRecommended().then((res) => {
			setRecommend(res.illusts)
		})
	}, [])
	return (
		<Container>
			<View>
				<FlatList
					data={recommend}
					getItemLayout={(data, index) => ({
						length: Math.floor(Dimensions.get('window').width) / 3,
						offset: Math.floor(Dimensions.get('window').width) / 3 * index,
						index,
					})}
					renderItem={({ item }) => (
						<ThumbnailTile illust={item} />
					)}
					keyExtractor={(item) => item.id.toString()}
					numColumns={3}

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