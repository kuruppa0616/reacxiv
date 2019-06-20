import React from 'react';
import { View } from 'react-native';

import { IllustList } from '@/components/IllustList';
import Home from './Home';
import pixivApi from '@/api/PixivApi';

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
