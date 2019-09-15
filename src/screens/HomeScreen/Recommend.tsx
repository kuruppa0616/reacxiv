import React from 'react';

import { Container } from 'native-base';

import pixivApi from '@/api/PixivApi';
import { IllustList } from '@/components/IllustList';

const Recommend = () => {
	const _fetch = () => pixivApi.illustRecommended();
	return (
		<Container>
			<IllustList fetch={_fetch} />
		</Container>
	);
};

export default Recommend;
