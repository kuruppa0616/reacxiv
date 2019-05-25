import React, { memo, useContext } from 'react';
import { View, Text } from 'react-native';
import { observer } from 'mobx-react-lite'

import { IllustList } from '@/components/IllustList';
import Home from './Home';
import { RecommendIllustsStore } from '@/mobx/stores';

const Top = observer((props: any) => {
	const store = useContext(RecommendIllustsStore);
	return (
		<Home>
			<View>
				<Text>Hello</Text>
				<RecommendIllustsStore.Provider value={store}>
					<IllustList store={store} />
				</RecommendIllustsStore.Provider>
			</View>
		</Home>

	);
});

export default Top;