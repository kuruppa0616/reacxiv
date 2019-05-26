import React, { memo, useContext } from 'react';
import { View, Text } from 'react-native';
import { observer } from 'mobx-react-lite'

import { IllustList } from '@/components/IllustList';
import Home from './Home';
import { RecommendIllustsStore } from '@/mobx/stores';

const Top = () => {
	const store = useContext(RecommendIllustsStore);
	return (
		<Home>
			<View>
				<IllustList store={store} />
			</View>
		</Home>
	);
};


export default Top;