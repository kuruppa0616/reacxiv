import React from 'react';
import pixivApi from '@/api/PixivApi';
import { IllustList } from '@/components/IllustList';
import { Container, Content } from 'native-base';

const Recommend = () => {
	const _fetch = () => pixivApi.illustRecommended();
	return (
		<Container>
			<Content>
				<IllustList fetch={_fetch} />
			</Content>
		</Container>
	);
};

export default Recommend;
