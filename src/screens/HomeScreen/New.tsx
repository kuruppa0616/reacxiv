import React, { useContext } from 'react';
import { View ,Image} from 'react-native';
import { IllustList } from '@/components/IllustList';
import Lightbox from 'react-native-lightbox';

import Home from './Home';
import { GlobalIllustsStore } from '@/mobx/stores';
import pixivApi from '@/api/PixivApi';

const New = () => {
	const store = useContext(GlobalIllustsStore);
	const _fetch = () => pixivApi.illustFollow();
	return (
		<Home>
			<View>
				<IllustList fetch={_fetch} store={store} />
			</View>
		</Home>
	);
};

export default New;