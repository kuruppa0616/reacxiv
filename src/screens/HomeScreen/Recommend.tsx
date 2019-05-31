import React, { useContext } from 'react';
import { View } from 'react-native';

import { IllustList } from '@/components/IllustList';
import Home from './Home';
import { RecommendIllustsStore } from '@/mobx/stores';

const Recommend = () => {
	const store = useContext(RecommendIllustsStore);
	return (
		<Home>
			<View>
				<IllustList store={store} />
			</View>
		</Home>
	);
};

export default Recommend;
