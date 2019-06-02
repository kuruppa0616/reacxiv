import React, { useContext } from 'react';
import { View } from 'react-native';

import { IllustList } from '@/components/IllustList';
import Home from './Home';
import { GlobalIllustsStore } from '@/mobx/stores';
import pixivApi from '@/api/PixivApi';

const Top = () => {
	const store = useContext(GlobalIllustsStore);
	return (
		<Home>
			<View>
				<IllustList fetch={() => pixivApi.illustRecommended()} store={store} />
			</View>
		</Home>
	);
};

export default Top;
