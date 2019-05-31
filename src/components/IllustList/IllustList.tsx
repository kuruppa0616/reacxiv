import React, { memo, useEffect, useState } from 'react';

import { Illust } from 'pixiv-api-client';
import { FlatList, Dimensions } from 'react-native';
import { ThumbnailTile } from '../ThumbnailTile';
import styled from 'styled-components/native';
import IllustsStore from '@/mobx/stores/IllustsStore';
import { observer } from 'mobx-react-lite';

interface Props {
	store: IllustsStore;
}

const NUM_COLUMNS = 3;
const { width: SCREEN_WIDTH } = Dimensions.get('window');

const IllustList = observer((props: Props) => {
	const { store } = props;
	const illusts = store.data;
	// console.log(illusts);

	const [isRefreshing, setIsRefreshing] = useState(false);

	useEffect(() => {
		store.fetchIllusts();
	}, []);

	const _keyExtractor = (item: Illust) => item.id.toString();

	const _onEndReached = () => {
		store.loadMoreIllusts();
	};

	const _onRefresh = () => {
		setIsRefreshing(true);
		store.reloadIllusts().then(() => {
			setIsRefreshing(false);
		});
	};

	const _renderItem = ({ item }: { item: Illust }) => (
		<ThumbnailTile illust={item} size={SCREEN_WIDTH / NUM_COLUMNS} />
	);

	return (
		<Container>
			<FlatList
				data={illusts.slice(0, illusts.length - (illusts.length % NUM_COLUMNS))}
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
	flex: 1;
	width: 100%;
	align-items: center;
`;

export default IllustList;
