import React from 'react';

import { observer } from 'mobx-react-lite';
import { Container } from 'native-base';

import { IllustDetail } from '@/components/IllustDetail';
import { useIllustDetail } from '@/hooks';

const IllustDetailContainer = observer(() => {
	const [illust, illustActions] = useIllustDetail();

	return (
		<Container>
			<IllustDetail {...{ illust, illustActions }} />
		</Container>
	);
});

export default IllustDetailContainer;
