import React from 'react';

import { Container } from 'native-base';

import pixivApi from '@/api/PixivApi';
import { IllustList } from '@/components/IllustList';

const New = () => {
	const _fetch = () => pixivApi.illustFollow();
	return (
		<Container>
			<IllustList fetch={_fetch} />
		</Container>
	);
};

export default New;
