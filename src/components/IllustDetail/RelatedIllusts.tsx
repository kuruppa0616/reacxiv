import React from 'react';
import styled from 'styled-components/native';
import { View, Text } from 'native-base';
import { IllustList } from '../IllustList';
import pixivApi from '@/api/PixivApi';
import { Illust } from 'pixiv-api-client';
import { human } from 'react-native-typography';
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
	line-height: ${(human.calloutObject.fontSize as number) * 1.5};
	text-align: center;
	margin-bottom: 10px;
`;
