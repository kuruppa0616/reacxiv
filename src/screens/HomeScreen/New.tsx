import React, { memo, useContext } from 'react';
import { View } from 'react-native';
import { observer } from 'mobx-react-lite'

import { IllustList } from '@/components/IllustList';
import Home from './Home';
import { FollowIllustsStore } from '@/mobx/stores';

const New = observer((props: any) => {
	const store = useContext(FollowIllustsStore);
	return (
		<Home>
			<View>
				<FollowIllustsStore.Provider value={store}>
					<IllustList store={store} />
				</FollowIllustsStore.Provider>
			</View>
		</Home>

	);
});

export default New;