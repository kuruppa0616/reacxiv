import React from 'react';
import pixivApi from '@/api/PixivApi';
import { IllustList } from '@/components/IllustList';
import { Container } from 'native-base';

const New = () => {
	const _fetch = () => pixivApi.illustFollow();
	return (
		<Container>
			<IllustList fetch={_fetch} />
		</Container>
	);
};

export default New;
