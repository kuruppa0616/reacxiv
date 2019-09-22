import React from 'react';

import { observer } from 'mobx-react-lite';
import { Container, Content } from 'native-base';

import { IllustDetail } from '@/components/IllustDetail';
import { useIllustDetail } from '@/hooks';
import { RvHeader } from '@/components/RvHeader';

const IllustDetailContainer = observer(() => {
	const [illust, illustActions] = useIllustDetail();

	return (
		<Container>
			<RvHeader />
			<Content>
				<IllustDetail {...{ illust, illustActions }} />
			</Content>
		</Container>
	);
});

export default IllustDetailContainer;
