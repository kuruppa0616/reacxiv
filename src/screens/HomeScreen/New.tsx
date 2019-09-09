import React from 'react';
import { View } from 'react-native';

import pixivApi from '@/api/PixivApi';
import { IllustList } from '@/components/IllustList';

import Home from './Home';

const New = () => {
	const _fetch = () => pixivApi.illustFollow();
	return (
		<Home>
			<View>
				<IllustList fetch={_fetch} />
			</View>
		</Home>
	);
};

export default New;
