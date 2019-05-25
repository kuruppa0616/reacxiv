import React, { memo } from 'react';
import { View } from 'react-native';
import pixivApi from '@/api/PixivApi';
import { IllustList } from '@/components/IllustList';
import Home from './Home';

const New = memo(() => {
	return (
		<Home>
			<View>
				<IllustList fetchIllusts={() => pixivApi.illustFollow()} />
			</View>
		</Home>

	);
});

export default New;