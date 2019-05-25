import React, { memo, useContext } from 'react';
import { View } from 'react-native';
import pixivApi from '@/api/PixivApi';
import { IllustList } from '@/components/IllustList';
import Home from './Home';
import { RecommendIllustsStore } from '@/mobx/stores';

const Recommend = memo((props: any) => {
	const store = useContext(RecommendIllustsStore);
	return (
		<Home>
			<View>
				<IllustList fetchIllusts={() => pixivApi.illustRecommended()} />
			</View>
		</Home>

	);
});


export default Recommend;