import React, { useContext } from 'react';
import { View } from 'react-native';
import pixivApi from '@/api/PixivApi';

import { IllustList } from '@/components/IllustList';
import Home from './Home';
import { GlobalIllustsStore } from '@/mobx/stores';

const Recommend = () => {

	const store = useContext(GlobalIllustsStore);
	return (
		<Home>
			<View>
				<IllustList fetch={() => pixivApi.illustRecommended()} store={store} />
			</View>
		</Home>
	);
};

export default Recommend;
