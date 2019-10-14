import React from 'react';

import { Container } from 'native-base';

import { IllustViewer } from '@/components/IllustViewer';
import { useNavigationParam } from 'react-navigation-hooks';

const IllustDetailContainer = () => {
	const illustUrls: string[] = useNavigationParam('illustUrls');
	return (
		<Container>
			<IllustViewer illustUrls={illustUrls} />
		</Container>
	);
};

export default IllustDetailContainer;
