import React from 'react';
import pixivApi from '@/api/PixivApi';
import { IllustList } from '@/components/IllustList';
import { Container, Content } from 'native-base';

const New = () => {
	const _fetch = () => pixivApi.illustFollow();
	return (
		<Container>
			<Content>
				<IllustList fetch={_fetch} />
			</Content>
		</Container>
	);
};

export default New;
