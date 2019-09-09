import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Dimensions, FlatList } from 'react-native';
import { NavigationScreenProp, withNavigation } from 'react-navigation';

import { observer } from 'mobx-react-lite';
import { denormalize } from 'normalizr';
import { Illust, IllustsResponse } from 'pixiv-api-client';
import styled from 'styled-components/native';

import useBookmark from '@/hooks/useBookmark';
import useIllustKeys from '@/hooks/useIllustKeys';
import { illustsSchema } from '@/mobx/schema';
import { GlobalIllustsStore } from '@/mobx/stores';
import IllustsStore from '@/mobx/stores/IllustsStore';

import { ThumbnailTile } from '../ThumbnailTile';

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
	const [nextUrl, setNextUrl] = useState<string>();
	const [keys, addKeys, clearKeys] = useIllustKeys();
	const [bookmarkIllust] = useBookmark(store);

	useEffect(() => {
		store.fetchIllusts(fetch).then(([keys, nextUrl]) => {
			addKeys(keys);
			setNextUrl(nextUrl);
		});
	}, []);

	const illustMemo = useMemo(() => {
		const illusts: Illust[] = denormalize([...keys], illustsSchema, store.entities);
		return illusts.slice(0, illusts.length - (illusts.length % NUM_COLUMNS));
	}, [store.illusts, store.users, keys]);

	const _keyExtractor = (item: Illust) => item.id.toString();

	const _onEndReached = () => {
		nextUrl &&
			store.loadMoreIllusts(nextUrl).then(([keys, nextUrl]) => {
				addKeys(keys);
				setNextUrl(nextUrl);
			});
	};

	const _onRefresh = () => {
		setIsRefreshing(true);
		clearKeys();
		store.reloadIllusts(fetch).then(([keys, nextUrl]) => {
			addKeys(keys);
			setNextUrl(nextUrl);
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
				onEndReachedThreshold={0.4}
				onRefresh={_onRefresh}
				refreshing={isRefreshing}
				nestedScrollEnabled={true}
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
