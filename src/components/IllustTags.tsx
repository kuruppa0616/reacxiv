import React from 'react';
import { Button } from 'native-base';
import { Text } from 'react-native';
import { Illust } from 'pixiv-api-client';
import styled from 'styled-components/native';

interface Props {
	illust: Illust;
}

const IllustTags = (props: Props) => {
	const { illust } = props;

	const _rendrTag = (name: string) => (
		<Button key={name} small={true} info={true} bordered={true} rounded={true}>
			<Tagtext>{name}</Tagtext>
		</Button>
	);

	return <Tags>{illust.tags.map(val => _rendrTag(val.name))}</Tags>;
};

const Tags = styled.View`
	flex-direction: row;
	flex-wrap: wrap;
`;

const Tagtext = styled.Text`
	padding-left: 10px;
	padding-right: 10px;
	padding-top: 0px;
	padding-bottom: 0px;
	font-size: 10;
`;

export default IllustTags;
