import React from 'react';
import { Button, Text } from 'native-base';
import { } from 'react-native';
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
	margin-right: 6px;
	margin-top: 5px;
	padding: 0 !important; 
	/* padding-left: 5px;
	padding-right: 5px;
	padding-top: -30px; */
	/* padding-bottom: -10px; */
`;

const Tagtext = styled(Text)`
	font-size: 10;
	color: black;
`;

export default IllustTags;
