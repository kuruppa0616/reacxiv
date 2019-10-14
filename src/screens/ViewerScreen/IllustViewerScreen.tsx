import React from 'react';

import { observer } from 'mobx-react-lite';
import { Container } from 'native-base';

import { IllustViewer } from '@/components/IllustViewer';

const IllustDetailContainer = observer(() => {
	return (
		<Container>
			<IllustViewer />
		</Container>
	);
});

export default IllustDetailContainer;
