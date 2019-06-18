import React from 'react';
import { View, Text } from 'native-base';
import { human } from 'react-native-typography';
import { Illust } from 'pixiv-api-client';
import styled from 'styled-components/native';
import HTMLView, { HTMLViewNode } from 'react-native-htmlview';

interface Props {
	illust: Illust;
}

const IllustCaption = (props: Props) => {
	const { illust } = props;

	const _renderNode = (node: HTMLViewNode, index: number): React.ReactNode => {
		console.log(node);

		if (node.type !== 'text') {
			return undefined;
		}

		if ((node as any).parent.name === 'a') {
			return <CaptionURL key={index}>{node.data}</CaptionURL>;
		}

		return <CaptionText key={index}>{node.data}</CaptionText>;
	};

	return (
		<StyledHTMLView
			value={`<html><body>${illust.caption}</body></html>`}
			renderNode={_renderNode}
			RootComponent={View}
		/>
	);
};

const StyledHTMLView = styled(HTMLView)`
	padding-bottom: 10;
	margin: 2px 0px;
`;

const CaptionText = styled(Text)`
	${human.subheadObject as any};
	line-height: ${(human.subheadObject.fontSize as number) * 1.5};
`;

const CaptionURL = styled(CaptionText)`
	font-weight: bold;
	color: #40aaef;
`;

export default IllustCaption;
