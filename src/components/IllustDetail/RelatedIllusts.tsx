import React from 'react';
import { human } from 'react-native-typography';

import { Text, View } from 'native-base';
import { Illust } from 'pixiv-api-client';
import styled from 'styled-components/native';

import pixivApi from '@/api/PixivApi';

import { IllustList } from '../IllustList';

interface Props {
	illust: Illust;
}
const RelatedIllusts = (props: Props) => {
	const _fetch = (id: number) => () => pixivApi.illustRelated(id);
	return (
		<Container>
			<StyledText>RelatedIllusts</StyledText>
			<IllustList fetch={_fetch(props.illust.id)} />
		</Container>
	);
};

export default RelatedIllusts;

const Container = styled(View)`
	flex: 1;
	height: 100%;
	margin-top: 20px;
`;

const StyledText = styled(Text)`
	${human.calloutObject as any};
	text-align: center;
	margin-bottom: 10px;
`;
