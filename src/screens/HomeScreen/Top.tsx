import React from 'react';
import { View } from 'react-native';

import pixivApi from '@/api/PixivApi';
import { IllustList } from '@/components/IllustList';

import Home from './Home';

const Top = () => {
	const _fetch = () => pixivApi.illustRecommended();
	return (
		<Home>
			<View>
				<IllustList fetch={_fetch} />
			</View>
		</Home>
	);
};

export default Top;
