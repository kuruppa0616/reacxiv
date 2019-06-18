import React from 'react';
import { Button, Text } from 'native-base';
import { human } from 'react-native-typography';
import { Illust } from 'pixiv-api-client';
import styled from 'styled-components/native';

interface Props {
	illust: Illust;
}

const IllustTags = (props: Props) => {
	const { illust } = props;

	const _rendrTag = (name: string) => (
		<TagButton key={name} small={true} info={true} bordered={true} rounded={true}>
			<Tagtext>{name}</Tagtext>
		</TagButton>
	);

	return <Tags>{illust.tags.map(val => _rendrTag(val.name))}</Tags>;
};

const Tags = styled.View`
	flex-direction: row;
	flex-wrap: wrap;
`;

const TagButton = styled(Button)`
	margin-right: 4px;
	margin-top: 4px;
	padding: 0 !important;
`;

const Tagtext = styled(Text)`
	${human.caption1Object as any};
	line-height: ${(human.caption1Object.fontSize as number) * 1.5};
`;

export default IllustTags;
