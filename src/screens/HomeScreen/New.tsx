import React, { memo, useContext } from 'react';
import { View, Text } from 'react-native';
import { IllustList } from '@/components/IllustList';
import Home from './Home';
import { FollowIllustsStore } from '@/mobx/stores';

const New = () => {
	const store = useContext(FollowIllustsStore);
	return (
		<Home>
			<View>
				<IllustList store={store} />
			</View>
		</Home>
	);
};

export default New;