import React from 'react';

import { observer } from 'mobx-react-lite';
import { Container, Content } from 'native-base';

import { IllustDetail } from '@/components/IllustDetail';
import { Loading } from '@/components/Loading';
import { useIllustDetail } from '@/hooks';
import { RvHeader } from '@/components/RvHeader';

const IllustDetailContainer = observer(() => {
	const [illust, illustActions] = useIllustDetail();

	const renderBody = () => (
		<Content>
			<RvHeader />
			<IllustDetail {...{ illust, illustActions }} />
		</Content>
	);

	return <Container>{illust ? renderBody() : <Loading />}</Container>;
});

export default IllustDetailContainer;
