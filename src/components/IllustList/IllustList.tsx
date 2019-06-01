import React, { memo, useEffect, useState } from 'react';

import { Illust } from 'pixiv-api-client';
import { FlatList, Dimensions } from 'react-native';
import { ThumbnailTile } from '../ThumbnailTile';
import styled from 'styled-components/native';
import IllustsStore from '@/mobx/stores/IllustsStore';
import { observer } from 'mobx-react-lite';
import useBookmark from '@/hooks/useBookmark';
import { withNavigation, NavigationScreenProp } from 'react-navigation';

interface Props {
	navigation: NavigationScreenProp<any, any>;
	store: IllustsStore;
}

const NUM_COLUMNS = 3;
const { width: SCREEN_WIDTH } = Dimensions.get('window');

const IllustList = observer((props: Props) => {
	const { store, navigation } = props;
	const illusts = store.data;

	const [isRefreshing, setIsRefreshing] = useState(false);
	const [bookmarkIllust] = useBookmark(store);

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
		<ThumbnailTile
			illust={item}
			size={SCREEN_WIDTH / NUM_COLUMNS}
			bookmarkIllust={bookmarkIllust}
		/>
	);
	const dups = store.data
		.map(illust => illust.id)
		.filter((x, _, self) => {
			return self.indexOf(x) !== self.lastIndexOf(x);
		});
	console.log('list:', store.data.length, dups);

	return (
		<Container>
			<FlatList
				data={illusts.slice(0, illusts.length - (illusts.length % NUM_COLUMNS))}
				renderItem={_renderItem}
				keyExtractor={_keyExtractor}
				listKey={navigation.state.key + 'listview'}
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

export default withNavigation(IllustList);
