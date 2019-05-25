import React, { memo, useEffect, useState } from 'react';

import { Illust, IllustsResponse } from 'pixiv-api-client';
import { FlatList, Dimensions } from 'react-native';
import pixivApi from '@/api/PixivApi';
import { ThumbnailTile } from '../ThumbnailTile';
import styled from 'styled-components/native';
import { useIllusts } from '@/hooks';

interface Props {
	fetchIllusts(options?: any): Promise<IllustsResponse>;
}

const NUM_COLUMNS = 3;
const { width: SCREEN_WIDTH } = Dimensions.get('window');

const IllustList = memo((props: Props) => {

	const { fetchIllusts } = props;

	const [illusts, loadInitIllusts, loadNextIllusts] = useIllusts(fetchIllusts)
	const [isRefreshing, setIsRefreshing] = useState(false);

	const _renderItem = ({ item }: { item: Illust }) => (
		<ThumbnailTile illust={item} size={SCREEN_WIDTH / NUM_COLUMNS} />
	);

	const _keyExtractor = (item: Illust) => (
		item.id.toString()
	);

	const _onEndReached = () => {
		loadNextIllusts();
	}

	const _onRefresh = () => {
		setIsRefreshing(true);
		loadInitIllusts().then(() => {
			setIsRefreshing(false);
		})
	}

	return (
		<Container>
			<FlatList
				data={illusts.slice(0, illusts.length - illusts.length % NUM_COLUMNS)}
				renderItem={_renderItem}
				keyExtractor={_keyExtractor}
				numColumns={NUM_COLUMNS}
				onEndReached={_onEndReached}
				onEndReachedThreshold={0.2}
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

export default IllustList;