import React from 'react';
import pixivApi from '@/api/PixivApi';
import { IllustList } from '@/components/IllustList';
import { Container } from 'native-base';

const Top = () => {
	const _fetch = () => pixivApi.illustRecommended();
	return (
		<Container>
			<IllustList fetch={_fetch} />
		</Container>
	);
};

export default Top;
