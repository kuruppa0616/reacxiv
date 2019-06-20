import React, { useEffect, useState, useMemo, useContext } from 'react';

import { Illust, IllustsResponse } from 'pixiv-api-client';
import { FlatList, Dimensions } from 'react-native';
import { ThumbnailTile } from '../ThumbnailTile';
import styled from 'styled-components/native';
import IllustsStore from '@/mobx/stores/IllustsStore';
import { observer } from 'mobx-react-lite';
import useBookmark from '@/hooks/useBookmark';
import { withNavigation, NavigationScreenProp } from 'react-navigation';
import { denormalize } from 'normalizr';
import { illustsSchema } from '@/mobx/schema';
import useIllustKeys from '@/hooks/useIllustKeys';
import { GlobalIllustsStore } from '@/mobx/stores';

interface Props {
	navigation: NavigationScreenProp<any, any>;
	store?: IllustsStore;
	fetch: () => Promise<IllustsResponse>;
}

const NUM_COLUMNS = 3;
const { width: SCREEN_WIDTH } = Dimensions.get('window');

const IllustList = observer((props: Props) => {
	const { navigation, fetch } = props;
	const store = props.store ? props.store : useContext(GlobalIllustsStore);

	const [isRefreshing, setIsRefreshing] = useState(false);
	const { keys, addKeys, clearKeys } = useIllustKeys();
	const [bookmarkIllust] = useBookmark(store);

	useEffect(() => {
		store.fetchIllusts(fetch).then(newKeys => {
			console.log(newKeys);
			
			addKeys(newKeys);
		});
	}, []);

	const illustMemo = useMemo(() => {
		const illusts: Illust[] = denormalize([...keys], illustsSchema, store.entities);
		return illusts.slice(0, illusts.length - (illusts.length % NUM_COLUMNS));
	}, [store.illusts, store.users, keys]);

	const _keyExtractor = (item: Illust) => item.id.toString();

	const _onEndReached = () => {
		store.loadMoreIllusts().then(newKeys => {
			addKeys(newKeys);
		});
	};

	const _onRefresh = () => {
		setIsRefreshing(true);
		clearKeys();
		store.reloadIllusts(fetch).then(res => {
			addKeys(res);
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

	return (
		<Container>
			<FlatList
				data={illustMemo}
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
