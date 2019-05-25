import React, { memo } from 'react';
import pixivApi from '@/api/PixivApi';
import { IllustList } from '@/components/IllustList';
import Home from './Home';

const Top = memo(() => {
	return (
		<Home>
			<IllustList fetchIllusts={() => pixivApi.illustRecommended()} />
		</Home>
	);
});

export default Top;